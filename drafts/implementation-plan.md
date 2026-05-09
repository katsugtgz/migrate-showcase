# Implementation Plan: ID Card, Projects Refactor, Dark Mode

**Date:** 9 May 2026
**Based on:** `drafts/3item-9may.md` + grill session decisions
**Estimated Effort:** 3 workstreams, ~8-12 hours total

---

## Workstream 1: 3D Hanging ID Card

### Goal
A draggable ID card hanging from a lanyard, implemented in WebGL with real physics. The card swings when dragged and settles naturally when released.

### Architecture
- **Renderer:** React Three Fiber (`@react-three/fiber`)
- **Physics:** Rapier WASM via `@react-three/rapier`
- **Card Geometry:** Procedural — `BoxGeometry` with canvas-generated texture
- **Lanyard:** `meshline` thick line following physics joints
- **Position:** Inserted after `Projects` section in `HomeClient.tsx`

### Files to Create/Modify

#### New Files
| File | Purpose |
|------|---------|
| `components/IDCard.tsx` | Main R3F Canvas wrapper, section container |
| `components/IDCardScene.tsx` | Physics world setup, lighting, camera |
| `components/IDCardModel.tsx` | The card mesh + material + texture generation |
| `components/IDCardLanyard.tsx` | The rope line connecting anchor to card |
| `hooks/useCardPhysics.ts` | Rapier physics setup: joints, bodies, drag handling |
| `lib/cardTexture.ts` | Canvas API to generate the ID card image texture from IDENTITY data |

#### Modified Files
| File | Change |
|------|--------|
| `app/HomeClient.tsx` | Insert `<IDCard />` between `<Projects />` and `<About />` |
| `package.json` | Add deps: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `meshline` |

### Card Texture Design (Canvas API)
The texture will be generated programmatically using HTML5 Canvas:
- **Size:** 512x800px (portrait card ratio)
- **Background:** Dark gradient (black → dark gray)
- **Logo:** Geometric mark (top-left)
- **Name:** "Nizar Alfarizi Akbar" — large, bold, white
- **Alias:** "a.k.a. Fariz" — smaller, muted
- **Role:** "Software Engineer" — uppercase, tracking wide
- **Tagline:** "Building digital experiences that matter." — thin, bottom area
- **Year:** "© 2026" — small, bottom-right
- **Accent stripe:** Amber (`#D97706`) vertical bar on left edge

### Physics Chain
```
FIXED ANCHOR (top-center of scene)
    └── Rope Joint (length: 0.5m, stiffness: 0.8)
        └── Joint 1 (small invisible sphere, dynamic)
            └── Rope Joint (length: 0.5m)
                └── Joint 2
                    └── Rope Joint (length: 0.5m)
                        └── Joint 3
                            └── Spherical Joint
                                └── CARD (box, dynamic/kinematic when dragged)
```

### Drag Interaction
1. User clicks/touches the card
2. Card switches from `dynamic` to `kinematicPosition`
3. Mouse position is raycast to 3D world → set as card target position
4. On release, card switches back to `dynamic`, inherits velocity
5. Physics engine handles the swing/settle

### Section Layout
```tsx
<section className="relative h-screen w-full bg-[var(--bg)]">
  <IDCardScene /> {/* R3F Canvas, full section */}
</section>
```
- Section height: `100vh`
- Background: uses CSS var `--bg` (white in light, dark in dark mode)
- Canvas is `position: absolute, inset: 0`

---

## Workstream 2: Projects Refactor — Text Rows with Image Reveal

### Goal
Replace the current 2-column project card grid with minimal text rows. On hover, a project preview image fades in and scales up at the cursor position or center.

### Architecture
- **Rows:** Plain `<Link>` elements, full width, border-bottom separator
- **Hover State:** CSS `group-hover` for opacity/scale transitions
- **Image:** Absolute-positioned, centered, pointer-events-none
- **Data:** Same `PROJECTS` array from `lib/constants.ts` — add `imageUrl` field

### Files to Modify

| File | Change |
|------|--------|
| `components/Projects.tsx` | Complete rewrite — remove ProjectCard, implement ProjectRow |
| `lib/constants.ts` | Add `imageUrl` to each `PROJECT` item (need screenshot/thumbnail URLs) |

### Row Design
```tsx
<Link href={href} className="group relative flex items-center justify-between border-b border-neutral-300 dark:border-neutral-800 py-8 px-4 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
  {/* Left: Title + Category */}
  <div className="flex flex-col z-10 relative">
    <h3 className="text-4xl md:text-5xl font-bold">{title}</h3>
    <p className="text-sm tracking-widest uppercase mt-2 text-neutral-500">{category} · {year}</p>
  </div>

  {/* Center: Floating Image (hidden by default) */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-0 scale-95 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100">
    <div className="w-[300px] h-[200px] md:w-[450px] md:h-[300px] relative rounded-xl overflow-hidden shadow-2xl">
      <Image src={imageUrl} alt={title} fill className="object-cover" />
    </div>
  </div>

  {/* Right: Arrow */}
  <div className="hidden md:block text-3xl transition-transform duration-300 group-hover:translate-x-4">→</div>
</Link>
```

### Data Requirement
Each project needs a representative image. Options:
1. **Screenshots** of each project (if live/demo URLs exist)
2. **Placeholder** images from `public/` (generic dev-themed images)
3. **GitHub social preview** images (auto-generated from repos)

**Recommendation:** Use GitHub repo opengraph images or placeholder abstract images for now. The user can replace later.

### Section Layout Changes
Current: `-mt-[100vh] z-10 bg-white` (overlays sequence)
New: Keep the overlay behavior, but background uses `bg-[var(--bg)]` for dark mode support.

---

## Workstream 3: Dark Mode (next-themes)

### Goal
Seamless dark/light theme toggle. All colors swap via CSS custom properties. Toggle button in Navbar.

### Architecture
- **Engine:** `next-themes` with `attribute="class"`
- **Tokens:** CSS custom properties in `app/globals.css`
- **Toggle:** `components/ThemeToggle.tsx` — sun/moon SVG icon
- **Scope:** Every component that uses hardcoded colors

### Files to Create/Modify

#### New Files
| File | Purpose |
|------|---------|
| `components/ThemeToggle.tsx` | Button with sun/moon icons, `useTheme` hook |

#### Modified Files
| File | Changes |
|------|---------|
| `app/layout.tsx` | Add `<ThemeProvider attribute="class" defaultTheme="light">`, add `suppressHydrationWarning` to `<html>` |
| `app/globals.css` | Define `--bg`, `--fg`, `--accent`, `--accent-dim` in `:root` and `.dark` |
| `components/Navbar.tsx` | Add `<ThemeToggle />` to the right side of nav |
| `components/SequenceScroll.tsx` | Update canvas clear color, text overlay colors |
| `components/Projects.tsx` | Update borders, hover bg, text colors |
| `components/About.tsx` | Update text colors, background |
| `components/Services.tsx` | Update cards, icons, text |
| `components/Contact.tsx` | Update form styles, text |
| `components/Footer.tsx` | Update text, borders |
| `components/Preloader.tsx` | Update clip-path bg color |
| `components/Marquee.tsx` | Update text color |
| `components/VTuberLogos.tsx` | Update logo container bg |
| `package.json` | Add `next-themes` dependency |

### Color Token Mapping

| Token | Light (`:root`) | Dark (`.dark`) | Usage |
|-------|----------------|-----------------|-------|
| `--bg` | `#FFFFFF` | `#0F172A` | Page background, section bg |
| `--fg` | `#0F172A` | `#F8FAFC` | Primary text, headings |
| `--fg-muted` | `#64748B` | `#94A3B8` | Secondary text, labels |
| `--accent` | `#D97706` | `#F59E0B` | CTAs, highlights, glow |
| `--accent-dim` | `rgba(217,119,6,0.15)` | `rgba(245,158,11,0.15)` | Subtle backgrounds, hover states |
| `--border` | `#E2E8F0` | `#1E293B` | Dividers, card borders |

### Tailwind v4 Integration
Since this project uses Tailwind v4 (no `tailwind.config.js`), colors are applied via:
- `bg-[var(--bg)]` / `text-[var(--fg)]` / `border-[var(--border)]`
- Or define in `@theme` block in `globals.css` if preferred

### Theme Toggle Component
```tsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[var(--border)]"
      aria-label="Toggle theme"
    >
      {/* Sun icon — visible in light mode */}
      <svg className="h-[1.2rem] w-[1.2rem] dark:hidden" ...>...</svg>
      {/* Moon icon — visible in dark mode */}
      <svg className="hidden h-[1.2rem] w-[1.2rem] dark:block" ...>...</svg>
    </button>
  );
}
```

---

## Dependency Installation

```bash
# Workstream 1: 3D Physics
npm install three @react-three/fiber @react-three/drei @react-three/rapier meshline
npm install -D @types/three

# Workstream 3: Dark Mode
npm install next-themes
```

**Bundle impact:**
- `three` + R3F + Rapier + meshline: ~300-400KB gzipped (significant — consider dynamic import)
- `next-themes`: ~2KB

**Recommendation:** Dynamically import the IDCard section:
```tsx
const IDCard = dynamic(() => import("@/components/IDCard"), { ssr: false });
```

---

## Implementation Order

### Phase 1: Foundation (no visual change yet)
1. Install all dependencies
2. Set up `next-themes` in `layout.tsx`
3. Update `globals.css` with CSS custom properties + `.dark` overrides
4. Create `ThemeToggle.tsx`
5. Add toggle to `Navbar.tsx`

### Phase 2: Dark Mode Sweep
6. Update each component to use `var(--*)` instead of hardcoded colors:
   - `SequenceScroll.tsx` (canvas clear color, text colors)
   - `Projects.tsx` (borders, hover bg)
   - `About.tsx`, `Services.tsx`, `Contact.tsx`, `Footer.tsx`
   - `Preloader.tsx`, `Marquee.tsx`, `VTuberLogos.tsx`

### Phase 3: Projects Refactor
7. Update `lib/constants.ts` — add `imageUrl` to projects
8. Rewrite `components/Projects.tsx` — text rows with floating image reveal
9. Add placeholder project images to `public/projects/`

### Phase 4: ID Card (most complex)
10. Create `lib/cardTexture.ts` — canvas texture generator
11. Create `hooks/useCardPhysics.ts` — Rapier physics setup
12. Create `components/IDCardModel.tsx` — card mesh
13. Create `components/IDCardLanyard.tsx` — rope line
14. Create `components/IDCardScene.tsx` — full R3F scene
15. Create `components/IDCard.tsx` — section wrapper
16. Insert into `HomeClient.tsx`
17. Test drag physics, tune spring constants

---

## Open Questions / Blockers

| # | Question | Status |
|---|----------|--------|
| 1 | Do you have project screenshots/images for the hover reveal? | Need answer |
| 2 | Should the ID card section have any text label ("My ID", "About") or is the card self-explanatory? | Need answer |
| 3 | Should the lanyard/rope be visible (black strap with text like reference) or just a thin line? | Need answer |
| 4 | What happens on mobile? Drag still works (touch), but physics might be heavy. Add `prefers-reduced-motion` fallback? | Need answer |

---

## Risks

| Risk | Mitigation |
|------|------------|
| **Bundle bloat** from Three.js + Rapier | Dynamic import `IDCard`, lazy load on viewport entry |
| **Mobile performance** — WASM physics + WebGL on low-end devices | Add `prefers-reduced-motion` static fallback, test on real devices |
| **Hydration mismatch** with `next-themes` | `suppressHydrationWarning` on `<html>`, client-only mount for toggle |
| **Canvas texture looks bad** | Iterate on card design, use high-res canvas (1024px), add subtle gradient/shadow |
| **Physics feels wrong** | Tune mass, stiffness, damping via exposed props, iterate with user feedback |

---

## Acceptance Criteria

### ID Card
- [ ] Card hangs from top-center with visible lanyard/rope
- [ ] Card displays name, alias, role, tagline, year
- [ ] Dragging the card moves it with mouse, rope follows
- [ ] Releasing card causes natural swing/settle physics
- [ ] Works on desktop (mouse) and mobile (touch)
- [ ] Respects `prefers-reduced-motion` (static card, no physics)

### Projects Refactor
- [ ] Projects display as full-width text rows
- [ ] Each row has title, category/year, arrow
- [ ] Hover reveals floating image (opacity 0→1, scale 0.95→1)
- [ ] Image is centered, pointer-events-none, doesn't block clicks
- [ ] Links still work, navigate to project/GitHub
- [ ] Dark mode: borders and hover states invert properly

### Dark Mode
- [ ] Toggle button visible in Navbar
- [ ] Clicking toggle switches theme instantly
- [ ] Theme preference persists in localStorage
- [ ] All sections respect dark colors (no hardcoded light values)
- [ ] No hydration mismatch errors
- [ ] System preference respected on first visit (optional)

---

## Review Request

Please review this plan and confirm:
1. **Open Questions** (table above) — answer each
2. **Implementation Order** — any phases you want reordered?
3. **Scope** — anything missing or should be cut?
4. **Go/No-Go** — ready to proceed or want changes?
