# Roadmap

Live punch list — what's left before the static site is "basically done",
and what comes after. Captured 2026-05-11.

## Before "static site complete"

1. **Hero flowers — redo again.** The `HibiscusBouquet` (full-perimeter
   frame of `Rose` / `Eucalyptus` / `Astilbe` in `Hero.tsx`) isn't final
   yet; the floral language needs another pass.
2. **Reviews page** — needs redoing.
3. **Blog page** — reintegrate.
4. **Footer links** — clean up + wire up.
5. **About page** — redesign.
6. **Login** — needs work. `/account` currently embeds a Google iframe
   as a placeholder (see the top of the README).
7. **Stripe API** — real integration, not the test scaffolding.

Once all of the above lands, the only outstanding item to call the
static site "basically done" is **product photography** — drop real
images into the placeholder slots throughout (`Hero`, `ProductDetail`,
`/products`).

## Immersive — next phase

8. When immersive mode is **OFF**, the ambient fauna should disappear:
   - **Hero bees** — both `<div>`s that run `heroBeeFly1` / `heroBeeFly2`
   - **VSL bird** — the `<div>` that runs `birdAcross`
   Right now they animate unconditionally. Gate them on the same
   `story:state` event that `HomeSections.tsx` already listens to.
9. **Product page — review interaction.** Today the rating row
   (★★★★★ · X reviews) smooth-scrolls to `#product-reviews`. Ed wants
   to swap that for an **inline expand**: clicking the rating row
   expands the product card itself (accordion-style) to reveal the
   reviews within the card, instead of scrolling away from it.
