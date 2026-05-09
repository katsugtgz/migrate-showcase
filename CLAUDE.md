# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Fariz personal portfolio — Awwwards-level scrollytelling site for Nizar Alfarizi Akbar (alias: Fariz). Core mechanic: 192 pre-extracted JPG frames in `public/sequence/` played on a sticky HTML5 canvas driven by scroll progress, so the subject turns to face the viewer as the user scrolls.

## Commands

```bash
npm run dev       # dev server on localhost:3000
npm run build     # production build
npm run lint      # eslint
npx vercel --prod # deploy
```

## Stack

- **Framework:** Next.js 15, App Router, TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion) — not GSAP
- **Scroll:** Lenis (`@studio-freight/lenis`)
- **Rendering:** HTML5 Canvas (image sequence, not video)
- **Fonts:** Syne (headings) + Manrope (body) via Google Fonts
- **Deploy:** Vercel

## Architecture

### Core scroll mechanic
`SequenceScroll.tsx` owns the hero. It's a `500vh` container with a `sticky` inner canvas. On mount, all 192 frames are preloaded into `imagesRef`. Motion's `useScroll` maps `scrollYProgress → frameIndex`; the canvas redraws on every change using object-fit:cover math. Text overlays at 5/30/60/90% scroll are `motion.div`s with `useTransform` opacity.

### Section stacking
All sections after `SequenceScroll` use `-mt-[100vh] relative z-10` — this slides them over the sticky canvas to "close" the hero without unmounting it. Do not remove this or the canvas bleeds through.

### Key files
| File | Purpose |
|---|---|
| `src/lib/constants.ts` | All identity data, projects, services, nav links — edit here first |
| `src/components/SequenceScroll.tsx` | Canvas + scroll logic + text overlays |
| `src/components/Preloader.tsx` | Clip-path polygon reveal, blocks render until done |
| `src/app/page.tsx` | Page assembly; Lenis init via `useLenis()` hook |

### Design tokens
- Background: `#000000` — must match frame edges for seamless blend
- Accent: `#3b82f6` (blue-500)
- CSS vars in `globals.css`: `--bg`, `--fg`, `--accent`, `--font-heading`, `--font-body`

### Sequence frames
`public/sequence/ezgif-frame-001.jpg` → `ezgif-frame-192.jpg`. Generated from `mastermpeg4.mp4` (VEO cinematic turn) via ffmpeg at 24fps with watermark removed. Replace by re-running:
```bash
ffmpeg -i mastermpeg4.mp4 -vf "fps=24,drawbox=x=iw-220:y=ih-70:w=220:h=70:color=black:t=fill" -q:v 2 public/sequence/ezgif-frame-%03d.jpg
```

## Implementation plan
Full task-by-task build plan at `docs/superpowers/plans/2026-05-09-fariz-portfolio.md`.
