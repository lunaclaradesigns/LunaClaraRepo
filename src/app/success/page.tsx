import Link from "next/link";

export const metadata = { title: "Order Confirmed — Luna Clara Designs" };

export default function SuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md flex flex-col items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center text-4xl">
          ✨
        </div>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal">Order Confirmed!</h1>
        <p className="font-body text-soft-gray leading-relaxed">
          Thank you for your Luna Clara order. We&apos;re preparing your pieces with care and will be in touch
          with shipping details soon.
        </p>
        <p className="font-body text-sm text-soft-gray">
          Questions? Email us at{" "}
          <a href="mailto:sales@lunaclaradesigns.com" className="text-gold hover:underline">
            sales@lunaclaradesigns.com
          </a>
        </p>
        <Link
          href="/"
          className="mt-2 bg-gold text-warm-white font-body text-sm uppercase tracking-widest px-8 py-4 hover:bg-gold-light hover:text-charcoal transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
