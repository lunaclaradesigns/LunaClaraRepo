"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src?: string;
  alt?: string;
  aspectRatio?: "4/5" | "16/9" | "1/1" | "3/4";
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const paddingMap: Record<string, string> = {
  "4/5": "125%",
  "16/9": "56.25%",
  "1/1": "100%",
  "3/4": "133.33%",
};

export default function ProductImage({
  src,
  alt = "Luna Clara product",
  aspectRatio = "4/5",
  label = "Image coming soon",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 50vw, 25vw",
}: Props) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ paddingBottom: paddingMap[aspectRatio] }}
    >
      {showImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="absolute inset-0 placeholder-image flex-col gap-1">
          <svg className="w-8 h-8 text-gold/30 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-soft-gray text-xs tracking-wider font-body">{label}</span>
        </div>
      )}
    </div>
  );
}
