import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductsByCategory } from "@/data/products";
import CursorTilt from "@/components/CursorTilt";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Luna Finds — Luna Clara Designs",
  description: "Delicate earrings, necklaces, bracelets, and rings — each piece chosen for everyday elegance.",
};

export default function IndividualPage() {
  const products = getProductsByCategory("individual");

  return (
    <>
      {/* Header */}
      <div className="bg-champagne py-16 px-4 text-center border-b border-gold/10">
        <ScrollReveal>
          <p className="font-body text-xs uppercase tracking-[0.22em] text-gold mb-3">Shop</p>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal mb-4">Luna Finds</h1>
          <p className="font-body text-soft-gray max-w-md mx-auto leading-relaxed">
            Delicate earrings, necklaces, bracelets, and rings — each piece chosen for everyday elegance
            and effortless gifting.
          </p>
        </ScrollReveal>
      </div>

      {/* Product Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <CursorTilt glow key={product.id} className="group card-hover">
                <Link href={`/products/${product.slug}`}>
                  <div className="overflow-hidden border border-gold/10 group-hover:border-gold/30 transition-colors">
                    <ProductImage src={product.image} alt={product.title} aspectRatio="4/5" />
                  </div>
                </Link>
                <div className="pt-3 pb-4">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-body text-sm md:text-base text-charcoal mb-1 hover:text-gold transition-colors leading-snug">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2 mb-3">
                    <p className="font-body text-gold text-sm">${product.price.toFixed(2)}</p>
                    {product.compareAtPrice && (
                      <p className="font-body text-soft-gray text-xs line-through">${product.compareAtPrice.toFixed(2)}</p>
                    )}
                  </div>
                  <AddToCartButton product={{ id: product.id, title: product.title, price: product.price, imageUrl: product.image, category: product.category }} />
                </div>
              </CursorTilt>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
