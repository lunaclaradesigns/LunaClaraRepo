import ProductImage from "@/components/ProductImage";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product ? `${product.title} — Luna Clara Designs` : "Product — Luna Clara Designs",
    description: product?.description ?? "Luna Clara Designs jewelry.",
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];

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
          <div className="border border-gold/10 overflow-hidden">
            <ProductImage src={product.image} alt={product.title} aspectRatio="4/5" priority sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {gallery.slice(0, 4).map((img, i) => (
                <div key={i} className="border border-gold/10 overflow-hidden cursor-pointer hover:border-gold transition-colors">
                  <ProductImage src={img} alt={`${product.title} ${i + 1}`} aspectRatio="1/1" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5 md:pt-4">
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-gold mb-2">Luna Clara Designs</p>
            <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-3">{product.title}</h1>
            <div className="flex items-baseline gap-3">
              <p className="font-heading text-3xl text-gold">${product.price.toFixed(2)}</p>
              {product.compareAtPrice && (
                <p className="font-body text-lg text-soft-gray line-through">${product.compareAtPrice.toFixed(2)}</p>
              )}
            </div>
          </div>

          <div className="w-12 h-px bg-gold/30" />

          <p className="font-body text-soft-gray leading-relaxed">{product.description}</p>

          <div className="flex flex-col gap-3 mt-2">
            <AddToCartButton
              product={{ id: product.id, title: product.title, price: product.price, imageUrl: product.image, category: product.category }}
              className="py-4 text-sm"
            />
            <Link
              href="/cart"
              className="w-full text-center bg-charcoal text-warm-white font-body text-sm uppercase tracking-widest py-4 hover:bg-charcoal/80 transition-colors"
            >
              View Cart
            </Link>
          </div>

          {/* Details */}
          <div className="mt-4 border-t border-gold/10 pt-4 flex flex-col gap-3">
            {[
              { label: "SKU", value: product.sku },
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
