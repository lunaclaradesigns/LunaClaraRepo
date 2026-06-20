# Plan: Shopify Storefront Parity with localhost (Next.js)

Date: 2026-06-20
Branch: main
Goal: Make `luna-clara-designs.myshopify.com` (Tinker theme) visually and
experientially as close as possible to `http://localhost:3000/` (the Next.js
site), migrating images and the hero video.

---

## Guiding constraints (read first)

1. **Different stacks.** localhost is React/Next.js; Shopify is Liquid. We can
   replicate *layout, copy, imagery, video, and basic interactions* — not the
   exact React runtime. Parity = "looks and feels the same," not "same code."
2. **Some things only the store owner can do in Admin** (not theme push):
   - Import products (`shopify-products-import.csv`)
   - Create collections (Individual / Medium Box / Large Box)
   - Create Pages (About, Jewelry Care, Shipping & Returns, Contact)
   - Build nav menus
   These are listed as "Owner tasks" below and block full parity.
3. **Asset limits.** Theme assets are copied from `public/`. Keep videos small
   (we use the 0.87 MB optimized encode, not the 8.6 MB original).
4. **Push target = LIVE Tinker theme** (#160914505956), per owner's earlier
   choice. Each task: validate with `shopify theme check`, push, then commit.

---

## Current state (already done this session)

- ✅ Cinzel display font loaded + applied to headings (theme.liquid, home)
- ✅ Footer payment badges (Visa…PayPal…GPay)
- ✅ Header logo fallback → gold wordmark SVG
- 🟡 **Homepage section rewritten (DRAFT, uncommitted)** — `sections/luna-clara-home.liquid`
  now mirrors localhost: video hero w/ cursor-scrub, marquee, collection cards,
  Glow Picks, "Curated to Gift" banner, gift boxes, occasion pills, story, care strip.
- 🟡 **Assets copied to `shopify-theme/assets/` (uncommitted)**: hero video
  (optimized + lite), hero-feature.jpg, hero-banner.jpg, necklace-shell-pearl.jpg,
  + 3 product jpgs.
- ⏳ About story text prepared for manual paste (`docs/shopify-about-page.html`)

This plan formalizes the DRAFT as Task 1 and adds the remaining parity work.

---

## Tasks

### Task 1 — Homepage parity (verify the draft) ✅ drafted, needs verification
**Files:** `sections/luna-clara-home.liquid`, new assets in `assets/`
**Steps:**
1. `shopify theme check` → 0 Liquid syntax errors (ImgWidthAndHeight on the
   dynamic product image is acceptable/non-fatal).
2. Push to live; load homepage; confirm: video plays/scrubs, all images render,
   8 sections present, mobile layout stacks.
3. Commit.
**Risk:** mp4 in theme assets must serve over CDN — verify the `<video>` loads.

### Task 2 — Product page parity
**Files:** `sections/product-information.liquid` / related blocks, or theme settings.
**Goal:** match localhost product page (gallery left, title/price/qty/add-to-cart
right, gold buttons, description). Mostly theme-setting + color/button CSS.
**Owner task:** products must be imported first (see Owner tasks).

### Task 3 — Collection page parity
**Files:** `sections/main-collection.liquid`, `snippets/product-card.liquid`.
**Goal:** match localhost grid (4-col, gold hover border, price in gold).
**Owner task:** collections must exist.

### Task 4 — Content pages (About / Care / Shipping / Contact)
**Files:** none pushable — these are Admin Page content.
**Deliverable:** ready-to-paste HTML for each (like `docs/shopify-about-page.html`).
**Owner task:** create the Pages and paste.

### Task 5 — Navigation + announcement parity
**Files:** `sections/header-group.json`, menus.
**Goal:** nav items (Shop / Gift Boxes / About / Contact) + announcement copy
match localhost. Menus are partly Admin (link targets).

### Task 6 — Final QA pass
Side-by-side localhost vs Shopify on desktop + mobile; punch-list residual diffs.

---

## Owner tasks (Admin — block full parity, cannot be pushed)

- [ ] Import `shopify-products-import.csv` (Products)
- [ ] Create collections: Individual, Medium Box, Large Box
- [ ] Create Pages: About, Jewelry Care, Shipping & Returns, Contact (paste provided HTML)
- [ ] Build menus: main nav + footer
- [ ] (Optional) Enable PayPal / Shop Pay etc. in Settings → Payments

---

## Verification standard (every task)
1. `shopify theme check` — no new Liquid errors
2. Push to live theme #160914505956
3. Visual confirm on the live URL (desktop + mobile width)
4. `git add` + commit with descriptive message; push to main

---

## Out of scope
- Replicating the exact React video-scrub physics 1:1 (we port a close vanilla version)
- Stripe checkout (Shopify uses its own checkout)
- Sanity-driven content (Shopify uses its own product/page data)
