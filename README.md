# Luv & Ker — *Odo by Felicia*

Storefront for **Luv & Ker · Odo by Felicia** — pure, natural,
hormone-safe Ghanaian heritage soap. Built as a single static-first
Next.js storefront with an opt-in immersive scroll-driven story
experience layered on top.

Live site: <https://luvandker.com>

> **Status**: the static site is feature-complete and ready to ship
> pending real product photography and Stripe go-live. The immersive
> experience is fully wired and continues to be polished. Roadmap
> lives in [`ROADMAP.md`](./ROADMAP.md).

---

## Tech stack

- **Next.js 16** — App Router, Turbopack dev + build
- **React 19** strict mode
- **TypeScript** (strict)
- **Tailwind CSS 4** (with `@theme` token layer)
- **Stripe** — checkout + webhooks (placeholder env vars wired)
- **Shopify Storefront API** — cart + product catalog (placeholder env vars wired)
- **`next/dynamic`** for lazy-loading the heavy immersive chapter component

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000
```

`.env.local` is needed for Stripe / Shopify integration — see
`.env.example` for the full list. The site renders fully without
those keys (cart adds will log to the console; checkout button
short-circuits).

## Deployment

Push to `main` → deploy via Vercel. Point the project at this
repo's root, set the environment variables in Vercel's dashboard,
and attach the `luvandker.com` domain.

## Project structure

```
src/
  app/                 Next.js App Router pages
    page.tsx           Home — composes Hero + HomeSections
    products/         Product catalog + product detail routes
    reviews/          Public verified-review feed
    cookies/          Cookie / data-preferences page
    account/          Customer portal placeholder (iframe; see TODO)
    refer/            Referrals ("£10 + £10") landing
    not-found.tsx     Storefront 404 — glassmorphic card
    error.tsx         Storefront error boundary — glassmorphic card
    global-error.tsx  Last-resort boundary (inline styles, dark glass)
    admin/            Admin chrome (sales, plugins, portals)
    api/              Routes — checkout, newsletter, portal, etc.
  components/         UI components (see "Key components" below)
  context/            React Context providers (CartContext)
  hooks/              Custom hooks (useScrollReveal, etc.)
  lib/                Catalog, reviews, cart, auth, admin helpers
public/               Static assets
media-storage/        Non-served image bucket
```

## Key components

### Home flow (`src/components/HomeSections.tsx`)

In order down the page:

1. **`<Hero />`** — left copy column + right `<HeroProductCard />`.
2. **`<VSLSection />`** (id `customer-stories`) — Felicia's founder
   story plus five customer-story videos in a rail. Featured player
   opens `<VideoModal />` on click. The pair of in-love bees that
   used to live here have moved to Hero.
3. **`<ScrollStory />`** — gradient transition strip + either the
   immersive `<ScrollStoryAnimated />` or a no-op when off. Behaviour
   is explained in detail in "Immersive experience" below.
4. **Static fallback** — `Problem` / `Solution` / `Opportunities`
   render *only when immersive is off* so the page still walks the
   user through the narrative even without the animated player.
5. **`#buy` product section** — homepage compact `<ProductDetail />`.
6. **`<Testimonials />`** (id `verified-reviews`) — combined
   testimonials surface that morphs in place between a scrolling
   marquee and a filterable reviews board. See "Combined reviews
   section" below.
7. **`<SupportUsSection />`** — four "support us" cards + an
   integrated mailing-list signup.

### Hero (`src/components/Hero.tsx`)

Left column has the wordmark, headline (*"This is what clean feels
like."*), African Black Soap line, packaging strip, and two CTAs:

- **"10% Introductory Offer"** — opens `<DiscountPopup />`. Once the
  user reaches the popup's `done` step, a `discount:claimed` event
  fires and `ck.discount.claimed=1` lands in `localStorage`. The CTA
  morphs in place to **"✓ Claimed — buy now"** and on click now
  scrolls to `#buy` instead of re-opening the popup.
- **"Watch the story"** — dispatches `customer-stories:select` with
  `{ id: "origin" }` and smooth-scrolls to `#customer-stories`. The
  VSL section features Felicia's founder cut without opening a popup.

Right column is a single `<HeroProductCard />`:

- Tall portrait card with soft cream→amber radial-gradient
  background and a subtle concentric-dotted-ring backdrop.
- Two small floral clusters (5-petal coral + blush blooms + a bud)
  tucked into opposite corners with sage botanical sprigs.
- A soft blue water-pool ellipse under the product placeholder.
- Centred dashed product image area (swap for `<Image />` when
  photography lands).
- Single bottom signature plate — *"By · Felicia · Accra · Ghana"*.

A pair of bees (`heroBeeFly1` + `heroBeeFly2`, 40 s loop) commute
between the Felicia plate area and the offer button, mirroring
`scaleX` on outbound vs return legs so the beak always leads. Both
bees only render when immersive mode is on (gated via the
`story:state` event).

### Packaging strip → product card

The three Hero packaging icons (Classic Bar / Pump Bottle / Whipped
Jar) each dispatch a `product:select-format` event with the matching
format and smooth-scroll to `#buy`. `ProductDetail` listens for that
event and switches the active format.

### Combined reviews section (`src/components/Testimonials.tsx`)

One section (id `verified-reviews`), two modes:

- **`marquee`** (default) — two auto-scrolling rows of review cards,
  hover any card to pause. Dual CTA: "Read all our reviews →" and
  "▶ Watch from our customers".
- **`board`** — `<ReviewsBoard />` filterable grid (Product / Rating /
  Sort) with pagination (6 cards at a time + "View N more" button,
  resets on filter change).

The "Stories / What people are actually saying" header + four-stat
trust strip stay visible in both modes — the section morphs in place.

Cross-page events:

- **`reviews:filter`** — fired by `ProductDetail`'s rating row click.
  Switches to `board` and pre-selects the product as the filter.
- **`reviews:mode`** — fired by the VSL section's "See all our
  reviews" CTA. Forces `marquee` mode and scrolls to the sub-header.

### Customer-stories events (`src/components/VSLSection.tsx`)

The VSL section (id `customer-stories`) features one story at a time
from `STORIES_RAIL`. First entry is the founder (Felicia / story id
`origin`); five customer stories follow. External surfaces talk to
the section through two events:

- **`customer-stories:select`** — feature the requested story in the
  rail (no modal). Used by Hero's "Watch the story" CTA.
- **`customer-stories:play`** — feature + open the modal. Reserved
  for explicit play actions.

The ambient bird `<BirdSprite />` (left → right cross-fly every
30 s) is gated on the immersive `story:state`.

### Cookie consent (`src/components/CookieConsentBar.tsx` + `/cookies`)

- Bar appears on first visit (no `ck.cookies.v1` in `localStorage`).
- Three actions: **Accept all** / **Reject non-essential** /
  **Customise** (opens an inline modal embed of the full preferences
  panel) plus a link to the standalone `/cookies` page.
- Bar and `/cookies` share the same storage key + a `cookies:changed`
  `CustomEvent`, so saving from either surface updates the other and
  closes the bar live.

### Error / 404 pages

`src/app/{not-found,error,global-error}.tsx` + their `admin/`
siblings all wrap their content in a glassmorphic card:

```tsx
background: "rgba(255, 255, 255, 0.55)"
backdropFilter: "blur(18px) saturate(140%)"
border: "1px solid rgba(255, 255, 255, 0.6)"
boxShadow: "0 24px 60px -20px rgba(40,18,60,0.18), 0 0 0 1px rgba(255,255,255,0.4) inset"
```

`global-error.tsx` uses an inline-styled **dark** glass variant
since the layout chain may be broken when it renders.

## Immersive experience

`<ScrollStoryAnimated />` is a 5000 vh scroll-driven sequence
lazy-loaded by `<ScrollStory />` only when the user opts in
(persisted under `storyAnimations` in `localStorage`).

### Chapters

| # | Name | Range | What happens |
|---|---|---|---|
| 0 | The Promise   | 0.00 → 0.10 | Portrait skin transformation → "*…without the BS?*" |
| 1 | The Problem   | 0.10 → 0.20 | Factory rises, chemical labels emerge |
| 2 | Ingredients   | 0.20 → 0.30 | Four ingredients orbit a centred product (like planets around a sun). At chapter end they **spiral inward and merge into the Earth**. |
| 3 | The World     | 0.30 → 0.40 | Earth chapter. Headline *"Rethinking what we call care."* Zooms **into** Ghana with a pin glow + *"Accra, Ghana"* label. |
| 4 | The Journey   | 0.40 → 0.50 | Sunset → captured into the **LUV & KER logo seal** → blueprint → harvest → prepare → handcraft → cure → ready |
| 5 | The Answer    | 0.50 → 0.60 | Product reveal, trust tags, discount CTA |
| 6 | Why Choose Us | 0.60 → 1.00 | Two rows of benefit cards + Felicia quote |

30 hand-tuned scroll beats distribute across these chapters; see
`STEPS` in `ScrollStoryAnimated.tsx`.

### Immersive integration with the rest of the page

The animated component sets a few document-level signals:

- `--story-progress` (0–1) and `--story-darkness` (0–1) CSS variables
  on `<html>`.
- `data-story-active="1"` attribute on `<html>` while progress is
  inside the player's active window (~0.02 → 0.96). Used by the
  inline scrollbar CSS in `app/layout.tsx` to **hide the scrollbar
  while inside the player**.
- A global `story:state` `CustomEvent` is dispatched whenever the
  immersive on/off state changes. `HomeSections`, `Hero` (bees) and
  `VSLSection` (bird) all listen for this and render accordingly.

### Toggling on / off

- "**Turn off immersive experience**" pill — sticky-pinned at the top
  of the player. Calls `handleDisable`: animation off, scrolls back
  to the section top.
- "**Turn back on immersive experience**" — sits half-in/half-out of
  the green→dark transition strip when the section is in static
  mode. Re-enables animations and rewinds the page.
- **On completion** — when the user naturally scrolls all the way
  through the animation, the section auto-collapses to its static
  fallback and the scroll is parked at the top of `#buy` so the user
  resumes forward. The "Turn back on" button is still available to
  replay.

## Development notes

A few non-obvious things worth knowing.

### Turbopack + Next 16 — workspace root

`next.config.ts` pins `turbopack.root` to `__dirname`. Without this,
Next infers the workspace root from the nearest `package-lock.json`,
and a stray lockfile in a parent directory (`~/package-lock.json`,
etc.) will hijack module resolution. Keep the pin.

### Turbopack + multi-line className

Turbopack 16.x emits literal newlines into compiled chunks when a
JSX `className="…"` spans multiple lines, producing
`SyntaxError: Invalid or unexpected token` at runtime. **Keep every
`className` on a single line.** For long classes, prefer:

```tsx
className={["foo bar", isActive && "is-active"].filter(Boolean).join(" ")}
```

…or a single template string on one line.

### Scrollbar

The branded orange scrollbar is wired both in `globals.css` and as
an inline `<style>` in the document `<head>` (set from
`app/layout.tsx`) as belt-and-braces — Tailwind 4's cascade layers
and Turbopack HMR have both swallowed the rules in the past. While
the immersive player is active (`data-story-active="1"` on `<html>`)
the scrollbar is collapsed to zero so it doesn't distract from the
animation.

### FxObserver

`src/components/FxObserver.tsx` is mounted globally. Entry/exit
reveal animations are **disabled** — only hover utilities
(`fx-pop`, `fx-lift`, `fx-zoom`) are auto-applied to children of any
section tagged `data-fx-section`. Do **not** add `data-fx-section`
to sections whose buttons need stable React-controlled
classNames — FxObserver's imperative class injection collides with
React's reconciliation and produces hydration mismatches. Either
add explicit hover styles in JSX or add `data-fx-skip` to opt
specific elements out. (Testimonials had to drop `data-fx-section`
for this reason.)

### Cursor + modals

`<LatherTrail />` hides the system cursor globally and renders its
own SVG pointer. Its pointer was bumped to `z-[10100]` so it stays
above modals/popups (DiscountPopup at `z-10000`). If you add a new
modal above z-10100 you'll need to bump the pointer accordingly.

### Hydration-sensitive SVGs

`GrassLandscape` (VSL section) uses `Math.sin`/`Math.cos` to lay out
blades and uses many digits of precision — Node vs browser can
differ by one ULP and produce hydration mismatches. The component is
mount-gated (renders nothing on the server, mounts on the client).
Coordinates that *are* SSR'd elsewhere are rounded.

### Stripe / portal placeholders

`src/app/account/page.tsx` currently embeds `https://www.google.com`
as a placeholder iframe for Felicia's customer portal. Swap the
iframe `src` for her real portal embed URL when ready. Stripe API
keys live in `.env.local`; the checkout button will short-circuit
with a console error if they're missing.

## Roadmap

See [`ROADMAP.md`](./ROADMAP.md). High-level: hero flowers iteration,
About redesign, blog reintegrate, Login, Stripe go-live, product
photography. The immersive experience continues to be polished.

## License

© Luv & Ker · Odo by Felicia. All rights reserved.
