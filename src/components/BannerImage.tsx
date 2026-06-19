"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  /** Tailwind height classes, e.g. "h-64 md:h-96" */
  heightClass?: string;
  priority?: boolean;
  children?: React.ReactNode;
};

export default function BannerImage({
  src,
  alt = "Luna Clara",
  className = "",
  heightClass = "h-64 md:h-96",
  priority = false,
  children,
}: Props) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative w-full overflow-hidden ${heightClass} ${className}`}>
      {!errored ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-champagne via-blush/20 to-cream flex items-center justify-center">
          <span className="text-soft-gray text-xs tracking-wider font-body uppercase">
            Banner image coming soon
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
