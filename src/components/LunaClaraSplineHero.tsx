"use client";

import Image from "next/image";
import Script from "next/script";
import {
  createElement,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useMemo,
  useState,
} from "react";

const FALLBACK_IMAGE = "/products/luna-clara-spline-fallback.png";
const SPLINE_VIEWER_SRC =
  "https://unpkg.com/@splinetool/viewer@1.10.57/build/spline-viewer.js";

type SceneStyle = CSSProperties & {
  "--scene-tilt-x": string;
  "--scene-tilt-y": string;
  "--scene-showcase": string;
};

type Props = {
  sceneUrl?: string;
};

export default function LunaClaraSplineHero({
  sceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? "",
}: Props) {
  const [style, setStyle] = useState<SceneStyle>({
    "--scene-tilt-x": "0deg",
    "--scene-tilt-y": "0deg",
    "--scene-showcase": "0px",
  });

  const splineProps = useMemo(
    () =>
      ({
        url: sceneUrl,
        "events-target": "global",
        loading: "lazy",
        style: {
          width: "100%",
          height: "100%",
          display: "block",
          background: "transparent",
        },
        "aria-label": "Interactive Luna Clara Designs crescent moon jewelry scene",
      }) as Record<string, unknown>,
    [sceneUrl],
  );

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (window.innerWidth < 768) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const downIntent = Math.max(0, y + 0.18);

    setStyle({
      "--scene-tilt-x": `${(-y * 5 - downIntent * 8).toFixed(2)}deg`,
      "--scene-tilt-y": `${(x * 9).toFixed(2)}deg`,
      "--scene-showcase": `${(downIntent * 34).toFixed(2)}px`,
    });
  }

  function resetScene() {
    setStyle({
      "--scene-tilt-x": "0deg",
      "--scene-tilt-y": "0deg",
      "--scene-showcase": "0px",
    });
  }

  return (
    <div
      className="relative min-h-[360px] w-full overflow-hidden md:min-h-[620px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetScene}
      style={style}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(201,168,76,0.18),transparent_48%)]" />

      {sceneUrl ? (
        <>
          <Script src={SPLINE_VIEWER_SRC} strategy="afterInteractive" type="module" />
          <div className="luna-scene-stage hidden md:block">
            {createElement("spline-viewer", splineProps)}
          </div>
        </>
      ) : null}

      <div
        className={`luna-scene-stage ${
          sceneUrl ? "md:hidden" : ""
        }`}
      >
        <Image
          src={FALLBACK_IMAGE}
          alt="Gold crescent moon, starburst, and jewelry pieces for Luna Clara Designs"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 48vw"
          className="object-contain"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-70">
        <span className="luna-star-particle left-[12%] top-[28%]" />
        <span className="luna-star-particle luna-delay-300 left-[22%] top-[74%]" />
        <span className="luna-star-particle luna-delay-700 left-[78%] top-[22%]" />
        <span className="luna-star-particle luna-delay-1000 left-[86%] top-[66%]" />
      </div>
    </div>
  );
}
