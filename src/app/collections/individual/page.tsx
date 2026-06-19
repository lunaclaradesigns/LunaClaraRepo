import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import AddToCartButton from "@/components/AddToCartButton";

const PRODUCTS = [
  { id: "e1", title: "Gold Crescent Earrings", price: 28, category: "individual" },
  { id: "e2", title: "Pearl Drop Earrings", price: 32, category: "individual" },
  { id: "n1", title: "Pearl Charm Necklace", price: 36, category: "individual" },
  { id: "n2", title: "Layered Gold Necklace", price: 42, category: "individual" },
  { id: "b1", title: "Delicate Chain Bracelet", price: 24, category: "individual" },
  { id: "b2", title: "Gold Bangle", price: 26, category: "individual" },
  { id: "r1", title: "Starburst Ring", price: 22, category: "individual" },
  { id: "r2", title: "Twisted Band Ring", price: 19, category: "individual" },
];

export const metadata = {
  title: "Individual Items — Luna Clara Designs",
  description: "Delicate earrings, necklaces, bracelets, and rings — each piece chosen for everyday elegance.",
};

export default function IndividualPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-champagne py-16 px-4 text-center border-b border-gold/10">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-gold mb-3">Shop</p>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">Individual Items</h1>
        <p className="font-body text-soft-gray max-w-md mx-auto leading-relaxed">
          Delicate earrings, necklaces, bracelets, and rings — each piece chosen for everyday elegance
          and effortless gifting.
        </p>
      </div>

      {/* Product Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group card-hover">
                <Link href={`/products/${product.id}`}>
                  <div className="overflow-hidden border border-gold/10 group-hover:border-gold/30 transition-colors">
                    <PlaceholderImage aspectRatio="4/5" />
                  </div>
                </Link>
                <div className="pt-3 pb-4">
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
    </>
  );
}
