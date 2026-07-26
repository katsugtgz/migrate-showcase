# Migrate - Scroll-Driven 3D Portfolio

A scrollytelling portfolio site built around a 192-frame canvas sequence animation and a physics-simulated 3D ID card.

**Live demo:** https://migrate-two.vercel.app

## Features

- Scroll-driven hero: 192 pre-rendered JPG frames played on a sticky HTML5 canvas, mapped to scroll progress so the subject turns to face the viewer as you scroll
- Interactive 3D ID card with a rope lanyard simulated by Rapier physics (spherical joints), rendered with React Three Fiber
- Smooth scrolling powered by Lenis
- Dark/light theme toggle with system preference support
- Custom animated cursor with a toggle for users who prefer the native pointer
- Preloader with a clip-path reveal that blocks render until hero frames are ready
- Fully responsive layout with marquee, projects, and contact sections stacked over the sticky canvas

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5
- **3D:** Three.js via @react-three/fiber, @react-three/rapier (physics), @react-three/drei, meshline
- **Animation:** Motion (Framer Motion) v12 with `LazyMotion` tree-shaking
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js`)
- **Scroll:** Lenis
- **Theming:** next-themes (class attribute)
- **Testing:** Vitest (unit), Playwright (e2e)
- **Deploy:** Vercel

## Getting Started

Prerequisites: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are required.

Other scripts:

```bash
npm run build       # production build
npm run lint        # eslint
npm run type-check  # tsc --noEmit
npm run test        # vitest unit tests
npm run test:e2e    # playwright e2e tests
```

## Architecture Notes

- Only `layout.tsx` and `page.tsx` are server components; `HomeClient.tsx` is the client boundary that composes all sections.
- Every section after the hero uses `-mt-[100vh] relative z-10` to stack above the sticky canvas - removing this causes canvas bleed-through.
- The 3D ID card is code-split via `next/dynamic` with `ssr: false` to avoid server-side Three.js issues; its textures are generated at runtime with the Canvas API in `lib/cardTexture.ts`.
- The frame sequence in `public/sequence/` is generated from a source video with ffmpeg (24 fps JPG extraction); regenerate by re-running ffmpeg against a new source clip.

## Project Structure

```
app/          Layout, page, client boundary, Tailwind v4 theme (globals.css)
components/   SequenceScroll, IDCard scene/model/lanyard, Navbar, sections
hooks/        useCardPhysics (Rapier), useViewportState (reduced motion / viewport size)
lib/          Site content constants, canvas texture generation
public/       192-frame sequence, SVG logos and project thumbnails
tests/        Vitest unit tests
```

## License

MIT - see [LICENSE](LICENSE).
