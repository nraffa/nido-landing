# Nido Landing Page

Static waitlist page for Nido at `join.nido.guru`. App lives at `nido.guru`.

## Stack

- Vite + vanilla TypeScript + Tailwind CSS v4
- Clerk waitlist via CDN (not npm — see below)
- Bun, deployed on AWS Amplify

## Commands

```bash
bun run dev      # Dev server
bun run build    # Build to dist/
bun run preview  # Preview build
```

## Environment

```bash
VITE_CLERK_PUBLISHABLE_KEY=  # Clerk publishable key
VITE_CLERK_PROXY_URL=        # Clerk proxy domain (e.g. clerk.nido.guru)
```

Copy `.env.example` to `.env.local`. Restart dev server after changes.

## Clerk Integration

**Do NOT use the `@clerk/clerk-js` npm package for mounting UI components.**
It doesn't bundle the UI — `mountWaitlist()` throws "not loaded with Ui components".

Instead, load Clerk from CDN in `src/main.ts`:
- For dev keys (`*.clerk.accounts.dev`): load from FAPI URL
- For production proxy domains: load from jsdelivr CDN + set `data-clerk-proxy-url`

The FAPI URL is derived by base64-decoding the publishable key payload and stripping the trailing `$`.

## Deploy

AWS Amplify app `d2ekh8fu8r9ttn` in us-east-1 (archilo profile).
Auto-deploys from `main` branch. Env vars set on Amplify app level.
DNS: `join` CNAME → `ds22oesnup4wf.cloudfront.net`

## Pre-commit Hook

`.githooks/pre-commit` blocks `.env*` files and scans for secret patterns.
Configured via `git config core.hooksPath .githooks`.
