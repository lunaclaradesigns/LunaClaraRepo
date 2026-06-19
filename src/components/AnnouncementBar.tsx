export default function AnnouncementBar() {
  return (
    <div className="bg-champagne border-b border-gold/20 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-8 py-2.5 text-xs font-body tracking-widest uppercase text-gold">
          {[1, 2].map((copy) => (
            <span key={copy} className="flex items-center gap-8 pr-8">
              <span>✨ Free local delivery available — Contact us for details ✨</span>
              <span>·</span>
              <span>🎁 Birthday · Anniversary · Eid · Mother&apos;s Day · Valentine&apos;s Day · Weddings · Bridesmaids</span>
              <span>·</span>
              <span>✉️ sales@lunaclaradesigns.com</span>
              <span>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
