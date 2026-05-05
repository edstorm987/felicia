# Luv & Ker — Felicia's Website

The official storefront for **Luv & Ker · Odo by Felicia** — pure, natural,
hormone-safe Ghanaian heritage soap.

Live site: <https://luvandker.com>

---

## ⚠️ TODO — Swap the Google iframe for the real portal

The `/account` login page currently embeds **`https://www.google.com`** as a
placeholder iframe. This is intentional and temporary.

Once Felicia's dedicated portal is live, the iframe `src` needs to be swapped
to point at her portal embed URL.

**Where to change it:** `src/app/account/page.tsx` — the `LoginScreen`
component. Replace the `https://www.google.com/webhp?igu=1` URL with the
real portal embed URL when ready.

---

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 4**
- **Stripe** (checkout + webhooks)
- **Shopify Storefront API** (cart + product catalog)

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000
```

A `.env.local` is needed for Stripe / Shopify integration — see
`.env.example` for the full list of variables.

## Deployment

Pushed to `main` → deploy via Vercel (recommended). Point the project at
this repo's root, set the environment variables in Vercel's dashboard, and
attach the `luvandker.com` domain.

## Project structure

```
src/
  app/                Next.js App Router pages (storefront + account)
  components/         UI components (Navbar, Footer, Hero, ProductDetail…)
  lib/                catalog, cart, auth, helpers
  context/            React Context providers (CartContext)
public/               static assets (logos, images)
media-storage/        non-served image bucket
```

## License

© Luv & Ker · Odo by Felicia. All rights reserved.
