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

## Development notes

A few non-obvious things worth knowing before editing the codebase.

### Turbopack + Next 16 — workspace root

`next.config.ts` pins `turbopack.root` to `__dirname`. Without this, Next
infers the workspace root from the nearest `package-lock.json`, and if a
stray lockfile exists in a parent directory (`~/package-lock.json`, etc.)
it will pick that and break dev-server module resolution. Keep the pin.

### Turbopack + multi-line className

Turbopack 16.x emits literal newlines into compiled chunks when a JSX
`className="…"` spans multiple lines, which produces `SyntaxError:
Invalid or unexpected token` at runtime. **Keep every `className` on a
single line.** If you need long classes, prefer:

```tsx
className={["foo bar", isActive && "is-active"].filter(Boolean).join(" ")}
```

…or template strings on one line.

### Error + 404 pages

The user-facing error pages (`src/app/{not-found,error,global-error}.tsx`
and their `admin/` siblings) all use a glassmorphic card pattern:

```tsx
<div style={{
  background: "rgba(255, 255, 255, 0.55)",
  backdropFilter: "blur(18px) saturate(140%)",
  WebkitBackdropFilter: "blur(18px) saturate(140%)",
  border: "1px solid rgba(255, 255, 255, 0.6)",
  boxShadow:
    "0 24px 60px -20px rgba(40,18,60,0.18), 0 0 0 1px rgba(255,255,255,0.4) inset",
}}>
```

`global-error.tsx` is inline-styled only (no Tailwind / no layout
chain) — keep the dark variant of the glass card there.

### Hero scene architecture

`src/components/Hero.tsx` owns the hero. The right-column scene
contains, in z-order:

1. **`<WaterSplash />`** — decorative water pool behind the placeholder
2. **`<HibiscusBouquet />`** — full-perimeter floral frame around the
   placeholder, drawn from three reusable components: `Rose`,
   `Eucalyptus`, `Astilbe`. Roses are built from concentric petal
   rings + furled centre with four vibrant variants (`blush`, `cream`,
   `dusty`, `burgundy`). All petal/eucalyptus gradients live in the
   bouquet's own `<defs>`.
3. **Dashed placeholder** — replace with the real product image
4. **Floating badges** — "by Felicia" (z-20, bottom-left) and
   "6 INGREDIENTS" (z-20, top-right)

A pair of bee SVGs (`BeeSvg`) commute between the daffodil cluster and
the "10% Introductory Offer" button on a 40s loop. They mirror
`scaleX` between the leftward and rightward legs of the route so the
beak always leads.

### Reveal / hover effects

`src/components/FxObserver.tsx` is mounted globally in `app/layout.tsx`.
Entry/exit reveal animations are **disabled** — only hover utilities
(`fx-pop`, `fx-lift`, `fx-zoom`) are auto-applied to elements inside
sections tagged `data-fx-section`. `useScrollReveal` (`src/hooks/`) is
also neutered and always reports `visible: true`.

### VSL section — bird

`src/components/VSLSection.tsx` includes an ambient robin that simply
flies left → right across the background every 30 seconds. The
elaborate sprite-swap / perch / dive / part-animation machinery from
earlier iterations has been removed in favour of one straight
`birdAcross` keyframe.

### Mailing list

The newsletter signup at the bottom of `<SupportUsSection />` POSTs to
`/api/portal/newsletter/subscribe` with `{ email, source:
"support-us" }`. The endpoint resolves the org via the standard portal
storage layer; no extra env vars needed.

## License

© Luv & Ker · Odo by Felicia. All rights reserved.
