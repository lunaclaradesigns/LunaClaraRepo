export const metadata = {
  title: "Contact — Luna Clara Designs",
  description: "Get in touch with Luna Clara Designs for orders, gift boxes, or custom gift requests.",
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-charcoal py-20 px-4 text-center">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-gold mb-3">Get in Touch</p>
        <h1 className="font-heading text-5xl md:text-6xl text-warm-white mb-4">
          We&apos;d Love to Hear From You
        </h1>
        <p className="font-body text-white/60 max-w-md mx-auto">
          For questions about products, orders, gift boxes, local pickup, or custom gift requests, please reach out.
        </p>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Contact details */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-heading text-3xl text-charcoal mb-6">Contact Details</h2>
              <div className="flex flex-col gap-5">
                <a href="mailto:sales@lunaclaradesigns.com"
                  className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-xs uppercase tracking-wider text-soft-gray mb-0.5">Email</p>
                    <p className="font-body text-sm text-charcoal group-hover:text-gold transition-colors">
                      sales@lunaclaradesigns.com
                    </p>
                  </div>
                </a>

                <a href="https://www.instagram.com/lunaclara_jewel/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-xs uppercase tracking-wider text-soft-gray mb-0.5">Instagram</p>
                    <p className="font-body text-sm text-charcoal group-hover:text-gold transition-colors">@lunaclara_jewel</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-xs uppercase tracking-wider text-soft-gray mb-0.5">Location</p>
                    <p className="font-body text-sm text-charcoal">Illinois, USA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-champagne border border-gold/20">
              <p className="font-body text-sm text-soft-gray leading-7">
                We usually respond as soon as possible during normal business hours. Thank you for supporting
                Luna Clara and allowing us to be part of your special moments.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="font-heading text-3xl text-charcoal mb-6">Send a Message</h2>
            <form
              action="https://formspree.io/f/placeholder"
              method="POST"
              className="flex flex-col gap-4"
            >
              <div>
                <label className="font-body text-xs uppercase tracking-wider text-soft-gray block mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gold/20 bg-warm-white px-4 py-3 font-body text-sm text-charcoal placeholder-soft-gray focus:outline-none focus:border-gold transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-wider text-soft-gray block mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gold/20 bg-warm-white px-4 py-3 font-body text-sm text-charcoal placeholder-soft-gray focus:outline-none focus:border-gold transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-wider text-soft-gray block mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full border border-gold/20 bg-warm-white px-4 py-3 font-body text-sm text-charcoal placeholder-soft-gray focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="bg-gold text-warm-white font-body text-sm uppercase tracking-widest py-4 hover:bg-gold-light hover:text-charcoal transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
