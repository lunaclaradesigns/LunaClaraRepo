"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  /** "light" = for light backgrounds (nav). "gold" = transparent gold (dark footer). */
  variant?: "light" | "gold";
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

// Tries the owner's real uploaded logo first; falls back to the built-in SVG.
const SOURCES: Record<string, { real: string; fallback: string }> = {
  light: { real: "/logo.png", fallback: "/luna-clara-logo.svg" },
  gold: { real: "/logo-gold.png", fallback: "/luna-clara-logo-gold.svg" },
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
