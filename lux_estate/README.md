# Luxe Estate

An Awwwards-style luxury real estate site built with React + Vite + TypeScript +
Tailwind CSS v4, featuring a fully custom cursor system, GSAP/ScrollTrigger
scroll animation, Lenis smooth scrolling, and Framer Motion micro-interactions.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (CSS-first `@theme` tokens, no config file needed)
- Framer Motion — springs, drag, layout, scroll-linked motion
- GSAP + ScrollTrigger — counters, scroll reveals
- Lenis — smooth inertia scrolling, synced to GSAP's ticker

## Getting started

\`\`\`bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
\`\`\`

## Project structure

\`\`\`
src/
├── components/
│   ├── cursor/
│   │   ├── CustomCursor.tsx      # composes dot + ring + glow + label
│   │   ├── CursorRing.tsx        # shape-morphing outer ring
│   │   ├── CursorGlow.tsx        # soft radial glow
│   │   ├── CursorLabel.tsx       # contextual text ("View", "Drag"...)
│   │   └── MagneticButton.tsx    # magnetic CTA button primitive
│   ├── sections/                 # Hero, FeaturedProperties, Stats,
│   │                              # About, Testimonials, Contact, Footer
│   ├── Loader.tsx                # animated intro / loading screen
│   ├── Navigation.tsx            # glass nav + fullscreen menu
│   └── ScrollProgress.tsx        # top-edge scroll progress bar
├── context/
│   └── CursorContext.tsx         # shared cursor variant/label state
├── hooks/
│   ├── useMousePosition.ts       # rAF-throttled pointer tracking (MotionValues)
│   ├── useMagnetic.ts            # magnetic attraction toward the pointer
│   ├── useMagneticCursor.ts      # re-export (brief's requested filename)
│   ├── useCursor.ts              # re-export of the context hook
│   └── useIsTouchDevice.ts       # disables custom cursor on touch
├── lib/
│   └── useLenis.ts               # Lenis + GSAP ticker/ScrollTrigger wiring
└── data/
    └── properties.ts             # sample property/testimonial/stat data
\`\`\`

## Cursor system

The cursor has 10 named "variants" (\`default\`, \`button\`, \`card\`, \`image\`,
\`link\`, \`drag\`, \`view\`, \`play\`, \`explore\`, \`zoom\`) driven by \`CursorContext\`.
Any element can switch the cursor by calling \`setCursor(variant, label)\` on
hover and \`resetCursor()\` on leave — see \`MagneticButton.tsx\` or
\`PropertyCard.tsx\` for examples. It automatically disables itself and
restores the native pointer on touch/coarse-pointer devices.

## Notes

- Property photography is pulled from Unsplash for placeholder purposes —
  swap \`src/data/properties.ts\` for real listing photography before shipping.
- The bundle is a single JS chunk (~497 kB / ~166 kB gzipped) since this is a
  single-page demo; for a larger build, split routes with \`React.lazy\`.
