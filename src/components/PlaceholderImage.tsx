type Props = {
  aspectRatio?: "4/5" | "16/9" | "1/1" | "3/4";
  label?: string;
  className?: string;
};

export default function PlaceholderImage({
  aspectRatio = "4/5",
  label = "Image coming soon",
  className = "",
}: Props) {
  const paddingMap: Record<string, string> = {
    "4/5": "125%",
    "16/9": "56.25%",
    "1/1": "100%",
    "3/4": "133.33%",
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ paddingBottom: paddingMap[aspectRatio] }}
    >
      <div className="absolute inset-0 placeholder-image flex-col gap-1">
        <svg className="w-8 h-8 text-gold/30 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-soft-gray text-xs tracking-wider font-body">{label}</span>
      </div>
    </div>
  );
}
