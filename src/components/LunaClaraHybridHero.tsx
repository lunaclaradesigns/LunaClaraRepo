"use client";

import Link from "next/link";
import Script from "next/script";
import { createElement, useEffect, useRef, useState } from "react";

const SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? "";
const VIDEO_URL = "/products/ad-3.mp4";
const SPLINE_VIEWER_SRC =
  "https://unpkg.com/@splinetool/viewer@1.10.57/build/spline-viewer.js";

export default function LunaClaraHybridHero() {
  const [use3d, setUse3d] = useState(false);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.innerWidth >= 1024;
    setUse3d(Boolean(SCENE_URL) && desktop && !reduce);
  }, []);

  function handleMove(e: React.PointerEvent<HTMLElement>) {
    const el = copyRef.current;
    if (!el || window.innerWidth < 1024) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    el.style.transform = `translate3d(${(-x).toFixed(1)}px, ${(-y).toFixed(1)}px, 0)`;
    el.style.setProperty("--lc-gx", `${(e.clientX / window.innerWidth) * 100}%`);
    el.style.setProperty("--lc-gy", `${(e.clientY / window.innerHeight) * 100}%`);
  }

  return (
    <section
      onPointerMove={handleMove}
      className="relative flex min-h-[78vh] flex-col overflow-hidden bg-cream lg:min-h-screen lg:block"
    >
      {/* Visual layer */}
      <div className="pointer-events-none relative order-last aspect-square w-full overflow-hidden bg-cream md:aspect-video lg:absolute lg:inset-0 lg:z-0 lg:order-none lg:h-full lg:aspect-auto">
        {use3d ? (
          <>
            <Script src={SPLINE_VIEWER_SRC} strategy="afterInteractive" type="module" />
            {createElement("spline-viewer", {
              url: SCENE_URL,
              "events-target": "global",
              loading: "lazy",
              style: { width: "100%", height: "100%", display: "block", background: "transparent" },
              "aria-label": "Interactive Luna Clara jewelry scene",
            })}
          </>
        ) : (
          <video
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            poster="/products/luna-clara-spline-fallback.png"
            className="h-full w-full object-cover object-center lg:object-right"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        )}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-cream via-cream/80 to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/80 to-transparent lg:hidden" />
      </div>

      {/* Copy layer */}
      <div className="relative z-10 order-first flex w-full flex-col bg-cream pb-10 lg:order-none lg:min-h-screen lg:bg-transparent lg:pb-0">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-12 lg:py-0">
          <div ref={copyRef} className="mx-auto max-w-2xl text-center transition-transform duration-300 lg:mx-0 lg:text-left">
            <p className="mb-6 font-body text-xs uppercase tracking-[0.28em] text-gold">
              Premium Gem · Designed in USA
            </p>
            <h1 className="mb-5 font-display text-6xl leading-[0.98] text-charcoal md:text-7xl lg:text-8xl">
              Made to Glow<br />With You
            </h1>
            <p className="mb-8 font-display text-3xl italic leading-tight text-gold sm:text-4xl">
              A celestial touch for timeless moments.
            </p>
            <p className="mx-auto mb-10 max-w-xl font-body text-lg leading-relaxed text-soft-gray lg:mx-0">
              Curated jewelry and gift boxes, designed to make every celebration feel personal.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/collections/individual"
                className="bg-gold px-9 py-4 text-center font-body text-sm uppercase tracking-widest text-warm-white transition-colors hover:bg-gold-light hover:text-charcoal"
              >
                Shop Jewelry
              </Link>
              <Link
                href="/collections/medium-box"
                className="border border-gold px-9 py-4 text-center font-body text-sm uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-warm-white"
              >
                Explore Gift Boxes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
