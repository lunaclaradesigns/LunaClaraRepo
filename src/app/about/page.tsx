import Link from "next/link";
import JewelryFocusShowcase from "@/components/JewelryFocusShowcase";

export const metadata = {
  title: "About - Luna Clara Designs",
  description:
    "Learn the story behind Luna Clara Designs, premium jewelry and curated gift boxes designed in USA.",
};

export default function AboutPage() {
  return (
    <>
      <div className="border-b border-gold/10 bg-champagne px-4 py-20 text-center">
        <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-gold">Our Story</p>
        <h1 className="font-heading text-5xl text-charcoal md:text-6xl">About Luna Clara</h1>
      </div>

      <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <p className="font-body text-base leading-8 text-soft-gray">
              At Luna Clara, jewelry should feel more than beautiful. It should feel meaningful.
            </p>
            <p className="font-body text-base leading-8 text-soft-gray">
              Our brand is created around thoughtful gifting, elegant presentation, and pieces that add a little glow
              to everyday moments. Whether it is for a birthday, anniversary, Eid, wedding, Mother&apos;s Day, Valentine&apos;s
              Day, or a simple thinking-of-you gift, Luna Clara is designed to make gifting feel easy and personal.
            </p>
            <p className="font-body text-base leading-8 text-soft-gray">
              Each piece is selected for style, beauty, and wearability. From delicate earrings to bracelets,
              necklaces, rings, and curated gift sets, our goal is jewelry that feels elegant, romantic, and gift-ready.
            </p>
            <p className="font-body text-base leading-8 text-soft-gray">
              Move your cursor across the image to preview the story in order: earring, necklace, bracelet, and ring.
            </p>
            <p className="mt-2 font-heading text-xl italic text-gold">
              Luna Clara - Made to glow with you.
            </p>
          </div>

          <JewelryFocusShowcase />
        </div>
      </section>

      <section className="bg-warm-white px-4 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 text-center md:grid-cols-3">
          {[
            {
              icon: "*",
              title: "Thoughtful Gifting",
              desc: "Every piece is chosen with care, so your gift always lands perfectly.",
            },
            {
              icon: "LC",
              title: "Elegant Presentation",
              desc: "Gift-ready packaging that makes opening a Luna Clara box feel special.",
            },
            {
              icon: "<3",
              title: "Made with Love",
              desc: "Curated in Illinois, USA and designed to make people glow.",
            },
          ].map((v) => (
            <div key={v.title} className="flex flex-col items-center gap-3 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 font-heading text-lg text-gold">
                {v.icon}
              </div>
              <h3 className="font-heading text-xl text-charcoal">{v.title}</h3>
              <p className="font-body text-sm leading-relaxed text-soft-gray">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-champagne px-4 py-16 text-center">
        <h2 className="mb-4 font-heading text-3xl text-charcoal">Ready to find the perfect piece?</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/collections/individual"
            className="bg-gold px-8 py-4 font-body text-sm uppercase tracking-widest text-warm-white transition-colors hover:bg-gold-light hover:text-charcoal"
          >
            Shop Individual Items
          </Link>
          <Link
            href="/collections/medium-box"
            className="border border-gold px-8 py-4 font-body text-sm uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-warm-white"
          >
            View Gift Boxes
          </Link>
        </div>
      </section>
    </>
  );
}
