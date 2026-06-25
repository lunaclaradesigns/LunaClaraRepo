"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number; // max tilt in degrees
  glow?: boolean;
};

export default function CursorTilt({ children, className = "", max = 6, glow = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    el.style.setProperty("--lc-ry", `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
    el.style.setProperty("--lc-rx", `${(-(py - 0.5) * 2 * max).toFixed(2)}deg`);
    el.style.setProperty("--lc-tz", "16px");
    el.style.setProperty("--lc-gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--lc-gy", `${(py * 100).toFixed(1)}%`);
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--lc-rx", "0deg");
    el.style.setProperty("--lc-ry", "0deg");
    el.style.setProperty("--lc-tz", "0px");
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={`lc-tilt ${glow ? "lc-glow-follow" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
