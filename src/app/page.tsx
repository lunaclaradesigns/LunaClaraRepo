import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import AddToCartButton from "@/components/AddToCartButton";

const SAMPLE_PRODUCTS = [
  { id: "p1", title: "Gold Crescent Earrings", price: 28, category: "individual" },
  { id: "p2", title: "Pearl Charm Necklace", price: 36, category: "individual" },
  { id: "p3", title: "Delicate Chain Bracelet", price: 24, category: "individual" },
  { id: "p4", title: "Starburst Ring", price: 22, category: "individual" },
];

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

export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="min-h-[90vh] flex items-center bg-cream relative overflow-hidden">
        {/* Subtle gold shimmer background dots */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(201,168,76,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(242,181,192,0.1) 0%, transparent 40%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Text content */}
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

            {/* Right: 3D placeholder (Spline will go here) */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-champagne via-blush/30 to-cream flex items-center justify-center shadow-xl border border-gold/20 relative">
                {/* Moon/starburst placeholder — Spline embed replaces this */}
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
              {
                title: "Individual Items",
                desc: "Delicate earrings, necklaces, bracelets, and rings chosen for everyday elegance.",
                href: "/collections/individual",
              },
              {
                title: "Medium Gift Box",
                desc: "A beautifully curated gift box, elegantly presented and ready to give.",
                href: "/collections/medium-box",
              },
              {
                title: "Large Gift Box",
                desc: "Our premium gift experience — luxurious, hand-selected, unforgettable.",
                href: "/collections/large-box",
              },
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {SAMPLE_PRODUCTS.map((product) => (
              <div key={product.id} className="group card-hover">
                <Link href={`/products/${product.id}`}>
                  <div className="overflow-hidden border border-gold/10 group-hover:border-gold/30 transition-colors">
                    <PlaceholderImage aspectRatio="4/5" />
                  </div>
                </Link>
                <div className="pt-3 pb-4 bg-transparent">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-body text-sm md:text-base text-charcoal mb-1 hover:text-gold transition-colors leading-snug">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="font-body text-gold text-sm mb-3">${product.price.toFixed(2)}</p>
                  <AddToCartButton product={product} />
                </div>
              </div>
            ))}
          </div>
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
              {
                title: "Medium Gift Box",
                desc: "2–3 curated jewelry pieces + packaging + ribbon. Perfect for birthdays, Eid, and anniversaries.",
                price: "From $65",
                href: "/collections/medium-box",
              },
              {
                title: "Large Gift Box",
                desc: "4–5 jewelry pieces + premium packaging + ribbon + gift card option. A luxurious experience.",
                price: "From $110",
                href: "/collections/large-box",
              },
            ].map((box) => (
              <div key={box.href} className="group card-hover bg-warm-white border border-gold/20">
                <PlaceholderImage aspectRatio="16/9" />
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-charcoal mb-2">{box.title}</h3>
                  <p className="font-body text-sm text-soft-gray leading-relaxed mb-3">{box.desc}</p>
                  <p className="font-heading text-xl text-gold mb-4">{box.price}</p>
                  <Link
                    href={box.href}
                    className="inline-block font-body text-xs uppercase tracking-widest border border-gold text-gold px-6 py-3 hover:bg-gold hover:text-warm-white transition-colors"
                  >
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
              <span
                key={occasion}
                className="font-body text-sm text-charcoal bg-blush/20 border border-blush/60 px-5 py-2 rounded-full tracking-wide hover:border-gold hover:text-gold transition-colors cursor-default"
              >
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
                is built around thoughtful gifting, elegant presentation, and pieces that add a little glow to everyday
                moments.
              </p>
              <p className="font-body text-soft-gray leading-relaxed">
                Whether it&apos;s a birthday, anniversary, Eid, or a simple "thinking of you" gift, Luna Clara is
                designed to make gifting feel easy, personal, and special.
              </p>
              <Link
                href="/about"
                className="inline-block font-body text-sm uppercase tracking-widest text-gold border-b border-gold pb-0.5 w-fit hover:text-gold-light transition-colors mt-2"
              >
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
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold text-lg flex-shrink-0">
              ✨
            </div>
            <p className="font-body text-sm text-charcoal">
              How to care for your Luna Clara pieces — keep them glowing longer.
            </p>
          </div>
          <Link
            href="/jewelry-care"
            className="font-body text-xs uppercase tracking-widest text-gold border border-gold px-5 py-2.5 hover:bg-gold hover:text-warm-white transition-colors flex-shrink-0"
          >
            Jewelry Care Guide
          </Link>
        </div>
      </section>
    </>
  );
}
