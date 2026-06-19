"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useState,
} from "react";

const FOCUS_POINTS = [
  {
    label: "Earring",
    detail: "Starburst drop, closest to the Luna Clara symbol.",
    x: 36,
    y: 29,
    zoom: "120%",
    origin: "34% 25%",
  },
  {
    label: "Necklace",
    detail: "Delicate gold chain with a moonlit pendant.",
    x: 44,
    y: 60,
    zoom: "114%",
    origin: "45% 58%",
  },
  {
    label: "Bracelet",
    detail: "Soft gold sparkle at the wrist.",
    x: 86,
    y: 78,
    zoom: "122%",
    origin: "83% 78%",
  },
  {
    label: "Ring",
    detail: "A fine statement ring for the final close-up.",
    x: 62,
    y: 54,
    zoom: "120%",
    origin: "62% 54%",
  },
];

type ShowcaseStyle = CSSProperties & {
  "--focus-x": string;
  "--focus-y": string;
  "--tilt-x": string;
  "--tilt-y": string;
  "--focus-scale": string;
  "--focus-origin": string;
};

export default function JewelryFocusShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = FOCUS_POINTS[activeIndex];
  const [style, setStyle] = useState<ShowcaseStyle>({
    "--focus-x": `${active.x}%`,
    "--focus-y": `${active.y}%`,
    "--tilt-x": "0deg",
    "--tilt-y": "0deg",
    "--focus-scale": active.zoom,
    "--focus-origin": active.origin,
  });

  function setFocus(index: number, tiltX = "0deg", tiltY = "0deg") {
    const point = FOCUS_POINTS[index];
    setActiveIndex(index);
    setStyle({
      "--focus-x": `${point.x}%`,
      "--focus-y": `${point.y}%`,
      "--tilt-x": tiltX,
      "--tilt-y": tiltY,
      "--focus-scale": point.zoom,
      "--focus-origin": point.origin,
    });
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (window.innerWidth < 768) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const nextIndex = Math.min(
      FOCUS_POINTS.length - 1,
      Math.max(0, Math.floor(x * FOCUS_POINTS.length)),
    );

    setFocus(
      nextIndex,
      `${((0.5 - y) * 5).toFixed(2)}deg`,
      `${((x - 0.5) * 7).toFixed(2)}deg`,
    );
  }

  function resetTilt() {
    setFocus(activeIndex);
  }

  return (
    <div
      className="jewelry-focus-shell group relative overflow-hidden border border-gold/15 bg-cream"
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="jewelry-focus-image">
        <Image
          src="/products/luna-clara-jewelry-model.png"
          alt="Luna Clara model wearing gold earring, necklace, bracelet, and ring"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--focus-x)_var(--focus-y),rgba(255,255,255,0.05)_0,rgba(253,248,242,0)_18%,rgba(44,44,44,0.18)_74%)]" />
      <div
        className="pointer-events-none absolute h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/80 shadow-[0_0_32px_rgba(201,168,76,0.45)] transition-all duration-300"
        style={{ left: "var(--focus-x)", top: "var(--focus-y)" }}
      />

      <div
        className="absolute -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-full bg-warm-white/90 px-4 py-2 font-body text-xs uppercase tracking-widest text-gold shadow-lg ring-1 ring-gold/20 backdrop-blur transition-all duration-300"
        style={{ left: "var(--focus-x)", top: "var(--focus-y)" }}
      >
        {active.label}
      </div>

      <div className="absolute inset-x-4 bottom-4 bg-warm-white/90 p-4 shadow-xl ring-1 ring-gold/15 backdrop-blur md:inset-x-6 md:bottom-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <p className="font-body text-[0.65rem] uppercase tracking-[0.24em] text-gold">
              Focus {activeIndex + 1} of {FOCUS_POINTS.length}
            </p>
            <p className="mt-1 font-heading text-2xl text-charcoal">{active.label}</p>
          </div>
          <p className="max-w-[13rem] text-right font-body text-xs leading-relaxed text-soft-gray">
            {active.detail}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {FOCUS_POINTS.map((point, index) => (
            <button
              key={point.label}
              type="button"
              onClick={() => setFocus(index)}
              className={`h-1.5 rounded-full transition-colors ${
                index === activeIndex ? "bg-gold" : "bg-gold/20 hover:bg-gold/45"
              }`}
              aria-label={`Focus ${point.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
