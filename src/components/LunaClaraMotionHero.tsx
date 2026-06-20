"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";

const FOCUS_STEPS = [
  {
    label: "Earring",
    title: "Begin at the earring",
    copy: "The first shimmer lands near the face, soft and bright against the Luna Clara glow.",
    x: 36,
    y: 29,
    origin: "34% 25%",
  },
  {
    label: "Necklace",
    title: "Glide to the necklace",
    copy: "Move down and the story settles on the pendant, where the gold catches warmer light.",
    x: 44,
    y: 60,
    origin: "45% 58%",
  },
  {
    label: "Bracelet",
    title: "Move to the wrist",
    copy: "A bracelet moment adds movement, sparkle, and a gift-ready finish.",
    x: 86,
    y: 78,
    origin: "84% 78%",
  },
  {
    label: "Ring",
    title: "Finish on the ring",
    copy: "The final close-up lands on a delicate ring made for everyday celebration.",
    x: 62,
    y: 54,
    origin: "62% 54%",
  },
];

type HeroStyle = CSSProperties & {
  "--focus-x": string;
  "--focus-y": string;
  "--focus-origin": string;
  "--tilt-x": string;
  "--tilt-y": string;
  "--media-x": string;
  "--media-y": string;
  "--media-scale": string;
  "--progress": string;
};

const DEFAULT_HERO_VIDEO_URL = "/products/luna-clara-hero-video.mp4";

function useTypewriter(text: string, speed = 34, startDelay = 450) {
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

function createHeroStyle(
  index: number,
  tiltX = "0deg",
  tiltY = "0deg",
  progress?: number,
  mediaX = "0px",
  mediaY = "0px",
  mediaScale = "1.04",
): HeroStyle {
  const step = FOCUS_STEPS[index];

  return {
    "--focus-x": `${step.x}%`,
    "--focus-y": `${step.y}%`,
    "--focus-origin": step.origin,
    "--tilt-x": tiltX,
    "--tilt-y": tiltY,
    "--media-x": mediaX,
    "--media-y": mediaY,
    "--media-scale": mediaScale,
    "--progress": `${progress ?? index / (FOCUS_STEPS.length - 1)}`,
  };
}

export default function LunaClaraMotionHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const videoUrl = process.env.NEXT_PUBLIC_LUNA_HERO_VIDEO_URL || DEFAULT_HERO_VIDEO_URL;
  const [activeIndex, setActiveIndex] = useState(0);
  const { displayed, done } = useTypewriter("Jewelry that moves\nwith your moment.");

  const active = FOCUS_STEPS[activeIndex];
  const [dynamicStyle, setDynamicStyle] = useState<HeroStyle>(() => createHeroStyle(0));

  useEffect(() => {
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const scrubVideoToProgress = useCallback(
    (progress: number) => {
      const safeProgress = Math.min(1, Math.max(0, progress));
      lastProgressRef.current = safeProgress;
      targetProgressRef.current = safeProgress;

      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

      video.pause();

      if (frameRef.current) return;

      const animateToTarget = () => {
        const currentVideo = videoRef.current;
        if (
          !currentVideo ||
          !Number.isFinite(currentVideo.duration) ||
          currentVideo.duration <= 0
        ) {
          frameRef.current = null;
          return;
        }

        const targetTime = Math.min(
          Math.max(currentVideo.duration - 0.05, 0),
          Math.max(0, currentVideo.duration * targetProgressRef.current),
        );
        const diff = targetTime - currentVideo.currentTime;

        if (Math.abs(diff) < 0.018) {
          currentVideo.currentTime = targetTime;
          frameRef.current = null;
          return;
        }

        currentVideo.currentTime += diff * 0.18;
        frameRef.current = window.requestAnimationFrame(animateToTarget);
      };

      frameRef.current = window.requestAnimationFrame(animateToTarget);
    },
    [],
  );

  function syncFocusFromPointer(event: ReactPointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    const nextIndex = Math.min(
      FOCUS_STEPS.length - 1,
      Math.max(0, Math.floor(y * FOCUS_STEPS.length)),
    );

    setActiveIndex(nextIndex);
    setDynamicStyle(
      createHeroStyle(
        nextIndex,
        `${((0.5 - y) * 9).toFixed(2)}deg`,
        `${((x - 0.5) * 12).toFixed(2)}deg`,
        y,
        `${((x - 0.5) * -24).toFixed(2)}px`,
        `${((y - 0.5) * -18).toFixed(2)}px`,
        "1.08",
      ),
    );

    scrubVideoToProgress(y);
  }

  function resetTilt() {
    setDynamicStyle((current) => ({
      ...current,
      "--tilt-x": "0deg",
      "--tilt-y": "0deg",
      "--media-x": "0px",
      "--media-y": "0px",
      "--media-scale": "1.04",
    }));

    void videoRef.current?.play().catch(() => undefined);
  }

  return (
    <section
      className="relative overflow-hidden bg-cream"
      onPointerMove={syncFocusFromPointer}
      onPointerLeave={resetTilt}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 14% 22%, rgba(242,181,192,0.22) 0%, transparent 34%), radial-gradient(circle at 86% 18%, rgba(201,168,76,0.18) 0%, transparent 36%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[88vh] w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:py-0 lg:px-8">
        <div className="z-10 flex flex-col gap-6 text-center lg:text-left">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-gold">
            Premium Gem - Designed in USA
          </p>
          <div>
            <h1 className="min-h-[7.2rem] whitespace-pre-wrap font-heading text-5xl leading-[0.94] text-charcoal sm:text-6xl lg:min-h-[9.3rem] lg:text-7xl">
              {displayed}
              {!done && (
                <span className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-1 bg-gold animate-blink" />
              )}
            </h1>
            <p className="mt-4 font-heading text-3xl italic leading-tight text-gold sm:text-4xl">
              Follow the glow from piece to piece.
            </p>
          </div>
          <p className="mx-auto max-w-lg font-body text-base leading-relaxed text-soft-gray lg:mx-0 lg:text-lg">
            Move your cursor down the visual to scrub the Luna Clara jewelry story:
            earring, necklace, bracelet, and ring. Move back up to reverse the sequence.
          </p>

          <div className="flex flex-col justify-center gap-3 pt-1 sm:flex-row lg:justify-start">
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

          <div className="grid grid-cols-2 gap-2 pt-4 sm:grid-cols-4">
            {FOCUS_STEPS.map((step, index) => (
              <button
                key={step.label}
                type="button"
                onClick={() => {
                  const progress = index / (FOCUS_STEPS.length - 1);

                  setActiveIndex(index);
                  setDynamicStyle(createHeroStyle(index, "0deg", "0deg", progress));
                  scrubVideoToProgress(progress);
                }}
                className={`border px-3 py-3 text-left font-body text-xs uppercase tracking-widest transition-colors ${
                  index === activeIndex
                    ? "border-gold bg-gold text-warm-white"
                    : "border-gold/25 bg-warm-white/60 text-gold hover:bg-gold/10"
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="relative min-h-[460px] md:min-h-[600px] lg:min-h-[690px]"
          style={dynamicStyle}
        >
          <div className="luna-motion-frame">
            {videoUrl ? (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={() => {
                  const video = videoRef.current;
                  if (!video) return;

                  video.currentTime = Math.min(
                    Math.max(video.duration - 0.05, 0),
                    Math.max(0, video.duration * lastProgressRef.current),
                  );
                  void video.play().catch(() => undefined);
                }}
                onCanPlay={() => {
                  void videoRef.current?.play().catch(() => undefined);
                }}
                className="luna-motion-video h-full w-full object-cover"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            ) : (
              <Image
                src="/products/luna-clara-jewelry-model.png"
                alt="Model wearing Luna Clara necklace, earring, bracelet, and ring"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="luna-motion-image object-cover"
              />
            )}

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at var(--focus-x) var(--focus-y), rgba(255,255,255,0) 0, rgba(253,248,242,0) 24%, rgba(253,248,242,0.16) 78%)",
              }}
            />
            <div
              className="pointer-events-none absolute z-20 h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/80 shadow-[0_0_36px_rgba(201,168,76,0.5)] transition-all duration-300"
              style={{ left: "var(--focus-x)", top: "var(--focus-y)" }}
            />
            <div
              className="absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-full bg-warm-white/90 px-4 py-2 font-body text-xs uppercase tracking-widest text-gold shadow-xl ring-1 ring-gold/20 backdrop-blur transition-all duration-300"
              style={{ left: "var(--focus-x)", top: "var(--focus-y)" }}
            >
              {active.label}
            </div>
          </div>

          <div className="absolute inset-x-4 bottom-4 z-30 bg-warm-white/90 p-4 shadow-xl ring-1 ring-gold/15 backdrop-blur md:inset-x-8 md:bottom-8">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="font-body text-[0.65rem] uppercase tracking-[0.24em] text-gold">
                  Moment {activeIndex + 1} of {FOCUS_STEPS.length}
                </p>
                <p className="mt-1 font-heading text-2xl text-charcoal">{active.title}</p>
              </div>
              <p className="max-w-[15rem] text-right font-body text-xs leading-relaxed text-soft-gray">
                {active.copy}
              </p>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-gold/15">
              <div
                className="h-full rounded-full bg-gold transition-all duration-300"
                style={{ width: `calc((var(--progress) * 100%) + 8%)` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
