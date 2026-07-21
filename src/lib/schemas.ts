import { z } from "zod";

export const CONTACT_FORM_LIMITS = {
  nameMax: 80,
  emailMax: 254,
  subjectMax: 120,
  messageMax: 5000,
} as const;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(CONTACT_FORM_LIMITS.nameMax, {
      message: `Name must be ${CONTACT_FORM_LIMITS.nameMax} characters or fewer.`,
    }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." })
    .max(CONTACT_FORM_LIMITS.emailMax, {
      message: "Email address is too long.",
    }),
  subject: z
    .string()
    .trim()
    .min(5, { message: "Subject must be at least 5 characters." })
    .max(CONTACT_FORM_LIMITS.subjectMax, {
      message: `Subject must be ${CONTACT_FORM_LIMITS.subjectMax} characters or fewer.`,
    }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(CONTACT_FORM_LIMITS.messageMax, {
      message: `Message must be ${CONTACT_FORM_LIMITS.messageMax} characters or fewer.`,
    }),
  website: z
    .string()
    .trim()
    .max(0, { message: "Invalid submission." })
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
