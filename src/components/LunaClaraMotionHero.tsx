"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const HERO_VIDEO_URL =
  process.env.NEXT_PUBLIC_LUNA_HERO_VIDEO_URL || "/products/luna-clara-hero-video-optimized.mp4";
const HERO_DESKTOP_VIDEO_URL = "/products/luna-clara-hero-video-desktop-lite.mp4";

function useTypewriter(text: string, speed = 38, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    const start = window.setTimeout(() => {
      let index = 0;
      interval = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, [speed, startDelay, text]);

  return { displayed, done };
}

export default function LunaClaraMotionHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { displayed, done } = useTypewriter("Jewelry that moves\nwith your moment.");

  // Avoid remote currentTime scrubbing. It works locally, but Vercel-hosted MP4
  // seeking can stall during cursor movement. Slow buffered playback stays smooth.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playSlowly = () => {
      const v = videoRef.current;
      if (!v) return;

      v.loop = true;
      v.muted = true;
      v.playbackRate = 0.55;
      void v.play().catch(() => undefined);
    };

    if (video.readyState >= 1) playSlowly();
    video.addEventListener("loadedmetadata", playSlowly);
    video.addEventListener("canplay", playSlowly);

    return () => {
      video.removeEventListener("loadedmetadata", playSlowly);
      video.removeEventListener("canplay", playSlowly);
    };
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden bg-cream lg:block lg:min-h-screen">
      {/* Background video / model layer */}
      <div className="pointer-events-none relative order-last aspect-square w-full overflow-hidden bg-cream md:aspect-video lg:absolute lg:inset-0 lg:z-0 lg:order-none lg:aspect-auto lg:h-full">
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          className="h-full w-full object-cover object-right lg:object-right-bottom"
        >
          <source src={HERO_DESKTOP_VIDEO_URL} media="(min-width: 1024px)" type="video/mp4" />
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>

        {/* Soft cream wash so the copy stays readable over the model */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-cream via-cream/85 to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/75 to-transparent lg:hidden" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 24%, rgba(242,181,192,0.18) 0%, transparent 36%)",
          }}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10 order-first flex w-full flex-col bg-cream pb-10 lg:order-none lg:min-h-screen lg:bg-transparent lg:pb-0">
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-12 lg:py-0">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <p className="luna-rise-in mb-6 font-body text-xs uppercase tracking-[0.25em] text-gold">
              Premium Gem - Designed in USA
            </p>

            <div className="luna-rise-in luna-rise-delay-1">
              <h1 className="mb-5 min-h-[2.2em] select-none whitespace-pre-wrap font-heading text-5xl leading-[1.02] text-charcoal md:text-6xl lg:text-7xl">
                {displayed}
                {!done && (
                  <span className="ml-[2px] inline-block h-[0.9em] w-[2px] translate-y-1 bg-gold align-middle animate-blink" />
                )}
              </h1>
              <p className="mb-8 font-heading text-3xl italic leading-tight text-gold sm:text-4xl">
                Follow the glow from piece to piece.
              </p>
            </div>

            <p className="luna-rise-in luna-rise-delay-2 mx-auto mb-10 max-w-xl font-body text-lg leading-relaxed text-soft-gray lg:mx-0">
              A slower glow follows the Luna Clara story - earring, necklace,
              bracelet, and ring - without interrupting the moment.
            </p>

            <div className="luna-rise-in luna-rise-delay-3 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/collections/individual"
                className="bg-gold px-8 py-4 text-center font-body text-sm uppercase tracking-widest text-warm-white transition-colors hover:bg-gold-light hover:text-charcoal"
              >
                Shop Jewelry
              </Link>
              <Link
                href="/collections/medium-box"
                className="border border-gold px-8 py-4 text-center font-body text-sm uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-warm-white"
              >
                Explore Gift Boxes
              </Link>
            </div>

            <div className="luna-rise-in luna-rise-delay-3 mt-10 hidden items-center gap-2 font-body text-[0.7rem] uppercase tracking-[0.22em] text-gold/80 lg:flex">
              <span className="animate-bounce text-base leading-none">&darr;</span>
              Slow motion glow
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}