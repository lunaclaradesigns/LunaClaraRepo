import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import BannerImage from "@/components/BannerImage";
import AddToCartButton from "@/components/AddToCartButton";
import LunaClaraSplineHero from "@/components/LunaClaraSplineHero";
import { getFeaturedProducts } from "@/data/products";

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

const OCCASION_SCROLL = [
  "Birthday",
  "Anniversary",
  "Eid",
  "Mother's Day",
  "Valentine's Day",
  "Weddings",
  "Bridesmaids",
  "Just Because",
];

const COLLECTIONS = [
  {
    title: "The Jewelry Edit",
    desc: "Delicate earrings, necklaces, bracelets, and rings chosen for everyday elegance.",
    href: "/collections/individual",
    image: "/products/earrings-pearl-starburst.jpg",
  },
  {
    title: "Gift Box Moments",
    desc: "Curated pieces, polished presentation, and a ready-to-give finish.",
    href: "/collections/medium-box",
    image: "/products/hero-feature.jpg",
  },
  {
    title: "Luxe Celebrations",
    desc: "Our most elevated gift experience for birthdays, Eid, weddings, and anniversaries.",
    href: "/collections/large-box",
    image: "/products/hero-banner.jpg",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden bg-cream">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 16% 24%, rgba(242,181,192,0.2) 0%, transparent 32%), radial-gradient(circle at 86% 18%, rgba(201,168,76,0.16) 0%, transparent 38%)",
          }}
        />

        <div className="relative mx-auto grid min-h-[88vh] w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-[0.92fr_1.08fr] md:py-0 lg:px-8">
          <div className="z-10 flex flex-col gap-6 text-center md:text-left">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-gold">
              Premium Gem · Designed in USA
            </p>
            <div className="flex flex-col gap-4">
              <h1 className="font-heading text-5xl leading-[0.92] text-charcoal sm:text-6xl lg:text-7xl">
                Luna Clara Designs
              </h1>
              <p className="font-heading text-3xl italic leading-tight text-gold sm:text-4xl">
                Made to glow with you.
              </p>
            </div>
            <p className="mx-auto max-w-lg font-body text-base leading-relaxed text-soft-gray md:mx-0 md:text-lg">
              Curated jewelry and gift-ready pieces with a celestial finish, polished packaging,
              and just enough sparkle for the moments people remember.
            </p>
            <div className="flex flex-col justify-center gap-3 pt-1 sm:flex-row md:justify-start">
              <Link
                href="/collections/individual"
                className="bg-gold px-8 py-4 text-center font-body text-sm uppercase tracking-widest text-warm-white transition-colors hover:bg-gold-light hover:text-charcoal"
              >
                Shop Jewelry
              </Link>
              <Link
                href="/collections/medium-box"
                className="border border-gold px-8 py-4 text-center font-body text-sm uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-warm-white"
              >
                Explore Gift Boxes
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-5 text-left">
              {[
                ["Gift-ready", "Boxes, ribbon, and polish"],
                ["Curated", "Selected for glow"],
                ["Personal", "For every celebration"],
              ].map(([label, desc]) => (
                <div key={label} className="border-l border-gold/30 pl-3">
                  <p className="font-body text-xs uppercase tracking-widest text-gold">{label}</p>
                  <p className="mt-1 font-body text-xs leading-snug text-soft-gray">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative -mx-4 min-h-[360px] sm:mx-0 md:min-h-[620px]">
            <LunaClaraSplineHero />
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-charcoal py-3">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex items-center gap-7 pr-7 font-body text-xs uppercase tracking-widest text-warm-white/75">
            {[1, 2].map((copy) => (
              <span key={copy} className="flex items-center gap-7 pr-7">
                {OCCASION_SCROLL.map((occasion) => (
                  <span key={`${copy}-${occasion}`} className="flex items-center gap-7">
                    <span>{occasion}</span>
                    <span className="text-gold">*</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-gold">Shop the mood</p>
              <h2 className="font-heading text-4xl text-charcoal md:text-5xl">Jewelry for the moment</h2>
            </div>
            <p className="mx-auto max-w-md font-body text-sm leading-relaxed text-soft-gray md:mx-0">
              Inspired by boutique jewelry houses: product-first, refined, and ready for gifting.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {COLLECTIONS.map((col) => (
              <Link key={col.href} href={col.href} className="group block card-hover">
                <div className="overflow-hidden border border-gold/10 bg-warm-white transition-colors group-hover:border-gold/35">
                  <ProductImage
                    src={col.image}
                    alt={col.title}
                    aspectRatio="4/5"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="p-5">
                    <h3 className="mb-2 font-heading text-2xl text-charcoal">{col.title}</h3>
                    <p className="mb-4 font-body text-sm leading-relaxed text-soft-gray">{col.desc}</p>
                    <span className="font-body text-xs uppercase tracking-widest text-gold transition-colors group-hover:text-gold-light">
                      Shop now
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-champagne/40 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-gold">Handpicked for you</p>
            <h2 className="font-heading text-4xl text-charcoal md:text-5xl">Glow Picks</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {featured.map((product) => (
              <div key={product.id} className="group card-hover">
                <Link href={`/products/${product.slug}`}>
                  <div className="overflow-hidden border border-gold/10 transition-colors group-hover:border-gold/30">
                    <ProductImage src={product.image} alt={product.title} aspectRatio="4/5" />
                  </div>
                </Link>
                <div className="pb-4 pt-3">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="mb-1 font-body text-sm leading-snug text-charcoal transition-colors hover:text-gold md:text-base">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="mb-3 flex items-baseline gap-2">
                    <p className="font-body text-sm text-gold">${product.price.toFixed(2)}</p>
                    {product.compareAtPrice && (
                      <p className="font-body text-xs text-soft-gray line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <AddToCartButton
                    product={{
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      imageUrl: product.image,
                      category: product.category,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <BannerImage src="/products/hero-banner.jpg" alt="Luna Clara curated jewelry" heightClass="h-72 md:h-[420px]" priority>
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/20">
            <div className="px-6 text-center">
              <p className="mb-4 font-heading text-3xl text-warm-white drop-shadow-lg md:text-5xl">
                Curated to Gift. Designed to Glow.
              </p>
              <Link
                href="/collections/individual"
                className="inline-block bg-warm-white/90 px-8 py-4 font-body text-sm uppercase tracking-widest text-charcoal transition-colors hover:bg-gold hover:text-warm-white"
              >
                Shop the Collection
              </Link>
            </div>
          </div>
        </BannerImage>
      </section>

      <section className="bg-champagne px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-gold">Gift-ready</p>
            <h2 className="font-heading text-4xl text-charcoal md:text-5xl">The Perfect Gift, Ready to Give</h2>
            <p className="mx-auto mt-3 max-w-lg font-body leading-relaxed text-soft-gray">
              Every Luna Clara gift box is beautifully presented and ready for the celebration.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                title: "Medium Gift Box",
                desc: "Two to three curated jewelry pieces with packaging and ribbon. Perfect for birthdays, Eid, and anniversaries.",
                price: "From $65",
                href: "/collections/medium-box",
                image: "/products/hero-feature.jpg",
              },
              {
                title: "Large Gift Box",
                desc: "Four to five jewelry pieces with premium packaging, ribbon, and a gift card option.",
                price: "From $110",
                href: "/collections/large-box",
                image: "/products/hero-banner.jpg",
              },
            ].map((box) => (
              <div key={box.href} className="group card-hover border border-gold/20 bg-warm-white">
                <ProductImage
                  src={box.image}
                  alt={box.title}
                  aspectRatio="16/9"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="p-6">
                  <h3 className="mb-2 font-heading text-2xl text-charcoal">{box.title}</h3>
                  <p className="mb-3 font-body text-sm leading-relaxed text-soft-gray">{box.desc}</p>
                  <p className="mb-4 font-heading text-xl text-gold">{box.price}</p>
                  <Link
                    href={box.href}
                    className="inline-block border border-gold px-6 py-3 font-body text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-warm-white"
                  >
                    Shop this box
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 font-heading text-3xl text-charcoal md:text-4xl">A Gift for Every Moment</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {OCCASIONS.map((occasion) => (
              <span
                key={occasion}
                className="rounded-full border border-blush/60 bg-blush/20 px-5 py-2 font-body text-sm tracking-wide text-charcoal transition-colors hover:border-gold hover:text-gold"
              >
                {occasion}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="mx-auto max-w-md overflow-hidden border border-gold/10 md:mx-0">
              <ProductImage
                src="/products/necklace-shell-pearl.jpg"
                alt="The Luna Clara story"
                aspectRatio="4/5"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="order-1 flex flex-col gap-5 md:order-2">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-gold">Our Story</p>
            <h2 className="font-heading text-4xl text-charcoal md:text-5xl">More Than Jewelry</h2>
            <p className="font-body leading-relaxed text-soft-gray">
              At Luna Clara, jewelry is part of the whole gesture: the piece, the packaging, the ribbon,
              and the feeling of opening something chosen with care.
            </p>
            <p className="font-body leading-relaxed text-soft-gray">
              Whether it is a birthday, anniversary, Eid, or a simple thinking-of-you gift,
              Luna Clara is designed to make gifting feel easy, personal, and special.
            </p>
            <Link
              href="/about"
              className="mt-2 w-fit border-b border-gold pb-0.5 font-body text-sm uppercase tracking-widest text-gold transition-colors hover:text-gold-light"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-gold/10 bg-champagne/50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 text-lg text-gold">
              *
            </div>
            <p className="font-body text-sm text-charcoal">
              Keep your Luna Clara pieces glowing longer with simple care rituals.
            </p>
          </div>
          <Link
            href="/jewelry-care"
            className="flex-shrink-0 border border-gold px-5 py-2.5 font-body text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-warm-white"
          >
            Jewelry Care Guide
          </Link>
        </div>
      </section>
    </>
  );
}
