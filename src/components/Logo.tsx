"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  /** "landscape" = supplied wide logo. "mark" = compact icon. */
  variant?: "light" | "gold" | "footer" | "mark" | "landscape";
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

// Uses transparent SVG assets so the logo sits cleanly on the site background.
const SOURCES: Record<string, { real: string; fallback: string }> = {
  light: { real: "/luna-clara-logo-gold.svg", fallback: "/luna-clara-logo-gold.svg" },
  gold: { real: "/brand/embossed-logo.png", fallback: "/luna-clara-logo-gold.svg" },
  footer: { real: "/brand/embossed-logo-footer.png", fallback: "/luna-clara-logo-gold.svg" },
  mark: { real: "/luna-clara-mark.svg", fallback: "/luna-clara-mark.svg" },
  landscape: {
    real: "/brand/luna-clara-landscape-logo.png",
    fallback: "/luna-clara-logo-gold.svg",
  },
};

export default function Logo({
  variant = "light",
  width = 120,
  height = 120,
  className = "",
  priority = false,
}: Props) {
  const { real, fallback } = SOURCES[variant];
  const [src, setSrc] = useState(real);

  return (
    <Image
      src={src}
      alt="Luna Clara Designs"
      width={width}
      height={height}
      priority={priority}
      className={`object-contain ${className}`}
      onError={() => {
        if (src !== fallback) setSrc(fallback);
      }}
    />
  );
}
