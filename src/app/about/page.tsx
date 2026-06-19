import ProductImage from "@/components/ProductImage";
import Link from "next/link";

export const metadata = {
  title: "About — Luna Clara Designs",
  description: "Learn the story behind Luna Clara Designs — premium jewelry and curated gift boxes, designed in USA.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-champagne py-20 px-4 text-center border-b border-gold/10">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-gold mb-3">Our Story</p>
        <h1 className="font-heading text-5xl md:text-6xl text-charcoal">About Luna Clara</h1>
      </div>

      {/* Main content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <p className="font-body text-soft-gray leading-8 text-base">
              At Luna Clara, we believe jewelry should feel more than beautiful — it should feel meaningful.
            </p>
            <p className="font-body text-soft-gray leading-8 text-base">
              Our brand is created around thoughtful gifting, elegant presentation, and pieces that add a little
              glow to everyday moments. Whether it is for a birthday, anniversary, Eid, wedding, Mother&apos;s Day,
              Valentine&apos;s Day, or a simple &ldquo;thinking of you&rdquo; gift, Luna Clara is designed to make
              gifting feel easy, personal, and special.
            </p>
            <p className="font-body text-soft-gray leading-8 text-base">
              Each piece is carefully selected with style, beauty, and wearability in mind. From delicate earrings
              to bracelets, necklaces, rings, and curated gift sets, our goal is to offer jewelry that feels elegant,
              romantic, and gift-ready without feeling out of reach.
            </p>
            <p className="font-body text-soft-gray leading-8 text-base">
              We focus on the full experience — from the jewelry to the packaging, finishing touches, and the feeling
              someone gets when they open their gift.
            </p>
            <p className="font-heading text-xl text-gold italic mt-2">
              Luna Clara — Made to glow with you.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-gold/10">
            <ProductImage src="/products/about.jpg" alt="The Luna Clara story" aspectRatio="4/5" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: "✨", title: "Thoughtful Gifting", desc: "Every piece is chosen with care, so your gift always lands perfectly." },
            { icon: "🌙", title: "Elegant Presentation", desc: "Gift-ready packaging that makes opening a Luna Clara box feel special." },
            { icon: "💛", title: "Made with Love", desc: "Curated in Illinois, USA — designed to make people glow." },
          ].map((v) => (
            <div key={v.title} className="flex flex-col items-center gap-3 p-6">
              <div className="text-4xl">{v.icon}</div>
              <h3 className="font-heading text-xl text-charcoal">{v.title}</h3>
              <p className="font-body text-sm text-soft-gray leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-champagne text-center">
        <h2 className="font-heading text-3xl text-charcoal mb-4">Ready to find the perfect piece?</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link href="/collections/individual"
            className="bg-gold text-warm-white font-body text-sm uppercase tracking-widest px-8 py-4 hover:bg-gold-light hover:text-charcoal transition-colors">
            Shop Individual Items
          </Link>
          <Link href="/collections/medium-box"
            className="border border-gold text-gold font-body text-sm uppercase tracking-widest px-8 py-4 hover:bg-gold hover:text-warm-white transition-colors">
            View Gift Boxes
          </Link>
        </div>
      </section>
    </>
  );
}
