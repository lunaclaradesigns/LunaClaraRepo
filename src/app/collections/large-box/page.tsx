import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import AddToCartButton from "@/components/AddToCartButton";

const BOXES = [
  { id: "lb1", title: "Luna Luxe Box", price: 110, category: "large-box", desc: "Our most popular premium set — 5 pieces in a velvet-lined box." },
  { id: "lb2", title: "Celestial Gift Box", price: 125, category: "large-box", desc: "Gold-tone statement pieces with a moonlight aesthetic." },
  { id: "lb3", title: "Bridal Gift Box", price: 140, category: "large-box", desc: "Perfect for weddings, bridesmaids, and milestone gifts." },
];

export const metadata = {
  title: "Large Gift Box — Luna Clara Designs",
  description: "Our premium gift experience with 4–5 jewelry pieces, luxury packaging, and finishing touches.",
};

export default function LargeBoxPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BOXES.map((box) => (
              <div key={box.id} className="group card-hover bg-warm-white border border-gold/20 group-hover:border-gold/60 transition-colors">
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
