# Nido Landing Page

Static landing page for Nido — a household budgeting app.
Lives at `join.nido.guru`. The app itself is at `nido.guru`.

## Tech Stack

- **Vite** with vanilla TypeScript (no React)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **Clerk JS** (`@clerk/clerk-js`) for waitlist form — vanilla JS `mountWaitlist()`
- **Bun** as package manager

## Commands

```bash
bun run dev      # Start dev server
bun run build    # Build to dist/
bun run preview  # Preview production build
```

## Environment

Copy `.env.example` to `.env.local` and set your Clerk publishable key:

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

## Design System

Achromatic (pure grayscale) OKLCh color tokens matching the main Nido app.
Dark mode via `prefers-color-scheme`. System font stack.

## i18n

Bilingual EN/ES via client-side translation in `src/i18n.ts`.
Elements with `data-i18n="key"` get their textContent swapped.
Language preference persisted in `localStorage`.

## Deploy

Static site — deploy `dist/` to Vercel, Netlify, or S3.
DNS: CNAME `join.nido.guru` to your deploy target.
Add `join.nido.guru` to Clerk's allowed origins.
