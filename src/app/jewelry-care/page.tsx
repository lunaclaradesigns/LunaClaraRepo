export const metadata = {
  title: "Jewelry Care — Luna Clara Designs",
  description: "How to care for your Luna Clara jewelry pieces and keep them glowing longer.",
};

const TIPS = [
  {
    icon: "💧",
    title: "Avoid Moisture",
    desc: "Keep jewelry away from water, perfume, lotion, hairspray, oils, and harsh chemicals.",
  },
  {
    icon: "🚿",
    title: "Remove Before Activities",
    desc: "Take off jewelry before showering, swimming, exercising, or sleeping.",
  },
  {
    icon: "📦",
    title: "Store Properly",
    desc: "Store each piece in a dry place when not in use — pouch, box, or separate compartment to prevent scratches and tangling.",
  },
  {
    icon: "✨",
    title: "Clean Gently",
    desc: "Use a soft cloth to gently wipe jewelry after wearing.",
  },
  {
    icon: "🤲",
    title: "Handle with Care",
    desc: "Avoid pulling, bending, or dropping delicate pieces.",
  },
  {
    icon: "🌙",
    title: "Separate Storage",
    desc: "Keep jewelry in its pouch or a separate compartment to prevent scratches and tangling.",
  },
];

export default function JewelryCarePage() {
  return (
    <>
      <div className="bg-champagne py-20 px-4 text-center border-b border-gold/10">
        <div className="text-4xl mb-4">✨</div>
        <p className="font-body text-xs uppercase tracking-[0.25em] text-gold mb-3">Tips & Care</p>
        <h1 className="font-heading text-5xl md:text-6xl text-charcoal mb-3">Jewelry Care</h1>
        <p className="font-body text-soft-gray max-w-md mx-auto">
          Help your Luna Clara pieces glow longer.
        </p>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TIPS.map((tip) => (
              <div key={tip.title} className="flex gap-4 p-6 bg-warm-white border border-gold/10 hover:border-gold/30 transition-colors">
                <div className="text-3xl flex-shrink-0">{tip.icon}</div>
                <div>
                  <h3 className="font-heading text-lg text-charcoal mb-1">{tip.title}</h3>
                  <p className="font-body text-sm text-soft-gray leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-champagne/60 border border-gold/20 text-center">
            <p className="font-heading text-xl text-charcoal mb-3">A Note on Fashion Jewelry</p>
            <p className="font-body text-soft-gray leading-relaxed max-w-2xl mx-auto">
              Many fashion jewelry pieces are delicate and should be handled with care. Proper care can help maintain
              the shine and appearance of your jewelry for longer. For any questions about a specific piece,
              don&apos;t hesitate to reach out.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
