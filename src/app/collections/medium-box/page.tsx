import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import AddToCartButton from "@/components/AddToCartButton";

const BOXES = [
  { id: "mb1", title: "Blossom Gift Box", price: 65, category: "medium-box", desc: "A soft, romantic set — perfect for birthdays and Eid." },
  { id: "mb2", title: "Moonlight Gift Box", price: 72, category: "medium-box", desc: "Golden accents and delicate pearls, elegantly wrapped." },
  { id: "mb3", title: "Aurora Gift Box", price: 68, category: "medium-box", desc: "A curated trio of everyday-wear jewelry pieces." },
];

export const metadata = {
  title: "Medium Gift Box — Luna Clara Designs",
  description: "Beautifully curated gift boxes with 2–3 jewelry pieces, elegantly presented and ready to give.",
};

export default function MediumBoxPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BOXES.map((box) => (
              <div key={box.id} className="group card-hover bg-warm-white border border-gold/10 group-hover:border-gold/30 transition-colors">
                <Link href={`/products/${box.id}`}>
                  <PlaceholderImage aspectRatio="4/5" />
                </Link>
                <div className="p-5">
                  <Link href={`/products/${box.id}`}>
                    <h3 className="font-heading text-xl text-charcoal mb-2 hover:text-gold transition-colors">{box.title}</h3>
                  </Link>
                  <p className="font-body text-sm text-soft-gray mb-3 leading-relaxed">{box.desc}</p>
                  <p className="font-body text-gold text-base mb-4">${box.price.toFixed(2)}</p>
                  <AddToCartButton product={box} />
                </div>
              </div>
            ))}
          </div>

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
