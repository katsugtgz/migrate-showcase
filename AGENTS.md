<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-09 (init-deep update)
**Commit:** fd0375d (master)
**Branch:** master
**Stack:** Next.js 16.2.6 App Router · React 19.2.4 · TS 5 · Tailwind v4 · Motion v12.38 · @react-three/fiber + rapier · next-themes · Vitest + Playwright

## OVERVIEW

Fariz personal portfolio — Awwwards-level scrollytelling site. 192 JPG frames in `public/sequence/` played on sticky canvas driven by scroll progress (subject turns to face viewer). 3D ID card with physics (R3F + rapier), dark mode, three routes (/, /about, /projects), test suite (Vitest + Playwright).

## STRUCTURE

```
./
├── app/                    # App Router: layout(SERVER) → page(SERVER) → *Client(CLIENT boundary)
│   ├── globals.css         # Tailwind v4 @theme config + CSS vars + dark variant
│   ├── layout.tsx          # RootLayout: Outfit + Bebas_Neue fonts, ThemeProvider, Analytics
│   ├── page.tsx            # Server component, renders <HomeClient />
│   ├── HomeClient.tsx      # Client orchestrator (composes all 18 components + Lenis)
│   ├── robots.ts           # SEO: allows all, links sitemap
│   ├── sitemap.ts          # SEO: /, /about, /projects
│   ├── about/              # /about route (page.tsx SERVER → AboutClient.tsx CLIENT)
│   ├── projects/           # /projects route (page.tsx SERVER → ProjectsClient.tsx CLIENT)
│   └── api/scrape-ifalf/   # Dev-only Firecrawl route (gitignored, env-gated, 403 in prod)
├── components/             # 18 components (all 'use client')
│   ├── SequenceScroll.tsx  # Core: sticky canvas, 192-frame scroll-driven animation
│   ├── HeroClock.tsx       # Live clock overlay (site + viewer timezone)
│   ├── Preloader.tsx       # Clip-path reveal animation
│   ├── IDCard.tsx          # next/dynamic ssr:false wrapper for R3F bundle
│   ├── IDCardScene.tsx     # R3F Canvas + physics world
│   ├── IDCardModel.tsx     # Card mesh + meshline edges
│   ├── IDCardLanyard.tsx   # Rope physics (spherical joints)
│   ├── ThemeToggle.tsx     # Dark/light toggle (next-themes)
│   ├── Quote.tsx           # Parallax blockquote section
│   ├── CursorToggle.tsx    # Custom cursor on/off toggle
│   └── ... (About, Contact, Footer, Marquee, Navbar, Projects, VTuberLogos, CustomCursor)
├── hooks/
│   └── useCardPhysics.ts   # Rapier physics for ID card + lanyard
├── lib/
│   ├── constants.ts        # All site content (IDENTITY, PROJECTS, QUOTE, HERO_CLOCK, etc.)
│   └── cardTexture.ts      # ⚠️ Canvas texture generation (uses document.createElement)
├── tests/                  # Vitest unit + Playwright E2E
│   ├── smoke.test.ts       # Constants data-shape validation (~14 tests)
│   └── e2e/                # 4 spec files (smoke, theme, routes, mobile)
├── public/sequence/        # 192 JPG frames (ezgif-frame-001.jpg → 192.jpg)
├── public/tech/            # 12 SVG tech logos
├── public/projects/        # 4 SVG project thumbnails
└── public/fariz-wordmark.svg
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Edit site content | `lib/constants.ts` | IDENTITY, PROJECTS, QUOTE, HERO_CLOCK — consumed by 10+ components |
| Fix hero scroll | `components/SequenceScroll.tsx` | Core scrollytelling engine |
| Tweak animation | `components/Preloader.tsx` | clip-path reveal |
| Change sections | `app/HomeClient.tsx` | Orchestrator for all homepage components |
| Add route | `app/{route}/page.tsx` + `*Client.tsx` | Follow server-shell → client-boundary pattern |
| Layout/head | `app/layout.tsx` | RootLayout (server component) |
| Styles/tokens | `app/globals.css` | CSS vars `--bg`, `--fg`, `--accent`, `--font-*` |
| ID card 3D | `components/IDCardScene.tsx` | R3F + rapier physics |
| Card physics | `hooks/useCardPhysics.ts` | Lanyard + card body |
| Card texture | `lib/cardTexture.ts` | Canvas-based (server-unsafe — only via ssr:false dynamic import) |
| Dark mode | `components/ThemeToggle.tsx` + `app/layout.tsx` | next-themes attribute='class' |
| SEO | `app/robots.ts`, `app/sitemap.ts` | Static config |
| Unit tests | `tests/smoke.test.ts` | Constants validation |
| E2E tests | `tests/e2e/*.spec.ts` | Playwright: smoke, theme, routes, mobile |
| API routes | `app/api/scrape-ifalf/route.ts` | Dev-only, gitignored, env-gated |

## CODE MAP

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| HomeClient | Component | app/HomeClient.tsx | Client boundary, orchestrates homepage sections + Lenis |
| AboutClient | Component | app/about/AboutClient.tsx | Client boundary for /about route |
| ProjectsClient | Component | app/projects/ProjectsClient.tsx | Client boundary for /projects route |
| SequenceScroll | Component | components/SequenceScroll.tsx | Sticky canvas, frame interpolation |
| HeroClock | Component | components/HeroClock.tsx | Live dual-timezone clock overlay |
| IDCardScene | Component | components/IDCardScene.tsx | R3F Canvas + physics |
| IDCardModel | Component | components/IDCardModel.tsx | Card mesh rendering |
| IDCardLanyard | Component | components/IDCardLanyard.tsx | Rope physics |
| ThemeToggle | Component | components/ThemeToggle.tsx | Dark/light switch |
| Quote | Component | components/Quote.tsx | Parallax blockquote |
| CursorToggle | Component | components/CursorToggle.tsx | Custom cursor toggle |
| Preloader | Component | components/Preloader.tsx | Clip-path reveal |
| useCardPhysics | Hook | hooks/useCardPhysics.ts | Rapier physics for card |
| generateCardTexture | Function | lib/cardTexture.ts | Canvas texture generation |
| IDENTITY | Constant | lib/constants.ts | Most widely consumed (10+ refs) |

## CONVENTIONS (project-specific)

- **Component hierarchy**: RootLayout(SERVER) → page(SERVER) → *Client(CLIENT) → all 18 components. Zero server components in `components/`.
- **Route pattern**: Every route = `page.tsx` (server, metadata) + `*Client.tsx` (client boundary). Page-specific clients co-located in route dir.
- **Section stacking**: Every section after SequenceScroll MUST use `-mt-[100vh] relative z-10`. Removing this = canvas bleed-through.
- **Tailwind v4**: No `tailwind.config.js`. Config via CSS `@theme` directives in globals.css.
- **Motion v12**: Import from `motion/react`. ALL animated components use `LazyMotion` + `domAnimation` for tree-shaking.
- **Dark mode**: `next-themes` with `attribute='class'`. Custom Tailwind variant: `@custom-variant dark (&:is(.dark *))`.
- **Fonts**: Outfit via `next/font/google` (2 instances: --font-heading, --font-body) + Bebas_Neue (--font-display).
- **Custom cursor**: `cursor:none` on `html/a/button` gated behind `@media (hover:hover) and (pointer:fine)` + `data-cursor="custom"`. Respects `prefers-reduced-motion`.
- **Imports**: `@/*` alias only. No relative cross-dir imports.
- **R3F code-splitting**: `next/dynamic` with `ssr:false` for IDCard component.
- **R3F eslint**: 3 R3F components have justified `eslint-disable react/no-unknown-property` for custom JSX attributes.
- **No CI/CD**: Deploy via `npx vercel --prod` (manual).

## ANTI-PATTERNS (THIS PROJECT)

- **No `as any` / `@ts-ignore`**: Strict TS (`strict:true`). Zero instances. Keep it that way.
- **No eslint-disable** (except R3F): Only 3 justified suppressions in R3F components for custom JSX attributes.
- **No type suppressions**: Zero `@ts-expect-error`. Maintain this standard.
- **No console.log**: Only one `console.error` in dev-only API route catch block. No debug logging.

## ISSUES (needs fix)

| Priority | Issue | Detail |
|----------|-------|--------|
| 🟡 HIGH | Stale CLAUDE.md | References src/ paths, Next.js 15, @studio-freight/lenis, Syne/Manrope fonts |
| 🟡 MEDIUM | Server-unsafe code | `lib/cardTexture.ts` uses `document.createElement` — safe in practice (ssr:false) but no `"use client"` directive |
| 🟡 MEDIUM | @types/three in prodDeps | Should be devDependency |
| 🟡 MEDIUM | Missing error boundaries | No `error.tsx`, `not-found.tsx`, `loading.tsx` |
| 🟡 MEDIUM | No CI/CD | No `.github/workflows`, no automated quality gates |
| 🟢 LOW | No .nvmrc | Node version not pinned |
| 🟢 LOW | No .prettierrc | No formatting enforcement |
| 🟢 LOW | Overly broad .gitignore | `*.png` blocks all PNGs repo-wide (intended for QA screenshots) |

## COMMANDS

```bash
npm run dev         # dev server :3000
npm run build       # production build
npm run lint        # eslint (flat config)
npm run type-check  # tsc --noEmit
npm run test        # vitest run (unit tests)
npm run test:e2e    # playwright test (E2E, builds+starts server)
npm run start       # production server
npx vercel --prod   # deploy
```

## NOTES

- **Next.js 16 breaking changes**: Read `node_modules/next/dist/docs/` before writing code. APIs differ from training data.
- **Frame sequence generation**: `ffmpeg -i mastermpeg4.mp4 -vf "fps=24,drawbox=x=iw-220:y=ih-70:w=220:h=70:color=black:t=fill" -q:v 2 public/sequence/ezgif-frame-%03d.jpg`
- **All components are 'use client'**: Only `layout.tsx` and `page.tsx` files are server components. `*Client.tsx` files are client boundaries.
- **R3F bundle is code-split**: IDCard loaded via `next/dynamic({ ssr: false })` to avoid server-side Three.js issues.
- **Lenis smooth scroll**: Initialized imperatively in `HomeClient.tsx` after preloader completes. Only homepage gets smooth scrolling; /about and /projects routes do not.
- **API route is dev-only**: `app/api/scrape-ifalf/route.ts` is gitignored, env-gated (`FIRECRAWL_API_KEY`), returns 403 in production. Firecrawl SDK is a devDependency.
- **No component unit tests**: `@testing-library/react` is installed but no component isolation tests exist. Only constants validation (`tests/smoke.test.ts`) and E2E (`tests/e2e/`).
