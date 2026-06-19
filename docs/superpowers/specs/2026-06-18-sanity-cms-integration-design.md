# Sanity CMS Integration — Design Spec
**Date:** 2026-06-18
**Project:** Luna Clara Designs (Next.js 16, Tailwind v4, TypeScript)
**Approach:** Option A — Sanity as data store, server components, no ISR

---

## Context

`next-sanity` and `@sanity/image-url` are already installed. No Sanity project exists yet — all products and gift boxes are currently hardcoded arrays with placeholder images. This integration replaces those arrays with live Sanity data while keeping the existing UI, cart, and Stripe checkout unchanged.

A real Sanity project ID will be created separately. All environment variables use placeholders until then.

---

## Scope

Sanity manages **products** (individual jewelry items) and **gift boxes** only. Site copy (hero, announcement bar, about page, etc.) stays hardcoded.

---

## Files Created / Modified

```
sanity.config.ts                          NEW — root Studio config
.env.local                                NEW — placeholder env vars
next.config.ts                            UPDATE — add cdn.sanity.io image domain

src/sanity/
  client.ts                               NEW — Sanity client
  schemas/
    product.ts                            NEW — product document schema
    giftBox.ts                            NEW — gift box document schema
    index.ts                              NEW — exports both schemas
  lib/
    queries.ts                            NEW — all GROQ queries
    image.ts                              NEW — urlFor() image builder

src/app/
  studio/[[...tool]]/page.tsx             NEW — embedded Sanity Studio
  page.tsx                                UPDATE — Glow Picks fetches from Sanity
  collections/individual/page.tsx         UPDATE — fetches from Sanity
  collections/medium-box/page.tsx         UPDATE — fetches from Sanity
  collections/large-box/page.tsx          UPDATE — fetches from Sanity
  products/[slug]/page.tsx               UPDATE — fetches from Sanity
```

---

## Schemas

### `product`

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `slug` | slug | yes | generated from title |
| `price` | number | yes | USD |
| `category` | string (list) | no | `earrings` · `necklace` · `bracelet` · `ring` |
| `description` | text | no | shown on product detail page |
| `images` | array of image | no | first image used in collection grid |
| `materials` | string | no | e.g. "Gold-tone alloy, hypoallergenic" |
| `inStock` | boolean | no | default `true` |
| `featured` | boolean | no | `true` = appears in homepage Glow Picks (max 4) |

### `giftBox`

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `slug` | slug | yes | generated from title |
| `price` | number | yes | USD |
| `boxSize` | string (list) | yes | `medium` · `large` |
| `shortDesc` | string | no | one-liner shown in collection grid |
| `description` | text | no | full description on product detail page |
| `images` | array of image | no | first image used in collection grid |
| `inStock` | boolean | no | default `true` |

---

## GROQ Queries

| Query | Page | Filter |
|---|---|---|
| `getAllProducts` | `/collections/individual` | all products, sorted `_createdAt desc` |
| `getMediumBoxes` | `/collections/medium-box` | `boxSize == "medium"` |
| `getLargeBoxes` | `/collections/large-box` | `boxSize == "large"` |
| `getFeaturedProducts` | `/` (Glow Picks) | `featured == true`, limit 4 |
| `getProductBySlug(slug)` | `/products/[slug]` | single product |
| `getGiftBoxBySlug(slug)` | `/products/[slug]` | single gift box |

---

## Data Flow

### Collection pages
- Convert to `async` server components
- Fetch from Sanity client at request time
- If `images` array has entries → render `<Image src={urlFor(img).url()} />`
- If no images → fall back to existing `<PlaceholderImage />` component
- Pass product/box object to existing `<AddToCartButton>` unchanged

### Product detail page (`/products/[slug]`)
1. `getProductBySlug(slug)` — if result → render as product
2. Else `getGiftBoxBySlug(slug)` — if result → render as gift box
3. Both null → `notFound()`
- Render real image gallery when images exist, placeholder grid otherwise

### Homepage Glow Picks
- `getFeaturedProducts()` replaces the hardcoded `SAMPLE_PRODUCTS` array
- Same card layout and `<AddToCartButton>` — no visual change

---

## Image Handling

- `src/sanity/lib/image.ts` exports `urlFor(source)` via `@sanity/image-url`
- `next.config.ts` adds `cdn.sanity.io` to `images.remotePatterns`
- All image renders: `<Image>` when URL available, `<PlaceholderImage>` fallback

---

## Environment Variables (`.env.local`)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
STRIPE_SECRET_KEY=sk_test_xxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Sanity Studio

- Embedded at `/studio/[[...tool]]` using `next-sanity`'s `NextStudio` component
- `sanity.config.ts` at project root configures project ID, dataset, and schemas
- Studio is accessible at `http://localhost:3000/studio` during development

---

## Bugs Fixed Alongside This Work

1. **Navbar `Shop` dropdown** — "View All" link corrected (was duplicating `/collections/individual`)
2. **Footer copyright** — updated to dynamic year
3. **Contact form** — Formspree placeholder flagged (not changed — needs real endpoint from user)

---

## Out of Scope

- ISR / revalidation (can add `revalidate` later in one line per page)
- Sanity live preview / Visual Editing
- CMS management of site copy (hero, announcement bar, about text)
- Formspree integration (needs user's real endpoint)
- Stripe Price IDs in Sanity (future phase)
