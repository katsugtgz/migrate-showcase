# Portfolio

Awwwards-level scrollytelling portfolio built with Next.js 16, React 19, and Three.js. Features a 192-frame scroll-driven animation, 3D physics ID card, dark mode, and smooth scrolling.

## Tech Stack

- **Framework**: Next.js 16.2.6 (App Router)
- **UI**: React 19.2.4, TypeScript 5, Tailwind CSS v4
- **Animation**: Motion v12.38
- **3D**: @react-three/fiber + @react-three/rapier (physics)
- **Scroll**: Lenis (smooth scrolling)
- **Theming**: next-themes (dark/light, class attribute)
- **Font**: Outfit (via next/font/google)
- **Testing**: Vitest, Playwright

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Commands

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Local dev server on :3000 |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `eslint` | ESLint (flat config) |
| `type-check` | `tsc --noEmit` | Type checking without emit |
| `test` | `vitest run` | Unit tests |
| `test:e2e` | `playwright test` | End-to-end tests |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `FIRECRAWL_API_KEY` | No (dev only) | Key for the `/api/scrape-ifalf` route. This route is for development reference scraping only and should not ship to production. |

Create a `.env.local` file in the project root:

```
FIRECRAWL_API_KEY=your_key_here
```

## Architecture Notes

### Next.js 16 Caveat

This project uses Next.js 16, which includes breaking changes from earlier versions. APIs, conventions, and file structure may differ from most documentation and tutorials you'll find online. Before writing code against this codebase, read the relevant guide in `node_modules/next/dist/docs/`.

### Component Hierarchy

```
RootLayout (server) → page (server) → HomeClient (client boundary) → all components
```

Only `layout.tsx` and `page.tsx` are server components. Everything else is `'use client'`.

### Section Order

1. SequenceScroll (sticky canvas, 192-frame scroll animation)
2. Marquee (horizontal scrolling text)
3. About
4. VTuberLogos
5. IDCard (3D physics card, code-split via `next/dynamic` with `ssr: false`)
6. Projects
7. Quote
8. Contact
9. Footer

Every section after SequenceScroll uses `-mt-[100vh] relative z-10` to stack above the sticky canvas. Removing this causes canvas bleed-through.

### Tailwind v4

No `tailwind.config.js`. All configuration lives in CSS `@theme` directives inside `app/globals.css`.

### Motion v12

Import from `motion/react`. All animated components use `LazyMotion` + `domAnimation` for tree-shaking.

### Dark Mode

Handled by `next-themes` with `attribute='class'`. The custom Tailwind variant is `@custom-variant dark (&:is(.dark *))`.

### 3D ID Card

The ID card uses R3F with Rapier physics (lanyard rope simulation via spherical joints). It loads through `next/dynamic` with `ssr: false` to avoid server-side Three.js issues. Card textures are generated via Canvas API in `lib/cardTexture.ts`.

### Firecrawl Route

The API route at `app/api/scrape-ifalf/route.ts` is a dev-only utility for scraping reference content. It should not be deployed to production. The Firecrawl SDK is a devDependency.

## Asset Provenance

All local assets are original placeholders. No copyrighted material from external sources is included.

| Directory | Contents | Origin |
|-----------|----------|--------|
| `public/sequence/` | 192 JPG frames (ezgif-frame-001.jpg through 192.jpg) | Locally generated via ffmpeg |
| `public/tech/` | 12 SVG tech logos (anime-style) | Original placeholders |
| `public/projects/` | 4 SVG project thumbnails | Original placeholders |
| `public/fariz-wordmark.svg` | Wordmark logo | Original placeholder |

Policy: all assets are stored locally in `public/`. No hotlinks to external image hosts. SVGs serve as placeholders until final assets are ready.

## Testing

- **Unit tests**: `npm run test` (Vitest + jsdom + Testing Library)
- **E2E tests**: `npm run test:e2e` (Playwright)

## Deployment

Manual deployment via Vercel CLI:

```bash
npx vercel --prod
```

No CI/CD pipeline is configured. Ensure the Firecrawl API route and any dev-only utilities are excluded before production deploys.

## Project Structure

```
app/
  layout.tsx          Root layout (server)
  page.tsx            Home page (server)
  HomeClient.tsx      Client boundary, composes all sections
  globals.css         Tailwind v4 @theme config, CSS vars, dark variant
  api/scrape-ifalf/   Dev-only Firecrawl scrape route

components/           All 'use client'
  SequenceScroll.tsx  Core scroll-driven canvas animation
  Preloader.tsx       Clip-path reveal
  IDCard.tsx          Dynamic import wrapper (ssr: false)
  IDCardScene.tsx     R3F Canvas + physics world
  IDCardModel.tsx     Card mesh + meshline edges
  IDCardLanyard.tsx   Rope physics (spherical joints)
  ThemeToggle.tsx     Dark/light toggle

hooks/
  useLenis.ts         Smooth scroll
  useCardPhysics.ts   Rapier physics for ID card

lib/
  constants.ts        Site content (identity, projects, etc.)
  cardTexture.ts      Canvas texture generation
```
