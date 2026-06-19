# Luna Clara Spline Scene

## Scene

Build a transparent-background Spline scene for the Luna Clara homepage hero.

- Large smooth metallic gold crescent moon, centered slightly right
- Gold 8-point starburst/compass star overlapping the lower crescent
- Three orbiting jewelry pieces: delicate gold earring, thin gold ring, small crystal pendant
- Tiny gold star particles drifting upward and fading
- Warm soft key light from top left with gentle shadows

## Materials

- Moon and star: metallic #C9A84C, high smoothness, soft highlight
- Jewelry: matching gold with subtle crystal shine
- Background: transparent
- Website background behind scene: #FDF8F2

## Animation

- Moon and main group: slow vertical breathing float
- Jewelry pieces: very slow orbit around the crescent
- Particles: upward drift with fade

## Interaction

- Cursor left/right: tilt full scene left/right for parallax
- Cursor down: rotate moon/group to reveal the back side and bring jewelry pieces closer
- Cursor up: return to default hero pose

## Next.js Embed

1. Publish the Spline scene.
2. Copy the `scene.splinecode` URL.
3. Add it to `.env.local`:

```env
NEXT_PUBLIC_SPLINE_SCENE_URL=https://prod.spline.design/your-luna-clara-scene/scene.splinecode
```

The site loads it through `src/components/LunaClaraSplineHero.tsx`.

```tsx
import LunaClaraSplineHero from "@/components/LunaClaraSplineHero";

export default function HeroVisual() {
  return <LunaClaraSplineHero />;
}
```

Mobile screens under 768px use `/products/luna-clara-spline-fallback.png` instead of loading Spline.
