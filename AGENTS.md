<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-09
**Branch:** master
**Stack:** Next.js 16.2.6 App Router · React 19 · TS 5 · Tailwind v4 · Motion v12 · Lenis

## OVERVIEW

Fariz personal portfolio — Awwwards-level scrollytelling site. 192 JPG frames in `public/sequence/` played on sticky canvas driven by scroll progress (subject turns to face viewer).

## STRUCTURE

```
./
├── app/              # Next.js App Router (layout.tsx, page.tsx, HomeClient.tsx)
├── components/       # 10 section/UI components (SequenceScroll core)
├── hooks/            # useLenis.ts
├── lib/              # constants.ts (all content)
├── public/sequence/  # 192 JPG frames + stale CNA SVGs
├── docs/superpowers/ # build plan
├── CLAUDE.md         # Full architecture docs
├── AGENTS.md         # This file
```

## LOCAL CHANGES (uncommitted)

All 16 files modified + 3 new. Migration from `src/` → root level in progress.

| File | Status |
|------|--------|
| `app/globals.css` | Modified |
| `app/layout.tsx` | Modified |
| `app/page.tsx` | Modified |
| `app/HomeClient.tsx` | **New** (client orchestrator colocated in app/) |
| `components/*.tsx` (10) | All modified |
| `hooks/useLenis.ts` | Modified |
| `lib/constants.ts` | Modified |
| `.react-doctor-ignore` | **New** |
| `react-doctor.config.json` | **New** |

## WHERE TO LOOK

| Task | Location |
|------|----------|
| Edit site content | `lib/constants.ts` |
| Fix hero scroll | `components/SequenceScroll.tsx` |
| Tweak animation | `components/Preloader.tsx` (clip-path reveal) |
| Change sections | `app/HomeClient.tsx` (composes all components) |
| Layout/head | `app/layout.tsx` |
| Styles/tokens | `app/globals.css` (CSS vars `--bg`, `--fg`, `--accent`) |

## CONVENTIONS (project-specific)

- **Section stacking**: Every section after SequenceScroll MUST use `-mt-[100vh] relative z-10`. Removing this = canvas bleed-through.
- **Tailwind v4**: No `tailwind.config.js`. Config via CSS `@theme` directives in globals.css.
- **Motion v12**: Package is `motion` not `framer-motion`. Framer Motion APIs but renamed.
- **No test infra**: No test runner configured.
- **No CI/CD**: Deploy via `npx vercel --prod` (manual).

## ISSUES (needs fix)

| Issue | Detail |
|-------|--------|
| Stale CLAUDE.md src/ paths | References `src/lib/`, `src/components/` — code is at root |
| Version mismatch | CLAUDE.md says Next.js 15, actual is 16.2.6 |
| Deprecated dep | `@studio-freight/lenis` → rename to `lenis` |
| Stale README | Still has CNA boilerplate |
| Orphan CNA SVGs | `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` — unused |
| No .nvmrc | Node version not pinned |

## COMMANDS

```bash
npm run dev       # dev server :3000
npm run build     # production build
npm run lint      # eslint (flat config)
npm run start     # production server
npx vercel --prod # deploy
```

## NOTES

- **AGENTS.md warning at top**: This Next.js 16 has breaking changes from training data. Read `node_modules/next/dist/docs/` before writing code.
- Frame sequence generation: `ffmpeg -i mastermpeg4.mp4 -vf "fps=24,drawbox=x=iw-220:y=ih-70:w=220:h=70:color=black:t=fill" -q:v 2 public/sequence/ezgif-frame-%03d.jpg`
