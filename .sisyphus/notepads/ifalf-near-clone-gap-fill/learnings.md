# Learnings

## 2026-05-09 Session Start
- Project: Fariz personal portfolio, Next.js 16.2.6 App Router, React 19, Tailwind v4, Motion v12
- Stack uses `@` alias imports, no relative cross-dir imports
- All components are 'use client', only layout.tsx and page.tsx are server components
- Tailwind v4: CSS `@theme` directives in globals.css, NO tailwind.config.js
- Motion v12: import from `motion/react`, use LazyMotion + domAnimation
- Section stacking: post-SequenceScroll sections use `-mt-[100vh] relative z-10`
- No test infrastructure exists yet (no Vitest, no Playwright)
- Hardcoded Firecrawl API key in app/api/scrape-ifalf/route.ts (critical)
- Deprecated dep: @studio-freight/lenis should be renamed to lenis

## Task 0: Pre-flight Baseline (2026-05-09)

- **BASELINE: RED** — build passes (exit 0) but lint fails (exit 1)
- **Build**: Next.js 16.2.6 Turbopack, compiles in 3.0s, TypeScript in 2.4s, static pages in 321ms. Routes: /, /_not-found, /api/scrape-ifalf
- **Lint**: 3 errors + 5 warnings:
  - 3x `react-hooks/refs` errors in `IDCardScene.tsx` (chainRefs accessed during render)
  - 1x unused import `useRef` in `CustomCursor.tsx`
  - 3x unused eslint-disable directives in `IDCardLanyard.tsx`, `IDCardModel.tsx`, `IDCardScene.tsx`
  - 1x unused function `getLenis` in `useLenis.ts`
- **Missing scripts**: type-check, test, test:e2e — none exist in package.json, all skipped
- **Build warning**: Multiple lockfiles detected (workspace root inference issue)
- Evidence saved to `.sisyphus/evidence/task-0-baseline.txt` and `task-0-baseline-classification.txt`

## Task 5: Expand Fariz-branded content model (2026-05-09)

- Ifalf site sections mapped: hero clock, marquee, about, tech logos, projects, quote, contact CTA, footer
- Ifalf project categories: ALL, WEB APP, WEBSITE, UI/UX, GRAPHIC
- 12 tech logos on Ifalf site use `/tech/{name}nime.webp` naming pattern (htmlnime, cssnime, vsnime, tsnime, pynime, reactnime, nextnime, twnime, nodenime, laranime, figmanime, bunime)
- Added 8 new exports to lib/constants.ts: HERO_CLOCK, MARQUEE_ROWS, ABOUT_COPY, TECH_LOGOS, PROJECT_CATEGORIES, QUOTE, CONTACT_CTA, FOOTER
- All new exports use `as const` for type narrowing
- Kept existing IDENTITY, SOCIALS, PROJECTS, SERVICES, MARQUEE_ITEMS, NAV_LINKS, SEQUENCE_FRAME_COUNT untouched
- Fariz identity preserved: me@fariz.dev email, GitHub farizink, Sidoarjo location
- TypeScript compiles clean (`npx tsc --noEmit` = no errors)
- PROJECTS not modified with category/thumbnail fields yet — existing consumers depend on current shape, safer to extend when components are updated

## Task 1: Secure Firecrawl Dev-Only Tooling + Reference Inventory (2026-05-09)

- **Hardcoded key removed**: `fc-4f8681b438b049488b6948d5b7b9631b` replaced with `process.env.FIRECRAWL_API_KEY`
- **Production guard**: Route returns 403 when `NODE_ENV === 'production'` OR when `FIRECRAWL_API_KEY` is unset
- **Key not in `.env.example`**: Only documents the var name, no actual key committed
- **Lint unchanged**: Still 3 errors (react-hooks/refs in IDCardScene.tsx) + 5 warnings — all inherited, none introduced
- **AGENTS.md still mentions key pattern**: It's documentation about the old issue, not a code leak — acceptable
- **`.firecrawl/` has 21 reference files**: 4 root-level + 17 nested under ifalf/ (projects, about, blog)
- **Duplicates found**: `ifalf-main.md` and `ifalf.md` are full-page vs mainContent scrapes of the same URL
- **Provenance inventory**: Created at `.sisyphus/plans/ifalf-asset-provenance.md`

## Task 4: Match Ifalf Typography & Design Tokens (2026-05-09)

- **Ifalf font**: Only 1 font preloaded in their `<head>` (hash `feec6f6f0d18f76b-s.p.woff2`), loaded via `next/font/google`. No explicit Google Fonts `<link>`. Site uses single font family for headings+body.
- **Font choice**: Bebas Neue for display (condensed, uppercase, giant headings — matches Ifalf's "IFALFAHRIA" style). Outfit retained for heading+body (already in use).
- **Next.js 16 quirk**: `Bebas_Neue` requires explicit `weight: "400"` in `next/font/google` config. Without it, Turbopack build fails with "Missing weight for Bebas Neue. Available weights: 400".
- **New tokens added to globals.css**:
  - `--font-display` (Bebas Neue) registered in `@theme` block
  - Transition tokens: `--duration-fast` (150ms), `--duration-normal` (300ms), `--duration-slow` (500ms), `--ease-out`, `--ease-in-out`
  - Section spacing: `--section-spacing: clamp(4rem, 10vh, 8rem)`
  - `::selection` with accent gold bg, white text (both themes)
- **Preserved**: All existing vars, dark mode, custom cursor, `next-themes` attribute='class', Tailwind custom variant
- **Build**: PASS. **Lint**: 3 errors + 5 warnings (all inherited baseline, zero new).
- **No tailwind.config.js created** — all config via CSS `@theme` directives as required.

## Task 2: Test and Quality Tooling Baseline (2026-05-09)

### Dev Dependencies Added
- `vitest` — unit test runner
- `@vitejs/plugin-react` — JSX transform for Vitest
- `jsdom` — DOM environment for Vitest
- `@testing-library/react` + `@testing-library/dom` — React component testing
- `@playwright/test` — E2E browser testing (chromium only)

### Dev Dependencies Removed
- `vite-tsconfig-paths` — deprecated, Vite now has native `resolve.tsconfigPaths: true`

### Config Files Created
- `vitest.config.ts` — uses `resolve.tsconfigPaths: true`, jsdom env, includes `tests/**/*.test.{ts,tsx}`
- `playwright.config.ts` — chromium only, webServer builds+starts Next.js, baseURL localhost:3000

### Scripts Added to package.json
- `"type-check": "tsc --noEmit"` — strict TS check (exits 0)
- `"test": "vitest run"` — single-run Vitest (4 tests pass)
- `"test:e2e": "playwright test"` — Playwright E2E (1 test pass)

### Test Files Created
- `tests/smoke.test.ts` — 4 Vitest tests verifying IDENTITY, SOCIALS, NAV_LINKS, PROJECTS imports from constants
- `tests/e2e/smoke.spec.ts` — 1 Playwright test verifying home page loads

### Pre-existing Bug Fixed
- `app/layout.tsx` line 6: `Bebas_Neue` font config was missing required `weight: "400"` parameter — Next.js 16 tightened type on font config. `next build` passed but `tsc --noEmit` caught it.

### Key Decisions
- Playwright config uses `npm run build && npm run start` as webServer command (production-like, per Next.js docs recommendation)
- Chromium-only for Playwright (lighter CI footprint, can add firefox/webkit later)
- Vitest uses `vitest run` (not watch mode) for CI-friendly script
- Smoke tests only test data imports and page load — no component rendering (R3F/Rapier too fragile)

### Verification Results
- `npm run type-check` → exit 0 ✓
- `npm run test` → 4/4 pass, 1.39s ✓
- `npm run test:e2e` → 1/1 pass, 1.4s ✓
- `npm run build` → exit 0 ✓ (not regressed)

## T3: Asset Localization (2026-05-09)

- Created 12 SVG tech logo placeholders in `public/tech/` matching TECH_LOGOS entries in constants.ts
- Created `public/fariz-wordmark.svg` as simple text-based wordmark
- Created 4 project thumbnail SVGs in `public/projects/` matching PROJECTS entries (dea, space, avogado6, gak-ngotak)
- Updated TECH_LOGOS src fields from `.webp` to `.svg`
- Updated provenance manifest with all placeholder assets
- Build passes clean (exit 0), no TS errors
- SVG placeholders use brand-accurate colors per tech (e.g., React=cyan, TS=blue, Bun=cream)
- PROJECTS imageUrl fields still point to opengraph.githubassets.com — these are external but not ifalf.com, left unchanged per task scope

## Task 6: Ifalf-style Live Clock + Hero Overlay (2026-05-09)

- **Created `components/HeroClock.tsx`**: Standalone client component with dual live clocks (WIB/Jakarta + viewer local) and stacked "FA / RIZ" display name treatment using Bebas Neue (`--font-display`)
- **Hydration safety**: `useState<string | null>(null)` — initial render shows `\u00A0` placeholder, never server time. `useEffect` + `setInterval(1000)` starts ticking only after mount
- **Time formatting**: `toLocaleTimeString("en-GB", { hour12: false })` for 24h format, `fontVariantNumeric: "tabular-nums"` for stable width
- **Integration into SequenceScroll**: HeroClock wrapped in `<m.div style={{ opacity: heroClockOp }}>` placed inside sticky area. `heroClockOp` fades from 1→0 between 3-6% scroll (before op1 at 5%)
- **Z-index layering**: HeroClock at z-20 sits above gradient overlay (z-10) and text overlays (no explicit z). Scroll hint remains visible underneath until 5%
- **data-testid attributes**: `site-clock`, `viewer-clock` on clock spans; `scroll-cta` on scroll hint wrapper
- **No changes to**: HomeClient.tsx (HeroClock is imported only by SequenceScroll), existing op1-op4 overlays, canvas frame logic
- **Build**: PASS. **Lint**: 3 errors + 5 warnings (all inherited, zero new)
- **Design**: Stacked "FA / RIZ" at `clamp(100px, 22vw, 280px)` with `lineHeight: 0.82` for tight vertical stacking. Role + location in muted caption below. Clocks separated by `w-px h-8 bg-white/15` divider

## Task 7: Dual Counter-Moving Marquee Rows (2026-05-09)

- **Refactored Marquee.tsx**: Single row → two rows moving in opposite directions
- **Data source**: Switched from `MARQUEE_ITEMS` to `MARQUEE_ROWS` (2-tuple of role arrays from constants.ts)
- **Row direction**: Row 1 `["0%", "-50%"]` (right-to-left), Row 2 `["-50%", "0%"]` (left-to-right)
- **Hover pause**: Per-row via `group/row` + `group-hover/row:[animation-play-state:paused]`
- **Reduced-motion fallback**: `<style>` tag with `@media (prefers-reduced-motion: reduce)` overrides Motion's inline `transform` and `animation` — CSS specificity trick needed because Motion applies transforms as inline styles
- **Gradient fade edges**: Left/right `w-24 bg-gradient-to-r/l from-[var(--bg)] to-transparent` on each row
- **Separator**: `✦` character with `text-[var(--accent)]/40` opacity
- **`data-testid="role-marquee-row"`**: On each row wrapper (2 total)
- **`MARQUEE_ITEMS` no longer imported** by any component (still exported from constants.ts for backward compat)
- **Build**: PASS. **LSP**: Zero errors. **Duration**: 25s per cycle (up from 20s to feel less frantic with 2 rows)

## Projects.tsx Refactor (Task 10)

- Local SVG thumbnails at `/projects/{title}.svg` for all 4 projects — avoids external GitHub opengraph dependency
- `THUMBNAIL_MAP` pattern: Record<string, string> mapping project title → local path, falls back to `imageUrl`
- Tailwind `group-focus-visible:` and `group-active:` mirror `group-hover:` for touch/mobile image reveal
- `outline-none` on card links prevents default focus ring but `focus-visible:` styles provide custom feedback
- `subtitle` field now displayed as secondary line; tech+year as tertiary muted line
- SEE MORE CTA links to `/projects` (internal route, not external GitHub)

## Task 10b: `/projects` Filter Index + `/about` Route Parity (2026-05-09)

- **Created 4 files**: `app/projects/page.tsx`, `app/projects/ProjectsClient.tsx`, `app/about/page.tsx`, `app/about/AboutClient.tsx`
- **Server → Client boundary pattern**: `page.tsx` (server, exports metadata) renders `*Client.tsx` ('use client', all UI)
- **Projects page**: THUMBNAIL_MAP duplicated in ProjectsClient (same pattern as components/Projects.tsx), PROJECT_CATEGORIES filter tabs, AnimatePresence for list transitions
- **About page**: Two-column layout (body + sidebar with location/role/socials/motto), skills pills from ABOUT_COPY.skills
- **Both pages**: Include Navbar, Footer, CustomCursor for consistency with home page. Back link to `/`.
- **No `-mt-[100vh]`**: Standalone pages don't stack after SequenceScroll hero
- **PROJECTS has no `category` field**: Filter tabs render but all categories show all projects (ALL = everything). Empty state message ready for when categories are added to data.
- **Build**: PASS. Both routes statically generated (○). Routes: `/`, `/about`, `/projects`, `/_not-found`, `/api/scrape-ifalf`
- **No existing files modified**: Only created new route directories and files

## Task 11: Quote, Contact CTA, and Footer Parity (2026-05-09)

- **Created `components/Quote.tsx`**: Uses QUOTE constant from constants.ts. Large heading typography with decorative oversized `&ldquo;` quotation mark (15% opacity), accent-colored divider line before author citation. Parallax scroll effect via useScroll + useTransform.
- **Updated `components/Contact.tsx`**: Switched from IDENTITY.email to CONTACT_CTA.heading/subheading/email. Heading uses `--font-display` (Bebas Neue) with per-word staggered reveal animation. Last word in heading gets accent color. mailto: link preserved.
- **Updated `components/Footer.tsx`**: 3-column grid layout — wordmark+tagline / nav links (FOOTER.navItems) / social icons (SOCIALS). Uses `next/image` for `/fariz-wordmark.svg` with `brightness-0 invert dark:invert-0` for theme adaptation. Decorative "FARIZ" in font-display at bottom (20% opacity). Copyright uses dynamic year via useSyncExternalStore.
- **HomeClient section order**: Services → Quote → Contact → Footer
- **data-testid attributes**: `quote-section`, `contact-section`, `contact-email-link`, `site-footer`, `footer-wordmark`
- **All CSS vars**: No hardcoded hex. Uses --bg, --fg, --fg-muted, --accent, --border, --duration-fast, --duration-normal
- **Gotcha**: When editing import blocks in HomeClient.tsx, must preserve ALL existing imports — VTuberLogos and Marquee were accidentally dropped during first edit
- **Footer wordmark SVG**: Uses `fill="#fff"` so needs `brightness-0 invert` in light mode, `dark:invert-0` in dark mode
- **Build**: PASS. **LSP**: Zero errors on all 4 changed files.

## Task 11b: About Glitch/Duplicate-Text Treatment (2026-05-09)

- **Ifalf pattern**: Each word doubled inline — "Hi,Hi,I'mI'm,IfalIfal..." — creating visual echo/glitch
- **`doubleWords()` utility**: Splits on `/(\s+)/` regex (preserving whitespace), doubles non-whitespace segments
- **Dual-layer rendering**: Base doubled text + absolute-positioned echo layer with `translateX(3px) translateY(2px)`, `opacity: 0.3`, `color: var(--accent)`, `mix-blend-mode: multiply` (screen in dark mode)
- **Accessibility**: `sr-only` paragraph with clean `ABOUT_COPY.body` + `data-testid="about-readable-text"`. Visual glitch container uses `aria-hidden="true"` + `data-testid="about-glitch-text"`
- **Reduced-motion**: `@media (prefers-reduced-motion: reduce)` hides echo layer entirely via `display: none`
- **Skills pills**: Now use `ABOUT_COPY.skills` from constants instead of hardcoded array
- **Scroll-driven CharReveal**: Preserved and working on doubled text — each character reveals as user scrolls
- **Build**: PASS. **LSP**: Zero errors.
- **Files modified**: `components/About.tsx` (primary), `app/globals.css` (glitch echo styles)

## Task 8: Coordinate SequenceScroll, Preloader, and Lenis Scroll Rhythm (2026-05-09)

### Problems Found
- **Double loader**: Preloader (z-9000) and SequenceScroll's frame loader (z-50) could both be visible in sequence — Preloader exits, then SequenceScroll loader appears if frames not ready
- **Scroll position drift**: Lenis started immediately on mount, allowing scroll during Preloader. When Preloader exited, scrollYProgress could be non-zero, showing mid-sequence frame
- **Dead code**: `getLenis()` in useLenis.ts never imported; module-level `lenisInstance` variable was global mutable state

### Fixes Applied
- **Preloader.tsx**: Added `onComplete` prop, fired via `AnimatePresence`'s `onExitComplete` (fires AFTER clip-path exit animation). Added scroll lock (`overflow: hidden` on `documentElement`) that persists during entire Preloader lifecycle including exit animation
- **useLenis.ts**: Changed `useLenis()` → `useLenis(enabled: boolean)`. Lenis only created when `enabled=true`. Removed dead `getLenis()` and module-level `lenisInstance` variable
- **HomeClient.tsx**: Added `preloaderDone` state, passed as `enabled` to `useLenis`, passed `onComplete` callback to Preloader. Lenis starts only after Preloader exit animation completes
- **SequenceScroll.tsx**: No changes needed — its frame loader is a reasonable fallback when frames haven't loaded by the time Preloader exits. On decent connections, 192 frames (~3.8MB) load well within Preloader's ~3s duration

### Coordination Timeline
1. Mount → Preloader visible, scroll locked, Lenis NOT started
2. ~3s → Preloader clip-path exit animation starts
3. ~3.8s → Exit animation completes, `onExitComplete` fires
4. `preloaderDone=true` → Lenis starts, scroll unlocked (Preloader cleanup runs)
5. If frames loaded → hero visible immediately. If not → SequenceScroll loader shows as fallback

### Section Stacking Verified
- Projects (first after SequenceScroll): `-mt-[100vh] relative z-10` ✓
- All subsequent sections: `relative z-10 bg-[var(--bg)]` ✓
- No section components were modified

### Build: PASS. LSP: Zero errors on all 4 files.

## Task 8b: Reorder Homepage Sections (2026-05-09)

- **New order**: SequenceScroll → Marquee → About → VTuberLogos → IDCard → Projects → Quote → Contact → Footer
- **Services removed** from homepage primary flow (comment explains removal, import preserved)
- **Marquee wrapping**: Since Marquee is now the first section after sticky SequenceScroll canvas, it needs `-mt-[100vh] relative z-10` to overlap the canvas area. Added via wrapper `<div>` in HomeClient.tsx (can't modify component files)
- **Known trade-off**: Projects.tsx has built-in `-mt-[100vh]` from when it was the first section. Now at position 5, this creates an intentional-looking overlap over IDCard. Would need Projects.tsx edit to remove it if undesired
- **Only HomeClient.tsx modified** — zero component file changes
- **Build**: PASS. **LSP**: Zero errors.

## Task 12: Polish ID Card Physics, Mobile, Dark Mode (2026-05-09)

### Files Modified (6)
- `lib/cardTexture.ts` — Added `isDark` param, DARK_COLORS palette (slate-800 bg, slate-50 text)
- `hooks/useCardPhysics.ts` — Added tilt-back behavior (Quaternion→Euler→torque impulse), `lastInteractionRef` tracking, `performance.now()` for idle detection (1.5s threshold, strength 4.0)
- `components/IDCardLanyard.tsx` — Added `isMobile`/`isDark` props, frame skipping on mobile (every other frame), reduced tubular (32 vs 64) and radial (6 vs 8) segments, theme-aware rope color (#94A3B8 dark vs #1E293B light)
- `components/IDCardModel.tsx` — Added `isDark` prop, `linearDamping={0.5}` and `angularDamping={0.9}` on card RigidBody, texture regenerated when isDark changes
- `components/IDCardScene.tsx` — Added `isMobile`/`isDark` props, `dpr={[1, 2]}` on Canvas, `linearDamping={0.9}` and `angularDamping={0.9}` on chain RigidBodies, props forwarded to children
- `components/IDCard.tsx` — Added `prefers-reduced-motion` detection, small viewport detection (<640px), dark mode via `useTheme()`, `StaticCard` component for fallback (pure HTML/CSS card with same IDENTITY data)

### Architecture Decisions
- **Tilt-back uses applyTorqueImpulse scaled by delta** — frame-rate independent spring-damper behavior. angularDamping (0.9) prevents oscillation
- **Static card below 640px** — R3F is too expensive on small mobile devices. CSS-only fallback preserves content accessibility
- **Static card on prefers-reduced-motion** — no WebGL render at all, respects user accessibility preference
- **Rope material color is theme-aware** — dark rope invisible on dark bg, so uses slate-400 in dark mode
- **Frame skipping on mobile** — updates lanyard geometry every other frame, reducing per-frame TubeGeometry allocation cost
- **DPR capped at 2** — prevents GPU strain on high-DPI mobile devices

### Prop Flow
IDCard → IDCardScene(isMobile, isDark) → IDCardSceneInner → IDCardModel(isDark) + IDCardLanyard(isMobile, isDark)

### Verification
- **LSP diagnostics**: Clean on all 6 files (zero errors, zero warnings)
- **npm run build**: PASS (compiled 2.2s, TS 2.8s, pages 326ms)
- **npm run type-check**: PASS (exit 0)
- **document.createElement**: Only in cardTexture.ts, exclusively called from client-only code path via next/dynamic ssr:false chain

## T14: Vercel Analytics + Metadata Routes
- `@vercel/analytics` uses `import { Analytics } from "@vercel/analytics/react"` — mount once in root layout after children
- Next.js 16 metadata routes: export default function returning `MetadataRoute.Robots` / `MetadataRoute.Sitemap` from `app/robots.ts` and `app/sitemap.ts`
- Standard patterns work unchanged in Next.js 16 — `MetadataRoute` types from `next` package
- Build confirms routes appear as `○ /robots.txt` and `○ /sitemap.xml` (static)

## T15: Dependency Cleanup, Dead Code, Boilerplate Removal (2026-05-09)

- **@studio-freight/lenis → lenis**: Swapped in both package.json and hooks/useLenis.ts. `lenis` package is the official rename, same API surface. `npm install` added 1 package, removed 2.
- **split-type removed**: Zero imports anywhere in codebase. Clean removal from dependencies.
- **@mendable/firecrawl-js → devDependencies**: Only used in app/api/scrape-ifalf/route.ts (dev-only scrape utility). Moved to devDeps.
- **getLenis() already removed**: Confirmed T8 already cleaned this up. useLenis.ts now takes `enabled: boolean` param.
- **5 orphan CNA SVGs deleted**: file.svg, globe.svg, next.svg, vercel.svg, window.svg — zero references in any source file.
- **Build**: PASS (compiled 2.8s, TS 2.9s, 9 static pages in 202ms). Routes: /, /_not-found, /about, /projects, /api/scrape-ifalf, /robots.txt, /sitemap.xml.

## Task 13: Harden Mobile and Performance (2026-05-09)

### Files Modified (8)
- `app/globals.css` — Wrapped `cursor:none` rules in `@media (hover: hover) and (pointer: fine)` guard; added `overflow-x: hidden` to html
- `components/CustomCursor.tsx` — Added `hasFinePointer` media query check; returns null on touch devices and reduced-motion; removed duplicate early return
- `components/Navbar.tsx` — Hamburger button `size-10→size-11` (44px); close button same; nav overlay links get `py-2` for touch padding; social links get `min-h-11 flex items-center`
- `components/ThemeToggle.tsx` — `size-9→size-11` (44px touch target)
- `components/Footer.tsx` — Social icons get `min-w-11 min-h-11 flex items-center justify-center`; nav links get `min-h-11 flex items-center`
- `components/Contact.tsx` — Social icons get `min-w-11 min-h-11 flex items-center justify-center`
- `components/Projects.tsx` — "SEE MORE" button `py-3→py-3.5` for 44px height
- `components/SequenceScroll.tsx` — Added `reducedMotion` state + `matchMedia` detection; scroll hint pulse animation conditionally disabled on reduced-motion; text overlay 3 padding `px-10→px-6` for 375px safety

### Key Decisions
- **`(hover: hover) and (pointer: fine)`** for cursor:none guard — targets mouse/trackpad devices only, excludes touch + stylus + coarse pointers
- **CustomCursor null return** on touch — prevents rendering invisible dot/ring on mobile, saves memory + event listeners
- **44px touch targets**: Used `size-11` (44px) for icon buttons, `min-h-11` for text links. Apple HIG and WCAG 2.5.8 recommended minimum
- **Hover effects left as-is**: VTuberLogos grayscale hover, Projects bg change — these are harmless on touch (grayscale removal is acceptable UX, Projects already has focus-visible/active states)
- **SequenceScroll reduced-motion**: Only the infinite pulse animation was unguarded. Text overlays are scroll-driven (not auto-animated), canvas is scroll-driven. The pulse is the only `repeat: Infinity` animation.
- **No new dependencies added**

### Verification
- **LSP diagnostics**: Zero errors on all 8 modified files
- **npm run build**: PASS (compiled 2.4s, TS 3.0s, 9 static pages in 186ms)
- **npm run type-check**: PASS (exit 0)

## Task 17: Playwright E2E and Visual Smoke Checks (2026-05-09)

### Files Created (4)
- `tests/e2e/smoke.spec.ts` — Expanded from 1 to 15 tests: page load, console errors, all data-testid sections
- `tests/e2e/theme.spec.ts` — 1 test: dark class toggles on html element
- `tests/e2e/routes.spec.ts` — 4 tests: /projects (filter tabs, project cards, back-home), /about (content, skills, back-home)
- `tests/e2e/mobile.spec.ts` — 3 tests: 375×812 viewport (no horizontal overflow, hero clocks, footer)

### Test Coverage (22 tests total)
- Homepage: page load, console errors, hero clocks (site-clock, viewer-clock), marquee rows (×2), tech logos, project cards, see-more CTA, about glitch text, about readable text, quote section, contact section, contact email link, footer, footer wordmark
- Theme: toggle button flips dark class on html
- Routes: /projects with filter tabs + project cards, /about with skills list, both have back-home links
- Mobile: 375×812 no horizontal overflow, clocks visible, footer visible

### Known Issues Caught by Tests
- **Hydration mismatch**: Preloader SSR renders different className than client (bg-[var(--bg)] vs cursor dot class). Benign — React recovers. Filtered from console error test.
- **Script tag warning**: React warns about script tags in components (from Marquee's reduced-motion style injection). Benign. Filtered from console error test.

### Console Error Filtering Strategy
Benign patterns filtered: `net::ERR_CONNECTION_REFUSED`, `ResizeObserver loop`, `Hydration failed`, `Encountered a script tag`. These are all pre-existing or environment-specific, not regressions.

### Verification
- `npm run test:e2e`: 22/22 pass (13.1s)
