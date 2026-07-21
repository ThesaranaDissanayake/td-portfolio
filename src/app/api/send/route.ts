import { createHash } from "node:crypto";
import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/components/emails/ContactEmail";
import { contactFormSchema } from "@/lib/schemas";
import { profile } from "@/features/profile.config";

export const runtime = "nodejs";

const DEFAULT_RESEND_FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>";
const CONTACT_BODY_LIMIT_BYTES = 10 * 1024;
const CONTACT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_RATE_LIMIT_WINDOW_SECONDS = Math.ceil(
  CONTACT_RATE_LIMIT_WINDOW_MS / 1000,
);
const CONTACT_RATE_LIMIT_MAX_REQUESTS = 5;
const CONTACT_RATE_LIMIT_MODES = new Set(["redis", "platform", "memory"]);
const TRUSTED_CLIENT_IP_HEADERS = new Set([
  "cf-connecting-ip",
  "fly-client-ip",
  "true-client-ip",
  "x-forwarded-for",
  "x-real-ip",
  "x-vercel-forwarded-for",
]);

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitBackend =
  | {
      type: "redis";
      url: string;
      token: string;
    }
  | {
      type: "platform" | "memory";
    }
  | {
      type: "misconfigured";
      message: string;
    };

type RateLimitResult =
  | {
      status: "ok";
    }
  | {
      status: "limited";
      retryAfterSeconds: number;
    }
  | {
      status: "unavailable";
      message: string;
    };

type ClientIdentityResult =
  | {
      success: true;
      identity: string;
    }
  | {
      success: false;
      message: string;
    };

type UpstashCommandResultEntry = {
  result?: unknown;
  error?: string;
};

type JsonBodyResult =
  | {
      success: true;
      body: unknown;
    }
  | {
      success: false;
      response: NextResponse;
    };

const contactRateLimitStore = new Map<string, RateLimitEntry>();

const getResendFromEmail = () =>
  process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_RESEND_FROM_EMAIL;

const getOptionalEnv = (key: string) => {
  const value = process.env[key]?.trim();

  return value || undefined;
};

const getRateLimitBackend = (): RateLimitBackend => {
  const mode = getOptionalEnv("CONTACT_RATE_LIMIT_MODE")?.toLowerCase();
  const redisUrl = getOptionalEnv("UPSTASH_REDIS_REST_URL")?.replace(
    /\/+$/,
    "",
  );
  const redisToken = getOptionalEnv("UPSTASH_REDIS_REST_TOKEN");

  if (mode && !CONTACT_RATE_LIMIT_MODES.has(mode)) {
    return {
      type: "misconfigured",
      message: "CONTACT_RATE_LIMIT_MODE must be redis, platform, or memory.",
    };
  }

  if (mode === "platform") {
    return { type: "platform" };
  }

  if (mode === "redis" || (!mode && (redisUrl || redisToken))) {
    if (!redisUrl || !redisToken) {
      return {
        type: "misconfigured",
        message:
          "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are both required for Redis contact rate limiting.",
      };
    }

    return { type: "redis", url: redisUrl, token: redisToken };
  }

  if (process.env.NODE_ENV === "production") {
    return {
      type: "misconfigured",
      message:
        "Production contact rate limiting requires Upstash Redis or CONTACT_RATE_LIMIT_MODE=platform.",
    };
  }

  return { type: "memory" };
};

const normalizeClientIp = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) return undefined;

  if (trimmedValue.startsWith("[") && trimmedValue.includes("]")) {
    const bracketedIp = trimmedValue.slice(1, trimmedValue.indexOf("]"));
    return isIP(bracketedIp) ? bracketedIp : undefined;
  }

  if (isIP(trimmedValue)) {
    return trimmedValue;
  }

  if (trimmedValue.includes(".") && trimmedValue.includes(":")) {
    const maybeIpv4 = trimmedValue.slice(0, trimmedValue.lastIndexOf(":"));
    return isIP(maybeIpv4) ? maybeIpv4 : undefined;
  }

  return undefined;
};

const getConfiguredTrustedIpHeader = (): ClientIdentityResult | string => {
  const headerName = getOptionalEnv("CONTACT_TRUSTED_IP_HEADER")?.toLowerCase();

  if (!headerName) {
    return "anonymous";
  }

  if (!TRUSTED_CLIENT_IP_HEADERS.has(headerName)) {
    return {
      success: false,
      message:
        "CONTACT_TRUSTED_IP_HEADER must be a known proxy-provided client IP header.",
    };
  }

  return headerName;
};

const getClientIdentity = (req: Request): ClientIdentityResult => {
  const configuredHeader = getConfiguredTrustedIpHeader();

  if (typeof configuredHeader !== "string") {
    return configuredHeader;
  }

  if (configuredHeader === "anonymous") {
    return { success: true, identity: "anonymous" };
  }

  const headerValue = req.headers.get(configuredHeader);
  const firstHeaderValue =
    configuredHeader === "x-forwarded-for" ||
    configuredHeader === "x-vercel-forwarded-for"
      ? headerValue?.split(",")[0]
      : headerValue;
  const clientIp = firstHeaderValue
    ? normalizeClientIp(firstHeaderValue)
    : undefined;

  return {
    success: true,
    identity: clientIp ? `ip:${clientIp}` : "anonymous",
  };
};

const createRateLimitKey = (identity: string) => {
  const identityHash = createHash("sha256").update(identity).digest("hex");

  return `contact:send:${identityHash}`;
};

const pruneExpiredRateLimits = (now: number) => {
  contactRateLimitStore.forEach((entry, key) => {
    if (entry.resetAt <= now) {
      contactRateLimitStore.delete(key);
    }
  });
};

const checkMemoryContactRateLimit = (key: string): RateLimitResult => {
  const now = Date.now();
  pruneExpiredRateLimits(now);

  const existingEntry = contactRateLimitStore.get(key);

  if (!existingEntry || existingEntry.resetAt <= now) {
    contactRateLimitStore.set(key, {
      count: 1,
      resetAt: now + CONTACT_RATE_LIMIT_WINDOW_MS,
    });
    return { status: "ok" };
  }

  if (existingEntry.count >= CONTACT_RATE_LIMIT_MAX_REQUESTS) {
    return {
      status: "limited",
      retryAfterSeconds: Math.ceil((existingEntry.resetAt - now) / 1000),
    };
  }

  existingEntry.count += 1;
  contactRateLimitStore.set(key, existingEntry);
  return { status: "ok" };
};

const getUpstashCommandNumber = (
  entries: UpstashCommandResultEntry[],
  index: number,
  commandName: string,
) => {
  const entry = entries[index];

  if (!entry || entry.error) {
    throw new Error(
      `${commandName} failed while checking the contact rate limit.`,
    );
  }

  const result = Number(entry.result);

  if (!Number.isFinite(result)) {
    throw new Error(
      `${commandName} returned an invalid contact rate limit value.`,
    );
  }

  return result;
};

const checkRedisContactRateLimit = async (
  backend: Extract<RateLimitBackend, { type: "redis" }>,
  key: string,
): Promise<RateLimitResult> => {
  try {
    const response = await fetch(`${backend.url}/multi-exec`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${backend.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, CONTACT_RATE_LIMIT_WINDOW_SECONDS, "NX"],
        ["TTL", key],
      ]),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Upstash Redis contact rate limit transaction failed with status ${response.status}.`,
      );
    }

    const responseBody = (await response.json()) as unknown;

    if (!Array.isArray(responseBody)) {
      throw new Error("Upstash Redis contact rate limit response is invalid.");
    }

    const entries = responseBody as UpstashCommandResultEntry[];
    const requestCount = getUpstashCommandNumber(entries, 0, "INCR");
    const ttlSeconds = getUpstashCommandNumber(entries, 2, "TTL");

    if (requestCount > CONTACT_RATE_LIMIT_MAX_REQUESTS) {
      return {
        status: "limited",
        retryAfterSeconds:
          ttlSeconds > 0
            ? Math.ceil(ttlSeconds)
            : CONTACT_RATE_LIMIT_WINDOW_SECONDS,
      };
    }

    return { status: "ok" };
  } catch (error) {
    console.error("Contact rate limiter unavailable:", error);

    return {
      status: "unavailable",
      message: "Contact rate limiting is unavailable. Please try again later.",
    };
  }
};

const checkContactRateLimit = async (req: Request) => {
  const identity = getClientIdentity(req);

  if (!identity.success) {
    return {
      status: "unavailable",
      message: identity.message,
    } satisfies RateLimitResult;
  }

  const backend = getRateLimitBackend();

  if (backend.type === "misconfigured") {
    return {
      status: "unavailable",
      message: backend.message,
    } satisfies RateLimitResult;
  }

  if (backend.type === "platform") {
    return { status: "ok" } satisfies RateLimitResult;
  }

  const key = createRateLimitKey(identity.identity);

  return backend.type === "redis"
    ? checkRedisContactRateLimit(backend, key)
    : checkMemoryContactRateLimit(key);
};

const readLimitedJsonBody = async (req: Request): Promise<JsonBodyResult> => {
  const contentType = req.headers.get("content-type")?.toLowerCase() || "";

  if (!contentType.includes("application/json")) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 415 },
      ),
    };
  }

  const contentLengthHeader = req.headers.get("content-length");

  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);

    if (!Number.isInteger(contentLength) || contentLength < 0) {
      return {
        success: false,
        response: NextResponse.json(
          { error: "Invalid Content-Length header" },
          { status: 400 },
        ),
      };
    }

    if (contentLength > CONTACT_BODY_LIMIT_BYTES) {
      return {
        success: false,
        response: NextResponse.json(
          { error: "Request body is too large" },
          { status: 413 },
        ),
      };
    }
  }

  if (!req.body) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Request body is required" },
        { status: 400 },
      ),
    };
  }

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let receivedBytes = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;
    if (!value) continue;

    receivedBytes += value.byteLength;

    if (receivedBytes > CONTACT_BODY_LIMIT_BYTES) {
      return {
        success: false,
        response: NextResponse.json(
          { error: "Request body is too large" },
          { status: 413 },
        ),
      };
    }

    chunks.push(value);
  }

  const bodyBytes = new Uint8Array(receivedBytes);
  let offset = 0;

  chunks.forEach((chunk) => {
    bodyBytes.set(chunk, offset);
    offset += chunk.byteLength;
  });

  try {
    return {
      success: true,
      body: JSON.parse(new TextDecoder().decode(bodyBytes)),
    };
  } catch {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Malformed JSON request body" },
        { status: 400 },
      ),
    };
  }
};

const getResendErrorStatus = (error: unknown) => {
  if (
    error &&
    typeof error === "object" &&
    "statusCode" in error &&
    typeof error.statusCode === "number"
  ) {
    return error.statusCode >= 400 && error.statusCode < 500
      ? error.statusCode
      : 502;
  }

  return 502;
};

const getResendErrorMessage = (error: unknown) => {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Resend failed to send the email";
};

export async function POST(req: Request) {
  try {
    const rateLimit = await checkContactRateLimit(req);

    if (rateLimit.status === "unavailable") {
      console.error("Contact form rate limiter is not available:", {
        message: rateLimit.message,
      });

      return NextResponse.json(
        {
          error: "Contact form is temporarily unavailable",
          message:
            process.env.NODE_ENV === "development"
              ? rateLimit.message
              : "Please try again later.",
        },
        { status: 503 },
      );
    }

    if (rateLimit.status === "limited") {
      return NextResponse.json(
        { error: "Too many contact form attempts. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.retryAfterSeconds.toString(),
          },
        },
      );
    }

    const jsonBody = await readLimitedJsonBody(req);

    if (!jsonBody.success) {
      return jsonBody.response;
    }

    // Validate the request body
    const result = contactFormSchema.safeParse(jsonBody.body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message } = result.data;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503 },
      );
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: getResendFromEmail(),
      to: [profile.contactRecipient],
      reply_to: email,
      subject: `Portfolio Contact: ${subject}`,
      react: ContactEmail({ name, email, subject, message }),
    });

    if (error) {
      const message = getResendErrorMessage(error);
      console.error("Resend contact email failed:", {
        statusCode: getResendErrorStatus(error),
        message,
        recipient: profile.contactRecipient,
        from: getResendFromEmail(),
      });

      return NextResponse.json(
        {
          error: "Email delivery failed",
          message:
            process.env.NODE_ENV === "development"
              ? message
              : "Please try again later.",
        },
        { status: getResendErrorStatus(error) },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact form send route failed:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
