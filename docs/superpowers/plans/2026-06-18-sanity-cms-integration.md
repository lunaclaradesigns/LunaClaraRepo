# Sanity CMS Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Sanity CMS as the product/gift box data store, replacing all hardcoded arrays with live Sanity data across all collection and product pages.

**Architecture:** Sanity client fetches data at request time inside async server components. No ISR. GROQ queries live in `src/sanity/lib/queries.ts`. All pages fall back gracefully to `<PlaceholderImage />` when Sanity images are absent. App must not crash with a placeholder project ID.

**Tech Stack:** Next.js 16.2.9 (App Router), sanity v3, next-sanity v13, @sanity/image-url, TypeScript, Tailwind v4

## Global Constraints

- Next.js 16.2.9, React 19, TypeScript — no `any` types
- Tailwind v4 — use existing design tokens only (`gold`, `charcoal`, `cream`, `champagne`, `blush`, `warm-white`, `soft-gray`, `gold-light`)
- All existing Cart and Stripe checkout logic must remain completely unchanged
- Collection and product pages MUST remain server components — no `"use client"` directive
- App must render without errors when `NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id` (placeholder)
- All queries must wrap Sanity fetches in try/catch and return empty arrays / null on error
- `slug` projected as a flat string in all GROQ queries (not `{ current: string }`)

---

### Task 1: Install sanity, create .env.local, update next.config.ts, create sanity.config.ts

**Files:**
- Create: `.env.local`
- Modify: `next.config.ts`
- Create: `sanity.config.ts`

**Interfaces:**
- Produces: `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID` and `process.env.NEXT_PUBLIC_SANITY_DATASET` (consumed by Tasks 2, 4); `sanity.config.ts` default export (consumed by Task 4)

- [ ] **Step 1: Install the sanity package**

```bash
npm install sanity
```

Expected output: `added N packages` with `sanity` listed.

- [ ] **Step 2: Create `.env.local`**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
STRIPE_SECRET_KEY=sk_test_xxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Note: `.env.local.example` already exists — `.env.local` is the working copy the app reads at runtime.

- [ ] **Step 3: Update `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Create `sanity.config.ts` at project root**

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/plugins/structure";
import { schemas } from "./src/sanity/schemas";

export default defineConfig({
  name: "luna-clara",
  title: "Luna Clara Designs",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: { types: schemas },
});
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on port 3000 with no terminal errors. Navigate to `http://localhost:3000` — homepage loads normally.

- [ ] **Step 6: Commit**

```bash
git add .env.local next.config.ts sanity.config.ts package.json package-lock.json
git commit -m "feat: install sanity, add config, env placeholder, image domain"
```

---

### Task 2: Sanity client, schemas, and image builder

**Files:**
- Create: `src/sanity/client.ts`
- Create: `src/sanity/schemas/product.ts`
- Create: `src/sanity/schemas/giftBox.ts`
- Create: `src/sanity/schemas/index.ts`
- Create: `src/sanity/lib/image.ts`

**Interfaces:**
- Produces: `client` (named export from `src/sanity/client.ts`); `urlFor(source)` (named export from `src/sanity/lib/image.ts`); `schemas` array (named export from `src/sanity/schemas/index.ts`)
- Consumed by: Tasks 3, 4, 5, 6, 7, 8, 9

- [ ] **Step 1: Create `src/sanity/client.ts`**

```ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
```

- [ ] **Step 2: Create `src/sanity/schemas/product.ts`**

```ts
import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Earrings", value: "earrings" },
          { title: "Necklace", value: "necklace" },
          { title: "Bracelet", value: "bracelet" },
          { title: "Ring", value: "ring" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "materials",
      title: "Materials",
      type: "string",
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Featured (Glow Picks)",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
```

- [ ] **Step 3: Create `src/sanity/schemas/giftBox.ts`**

```ts
import { defineField, defineType } from "sanity";

export const giftBox = defineType({
  name: "giftBox",
  title: "Gift Box",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "boxSize",
      title: "Box Size",
      type: "string",
      options: {
        list: [
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDesc",
      title: "Short Description",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
```

- [ ] **Step 4: Create `src/sanity/schemas/index.ts`**

```ts
import { product } from "./product";
import { giftBox } from "./giftBox";

export const schemas = [product, giftBox];
```

- [ ] **Step 5: Create `src/sanity/lib/image.ts`**

```ts
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../client";

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

- [ ] **Step 6: Verify TypeScript — check IDE for errors in all new files**

Open each new file in the IDE. Confirm zero TypeScript errors (red underlines) in:
- `src/sanity/client.ts`
- `src/sanity/schemas/product.ts`
- `src/sanity/schemas/giftBox.ts`
- `src/sanity/schemas/index.ts`
- `src/sanity/lib/image.ts`

- [ ] **Step 7: Commit**

```bash
git add src/sanity/
git commit -m "feat: add sanity client, product and giftBox schemas, image builder"
```

---

### Task 3: GROQ queries

**Files:**
- Create: `src/sanity/lib/queries.ts`

**Interfaces:**
- Consumes: `client` from `../client`
- Produces: `SanityProduct` type, `SanityGiftBox` type, and functions `getAllProducts()`, `getMediumBoxes()`, `getLargeBoxes()`, `getFeaturedProducts()`, `getProductBySlug(slug: string)`, `getGiftBoxBySlug(slug: string)` — all named exports, all consumed by Tasks 5–9

- [ ] **Step 1: Create `src/sanity/lib/queries.ts`**

```ts
import { client } from "../client";

type SanityImage = {
  _key?: string;
  asset: { _ref: string; _type: "reference" };
};

export type SanityProduct = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  category?: string;
  description?: string;
  images?: SanityImage[];
  materials?: string;
  inStock: boolean;
  featured?: boolean;
};

export type SanityGiftBox = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  boxSize: "medium" | "large";
  shortDesc?: string;
  description?: string;
  images?: SanityImage[];
  inStock: boolean;
};

const PRODUCT_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  price,
  category,
  description,
  images,
  materials,
  inStock,
  featured
`;

const GIFT_BOX_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  price,
  boxSize,
  shortDesc,
  description,
  images,
  inStock
`;

export async function getAllProducts(): Promise<SanityProduct[]> {
  try {
    return await client.fetch(
      `*[_type == "product"] | order(_createdAt desc) { ${PRODUCT_FIELDS} }`
    );
  } catch {
    return [];
  }
}

export async function getMediumBoxes(): Promise<SanityGiftBox[]> {
  try {
    return await client.fetch(
      `*[_type == "giftBox" && boxSize == "medium"] | order(_createdAt desc) { ${GIFT_BOX_FIELDS} }`
    );
  } catch {
    return [];
  }
}

export async function getLargeBoxes(): Promise<SanityGiftBox[]> {
  try {
    return await client.fetch(
      `*[_type == "giftBox" && boxSize == "large"] | order(_createdAt desc) { ${GIFT_BOX_FIELDS} }`
    );
  } catch {
    return [];
  }
}

export async function getFeaturedProducts(): Promise<SanityProduct[]> {
  try {
    return await client.fetch(
      `*[_type == "product" && featured == true] | order(_createdAt desc) [0...4] { ${PRODUCT_FIELDS} }`
    );
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  try {
    return await client.fetch(
      `*[_type == "product" && slug.current == $slug][0] { ${PRODUCT_FIELDS} }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function getGiftBoxBySlug(slug: string): Promise<SanityGiftBox | null> {
  try {
    return await client.fetch(
      `*[_type == "giftBox" && slug.current == $slug][0] { ${GIFT_BOX_FIELDS} }`,
      { slug }
    );
  } catch {
    return null;
  }
}
```

- [ ] **Step 2: Check IDE — zero TypeScript errors in `src/sanity/lib/queries.ts`**

- [ ] **Step 3: Commit**

```bash
git add src/sanity/lib/queries.ts
git commit -m "feat: add GROQ queries for products and gift boxes"
```

---

### Task 4: Embedded Sanity Studio

**Files:**
- Create: `src/app/studio/[[...tool]]/page.tsx`

**Interfaces:**
- Consumes: `sanity.config.ts` default export from Task 1; `schemas` from Task 2 (via sanity.config.ts)

- [ ] **Step 1: Create `src/app/studio/[[...tool]]/page.tsx`**

```tsx
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 2: Verify Studio loads in browser**

```bash
npm run dev
```

Navigate to `http://localhost:3000/studio`.

Expected: Sanity Studio UI loads (it will show a login prompt or "invalid project" message since the project ID is a placeholder — that is expected). The page must NOT show a Next.js 500 error or blank white screen.

- [ ] **Step 3: Commit**

```bash
git add src/app/studio/
git commit -m "feat: embed sanity studio at /studio"
```

---

### Task 5: Update Individual Items collection page

**Files:**
- Modify: `src/app/collections/individual/page.tsx`

**Interfaces:**
- Consumes: `getAllProducts()`, `SanityProduct` from `@/sanity/lib/queries`; `urlFor()` from `@/sanity/lib/image`

- [ ] **Step 1: Replace `src/app/collections/individual/page.tsx` entirely**

```tsx
import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import AddToCartButton from "@/components/AddToCartButton";
import { getAllProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata = {
  title: "Individual Items — Luna Clara Designs",
  description: "Delicate earrings, necklaces, bracelets, and rings — each piece chosen for everyday elegance.",
};

export default async function IndividualPage() {
  const products = await getAllProducts();

  return (
    <>
      <div className="bg-champagne py-16 px-4 text-center border-b border-gold/10">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-gold mb-3">Shop</p>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">Individual Items</h1>
        <p className="font-body text-soft-gray max-w-md mx-auto leading-relaxed">
          Delicate earrings, necklaces, bracelets, and rings — each piece chosen for everyday elegance
          and effortless gifting.
        </p>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <p className="text-center font-body text-soft-gray py-20">
              Products coming soon — check back shortly.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <div key={product._id} className="group card-hover">
                  <Link href={`/products/${product.slug}`}>
                    <div className="overflow-hidden border border-gold/10 group-hover:border-gold/30 transition-colors">
                      {product.images?.[0] ? (
                        <div className="relative w-full" style={{ paddingBottom: "125%" }}>
                          <Image
                            src={urlFor(product.images[0]).width(400).url()}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      ) : (
                        <PlaceholderImage aspectRatio="4/5" />
                      )}
                    </div>
                  </Link>
                  <div className="pt-3 pb-4">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-body text-sm md:text-base text-charcoal mb-1 hover:text-gold transition-colors leading-snug">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="font-body text-gold text-sm mb-3">${product.price.toFixed(2)}</p>
                    <AddToCartButton
                      product={{
                        id: product._id,
                        title: product.title,
                        price: product.price,
                        category: product.category,
                        imageUrl: product.images?.[0]
                          ? urlFor(product.images[0]).width(400).url()
                          : undefined,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000/collections/individual`.

Expected: Page renders with header intact. Grid area shows "Products coming soon — check back shortly." No console errors, no 500.

- [ ] **Step 3: Commit**

```bash
git add src/app/collections/individual/page.tsx
git commit -m "feat: connect individual collection page to sanity"
```

---

### Task 6: Update Medium Gift Box collection page

**Files:**
- Modify: `src/app/collections/medium-box/page.tsx`

**Interfaces:**
- Consumes: `getMediumBoxes()`, `SanityGiftBox` from `@/sanity/lib/queries`; `urlFor()` from `@/sanity/lib/image`

- [ ] **Step 1: Replace `src/app/collections/medium-box/page.tsx` entirely**

```tsx
import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import AddToCartButton from "@/components/AddToCartButton";
import { getMediumBoxes } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata = {
  title: "Medium Gift Box — Luna Clara Designs",
  description: "Beautifully curated gift boxes with 2–3 jewelry pieces, elegantly presented and ready to give.",
};

export default async function MediumBoxPage() {
  const boxes = await getMediumBoxes();

  return (
    <>
      <div className="bg-champagne py-16 px-4 text-center border-b border-gold/10">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-gold mb-3">Gift Boxes</p>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">Medium Gift Box</h1>
        <p className="font-body text-soft-gray max-w-md mx-auto leading-relaxed">
          A beautifully curated gift box with 2–3 jewelry pieces, elegantly presented and ready to gift.
          Perfect for birthdays, Eid, and anniversaries.
        </p>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-5xl mx-auto">
          {boxes.length === 0 ? (
            <p className="text-center font-body text-soft-gray py-20">
              Gift boxes coming soon — check back shortly.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {boxes.map((box) => (
                <div key={box._id} className="group card-hover bg-warm-white border border-gold/10 group-hover:border-gold/30 transition-colors">
                  <Link href={`/products/${box.slug}`}>
                    {box.images?.[0] ? (
                      <div className="relative w-full" style={{ paddingBottom: "125%" }}>
                        <Image
                          src={urlFor(box.images[0]).width(400).url()}
                          alt={box.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ) : (
                      <PlaceholderImage aspectRatio="4/5" />
                    )}
                  </Link>
                  <div className="p-5">
                    <Link href={`/products/${box.slug}`}>
                      <h3 className="font-heading text-xl text-charcoal mb-2 hover:text-gold transition-colors">
                        {box.title}
                      </h3>
                    </Link>
                    {box.shortDesc && (
                      <p className="font-body text-sm text-soft-gray mb-3 leading-relaxed">{box.shortDesc}</p>
                    )}
                    <p className="font-body text-gold text-base mb-4">${box.price.toFixed(2)}</p>
                    <AddToCartButton
                      product={{
                        id: box._id,
                        title: box.title,
                        price: box.price,
                        imageUrl: box.images?.[0]
                          ? urlFor(box.images[0]).width(400).url()
                          : undefined,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 p-6 bg-champagne border border-gold/20 text-center">
            <p className="font-heading text-xl text-charcoal mb-2">What&apos;s Inside?</p>
            <p className="font-body text-sm text-soft-gray leading-relaxed max-w-lg mx-auto">
              Each Medium Gift Box includes 2–3 hand-selected jewelry pieces, elegant packaging, a satin ribbon,
              and a gift-ready presentation. No wrapping needed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000/collections/medium-box`. Expected: Page renders. Shows "Gift boxes coming soon" message. No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/collections/medium-box/page.tsx
git commit -m "feat: connect medium box collection page to sanity"
```

---

### Task 7: Update Large Gift Box collection page

**Files:**
- Modify: `src/app/collections/large-box/page.tsx`

**Interfaces:**
- Consumes: `getLargeBoxes()`, `SanityGiftBox` from `@/sanity/lib/queries`; `urlFor()` from `@/sanity/lib/image`

- [ ] **Step 1: Replace `src/app/collections/large-box/page.tsx` entirely**

```tsx
import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import AddToCartButton from "@/components/AddToCartButton";
import { getLargeBoxes } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata = {
  title: "Large Gift Box — Luna Clara Designs",
  description: "Our premium gift experience with 4–5 jewelry pieces, luxury packaging, and finishing touches.",
};

export default async function LargeBoxPage() {
  const boxes = await getLargeBoxes();

  return (
    <>
      <div className="bg-charcoal py-16 px-4 text-center">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-gold mb-3">Premium Collection</p>
        <h1 className="font-heading text-4xl md:text-5xl text-warm-white mb-4">Large Gift Box</h1>
        <p className="font-body text-white/60 max-w-md mx-auto leading-relaxed">
          Our premium gift experience — a luxurious box filled with hand-selected jewelry pieces
          and finishing touches that make gifting truly unforgettable.
        </p>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-5xl mx-auto">
          {boxes.length === 0 ? (
            <p className="text-center font-body text-soft-gray py-20">
              Gift boxes coming soon — check back shortly.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {boxes.map((box) => (
                <div key={box._id} className="group card-hover bg-warm-white border border-gold/20 group-hover:border-gold/60 transition-colors">
                  <Link href={`/products/${box.slug}`}>
                    {box.images?.[0] ? (
                      <div className="relative w-full" style={{ paddingBottom: "125%" }}>
                        <Image
                          src={urlFor(box.images[0]).width(400).url()}
                          alt={box.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ) : (
                      <PlaceholderImage aspectRatio="4/5" />
                    )}
                  </Link>
                  <div className="p-5">
                    <Link href={`/products/${box.slug}`}>
                      <h3 className="font-heading text-xl text-charcoal mb-2 hover:text-gold transition-colors">
                        {box.title}
                      </h3>
                    </Link>
                    {box.shortDesc && (
                      <p className="font-body text-sm text-soft-gray mb-3 leading-relaxed">{box.shortDesc}</p>
                    )}
                    <p className="font-body text-gold text-base mb-4">${box.price.toFixed(2)}</p>
                    <AddToCartButton
                      product={{
                        id: box._id,
                        title: box.title,
                        price: box.price,
                        imageUrl: box.images?.[0]
                          ? urlFor(box.images[0]).width(400).url()
                          : undefined,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              { icon: "🎁", label: "4–5 Jewelry Pieces", desc: "Hand-selected for the recipient" },
              { icon: "✨", label: "Premium Packaging", desc: "Velvet-lined box with gold ribbon" },
              { icon: "💌", label: "Gift Card Option", desc: "Add a personal message" },
            ].map((feat) => (
              <div key={feat.label} className="p-6 bg-champagne border border-gold/10">
                <div className="text-3xl mb-3">{feat.icon}</div>
                <p className="font-heading text-lg text-charcoal mb-1">{feat.label}</p>
                <p className="font-body text-xs text-soft-gray">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000/collections/large-box`. Expected: Page renders. Shows "Gift boxes coming soon" message. Feature tiles below render correctly. No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/collections/large-box/page.tsx
git commit -m "feat: connect large box collection page to sanity"
```

---

### Task 8: Update Product detail page

**Files:**
- Modify: `src/app/products/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getProductBySlug(slug)`, `getGiftBoxBySlug(slug)`, `SanityProduct`, `SanityGiftBox` from `@/sanity/lib/queries`; `urlFor()` from `@/sanity/lib/image`

- [ ] **Step 1: Replace `src/app/products/[slug]/page.tsx` entirely**

```tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlaceholderImage from "@/components/PlaceholderImage";
import AddToCartButton from "@/components/AddToCartButton";
import {
  getProductBySlug,
  getGiftBoxBySlug,
  type SanityProduct,
  type SanityGiftBox,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  const giftBox = !product ? await getGiftBoxBySlug(slug) : null;
  const item: SanityProduct | SanityGiftBox | null = product ?? giftBox;

  if (!item) notFound();

  const isGiftBox = !product;
  const description =
    item.description ??
    "A beautifully crafted piece designed with elegance in mind. Perfect as a personal treat or a thoughtful gift.";
  const materials = !isGiftBox
    ? (item as SanityProduct).materials ?? "Gold-tone alloy, hypoallergenic"
    : null;
  const collectionHref = isGiftBox
    ? `/collections/${(item as SanityGiftBox).boxSize}-box`
    : "/collections/individual";
  const collectionLabel = isGiftBox
    ? `${(item as SanityGiftBox).boxSize === "medium" ? "Medium" : "Large"} Gift Box`
    : "Shop";
  const images = item.images ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 font-body text-xs text-soft-gray uppercase tracking-wider">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span>/</span>
        <Link href={collectionHref} className="hover:text-gold transition-colors">{collectionLabel}</Link>
        <span>/</span>
        <span className="text-charcoal">{item.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Images */}
        <div className="flex flex-col gap-3">
          {images[0] ? (
            <div className="relative w-full overflow-hidden" style={{ paddingBottom: "125%" }}>
              <Image
                src={urlFor(images[0]).width(800).url()}
                alt={item.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : (
            <PlaceholderImage aspectRatio="4/5" />
          )}
          <div className="grid grid-cols-4 gap-2">
            {images.length > 1
              ? images.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden border border-gold/10 hover:border-gold transition-colors"
                    style={{ paddingBottom: "100%" }}
                  >
                    <Image
                      src={urlFor(img).width(200).url()}
                      alt={`${item.title} view ${i + 2}`}
                      fill
                      className="object-cover cursor-pointer"
                      sizes="25vw"
                    />
                  </div>
                ))
              : [1, 2, 3, 4].map((i) => (
                  <div key={i} className="border border-gold/10 overflow-hidden cursor-pointer hover:border-gold transition-colors">
                    <PlaceholderImage aspectRatio="1/1" />
                  </div>
                ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5 md:pt-4">
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-gold mb-2">Luna Clara Designs</p>
            <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">{item.title}</h1>
            <p className="font-heading text-3xl text-gold">${item.price.toFixed(2)}</p>
          </div>

          <div className="w-12 h-px bg-gold/30" />

          <p className="font-body text-soft-gray leading-relaxed">{description}</p>

          <div className="flex flex-col gap-3 mt-2">
            <AddToCartButton
              product={{
                id: item._id,
                title: item.title,
                price: item.price,
                imageUrl: images[0] ? urlFor(images[0]).width(400).url() : undefined,
              }}
              className="py-4 text-sm"
            />
            <Link
              href="/cart"
              className="w-full text-center bg-charcoal text-warm-white font-body text-sm uppercase tracking-widest py-4 hover:bg-charcoal/80 transition-colors"
            >
              Buy Now
            </Link>
          </div>

          <div className="mt-4 border-t border-gold/10 pt-4 flex flex-col gap-3">
            {materials && (
              <div className="flex gap-3">
                <span className="font-body text-xs uppercase tracking-wider text-soft-gray w-24 flex-shrink-0 pt-0.5">
                  Materials
                </span>
                <span className="font-body text-sm text-charcoal">{materials}</span>
              </div>
            )}
            <div className="flex gap-3">
              <span className="font-body text-xs uppercase tracking-wider text-soft-gray w-24 flex-shrink-0 pt-0.5">
                Care
              </span>
              <span className="font-body text-sm text-charcoal">
                Avoid water, perfume, and chemicals. Store in pouch.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-body text-xs uppercase tracking-wider text-soft-gray w-24 flex-shrink-0 pt-0.5">
                Shipping
              </span>
              <span className="font-body text-sm text-charcoal">
                1–3 business days processing. Free local delivery available.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000/products/any-slug`. Expected: Next.js 404 page (confirms `notFound()` fires when Sanity returns null — correct behavior with placeholder project ID).

- [ ] **Step 3: Commit**

```bash
git add src/app/products/
git commit -m "feat: connect product detail page to sanity, handle both product and gift box slugs"
```

---

### Task 9: Update Homepage Glow Picks

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `getFeaturedProducts()`, `SanityProduct` from `@/sanity/lib/queries`; `urlFor()` from `@/sanity/lib/image`

- [ ] **Step 1: Replace `src/app/page.tsx` entirely**

```tsx
import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import AddToCartButton from "@/components/AddToCartButton";
import { getFeaturedProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Eid",
  "Mother's Day",
  "Valentine's Day",
  "Wedding",
  "Bridesmaids",
  "Just Because",
];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* 1. HERO */}
      <section className="min-h-[90vh] flex items-center bg-cream relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(201,168,76,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(242,181,192,0.1) 0%, transparent 40%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="flex flex-col gap-6 text-center md:text-left order-2 md:order-1">
              <p className="font-body text-xs uppercase tracking-[0.25em] text-gold">
                Premium Gem · Designed in USA
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight">
                Made to glow<br />
                <em className="text-gold">with you.</em>
              </h1>
              <p className="font-body text-base md:text-lg text-soft-gray max-w-md mx-auto md:mx-0 leading-relaxed">
                Curated jewelry and gift-ready pieces for every special moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mt-2">
                <Link
                  href="/collections/individual"
                  className="bg-gold text-warm-white font-body text-sm uppercase tracking-widest px-8 py-4 hover:bg-gold-light hover:text-charcoal transition-colors text-center"
                >
                  Shop Now
                </Link>
                <Link
                  href="/collections/medium-box"
                  className="border border-gold text-gold font-body text-sm uppercase tracking-widest px-8 py-4 hover:bg-gold hover:text-warm-white transition-colors text-center"
                >
                  View Gift Boxes
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-champagne via-blush/30 to-cream flex items-center justify-center shadow-xl border border-gold/20 relative">
                <div className="text-center">
                  <div className="text-8xl md:text-9xl animate-shimmer">🌙</div>
                  <p className="font-body text-xs text-soft-gray mt-3 tracking-wider uppercase">
                    3D animation coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OCCASIONS MARQUEE STRIP */}
      <section className="bg-blush py-3 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex items-center gap-6 text-sm font-body tracking-wide text-warm-white">
            {[1, 2].map((copy) => (
              <span key={copy} className="flex items-center gap-6 pr-6">
                {["🎂 Birthday", "💍 Anniversary", "🌙 Eid", "💐 Mother's Day",
                  "💝 Valentine's Day", "💒 Weddings", "👑 Bridesmaids", "🎁 Just Because"].map((o) => (
                  <span key={o} className="flex items-center gap-6">
                    <span>{o}</span>
                    <span className="text-warm-white/40">·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED COLLECTIONS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-gold mb-3">Explore</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal">Our Collections</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Individual Items", desc: "Delicate earrings, necklaces, bracelets, and rings chosen for everyday elegance.", href: "/collections/individual" },
              { title: "Medium Gift Box", desc: "A beautifully curated gift box, elegantly presented and ready to give.", href: "/collections/medium-box" },
              { title: "Large Gift Box", desc: "Our premium gift experience — luxurious, hand-selected, unforgettable.", href: "/collections/large-box" },
            ].map((col) => (
              <Link key={col.href} href={col.href} className="group block card-hover">
                <div className="overflow-hidden border border-gold/10 group-hover:border-gold/30 transition-colors">
                  <PlaceholderImage aspectRatio="4/5" />
                  <div className="p-5 bg-warm-white">
                    <h3 className="font-heading text-2xl text-charcoal mb-2">{col.title}</h3>
                    <p className="font-body text-sm text-soft-gray leading-relaxed mb-4">{col.desc}</p>
                    <span className="font-body text-xs uppercase tracking-widest text-gold group-hover:text-gold-light transition-colors">
                      Shop Now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS — "Glow Picks" */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-champagne/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-gold mb-3">Handpicked for you</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal">Glow Picks</h2>
          </div>
          {featuredProducts.length === 0 ? (
            <p className="text-center font-body text-soft-gray">New arrivals coming soon.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <div key={product._id} className="group card-hover">
                  <Link href={`/products/${product.slug}`}>
                    <div className="overflow-hidden border border-gold/10 group-hover:border-gold/30 transition-colors">
                      {product.images?.[0] ? (
                        <div className="relative w-full" style={{ paddingBottom: "125%" }}>
                          <Image
                            src={urlFor(product.images[0]).width(400).url()}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      ) : (
                        <PlaceholderImage aspectRatio="4/5" />
                      )}
                    </div>
                  </Link>
                  <div className="pt-3 pb-4 bg-transparent">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-body text-sm md:text-base text-charcoal mb-1 hover:text-gold transition-colors leading-snug">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="font-body text-gold text-sm mb-3">${product.price.toFixed(2)}</p>
                    <AddToCartButton
                      product={{
                        id: product._id,
                        title: product.title,
                        price: product.price,
                        category: product.category,
                        imageUrl: product.images?.[0]
                          ? urlFor(product.images[0]).width(400).url()
                          : undefined,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. GIFT BOX SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-champagne">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-gold mb-3">Gift-ready</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal">The Perfect Gift, Ready to Give</h2>
            <p className="font-body text-soft-gray mt-3 max-w-lg mx-auto leading-relaxed">
              Every Luna Clara gift box is beautifully presented and ready to gift.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Medium Gift Box", desc: "2–3 curated jewelry pieces + packaging + ribbon. Perfect for birthdays, Eid, and anniversaries.", price: "From $65", href: "/collections/medium-box" },
              { title: "Large Gift Box", desc: "4–5 jewelry pieces + premium packaging + ribbon + gift card option. A luxurious experience.", price: "From $110", href: "/collections/large-box" },
            ].map((box) => (
              <div key={box.href} className="group card-hover bg-warm-white border border-gold/20">
                <PlaceholderImage aspectRatio="16/9" />
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-charcoal mb-2">{box.title}</h3>
                  <p className="font-body text-sm text-soft-gray leading-relaxed mb-3">{box.desc}</p>
                  <p className="font-heading text-xl text-gold mb-4">{box.price}</p>
                  <Link href={box.href} className="inline-block font-body text-xs uppercase tracking-widest border border-gold text-gold px-6 py-3 hover:bg-gold hover:text-warm-white transition-colors">
                    Shop This Box
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OCCASIONS STRIP */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-8">A Gift for Every Moment</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {OCCASIONS.map((occasion) => (
              <span key={occasion} className="font-body text-sm text-charcoal bg-blush/20 border border-blush/60 px-5 py-2 rounded-full tracking-wide hover:border-gold hover:text-gold transition-colors cursor-default">
                {occasion}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BRAND STORY TEASER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warm-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <PlaceholderImage aspectRatio="4/5" className="max-w-md mx-auto md:mx-0" />
            </div>
            <div className="order-1 md:order-2 flex flex-col gap-5">
              <p className="font-body text-xs uppercase tracking-[0.25em] text-gold">Our Story</p>
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal">More Than Jewelry</h2>
              <p className="font-body text-soft-gray leading-relaxed">
                At Luna Clara, we believe jewelry should feel more than beautiful — it should feel meaningful. Our brand
                is built around thoughtful gifting, elegant presentation, and pieces that add a little glow to everyday moments.
              </p>
              <p className="font-body text-soft-gray leading-relaxed">
                Whether it&apos;s a birthday, anniversary, Eid, or a simple &ldquo;thinking of you&rdquo; gift, Luna Clara is
                designed to make gifting feel easy, personal, and special.
              </p>
              <Link href="/about" className="inline-block font-body text-sm uppercase tracking-widest text-gold border-b border-gold pb-0.5 w-fit hover:text-gold-light transition-colors mt-2">
                Read Our Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. JEWELRY CARE TEASER */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-champagne/50 border-t border-b border-gold/10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold text-lg flex-shrink-0">✨</div>
            <p className="font-body text-sm text-charcoal">
              How to care for your Luna Clara pieces — keep them glowing longer.
            </p>
          </div>
          <Link href="/jewelry-care" className="font-body text-xs uppercase tracking-widest text-gold border border-gold px-5 py-2.5 hover:bg-gold hover:text-warm-white transition-colors flex-shrink-0">
            Jewelry Care Guide
          </Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000`. Expected: Full homepage renders. Glow Picks section shows "New arrivals coming soon." All other 7 sections (hero, marquee, collections, gift boxes, occasions, brand story, care teaser) render identically to before.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: connect homepage glow picks to sanity featured products"
```

---

### Task 10: Fix known bugs

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`

**Interfaces:** None — standalone fixes.

- [ ] **Step 1: Fix Navbar Shop dropdown duplicate link**

In `src/components/Navbar.tsx`, find the Shop dropdown block (around line 49). Replace:

```tsx
              <div className="absolute top-full left-0 w-48 bg-warm-white border border-gold/20 shadow-lg rounded-sm py-2 z-50">
                  <Link href="/collections/individual" className="block px-4 py-2.5 text-sm text-charcoal hover:text-gold hover:bg-cream transition-colors">
                    Individual Items
                  </Link>
                  <Link href="/collections/individual" className="block px-4 py-2.5 text-sm text-charcoal hover:text-gold hover:bg-cream transition-colors">
                    View All
                  </Link>
                </div>
```

With:

```tsx
              <div className="absolute top-full left-0 w-48 bg-warm-white border border-gold/20 shadow-lg rounded-sm py-2 z-50">
                  <Link href="/collections/individual" className="block px-4 py-2.5 text-sm text-charcoal hover:text-gold hover:bg-cream transition-colors">
                    Individual Items
                  </Link>
                </div>
```

- [ ] **Step 2: Fix Footer copyright year**

In `src/components/Footer.tsx`, find the copyright line (around line 129). Replace:

```tsx
            © 2025 Luna Clara Designs. All rights reserved. Illinois, USA.
```

With:

```tsx
            © {new Date().getFullYear()} Luna Clara Designs. All rights reserved. Illinois, USA.
```

- [ ] **Step 3: Verify in browser**

Navigate to `http://localhost:3000`. Expected:
- Navbar "Shop" dropdown shows only "Individual Items" (no duplicate "View All")
- Footer shows "© 2026 Luna Clara Designs..."

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/components/Footer.tsx
git commit -m "fix: remove navbar duplicate shop link, dynamic footer copyright year"
```

---

## Post-Implementation: Activating with a Real Sanity Project

Once a real Sanity project is created at [sanity.io](https://sanity.io):

1. Replace `your_sanity_project_id` in `.env.local` with the real Project ID
2. Navigate to `http://localhost:3000/studio` and log in with your Sanity account
3. Add products (mark `featured: true` on up to 4 for Glow Picks)
4. Add gift boxes with `boxSize: medium` or `large`
5. All pages will immediately reflect the real data on next request
