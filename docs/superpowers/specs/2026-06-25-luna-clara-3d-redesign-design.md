# Luna Clara — "Celestique-grade" 3D Interactive Redesign

**Date:** 2026-06-25
**Status:** Approved (design phase)
**Surfaces:** Next.js app (`src/`) + Shopify theme (`shopify-theme/`)

## 1. Purpose

Restyle and re-compose the entire Luna Clara storefront — both the Next.js app and
the live Shopify "Tinker" theme — adopting the **layout system and design language**
of the Celestique jewelry concept (Dribbble shot 25513770), while keeping Luna Clara's
existing brand palette and all existing functionality.

The redesign adds a **hybrid 3D, cursor-reactive experience**: a Spline WebGL hero
centerpiece, cursor-driven depth/parallax across the site, and graceful fallbacks.

This is a **visual + structural redesign**, not a behavioral rewrite. Every existing
link, route, cart action, form, and checkout flow must remain functional.

## 2. Goals & non-goals

**Goals**
- One shared design language, implemented natively on each surface.
- Celestique-inspired *structure*: oversized display serif, generous negative space,
  editorial section headers, 2×2 category grid, giant footer wordmark.
- Hybrid 3D: Spline WebGL hero + cursor-reactive depth everywhere.
- Full site coverage (home, product, collection, cart, about, contact, care, shipping).
- Fully functional — no broken buttons, links, or cart/checkout behavior.
- Accessible: all motion gated behind `prefers-reduced-motion`; mobile gets lightweight
  versions (no heavy WebGL).

**Non-goals**
- Changing the brand color palette (gold / cream / champagne / blush / charcoal stays).
- Rebuilding cart/checkout logic, data layer, or Shopify product data.
- Authoring the Spline 3D scene itself (the component is wired; scene URL supplied later).
- Unrelated refactoring beyond what the redesign touches.

## 3. Design language (the system)

### Typography
- **Display / headings:** Cormorant Garamond. Used large (clamp up to ~7rem), tight
  leading, ligatures on — wordmark + section headers (e.g. OUR STORY, THE EDIT,
  OUR MOST LOVED). Replaces **Cinzel**.
- **Body / nav / labels:** Jost. Small, wide letter-spacing; uppercase for eyebrows and
  nav. Replaces **DM Sans**. Strong size contrast vs. the serif is the signature move.
- Next.js loads both via `next/font/google`; Shopify loads via theme font settings /
  `@font-face` or Google Fonts link, mapped to the same CSS variables.

### Color (unchanged)
| Token | Hex |
|---|---|
| Gold | `#C9A84C` |
| Gold Light | `#E8C97A` |
| Cream | `#FDF8F2` |
| Champagne | `#F7E7CE` |
| Blush | `#F2B5C0` |
| Charcoal | `#2C2C2C` |
| Soft Gray | `#8A8A8A` |
| Warm White | `#FFFFFF` |

### Layout DNA
- Wide max-width (~1240px), large vertical rhythm, generous whitespace.
- Editorial section headers: oversized serif + tiny uppercase eyebrow.
- 2×2 **category grid** with serif labels overlaid on imagery (Celestique "Our Products").
- **Giant footer wordmark** — "LUNA CLARA" stretched near full-width.
- Soft borders (`gold/10–20`), subtle gold-tinted shadows on hover.

## 4. Motion / 3D architecture

### Hero (centerpiece)
- **Primary:** Spline WebGL scene via `<spline-viewer>` (existing `LunaClaraSplineHero`),
  cursor-orbit/tilt interaction. Driven by `NEXT_PUBLIC_SPLINE_SCENE_URL`.
- **Fallback:** `public/products/ad-3.mp4` (Shopify: `shopify-theme/assets/ad-3.mp4`),
  shown when: no scene URL set, mobile, `prefers-reduced-motion`, slow connection, or
  while the 3D loads. The hero is never blank.
- Cursor parallax on hero copy + a gold radial glow that tracks the cursor.

### Global cursor-depth layer
- A small reusable wrapper (Next.js: `CursorTilt` component; Shopify: a shared JS
  behavior + CSS custom properties) applies subtle 3D tilt + parallax to cards,
  category tiles, and the story image on pointer move.
- Gold glow / highlight follows the cursor on interactive surfaces.

### Scroll reveals
- Serif section headers rise + fade on scroll (IntersectionObserver), respecting
  reduced-motion.

### Accessibility & performance
- All motion disabled under `prefers-reduced-motion: reduce` → static elegant layout.
- WebGL/heavy effects desktop-only; mobile uses video/image + light CSS only.
- No layout shift; fallbacks render immediately.

## 5. Pages (full site, both surfaces, all functional)

| Page (Next.js / Shopify) | Redesign |
|---|---|
| **Home** (`src/app/page.tsx` / `luna-clara-home.liquid`) | Spline/video hero → occasions marquee → 2×2 category grid (serif overlay labels) → "Glow Picks" product grid → editorial banner → gift boxes → "Most Loved" grid → cursor-interactive story → care strip → giant footer wordmark |
| **Product** (`products/[slug]` / `templates/product`) | Oversized serif title, sticky gallery w/ cursor-zoom, gold CTA, **functional Add-to-Cart** |
| **Collection** (`collections/*` / `templates/collection`) | Editorial header + refined product grid with tilt cards; existing filters/links intact |
| **Cart / Drawer** (`cart/page.tsx`, `CartDrawer` / cart templates + drawer JS) | Restyled to system; all qty / remove / checkout actions intact |
| **About / Contact / Jewelry Care / Shipping & Returns** | Editorial type treatment; same content; working forms and links |
| **Global chrome** (`Navbar`, `Footer`, `AnnouncementBar` / header + footer sections) | New type + spacing; giant footer wordmark; all nav links/menus functional |

## 6. Implementation architecture

### Build order
1. **Design tokens & fonts** first (both surfaces).
2. **Next.js** redesign as the canonical visual reference (fast local iteration).
3. **Shopify** port to match Next.js exactly.

### Next.js
- `src/app/globals.css`: replace font tokens (`--font-display` → Cormorant,
  `--font-body` → Jost), keep color tokens, add motion/utility classes.
- `src/app/layout.tsx`: load Cormorant Garamond + Jost via `next/font/google`.
- Hero: switch home to the Spline+video hero (reuse/extend `LunaClaraSplineHero` and the
  existing video scrub from `LunaClaraMotionHero`); `ad-3.mp4` as fallback source.
- New reusable `CursorTilt` (or `Parallax`) wrapper component for depth.
- Restyle each page + component (`Navbar`, `Footer`, product/collection/cart, content
  pages). Preserve all `Link`, `AddToCartButton`, and `CartContext` wiring.

### Shopify
- `assets/base.css` + `config/settings_data.json`: mirror tokens + fonts.
- `sections/luna-clara-home.liquid` + templates: apply the same structure/styles.
- Embed `<spline-viewer>` via the same CDN tag; `ad-3.mp4` copied to `assets/`.
- Shared cursor-depth JS behavior in a theme asset.
- Keep all Liquid routes, product loops, and cart drawer JS intact.

## 7. Assets

- **In repo:** `public/products/ad-3.mp4` (hero fallback video), existing product images,
  `luna-clara-spline-fallback.png`.
- **To copy:** `ad-3.mp4` → `shopify-theme/assets/ad-3.mp4`.
- **Optional, later (non-blocking):** a Spline scene URL → set
  `NEXT_PUBLIC_SPLINE_SCENE_URL` (Next.js) and the `<spline-viewer>` url (Shopify).
  A scene brief will be provided; until then the video hero is shown.

## 8. Success criteria

- Both surfaces visually match the agreed Celestique-grade language (type, spacing,
  section rhythm, footer wordmark).
- Cursor-reactive depth works smoothly on desktop; degrades cleanly on mobile and under
  reduced-motion.
- Hero shows the Spline scene when a URL is set, else the `ad-3.mp4` video — never blank.
- Every page renders with working navigation, links, Add-to-Cart, cart drawer, and
  checkout. No regressions in existing behavior.
- No console errors; Next.js builds clean; Shopify theme passes `shopify theme check`
  for touched files.

## 9. Risks

- **Spline scene dependency:** mitigated by sequencing — video hero ships first, 3D slots
  in via env/URL with no code change.
- **Two implementations drifting:** mitigated by building Next.js first as the reference
  and porting deliberately.
- **Motion performance / a11y:** mitigated by reduced-motion gating and desktop-only WebGL.
