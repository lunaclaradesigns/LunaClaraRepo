export const metadata = {
  title: "Shipping & Returns — Luna Clara Designs",
  description: "Shipping, local pickup, and return policy for Luna Clara Designs.",
};

export default function ShippingReturnsPage() {
  return (
    <>
      <div className="bg-champagne py-20 px-4 text-center border-b border-gold/10">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-gold mb-3">Policies</p>
        <h1 className="font-heading text-5xl md:text-6xl text-charcoal">Shipping, Pickup & Returns</h1>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">

          {/* Shipping */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">📦</span>
              <h2 className="font-heading text-3xl text-charcoal">Shipping</h2>
            </div>
            <div className="font-body text-soft-gray leading-8 flex flex-col gap-3">
              <p>
                We carefully prepare and package each order before shipping. Orders are typically processed within
                1–3 business days after payment is confirmed. Shipping times may vary depending on destination,
                carrier, holidays, and weather conditions.
              </p>
              <p>
                Once your order has shipped, tracking information will be provided when available. Please make sure
                your shipping address is correct before placing your order. Luna Clara is not responsible for delays
                or delivery issues caused by incorrect or incomplete addresses.
              </p>
            </div>
          </div>

          {/* Local */}
          <div className="border-t border-gold/10 pt-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">📍</span>
              <h2 className="font-heading text-3xl text-charcoal">Local Pickup or Delivery</h2>
            </div>
            <p className="font-body text-soft-gray leading-8">
              Local pickup or local delivery may be available depending on location and order type. Please contact
              us before placing your order if you would like to ask about local options.
            </p>
          </div>

          {/* Returns */}
          <div className="border-t border-gold/10 pt-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">🔄</span>
              <h2 className="font-heading text-3xl text-charcoal">Returns & Exchanges</h2>
            </div>
            <div className="font-body text-soft-gray leading-8 flex flex-col gap-3">
              <p>
                Due to the personal nature of jewelry, all items must be unused, unworn, and in original packaging
                to be considered for return or exchange. For hygiene reasons, earrings may be final sale unless
                they arrive damaged or defective.
              </p>
              <p>
                If your item arrives damaged or there is an issue with your order, please contact us within 48 hours
                of delivery with your order details and clear photos of the item and packaging. We will review the
                issue and do our best to make it right.
              </p>
            </div>

            <div className="mt-6 p-6 bg-blush/10 border border-blush/30">
              <p className="font-heading text-lg text-charcoal mb-3">Returns are NOT accepted for:</p>
              <ul className="font-body text-sm text-soft-gray flex flex-col gap-2">
                {[
                  "Used or worn jewelry",
                  "Items without original packaging",
                  "Custom or personalized orders",
                  "Final sale or clearance items",
                  "Damage caused by improper use, water exposure, perfume, lotion, or chemicals",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-body text-sm text-soft-gray mt-4 leading-7">
              Customers may be responsible for return shipping unless the item arrived damaged or incorrect.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="border-t border-gold/10 pt-8 text-center">
            <p className="font-body text-sm text-soft-gray mb-4">Have a question about your order?</p>
            <a
              href="mailto:sales@lunaclaradesigns.com"
              className="inline-block bg-gold text-warm-white font-body text-xs uppercase tracking-widest px-8 py-3 hover:bg-gold-light hover:text-charcoal transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
