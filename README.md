# Thesarana Dissanayake Portfolio

A modern, responsive personal portfolio built with Next.js (App Router), TypeScript, and Material UI (MUI v5+).

## Tech Stack

- Next.js (App Router, TypeScript)
- Material UI (MUI v5+)
- @mui/system for custom styling
- ESLint & Prettier
- Jest & React Testing Library
- SEO with next-seo

## Project Structure

- `src/app/` – Pages, layouts, routing
- `src/components/` – Reusable UI components
- `src/features/` – Domain logic (skills, projects, profile)
- `src/styles/` – Global and component-level styles
- `src/lib/` – Utilities and API clients
- `src/theme/` – MUI theme and configuration
- `public/` – Static assets

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a local `.env.local` file for server-side secrets:

```env
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL="Portfolio Contact <contact@your-verified-domain.com>"

# Production contact rate limiting
UPSTASH_REDIS_REST_URL=https://your-upstash-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
CONTACT_TRUSTED_IP_HEADER=x-forwarded-for

# Or, when contact form limits are enforced by your host/WAF instead:
# CONTACT_RATE_LIMIT_MODE=platform
```

`RESEND_API_KEY` is required for the contact form. `RESEND_FROM_EMAIL` should use a sender address from a domain verified in Resend for production email delivery.

Production contact submissions require either Upstash Redis rate limiting or an explicit platform/WAF rate-limit mode. `CONTACT_TRUSTED_IP_HEADER` should only be set to a client IP header that your deployment platform overwrites or sanitizes; otherwise requests share an anonymous rate-limit bucket. Development uses an in-memory fallback.

## Features

- Light/dark mode with MUI theme
- Glassmorphism header
- Dynamic routing for projects
- SEO, sitemap, robots.txt
- Fully responsive
- Unit/integration tests

## Deployment

Deploy on [Vercel](https://vercel.com/) for best results.

---

_See code comments and documentation for further details._
