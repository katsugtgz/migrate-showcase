<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-09 (rescan)
**Commit:** 4f1cb91 (master)
**Branch:** master
**Stack:** Next.js 16.2.6 App Router · React 19.2.4 · TS 5 · Tailwind v4 · Motion v12.38 · @react-three/fiber + rapier · next-themes

## OVERVIEW

Fariz personal portfolio — Awwwards-level scrollytelling site. 192 JPG frames in `public/sequence/` played on sticky canvas driven by scroll progress (subject turns to face viewer). Now includes 3D ID card with physics (R3F + rapier) and dark mode toggle.

## STRUCTURE

```
./
├── app/                    # App Router: layout(SERVER) → page(SERVER) → HomeClient(CLIENT boundary)
│   ├── api/scrape-ifalf/   # ⚠️ Firecrawl API route (hardcoded key)
│   ├── globals.css         # Tailwind v4 @theme config + CSS vars + dark variant
│   ├── layout.tsx          # RootLayout: Outfit font, ThemeProvider, Lenis
│   ├── page.tsx            # Server component, renders <HomeClient />
│   └── HomeClient.tsx      # Client orchestrator (composes all 15 components)
├── components/             # 15 components (all 'use client')
│   ├── SequenceScroll.tsx  # Core: sticky canvas, 192-frame scroll-driven animation
│   ├── Preloader.tsx       # Clip-path reveal animation
│   ├── IDCard.tsx          # next/dynamic ssr:false wrapper for R3F bundle
│   ├── IDCardScene.tsx     # R3F Canvas + physics world
│   ├── IDCardModel.tsx     # Card mesh + meshline edges
│   ├── IDCardLanyard.tsx   # Rope physics (spherical joints)
│   └── ThemeToggle.tsx     # Dark/light toggle (next-themes)
├── hooks/
│   ├── useLenis.ts         # Smooth scroll (lenis) — getLenis() is dead code
│   └── useCardPhysics.ts   # Rapier physics for ID card + lanyard
├── lib/
│   ├── constants.ts        # All site content (IDENTITY, PROJECTS, etc.)
│   └── cardTexture.ts      # ⚠️ Canvas texture generation (uses document.createElement)
├── public/sequence/        # 192 JPG frames (ezgif-frame-001.jpg → 192.jpg)
├── drafts/                 # 5 markdown planning docs (untracked)
└── .firecrawl/             # Firecrawl config (untracked)
```

## LOCAL CHANGES (uncommitted)

18 modified + 13 new untracked files. Migration from `src/` → root complete. New features: 3D ID card, dark mode, Firecrawl API route.

### Modified (18)
| File | What Changed |
|------|-------------|
| `app/HomeClient.tsx` | Client boundary, composes all 15 components |
| `app/globals.css` | Tailwind v4 @theme, dark variant, CSS vars |
| `app/layout.tsx` | Outfit font, ThemeProvider, Lenis setup |
| `app/page.tsx` | Server → renders HomeClient |
| `next.config.ts` | Updated for current Next.js 16 |
| `package.json` | +10 deps (motion, three, rapier, next-themes, firecrawl-js, etc.) |
| `package-lock.json` | +857 lines |
| `components/*.tsx` (10) | Motion v12 migration, 'use client', Tailwind v4 |

### New Untracked (13)
| File | Purpose |
|------|---------|
| `app/api/scrape-ifalf/route.ts` | Firecrawl scrape endpoint |
| `components/IDCard.tsx` | Dynamic import wrapper (ssr:false) |
| `components/IDCardLanyard.tsx` | Rope physics with spherical joints |
| `components/IDCardModel.tsx` | Card mesh + meshline edges |
| `components/IDCardScene.tsx` | R3F Canvas + physics world |
| `components/ThemeToggle.tsx` | Dark/light toggle |
| `hooks/useCardPhysics.ts` | Rapier physics hook |
| `lib/cardTexture.ts` | Canvas-based card texture generator |
| `drafts/*.md` (5) | Planning documents |
| `.firecrawl/` (2) | Firecrawl config |

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Edit site content | `lib/constants.ts` | IDENTITY consumed by 7 components |
| Fix hero scroll | `components/SequenceScroll.tsx` | Core scrollytelling engine |
| Tweak animation | `components/Preloader.tsx` | clip-path reveal |
| Change sections | `app/HomeClient.tsx` | Orchestrator for all components |
| Layout/head | `app/layout.tsx` | RootLayout (server component) |
| Styles/tokens | `app/globals.css` | CSS vars `--bg`, `--fg`, `--accent`, `--font-*` |
| ID card 3D | `components/IDCardScene.tsx` | R3F + rapier physics |
| Card physics | `hooks/useCardPhysics.ts` | Lanyard + card body |
| Card texture | `lib/cardTexture.ts` | Canvas-based (server-unsafe) |
| Dark mode | `components/ThemeToggle.tsx` + `app/layout.tsx` | next-themes attribute='class' |
| API routes | `app/api/scrape-ifalf/route.ts` | ⚠️ Hardcoded API key |

## CODE MAP

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| HomeClient | Component | app/HomeClient.tsx | Client boundary, orchestrates all sections |
| SequenceScroll | Component | components/SequenceScroll.tsx | Sticky canvas, frame interpolation |
| IDCardScene | Component | components/IDCardScene.tsx | R3F Canvas + physics |
| IDCardModel | Component | components/IDCardModel.tsx | Card mesh rendering |
| IDCardLanyard | Component | components/IDCardLanyard.tsx | Rope physics |
| ThemeToggle | Component | components/ThemeToggle.tsx | Dark/light switch |
| Preloader | Component | components/Preloader.tsx | Clip-path reveal |
| useLenis | Hook | hooks/useLenis.ts | Smooth scroll (lenis) |
| useCardPhysics | Hook | hooks/useCardPhysics.ts | Rapier physics for card |
| generateCardTexture | Function | lib/cardTexture.ts | Canvas texture generation |
| IDENTITY | Constant | lib/constants.ts | Most widely consumed (7 refs) |

## CONVENTIONS (project-specific)

- **Component hierarchy**: RootLayout(SERVER) → Home(SERVER) → HomeClient(CLIENT) → all 15 components. Zero server components in components/.
- **Section stacking**: Every section after SequenceScroll MUST use `-mt-[100vh] relative z-10`. Removing this = canvas bleed-through.
- **Tailwind v4**: No `tailwind.config.js`. Config via CSS `@theme` directives in globals.css.
- **Motion v12**: Import from `motion/react`. ALL animated components use `LazyMotion` + `domAnimation` for tree-shaking.
- **Dark mode**: `next-themes` with `attribute='class'`. Custom Tailwind variant: `@custom-variant dark (&:is(.dark *))`.
- **Font**: Outfit via `next/font/google`. CSS vars `--font-heading` / `--font-body`.
- **Custom cursor**: `cursor:none` on `html/a/button`. Respects `prefers-reduced-motion`.
- **Imports**: `@/*` alias only. No relative cross-dir imports.
- **Exports**: 18 default, 5 named (IDCardScene, IDCardModel, useCardPhysics, useLenis, generateCardTexture).
- **R3F code-splitting**: `next/dynamic` with `ssr:false` for IDCard component.
- **No test infra**: No test runner configured.
- **No CI/CD**: Deploy via `npx vercel --prod` (manual).

## ANTI-PATTERNS (THIS PROJECT)

- **⚠️ NEVER commit API keys**: `app/api/scrape-ifalf/route.ts` has hardcoded Firecrawl key. Move to `.env.local` + `NEXT_PUBLIC_` or server-only env.
- **No `as any` / `@ts-ignore`**: Strict TS (`strict:true`). Keep it that way.
- **No eslint-disable**: No suppression comments found. Keep it that way.
- **No type suppressions**: Zero instances. Maintain this standard.

## ISSUES (needs fix)

| Priority | Issue | Detail |
|----------|-------|--------|
| 🔴 CRITICAL | Hardcoded API key | `app/api/scrape-ifalf/route.ts` line with `fc-4f8681b4...` — move to env |
| 🔴 HIGH | Deprecated dep | `@studio-freight/lenis` → rename to `lenis` |
| 🟡 HIGH | Stale CLAUDE.md | src/ paths (50+ refs), says Next.js 15, says @studio-freight/lenis |
| 🟡 MEDIUM | Server-unsafe code | `lib/cardTexture.ts` uses `document.createElement` |
| 🟡 MEDIUM | Dead code | `getLenis()` in useLenis.ts — never imported |
| 🟡 MEDIUM | Unused dep | `split-type` in package.json — zero imports found |
| 🟡 MEDIUM | firecrawl-js | Production dep, should be devDependency |
| 🟢 LOW | Stale README | CNA boilerplate, needs rewrite |
| 🟢 LOW | Orphan SVGs | `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` |
| 🟢 LOW | No .nvmrc | Node version not pinned |
| 🟢 LOW | Missing error boundaries | No `error.tsx`, `not-found.tsx`, `loading.tsx`, `robots.ts` |

## COMMANDS

```bash
npm run dev       # dev server :3000
npm run build     # production build
npm run lint      # eslint (flat config)
npm run start     # production server
npx vercel --prod # deploy
```

## NOTES

- **Next.js 16 breaking changes**: Read `node_modules/next/dist/docs/` before writing code. APIs differ from training data.
- **Frame sequence generation**: `ffmpeg -i mastermpeg4.mp4 -vf "fps=24,drawbox=x=iw-220:y=ih-70:w=220:h=70:color=black:t=fill" -q:v 2 public/sequence/ezgif-frame-%03d.jpg`
- **All components are 'use client'**: The only server components are `layout.tsx` and `page.tsx`. HomeClient.tsx is the client boundary.
- **R3F bundle is code-split**: IDCard loaded via `next/dynamic({ ssr: false })` to avoid server-side Three.js issues.
