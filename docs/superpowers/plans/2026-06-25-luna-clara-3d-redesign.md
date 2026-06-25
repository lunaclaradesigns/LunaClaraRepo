# Luna Clara 3D Interactive Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin and re-compose the entire Luna Clara storefront (Next.js app + Shopify theme) into a Celestique-grade, 3D cursor-reactive experience while keeping the brand palette and all existing functionality.

**Architecture:** Establish a shared design language (Cormorant Garamond + Jost type system, Celestique layout DNA, cursor-depth motion) once, implement it natively on each surface. Build Next.js first as the canonical visual reference, then port the exact look to the Shopify Liquid theme. Hero uses a Spline WebGL centerpiece with `ad-3.mp4` as the guaranteed fallback.

**Tech Stack:** Next.js 16, React 19, Tailwind v4 (`@theme` CSS tokens), `next/font/google`, Spline `<spline-viewer>` (CDN web component), Shopify Liquid (Tinker theme), vanilla JS for theme motion.

## Testing Approach (read first)

This is a visual/CSS + Liquid redesign. The repo has **no unit-test runner** (see `package.json` — only `eslint`). Per YAGNI we are **not** introducing one. Each task's verification is therefore:

- **Next.js:** `npm run lint` and `npm run build` must pass clean, plus a dev-server render + functional click-through of the affected surface (nav links, Add-to-Cart, cart drawer, checkout button).
- **Shopify:** `shopify theme check` passes for touched files and the section renders in the theme editor without Liquid errors.

"Run the test" steps below mean exactly these commands. Treat a failing build/lint as a failing test — fix before commit.

## Global Constraints

- Brand palette unchanged: gold `#C9A84C`, gold-light `#E8C97A`, cream `#FDF8F2`, champagne `#F7E7CE`, blush `#F2B5C0`, charcoal `#2C2C2C`, soft-gray `#8A8A8A`, warm-white `#FFFFFF`.
- Display/heading font = **Cormorant Garamond**; body/nav/label font = **Jost**. Remove reliance on Cinzel and DM Sans for new styling.
- All motion gated behind `prefers-reduced-motion: reduce`; heavy WebGL desktop-only; mobile uses video/image + light CSS.
- Preserve every existing route, `Link`, `AddToCartButton`, `CartContext`, form, and checkout flow. No behavioral regressions.
- Vercel: `next build` must pass; Spline/WebGL and `window` access client-only (`"use client"`); `NEXT_PUBLIC_SPLINE_SCENE_URL` optional with safe empty default; `ad-3.mp4` served from `public/`.
- Shopify: pass `shopify theme check` for touched files; assets via `asset_url`; preserve existing section schema/settings; vanilla scoped JS only.
- Commit after every task. Conventional commit messages. End each commit body with the Co-Authored-By trailer used in this repo.

---

# PHASE 0 — Safety net (backup before any change)

### Task 0: Create a rollback backup of the pre-redesign state

**Files:** none (git-only)

- [ ] **Step 1: Tag and branch the current state**

Run:
```bash
git tag pre-3d-redesign-2026-06-25
git branch backup/pre-3d-redesign
```
This snapshots the exact pre-redesign commit (spec + deployment constraints, no redesign code yet) under both a tag and a branch.

- [ ] **Step 2: Verify the backup exists**

Run:
```bash
git tag --list "pre-3d-redesign*"
git branch --list "backup/*"
git log -1 --oneline backup/pre-3d-redesign
```
Expected: the tag and `backup/pre-3d-redesign` both resolve to the current HEAD commit.

- [ ] **Step 3: (Optional) push the backup to the remote**

Only if a remote is configured and the user wants an off-machine copy:
```bash
git push origin pre-3d-redesign-2026-06-25
git push origin backup/pre-3d-redesign
```

**Rollback procedure (if the redesign needs to be reverted):**
- Inspect: `git checkout backup/pre-3d-redesign` (detached view) or `git diff backup/pre-3d-redesign`.
- Full hard rollback of `main`: `git reset --hard pre-3d-redesign-2026-06-25` (destructive — only on explicit user confirmation).
- Safer rollback keeping history: `git revert` the redesign commits, or branch off the tag and re-merge.

---

# PHASE 1 — Next.js app (canonical reference)

### Task 1: Type system & design tokens

**Files:**
- Modify: `src/app/layout.tsx` (font imports + html className)
- Modify: `src/app/globals.css` (font tokens, motion/utility classes)

**Interfaces:**
- Produces: CSS variables `--font-cormorant`, `--font-jost`; token aliases `--font-display`, `--font-heading`, `--font-body`; utility classes `.lc-reveal`, `.lc-tilt`, `.lc-glow-follow`, `.lc-footer-wordmark`.

- [ ] **Step 1: Add Jost font + repoint display token in `layout.tsx`**

Add `Jost` to the `next/font/google` import and create the loader; add its variable to the `<html>` className. Keep Cormorant (already present). Cinzel/Playfair may remain imported but are no longer referenced by new styles.

```tsx
import { Cormorant_Garamond, Jost, Playfair_Display, DM_Sans, Cinzel } from "next/font/google";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
```

Update the html element:

```tsx
<html
  lang="en"
  className={`${cormorant.variable} ${jost.variable} ${playfair.variable} ${dmSans.variable} ${cinzel.variable}`}
>
```

- [ ] **Step 2: Repoint font tokens + add motion utilities in `globals.css`**

In the `@theme` block, change the brand font tokens:

```css
  /* Brand Fonts */
  --font-display: var(--font-cormorant);
  --font-heading: var(--font-cormorant);
  --font-subheading: var(--font-cormorant);
  --font-body: var(--font-jost);
```

Replace the `.font-display` rule so it is the high-contrast serif (not engraved caps):

```css
/* Oversized editorial display serif — the Celestique signature */
.font-display {
  font-family: var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
  letter-spacing: 0.01em;
  font-weight: 500;
  line-height: 1.02;
}
```

Update `body` font-family to Jost:

```css
body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-jost), 'Jost', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Append motion/utility classes at the end of the file:

```css
/* ---- Celestique redesign utilities ---- */

/* Scroll reveal for editorial headers */
.lc-reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}
.lc-reveal.is-visible {
  opacity: 1;
  transform: none;
}

/* Cursor-driven 3D tilt surface (vars set by CursorTilt) */
.lc-tilt {
  --lc-rx: 0deg;
  --lc-ry: 0deg;
  --lc-tz: 0px;
  transform: perspective(1000px) rotateX(var(--lc-rx)) rotateY(var(--lc-ry)) translateZ(var(--lc-tz));
  transform-style: preserve-3d;
  transition: transform 180ms ease-out;
  will-change: transform;
}

/* Gold glow that follows the cursor */
.lc-glow-follow {
  position: relative;
  isolation: isolate;
}
.lc-glow-follow::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(
    220px circle at var(--lc-gx, 50%) var(--lc-gy, 50%),
    rgba(201, 168, 76, 0.18),
    transparent 70%
  );
  transition: opacity 220ms ease;
}
.lc-glow-follow:hover::after {
  opacity: 1;
}

/* Giant footer wordmark */
.lc-footer-wordmark {
  font-family: var(--font-cormorant), 'Cormorant Garamond', Georgia, serif;
  font-weight: 500;
  line-height: 0.9;
  letter-spacing: 0.02em;
  font-size: clamp(3.5rem, 16vw, 16rem);
  text-align: center;
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .lc-reveal { opacity: 1; transform: none; transition: none; }
  .lc-tilt { transform: none; transition: none; }
  .lc-glow-follow::after { display: none; }
}
```

- [ ] **Step 3: Run the test (lint + build)**

Run: `npm run lint && npm run build`
Expected: PASS — no type errors, no unused-var errors that fail the build, `/` compiles.

- [ ] **Step 4: Visual smoke check**

Run: `npm run dev`, open `http://localhost:3000`. Confirm headings now render in Cormorant Garamond and body text in Jost. No layout break.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat(type): Cormorant Garamond + Jost type system and motion utilities"
```

---

### Task 2: Cursor-depth components (CursorTilt + ScrollReveal)

**Files:**
- Create: `src/components/CursorTilt.tsx`
- Create: `src/components/ScrollReveal.tsx`

**Interfaces:**
- Produces:
  - `CursorTilt({ children, className?, max?, glow? }: { children: ReactNode; className?: string; max?: number; glow?: boolean })` — wraps content in a `.lc-tilt`(+`.lc-glow-follow` when `glow`) element that sets `--lc-rx/--lc-ry/--lc-tz` and `--lc-gx/--lc-gy` on pointer move; disabled under reduced-motion and below 768px.
  - `ScrollReveal({ children, className?, as? }: { children: ReactNode; className?: string; as?: keyof JSX.IntrinsicElements })` — adds `.lc-reveal` and toggles `.is-visible` via IntersectionObserver.

- [ ] **Step 1: Write `CursorTilt.tsx`**

```tsx
"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number; // max tilt in degrees
  glow?: boolean;
};

export default function CursorTilt({ children, className = "", max = 6, glow = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    el.style.setProperty("--lc-ry", `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
    el.style.setProperty("--lc-rx", `${(-(py - 0.5) * 2 * max).toFixed(2)}deg`);
    el.style.setProperty("--lc-tz", "16px");
    el.style.setProperty("--lc-gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--lc-gy", `${(py * 100).toFixed(1)}%`);
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--lc-rx", "0deg");
    el.style.setProperty("--lc-ry", "0deg");
    el.style.setProperty("--lc-tz", "0px");
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={`lc-tilt ${glow ? "lc-glow-follow" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Write `ScrollReveal.tsx`**

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function ScrollReveal({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`lc-reveal ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Run the test (lint + build)**

Run: `npm run lint && npm run build`
Expected: PASS — both components typecheck; no `window`-on-server errors (both are `"use client"` and access `window` only in handlers/effects).

- [ ] **Step 4: Commit**

```bash
git add src/components/CursorTilt.tsx src/components/ScrollReveal.tsx
git commit -m "feat(motion): add CursorTilt and ScrollReveal cursor-depth components"
```

---

### Task 3: Hybrid 3D hero (Spline + ad-3.mp4 fallback)

**Files:**
- Create: `src/components/LunaClaraHybridHero.tsx`
- Modify: `src/app/page.tsx:56` (replace `<LunaClaraMotionHero />` usage)

**Interfaces:**
- Consumes: `LunaClaraSplineHero` (existing) is NOT reused directly; this hero owns its own fallback logic.
- Produces: default-exported `LunaClaraHybridHero` React client component. Renders Spline `<spline-viewer>` when `NEXT_PUBLIC_SPLINE_SCENE_URL` is set AND desktop AND motion allowed; otherwise renders `ad-3.mp4` (looping, muted, playsInline) with the existing cream wash + cursor parallax on copy.

- [ ] **Step 1: Write `LunaClaraHybridHero.tsx`**

```tsx
"use client";

import Link from "next/link";
import Script from "next/script";
import { createElement, useEffect, useRef, useState } from "react";

const SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? "";
const VIDEO_URL = "/products/ad-3.mp4";
const SPLINE_VIEWER_SRC =
  "https://unpkg.com/@splinetool/viewer@1.10.57/build/spline-viewer.js";

export default function LunaClaraHybridHero() {
  const [use3d, setUse3d] = useState(false);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.innerWidth >= 1024;
    setUse3d(Boolean(SCENE_URL) && desktop && !reduce);
  }, []);

  function handleMove(e: React.PointerEvent<HTMLElement>) {
    const el = copyRef.current;
    if (!el || window.innerWidth < 1024) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    el.style.transform = `translate3d(${(-x).toFixed(1)}px, ${(-y).toFixed(1)}px, 0)`;
    el.style.setProperty("--lc-gx", `${(e.clientX / window.innerWidth) * 100}%`);
    el.style.setProperty("--lc-gy", `${(e.clientY / window.innerHeight) * 100}%`);
  }

  return (
    <section
      onPointerMove={handleMove}
      className="relative flex min-h-[78vh] flex-col overflow-hidden bg-cream lg:min-h-screen lg:block"
    >
      {/* Visual layer */}
      <div className="pointer-events-none relative order-last aspect-square w-full overflow-hidden bg-cream md:aspect-video lg:absolute lg:inset-0 lg:z-0 lg:order-none lg:h-full lg:aspect-auto">
        {use3d ? (
          <>
            <Script src={SPLINE_VIEWER_SRC} strategy="afterInteractive" type="module" />
            {createElement("spline-viewer", {
              url: SCENE_URL,
              "events-target": "global",
              loading: "lazy",
              style: { width: "100%", height: "100%", display: "block", background: "transparent" },
              "aria-label": "Interactive Luna Clara jewelry scene",
            })}
          </>
        ) : (
          <video
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            poster="/products/luna-clara-spline-fallback.png"
            className="h-full w-full object-cover object-center lg:object-right"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        )}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-cream via-cream/80 to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/80 to-transparent lg:hidden" />
      </div>

      {/* Copy layer */}
      <div className="relative z-10 order-first flex w-full flex-col bg-cream pb-10 lg:order-none lg:min-h-screen lg:bg-transparent lg:pb-0">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-12 lg:py-0">
          <div ref={copyRef} className="mx-auto max-w-2xl text-center transition-transform duration-300 lg:mx-0 lg:text-left">
            <p className="mb-6 font-body text-xs uppercase tracking-[0.28em] text-gold">
              Premium Gem · Designed in USA
            </p>
            <h1 className="mb-5 font-display text-6xl leading-[0.98] text-charcoal md:text-7xl lg:text-8xl">
              Made to Glow<br />With You
            </h1>
            <p className="mb-8 font-display text-3xl italic leading-tight text-gold sm:text-4xl">
              A celestial touch for timeless moments.
            </p>
            <p className="mx-auto mb-10 max-w-xl font-body text-lg leading-relaxed text-soft-gray lg:mx-0">
              Curated jewelry and gift boxes, designed to make every celebration feel personal.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/collections/individual"
                className="bg-gold px-9 py-4 text-center font-body text-sm uppercase tracking-widest text-warm-white transition-colors hover:bg-gold-light hover:text-charcoal"
              >
                Shop Jewelry
              </Link>
              <Link
                href="/collections/medium-box"
                className="border border-gold px-9 py-4 text-center font-body text-sm uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-warm-white"
              >
                Explore Gift Boxes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire it into `page.tsx`**

In `src/app/page.tsx`, replace the import on line 5 and the usage on line 56:

```tsx
import LunaClaraHybridHero from "@/components/LunaClaraHybridHero";
```
```tsx
<LunaClaraHybridHero />
```

(Leave `LunaClaraMotionHero.tsx` in the repo; it is no longer imported.)

- [ ] **Step 3: Run the test (lint + build)**

Run: `npm run lint && npm run build`
Expected: PASS. Build must not evaluate `window` at module scope (it does not — all access is in effects/handlers).

- [ ] **Step 4: Functional + visual check**

Run `npm run dev`. With no `NEXT_PUBLIC_SPLINE_SCENE_URL` set, hero shows `ad-3.mp4` looping. Copy parallaxes with cursor on desktop. Both buttons navigate to their collections. Mobile (narrow window) shows stacked video + copy, no parallax.

- [ ] **Step 5: Commit**

```bash
git add src/components/LunaClaraHybridHero.tsx src/app/page.tsx
git commit -m "feat(hero): hybrid Spline + ad-3.mp4 hero with cursor parallax"
```

---

### Task 4: Home page sections restyle (Celestique rhythm)

**Files:**
- Modify: `src/app/page.tsx` (sections below the hero)

**Interfaces:**
- Consumes: `CursorTilt`, `ScrollReveal` (Task 2). Existing `ProductImage`, `BannerImage`, `AddToCartButton`, `getFeaturedProducts`.

- [ ] **Step 1: Import the motion components**

Add to the top of `src/app/page.tsx`:

```tsx
import CursorTilt from "@/components/CursorTilt";
import ScrollReveal from "@/components/ScrollReveal";
```

- [ ] **Step 2: Convert the "Shop the mood" collections block into a 2×2-feel editorial grid**

Wrap each section heading in `<ScrollReveal>`, bump heading sizes to the display scale, and wrap each collection card in `<CursorTilt glow>`. Replace the collections grid `<Link>` body (lines ~88-106) so each card is:

```tsx
<CursorTilt glow key={col.href} className="h-full">
  <Link href={col.href} className="group block h-full">
    <div className="relative overflow-hidden border border-gold/10 bg-warm-white">
      <ProductImage src={col.image} alt={col.title} aspectRatio="4/5" sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/55 to-transparent p-6">
        <h3 className="font-display text-3xl text-warm-white">{col.title}</h3>
        <span className="mt-2 inline-block font-body text-xs uppercase tracking-widest text-warm-white/85">Shop now →</span>
      </div>
    </div>
  </Link>
</CursorTilt>
```

Update the section heading markup to use `font-display` at `text-5xl md:text-6xl` and wrap in `<ScrollReveal>`.

- [ ] **Step 3: Restyle "Glow Picks", banner, gift boxes, story, care to the new scale**

For each remaining `<section>` in `page.tsx`:
- Wrap each `<h2>`/eyebrow heading group in `<ScrollReveal>`.
- Change every `font-display`/`font-heading` heading to `font-display` at `text-5xl md:text-6xl` (section headers) — keep them oversized and serif.
- Wrap product cards (Glow Picks grid) and gift-box cards in `<CursorTilt glow>`; keep the inner `<Link>` and `<AddToCartButton>` exactly as-is (do not change cart wiring).
- Keep the banner CTA, story link, and care-guide link unchanged in behavior.

- [ ] **Step 4: Run the test (lint + build)**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 5: Functional check**

`npm run dev` → on `/`: every collection/product/gift card tilts on hover with a gold glow; section headers fade in on scroll; "Add to cart" on a Glow Pick opens the cart drawer with the item; all "Shop"/"Read Our Story"/"Jewelry Care Guide" links navigate.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(home): Celestique-grade section rhythm with cursor-depth cards"
```

---

### Task 5: Navbar restyle

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Apply the type system + refined spacing**

Change desktop nav link classes from `font-body tracking-wide` to `font-body text-xs uppercase tracking-[0.18em]`. Increase nav height container to `md:h-20`. Keep ALL dropdown logic, refs, state, `openCart`, and `Link` hrefs unchanged. Soften the header to `bg-cream/95 backdrop-blur border-b border-gold/15`.

- [ ] **Step 2: Run the test (lint + build)**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 3: Functional check**

`npm run dev`: Shop and Gift Boxes dropdowns still open/close on hover and click; Escape and outside-click still close them; cart button still opens the drawer; mobile hamburger menu still opens and all links navigate.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat(nav): refined uppercase Jost nav with Celestique spacing"
```

---

### Task 6: Footer restyle + giant wordmark

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Add the giant wordmark band**

Directly inside `<footer>` (before the contact strip), add a full-bleed wordmark band:

```tsx
<div className="overflow-hidden border-b border-white/10 px-2 pt-12 pb-4">
  <p className="lc-footer-wordmark text-gold/90">LUNA CLARA</p>
</div>
```

- [ ] **Step 2: Apply the type system to footer headings**

Change the contact heading to `font-display text-4xl md:text-5xl`. Keep all column links, hrefs, social links, `PaymentMethods`, and the `mailto:`/Instagram anchors exactly as-is.

- [ ] **Step 3: Run the test (lint + build)**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 4: Visual check**

`npm run dev`: footer shows the oversized "LUNA CLARA" serif wordmark spanning the width; all footer links and the email/Instagram links work.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat(footer): giant Cormorant wordmark + display headings"
```

---

### Task 7: Product page restyle

**Files:**
- Modify: `src/app/products/[slug]/page.tsx`
- (Reference only) `src/components/ProductImage.tsx`, `src/components/AddToCartButton.tsx`

- [ ] **Step 1: Read the current product page**

Run: open `src/app/products/[slug]/page.tsx` and identify the title, gallery, price, and Add-to-Cart regions.

- [ ] **Step 2: Apply the editorial treatment**

- Product title → `font-display text-5xl md:text-6xl text-charcoal`.
- Wrap the main product image in `<CursorTilt>` (import it) for subtle depth; keep `ProductImage` props unchanged.
- Eyebrow/category label → `font-body text-xs uppercase tracking-[0.22em] text-gold`.
- Keep price, variant logic, and `<AddToCartButton .../>` wiring untouched.
- Make the gallery column `lg:sticky lg:top-24` so the buy column scrolls beside it.

- [ ] **Step 3: Run the test (lint + build)**

Run: `npm run lint && npm run build`
Expected: PASS (all product slugs statically generate).

- [ ] **Step 4: Functional check**

`npm run dev` → open a product (e.g. `/products/<slug>`): title is large serif; image tilts; **Add to Cart adds the item and opens the drawer**; quantity/variant controls work.

- [ ] **Step 5: Commit**

```bash
git add src/app/products/[slug]/page.tsx
git commit -m "feat(product): editorial title, sticky gallery, cursor-depth image"
```

---

### Task 8: Collection pages restyle

**Files:**
- Modify: `src/app/collections/individual/page.tsx`
- Modify: `src/app/collections/medium-box/page.tsx`
- Modify: `src/app/collections/large-box/page.tsx`

- [ ] **Step 1: Apply a shared editorial header + tilt cards to each**

For each of the three pages:
- Collection header → eyebrow (`font-body text-xs uppercase tracking-[0.22em] text-gold`) + `font-display text-5xl md:text-6xl` title, wrapped in `<ScrollReveal>`.
- Wrap each product card in `<CursorTilt glow>`; keep each card's `<Link href>` and `<AddToCartButton>` wiring exactly as-is.

- [ ] **Step 2: Run the test (lint + build)**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 3: Functional check**

`npm run dev` → visit all three collection routes: headers reveal on scroll; cards tilt+glow; product links navigate; Add-to-Cart works from the grid.

- [ ] **Step 4: Commit**

```bash
git add src/app/collections
git commit -m "feat(collections): editorial headers + cursor-depth product grids"
```

---

### Task 9: Cart page + Cart drawer restyle

**Files:**
- Modify: `src/app/cart/page.tsx`
- Modify: `src/components/CartDrawer.tsx`

- [ ] **Step 1: Read both files** to locate headings, line-item rows, totals, and the checkout button.

- [ ] **Step 2: Apply the type system without touching logic**

- Cart/drawer headings → `font-display`.
- Quantity steppers, remove buttons, subtotal, and the **checkout button** (`/api/checkout` flow) keep their handlers and hrefs unchanged — only class names/typography change.
- Buttons adopt the gold system (`bg-gold ... hover:bg-gold-light` / outlined variant).

- [ ] **Step 3: Run the test (lint + build)**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 4: Functional check**

`npm run dev`: add 2 items → open drawer → adjust quantity → remove one → totals update → click checkout (reaches the Stripe/`/api/checkout` flow). Visit `/cart` page directly and confirm the same.

- [ ] **Step 5: Commit**

```bash
git add src/app/cart/page.tsx src/components/CartDrawer.tsx
git commit -m "feat(cart): restyle cart page + drawer to Celestique system"
```

---

### Task 10: Content pages restyle (About, Contact, Jewelry Care, Shipping & Returns)

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/jewelry-care/page.tsx`
- Modify: `src/app/shipping-returns/page.tsx`

- [ ] **Step 1: Apply editorial type to each page**

For each: page title → `font-display text-5xl md:text-6xl`; section subheads → `font-display text-3xl`; body → `font-body`. Wrap hero headings in `<ScrollReveal>`. On `contact`, keep the form fields, `action`/`onSubmit`, and any `mailto:`/links exactly as-is.

- [ ] **Step 2: Run the test (lint + build)**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 3: Functional check**

`npm run dev`: visit `/about`, `/contact`, `/jewelry-care`, `/shipping-returns`. Headings are large serif; the contact form still submits / mailto still opens; all internal links navigate.

- [ ] **Step 4: Commit**

```bash
git add src/app/about/page.tsx src/app/contact/page.tsx src/app/jewelry-care/page.tsx src/app/shipping-returns/page.tsx
git commit -m "feat(content): editorial type on about/contact/care/shipping pages"
```

---

### Task 11: Vercel build verification (Phase 1 gate)

**Files:** none (verification task)

- [ ] **Step 1: Clean production build**

Run: `npm run lint && npm run build`
Expected: PASS with zero errors. Note any warnings.

- [ ] **Step 2: Production-mode smoke test**

Run: `npm run start` (after build), open `http://localhost:3000`. Click through home → collection → product → add to cart → drawer → checkout button; visit footer links and content pages. Confirm no console errors and the hero video plays.

- [ ] **Step 3: Confirm deploy-safety invariants**

Verify: no module-scope `window`/`document` access in new client components; `NEXT_PUBLIC_SPLINE_SCENE_URL` unset still builds and runs; `public/products/ad-3.mp4` exists and is referenced with a leading slash.

- [ ] **Step 4: Commit (if any fixes were needed)**

```bash
git add -A
git commit -m "fix(build): Vercel production build verification for redesign"
```

---

# PHASE 2 — Shopify theme (port the reference)

### Task 12: Shopify design tokens + fonts

**Files:**
- Modify: `shopify-theme/assets/base.css`
- Modify: `shopify-theme/config/settings_data.json`
- Create: `shopify-theme/assets/ad-3.mp4` (copy from `public/products/ad-3.mp4`)

- [ ] **Step 1: Copy the hero video into theme assets**

Run:
```bash
cp "public/products/ad-3.mp4" "shopify-theme/assets/ad-3.mp4"
```

- [ ] **Step 2: Load Cormorant Garamond + Jost and set CSS variables in `base.css`**

At the top of `shopify-theme/assets/base.css` add the Google Fonts import and brand variables (mirroring the Next.js tokens):

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

:root {
  --lc-font-display: 'Cormorant Garamond', Georgia, serif;
  --lc-font-body: 'Jost', system-ui, sans-serif;
  --lc-gold: #C9A84C;
  --lc-gold-light: #E8C97A;
  --lc-cream: #FDF8F2;
  --lc-champagne: #F7E7CE;
  --lc-blush: #F2B5C0;
  --lc-charcoal: #2C2C2C;
  --lc-gray: #8A8A8A;
}

body { font-family: var(--lc-font-body); }
h1, h2, h3, .lc-display { font-family: var(--lc-font-display); }
```

- [ ] **Step 3: Point theme font settings at the new families in `settings_data.json`**

Update the typography settings that previously referenced Playfair Display / DM Sans so headings map to Cormorant Garamond and body to Jost (match the keys already present in the file; do not add unknown keys).

- [ ] **Step 4: Run the test (theme check)**

Run: `shopify theme check shopify-theme/assets/base.css shopify-theme/config/settings_data.json` (or `shopify theme check` from the theme dir)
Expected: PASS (no new offenses on touched files).

- [ ] **Step 5: Commit**

```bash
git add shopify-theme/assets/base.css shopify-theme/config/settings_data.json shopify-theme/assets/ad-3.mp4
git commit -m "feat(shopify): Cormorant + Jost tokens and ad-3.mp4 hero asset"
```

---

### Task 13: Shopify home section port

**Files:**
- Modify: `shopify-theme/sections/luna-clara-home.liquid`

**Interfaces:**
- Consumes: theme assets `ad-3.mp4`, `luna-clara-spline-fallback.png`; CSS vars from Task 12.

- [ ] **Step 1: Swap the hero to Spline-with-video-fallback**

In the `lc-hero__visual` block, replace the current `<video>` with a Spline-or-video pattern. Add an optional `spline_url` setting to `{% schema %}` (type `url`, default blank). When `section.settings.spline_url` is blank, render the `ad-3.mp4` video; otherwise render `<spline-viewer>` plus the CDN script:

```liquid
{% if section.settings.spline_url != blank %}
  <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.57/build/spline-viewer.js"></script>
  <spline-viewer url="{{ section.settings.spline_url }}" events-target="global" loading="lazy" aria-label="Luna Clara 3D scene"></spline-viewer>
{% else %}
  <video class="lc-hero__video" muted playsinline autoplay loop preload="auto"
    poster="{{ 'luna-clara-spline-fallback.png' | asset_url }}">
    <source src="{{ 'ad-3.mp4' | asset_url }}" type="video/mp4">
  </video>
{% endif %}
```

Add the `spline_url` setting to the existing `settings` array in `{% schema %}`:

```json
{ "type": "url", "id": "spline_url", "label": "Spline 3D scene URL (optional)" }
```

- [ ] **Step 2: Apply the Celestique type scale + footer wordmark in the section CSS**

In the `{% stylesheet %}` block: change `.lc-hero h1, .lc-section h2, .lc-story h2` `font-family` from `"Cinzel"` to `var(--lc-font-display)`; bump section header sizes to match Next.js (`clamp(2.6rem, 5vw, 4.2rem)`); overlay collection card labels on the imagery with a gradient (mirror Task 4). Add a `prefers-reduced-motion` guard around the orbit/marquee animations.

- [ ] **Step 3: Add cursor-depth to collection/product/gift cards**

In the existing inline `<script>` IIFE, add a pointermove handler that sets `--lc-rx/--lc-ry` custom properties on `.lc-collection-card`, `.lc-product-card`, `.lc-gift-card` (desktop + motion-allowed only), and add matching `.lc-tilt`-style transform CSS in the stylesheet. Keep the existing hero-video scrub and story-focus logic intact.

- [ ] **Step 4: Run the test (theme check)**

Run: `shopify theme check shopify-theme/sections/luna-clara-home.liquid`
Expected: PASS (no Liquid syntax/schema offenses).

- [ ] **Step 5: Editor render check**

Run: `shopify theme dev -s luna-clara-designs.myshopify.com --path shopify-theme`, open the preview home page. Hero shows `ad-3.mp4` (no spline_url set); section headers are large Cormorant; cards tilt on hover; all links/buttons work.

- [ ] **Step 6: Commit**

```bash
git add shopify-theme/sections/luna-clara-home.liquid
git commit -m "feat(shopify): port hybrid hero + Celestique home rhythm + cursor-depth"
```

---

### Task 14: Shopify templates + chrome (product, collection, cart, header, footer)

**Files:**
- Modify: `shopify-theme/sections/header.liquid` and/or header group
- Modify relevant product/collection/cart templates + sections under `shopify-theme/sections/` and `shopify-theme/templates/`
- Modify: the footer section (giant wordmark)

- [ ] **Step 1: Identify the active templates**

Run: open `shopify-theme/templates/product.*.json`, `collection.*.json`, `cart.*.json`, and `index.json` to see which sections each uses; open the footer section referenced by `footer-group.json` (or equivalent).

- [ ] **Step 2: Apply the type system to product/collection/cart**

Add/extend section CSS so titles use `var(--lc-font-display)` at the Celestique scale and product/cart cards adopt the gold border + hover system. Do NOT alter Liquid product loops, variant pickers, `cart` form actions, or checkout buttons — typography/spacing only.

- [ ] **Step 3: Add the giant footer wordmark**

In the footer section, add a full-width band rendering `LUNA CLARA` in `var(--lc-font-display)` at `clamp(3rem, 14vw, 13rem)` (mirror `.lc-footer-wordmark`). Keep all footer menus/links from settings intact.

- [ ] **Step 4: Run the test (theme check)**

Run: `shopify theme check` (theme dir)
Expected: PASS for touched files.

- [ ] **Step 5: Editor render check**

Via `shopify theme dev` preview: product page title is large serif and Add-to-Cart works; collection grid styled and links work; cart quantity/remove/checkout work; footer shows the wordmark.

- [ ] **Step 6: Commit**

```bash
git add shopify-theme
git commit -m "feat(shopify): editorial templates + giant footer wordmark"
```

---

### Task 15: Shopify deploy verification (Phase 2 gate)

**Files:** none (verification task)

- [ ] **Step 1: Full theme check**

Run: `shopify theme check` from `shopify-theme/`
Expected: PASS (no new errors introduced by the redesign).

- [ ] **Step 2: Preview click-through**

Run: `shopify theme dev -s luna-clara-designs.myshopify.com --path shopify-theme`. Walk home → collection → product → add to cart → cart → checkout button; check header nav, dropdowns, and footer links; confirm fonts load and hero video plays. No Liquid/JS console errors.

- [ ] **Step 3: (Optional, on user approval) push to the live theme**

Per `SHOPIFY.md`, pushing targets the LIVE theme #160914505956. Do NOT push without explicit user confirmation. When approved:
```bash
shopify theme push -s luna-clara-designs.myshopify.com --theme 160914505956 --path shopify-theme
```

- [ ] **Step 4: Commit (if fixes were needed)**

```bash
git add shopify-theme
git commit -m "fix(shopify): theme-check + preview verification for redesign"
```

---

## Self-Review

**Spec coverage:**
- Type system (Cormorant + Jost) → Tasks 1, 12. ✓
- Palette unchanged → Global Constraints; tokens preserved in Tasks 1, 12. ✓
- Layout DNA (oversized serif, 2×2 grid, footer wordmark) → Tasks 4, 6, 13, 14. ✓
- Hybrid 3D: Spline hero + ad-3.mp4 fallback → Tasks 3, 13. ✓
- Cursor-depth everywhere → Tasks 2, 4, 7, 8, 13, 14. ✓
- Scroll reveals → Tasks 2, 4, 8, 10. ✓
- Accessibility (reduced-motion, mobile-light) → Task 1 CSS, Tasks 2/3 guards, Tasks 13 guards. ✓
- Full-site coverage (home/product/collection/cart/about/contact/care/shipping + chrome) → Tasks 4–10 (Next), 13–14 (Shopify). ✓
- Functionality preserved → explicit "keep wiring" steps in Tasks 4,5,7,8,9,10,13,14. ✓
- Vercel deploy-safe → Tasks 3,11 + Global Constraints. ✓
- Shopify deploy-safe → Tasks 12–15 + Global Constraints. ✓
- Spline scene optional/non-blocking → Task 3 (env default), Task 13 (blank setting → video). ✓

**Placeholder scan:** No "TBD"/"implement later". Page-restyle tasks (4,7,8,9,10,14) describe exact class tokens and the explicit "do not touch wiring" rule rather than reproducing hundreds of lines; net-new units (Tasks 1–3, 6, 13 hero) include complete code.

**Type consistency:** `CursorTilt` props `{ children, className, max, glow }` and `ScrollReveal` props `{ children, className }` are used consistently in Tasks 4, 7, 8, 10. CSS classes `.lc-tilt`, `.lc-reveal`, `.lc-glow-follow`, `.lc-footer-wordmark` defined in Task 1 and consumed thereafter. Env var `NEXT_PUBLIC_SPLINE_SCENE_URL` and asset `ad-3.mp4` named consistently across Tasks 3, 12, 13.
