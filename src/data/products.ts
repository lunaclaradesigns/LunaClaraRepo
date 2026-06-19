// ─────────────────────────────────────────────────────────────
// Luna Clara — Product Catalog (sample data)
// This is a temporary local catalog. Later it is replaced by Sanity CMS.
// Fields mirror the Sanity / Shopify-compatible schema.
//
// To show a real photo: drop the image file in /public/products/
// using the exact filename in `image` below. No code change needed.
// If the file is missing, an elegant placeholder shows automatically.
// ─────────────────────────────────────────────────────────────

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: "individual" | "medium-box" | "large-box";
  image: string;        // primary image path under /public
  images?: string[];    // gallery
  sku: string;
  featured?: boolean;
  tags?: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "e-floral",
    slug: "vintage-floral-pearl-earrings",
    title: "Vintage Floral Pearl Earrings",
    description:
      "Hand-painted enamel petals in soft sage and lilac cradle a luminous freshwater pearl. A romantic, vintage-inspired statement piece that feels like a tiny garden in bloom.",
    price: 32,
    compareAtPrice: 45,
    category: "individual",
    image: "/products/earrings-vintage-floral.jpg",
    images: ["/products/earrings-vintage-floral.jpg"],
    sku: "LC-EAR-001",
    featured: true,
    tags: ["earrings", "pearl", "floral", "vintage"],
  },
  {
    id: "e-starburst",
    slug: "starburst-pearl-drop-earrings",
    title: "Starburst Pearl Drop Earrings",
    description:
      "A dazzling crystal starburst suspends a smooth baroque pearl drop. Elegant enough for a wedding, light enough for everyday glow.",
    price: 38,
    compareAtPrice: 52,
    category: "individual",
    image: "/products/earrings-pearl-starburst.jpg",
    images: ["/products/earrings-pearl-starburst.jpg"],
    sku: "LC-EAR-002",
    featured: true,
    tags: ["earrings", "pearl", "crystal", "bridal"],
  },
  {
    id: "n-emerald",
    slug: "emerald-halo-necklace",
    title: "Emerald Halo Necklace",
    description:
      "A rich emerald-green stone framed by a halo of sparkling crystals on a delicate gold-tone chain. Timeless, regal, and effortlessly elegant.",
    price: 42,
    compareAtPrice: 58,
    category: "individual",
    image: "/products/necklace-emerald.jpg",
    images: ["/products/necklace-emerald.jpg"],
    sku: "LC-NEC-001",
    featured: true,
    tags: ["necklace", "emerald", "gold", "statement"],
  },
  {
    id: "n-rose",
    slug: "golden-rose-locket-necklace",
    title: "Golden Rose Locket Necklace",
    description:
      "An ornate gold-tone pendant engraved with a single rose, finished with a woven chain and delicate tassel drops. A heirloom-feel keepsake.",
    price: 46,
    category: "individual",
    image: "/products/necklace-gold-rose.jpg",
    images: ["/products/necklace-gold-rose.jpg"],
    sku: "LC-NEC-002",
    featured: false,
    tags: ["necklace", "gold", "rose", "pendant"],
  },
  {
    id: "n-shell",
    slug: "shell-and-pearl-necklace",
    title: "Shell & Pearl Necklace",
    description:
      "A crystal-pavé seashell opens to reveal a single pearl, strung on a shimmering gold-tone chain. Dainty, dreamy, and perfect for layering.",
    price: 34,
    compareAtPrice: 48,
    category: "individual",
    image: "/products/necklace-shell-pearl.jpg",
    images: ["/products/necklace-shell-pearl.jpg"],
    sku: "LC-NEC-003",
    featured: true,
    tags: ["necklace", "pearl", "shell", "dainty"],
  },
  {
    id: "b-crystal",
    slug: "crystal-wrap-bangle",
    title: "Crystal Wrap Bangle",
    description:
      "A double-row pavé crystal bangle with an open wrap design that slips on easily and catches the light from every angle. Pure understated luxury.",
    price: 48,
    compareAtPrice: 65,
    category: "individual",
    image: "/products/bangle-crystal-gold.jpg",
    images: ["/products/bangle-crystal-gold.jpg"],
    sku: "LC-BRA-001",
    featured: false,
    tags: ["bracelet", "bangle", "crystal", "gold"],
  },
  {
    id: "r-solitaire",
    slug: "solitaire-crystal-ring",
    title: "Solitaire Crystal Ring",
    description:
      "A brilliant round-cut crystal solitaire raised on a pavé-set band that sparkles all the way around. A breathtaking everyday treasure.",
    price: 44,
    compareAtPrice: 60,
    category: "individual",
    image: "/products/ring-solitaire.jpg",
    images: ["/products/ring-solitaire.jpg"],
    sku: "LC-RNG-001",
    featured: false,
    tags: ["ring", "solitaire", "crystal", "rose-gold"],
  },

  // ── Gift Boxes ───────────────────────────────────────────────
  {
    id: "mb-blossom",
    slug: "blossom-gift-box",
    title: "Blossom Gift Box",
    description:
      "A soft, romantic set of 2–3 curated pieces, beautifully presented with ribbon. Perfect for birthdays and Eid.",
    price: 65,
    category: "medium-box",
    image: "/products/box-medium-blossom.jpg",
    sku: "LC-BOX-M01",
    featured: false,
    tags: ["gift-box", "medium"],
  },
  {
    id: "mb-moonlight",
    slug: "moonlight-gift-box",
    title: "Moonlight Gift Box",
    description:
      "Golden accents and delicate pearls, elegantly wrapped and ready to gift.",
    price: 72,
    category: "medium-box",
    image: "/products/box-medium-moonlight.jpg",
    sku: "LC-BOX-M02",
    featured: false,
    tags: ["gift-box", "medium"],
  },
  {
    id: "lb-luxe",
    slug: "luna-luxe-box",
    title: "Luna Luxe Box",
    description:
      "Our most-loved premium set — 4–5 hand-selected pieces in a velvet-lined box with a gift card option.",
    price: 110,
    category: "large-box",
    image: "/products/box-large-luxe.jpg",
    sku: "LC-BOX-L01",
    featured: false,
    tags: ["gift-box", "large"],
  },
  {
    id: "lb-celestial",
    slug: "celestial-gift-box",
    title: "Celestial Gift Box",
    description:
      "Gold-tone statement pieces with a moonlight aesthetic, presented in luxury packaging.",
    price: 125,
    category: "large-box",
    image: "/products/box-large-celestial.jpg",
    sku: "LC-BOX-L02",
    featured: false,
    tags: ["gift-box", "large"],
  },
];

export const getProductBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug || p.id === slug);

export const getProductsByCategory = (category: Product["category"]) =>
  PRODUCTS.filter((p) => p.category === category);

export const getFeaturedProducts = () => PRODUCTS.filter((p) => p.featured);
