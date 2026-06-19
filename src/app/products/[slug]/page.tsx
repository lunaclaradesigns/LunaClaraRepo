import PlaceholderImage from "@/components/PlaceholderImage";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = {
    id: slug,
    title: "Jewelry Piece",
    price: 28,
    category: "individual",
    description:
      "A beautifully crafted piece designed with elegance in mind. Perfect as a personal treat or a thoughtful gift for someone special.",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 font-body text-xs text-soft-gray uppercase tracking-wider">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span>/</span>
        <Link href="/collections/individual" className="hover:text-gold transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-charcoal">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Images */}
        <div className="flex flex-col gap-3">
          <PlaceholderImage aspectRatio="4/5" />
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-gold/10 overflow-hidden cursor-pointer hover:border-gold transition-colors">
                <PlaceholderImage aspectRatio="1/1" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5 md:pt-4">
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-gold mb-2">Luna Clara Designs</p>
            <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">{product.title}</h1>
            <p className="font-heading text-3xl text-gold">${product.price.toFixed(2)}</p>
          </div>

          <div className="w-12 h-px bg-gold/30" />

          <p className="font-body text-soft-gray leading-relaxed">{product.description}</p>

          <div className="flex flex-col gap-3 mt-2">
            <AddToCartButton product={product} className="py-4 text-sm" />
            <Link
              href="/cart"
              className="w-full text-center bg-charcoal text-warm-white font-body text-sm uppercase tracking-widest py-4 hover:bg-charcoal/80 transition-colors"
            >
              Buy Now
            </Link>
          </div>

          {/* Details accordion placeholder */}
          <div className="mt-4 border-t border-gold/10 pt-4 flex flex-col gap-3">
            {[
              { label: "Materials", value: "Gold-tone alloy, hypoallergenic" },
              { label: "Care", value: "Avoid water, perfume, and chemicals. Store in pouch." },
              { label: "Shipping", value: "1–3 business days processing. Free local delivery available." },
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                <span className="font-body text-xs uppercase tracking-wider text-soft-gray w-24 flex-shrink-0 pt-0.5">
                  {item.label}
                </span>
                <span className="font-body text-sm text-charcoal">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
