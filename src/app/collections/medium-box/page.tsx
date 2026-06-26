import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductsByCategory } from "@/data/products";
import CursorTilt from "@/components/CursorTilt";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Signature Gift Box — Luna Clara Designs",
  description: "Beautifully curated gift boxes with 2–3 jewelry pieces, elegantly presented and ready to give.",
};

export default function MediumBoxPage() {
  const boxes = getProductsByCategory("medium-box");

  return (
    <>
      <div className="bg-champagne py-16 px-4 text-center border-b border-gold/10">
        <ScrollReveal>
          <p className="font-body text-xs uppercase tracking-[0.22em] text-gold mb-3">Gift Boxes</p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal mb-4">Signature Gift Box</h1>
          <p className="font-body text-soft-gray max-w-md mx-auto leading-relaxed">
            A beautifully curated gift box with 2–3 jewelry pieces, elegantly presented and ready to gift.
            Perfect for birthdays, Eid, and anniversaries.
          </p>
        </ScrollReveal>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {boxes.map((box) => (
              <CursorTilt glow key={box.id}>
                <div className="group card-hover bg-warm-white border border-gold/10">
                  <Link href={`/products/${box.slug}`}>
                    <ProductImage src={box.image} alt={box.title} aspectRatio="4/5" sizes="(max-width: 768px) 100vw, 33vw" />
                  </Link>
                  <div className="p-5">
                    <Link href={`/products/${box.slug}`}>
                      <h3 className="font-heading text-xl text-charcoal mb-2 hover:text-gold transition-colors">{box.title}</h3>
                    </Link>
                    <p className="font-body text-sm text-soft-gray mb-3 leading-relaxed">{box.description}</p>
                    <p className="font-body text-gold text-base mb-4">${box.price.toFixed(2)}</p>
                    <AddToCartButton product={{ id: box.id, title: box.title, price: box.price, imageUrl: box.image, category: box.category }} />
                  </div>
                </div>
              </CursorTilt>
            ))}
          </div>

          <div className="mt-12 p-6 bg-champagne border border-gold/20 text-center">
            <p className="font-heading text-xl text-charcoal mb-2">What&apos;s Inside?</p>
            <p className="font-body text-sm text-soft-gray leading-relaxed max-w-lg mx-auto">
              Each Signature Gift Box includes 2–3 hand-selected jewelry pieces, elegant packaging, a satin ribbon,
              and a gift-ready presentation. No wrapping needed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
