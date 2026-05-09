# Fariz Portfolio — Scrollytelling Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an Awwwards-level personal portfolio for Fariz (Nizar Alfarizi Akbar) using the IfalEX scrollytelling concept — a scroll-linked canvas image sequence where Fariz turns to face the viewer.

**Architecture:** Next.js App Router SPA. Core hero is a 500vh sticky canvas that maps scroll progress to 192 pre-extracted JPG frames via Motion's `useScroll`. All other sections stack below with `-mt-[100vh] relative z-10` to seamlessly close the canvas. Lenis handles smooth scroll globally.

**Tech Stack:** Next.js 15 + TypeScript, Tailwind CSS v4, Motion (Framer Motion), Lenis, Google Fonts (Syne + Manrope)

---

## File Map

| File | Responsibility |
|---|---|
| `src/app/layout.tsx` | Root layout: fonts, Lenis provider, custom cursor mount |
| `src/app/page.tsx` | Page composition — assembles all sections in order |
| `src/app/globals.css` | Base styles, CSS vars, scrollbar hide, cursor override |
| `src/components/Preloader.tsx` | Animated loading screen: counter 0→100, clip-path reveal |
| `src/components/Navbar.tsx` | Floating nav + fullscreen menu with clip-path open/close |
| `src/components/SequenceScroll.tsx` | 500vh sticky canvas, 192-frame scroll sequence + text overlays |
| `src/components/Projects.tsx` | 4-card grid, hover glow, -mt-[100vh] z-10 |
| `src/components/About.tsx` | Scroll-scrub split-character text reveal |
| `src/components/Services.tsx` | Service cards for Software Crafting role |
| `src/components/Marquee.tsx` | Infinite autoplay horizontal text marquee |
| `src/components/Contact.tsx` | Big text CTA, parallax icons, mailto link |
| `src/components/Footer.tsx` | Full-width screenfit "FARIZ" text + reveal |
| `src/components/CustomCursor.tsx` | Awards-style custom cursor (dot + ring) |
| `src/hooks/useLenis.ts` | Lenis instance init + scroll event hook |
| `src/lib/constants.ts` | Fariz's identity data, projects, services, nav links |

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`

- [ ] **Step 1: Run create-next-app in the migrate directory**

```bash
cd /Users/ktz/migrate && npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --yes
```

Expected: Next.js project scaffolded. `public/sequence/` folder preserved (create-next-app does not overwrite existing dirs).

- [ ] **Step 2: Install Motion, Lenis, and split-type**

```bash
cd /Users/ktz/migrate && npm install motion @studio-freight/lenis split-type
npm install -D @types/split-type
```

- [ ] **Step 3: Verify public/sequence frames are intact**

```bash
ls /Users/ktz/migrate/public/sequence | wc -l
```

Expected: `192`

- [ ] **Step 4: Update next.config.ts to allow image optimization and set base config**

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Commit**

```bash
git init && git add -A && git commit -m "feat: scaffold Next.js project with deps"
```

---

## Task 2: Constants & Global Styles

**Files:**
- Create: `src/lib/constants.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Create constants file with all Fariz identity data**

```typescript
// src/lib/constants.ts
export const IDENTITY = {
  name: "Nizar Alfarizi Akbar",
  alias: "Fariz",
  role: "Software Crafter",
  location: "Sidoarjo, Indonesia",
  email: "me@fariz.dev",
  bio: "Backend dev building \"gabut\" projects and crushing work tasks.",
  description: "I specialize in backend development and high-quality web applications — crafting systems that are fast, reliable, and built to last.",
  motto: "Code with craft. Ship with purpose.",
};

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/farizink" },
  { label: "Bluesky", href: "https://bsky.app/profile/fariz.dev" },
  { label: "Discord", href: "https://discord.com/users/383164336450830336" },
  { label: "Email", href: "mailto:me@fariz.dev" },
];

export const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const PROJECTS = [
  {
    title: "dea",
    subtitle: "Your virtual secretary",
    tech: "TypeScript",
    href: "https://github.com/farizink/dea",
    year: "2024",
  },
  {
    title: "space",
    subtitle: "Personal experimental project",
    tech: "TypeScript",
    href: "https://github.com/farizink/space",
    year: "2024",
  },
  {
    title: "avogado6",
    subtitle: "Personal site — built with Svelte",
    tech: "Svelte",
    href: "https://github.com/farizink/avogado6",
    year: "2024",
  },
  {
    title: "gak-ngotak",
    subtitle: "Discord random auto-chat bot",
    tech: "JavaScript",
    href: "https://github.com/farizink/gak-ngotak",
    year: "2023",
  },
];

export const SERVICES = [
  {
    title: "Backend Development",
    description: "Scalable APIs, microservices, and server-side systems built for performance.",
    icon: "⚙️",
  },
  {
    title: "Web Application",
    description: "Full-stack web apps from architecture to deployment — fast and reliable.",
    icon: "🌐",
  },
  {
    title: "Developer Tools",
    description: "Internal tooling and automation that makes teams ship faster.",
    icon: "🔧",
  },
  {
    title: "Code Review & Consulting",
    description: "Architecture reviews, performance audits, and technical guidance.",
    icon: "🔍",
  },
];

export const MARQUEE_ITEMS = [
  "SOFTWARE CRAFTER",
  "BACKEND DEVELOPER",
  "TYPESCRIPT",
  "NODE.JS",
  "SVELTE",
  "OPEN SOURCE",
  "SIDOARJO, ID",
];

export const SEQUENCE_FRAME_COUNT = 192;
```

- [ ] **Step 2: Set up globals.css with black base, Syne+Manrope fonts, cursor hide, scrollbar hide**

```css
/* src/app/globals.css */
@import "tailwindcss";

@import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&display=swap");

:root {
  --bg: #000000;
  --fg: #ffffff;
  --accent: #3b82f6;
  --accent-dim: rgba(59, 130, 246, 0.15);
  --font-heading: "Syne", sans-serif;
  --font-body: "Manrope", sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background: var(--bg);
  color: var(--fg);
  cursor: none;
  scrollbar-width: none;
}

html::-webkit-scrollbar {
  display: none;
}

body {
  font-family: var(--font-body);
  background: var(--bg);
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

/* Custom cursor hides native on all elements */
a, button, [role="button"] {
  cursor: none;
}

/* Split text: hide chars before reveal */
.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants.ts src/app/globals.css
git commit -m "feat: add constants and global styles"
```

---

## Task 3: Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write root layout with metadata and font preconnect**

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fariz — Software Crafter",
  description:
    "Nizar Alfarizi Akbar — Software Crafter based in Sidoarjo, Indonesia. Backend development and high-quality web applications.",
  keywords: ["fariz", "software engineer", "backend developer", "typescript", "svelte"],
  authors: [{ name: "Nizar Alfarizi Akbar" }],
  openGraph: {
    title: "Fariz — Software Crafter",
    description: "Backend dev building great software from Sidoarjo, Indonesia.",
    url: "https://fariz.dev",
    siteName: "Fariz",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fariz — Software Crafter",
    creator: "@FarizInk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: root layout with metadata"
```

---

## Task 4: Lenis Smooth Scroll Hook

**Files:**
- Create: `src/hooks/useLenis.ts`

- [ ] **Step 1: Create Lenis hook**

```typescript
// src/hooks/useLenis.ts
"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

let lenisInstance: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
}

export function getLenis() {
  return lenisInstance;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useLenis.ts
git commit -m "feat: lenis smooth scroll hook"
```

---

## Task 5: Custom Cursor

**Files:**
- Create: `src/components/CustomCursor.tsx`

- [ ] **Step 1: Build magnetic custom cursor (dot + ring)**

```typescript
// src/components/CustomCursor.tsx
"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 900 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 900 });
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const isHovering = useRef(false);
  const ringScale = useMotionValue(1);
  const ringScaleSpring = useSpring(ringScale, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleEnter = () => {
      isHovering.current = true;
      ringScale.set(2.2);
    };
    const handleLeave = () => {
      isHovering.current = false;
      ringScale.set(1);
    };

    window.addEventListener("mousemove", move);

    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [cursorX, cursorY, ringScale]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScaleSpring,
        }}
      />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CustomCursor.tsx
git commit -m "feat: awards-style custom cursor"
```

---

## Task 6: Preloader

**Files:**
- Create: `src/components/Preloader.tsx`

- [ ] **Step 1: Build preloader with counter and clip-path reveal**

```typescript
// src/components/Preloader.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IDENTITY } from "@/lib/constants";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      // Ease out: fast start, slow finish
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.min(Math.round(eased * 100), 100));

      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 800);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9000] bg-black flex flex-col items-center justify-center"
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          }}
          initial={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Name + Role */}
          <div className="mb-8 text-center">
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase font-['Manrope']">
              {IDENTITY.alias}
            </p>
            <p className="text-white/20 text-xs tracking-[0.2em] uppercase font-['Manrope'] mt-1">
              {IDENTITY.role}
            </p>
          </div>

          {/* Counter */}
          <div className="relative">
            <span
              className="text-white font-['Syne'] font-bold leading-none"
              style={{ fontSize: "clamp(80px, 15vw, 160px)" }}
            >
              {String(count).padStart(2, "0")}
            </span>
            <span className="text-white/40 text-2xl font-['Syne'] absolute -right-8 bottom-4">
              %
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-8 w-48 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              style={{ width: `${count}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Preloader.tsx
git commit -m "feat: preloader with animated counter and clip-path reveal"
```

---

## Task 7: Navbar

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Build floating navbar with fullscreen menu**

```typescript
// src/components/Navbar.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_LINKS, SOCIALS, IDENTITY } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  return (
    <>
      {/* Floating bar */}
      <nav className="fixed top-6 left-0 right-0 z-[800] px-6 flex items-center justify-between pointer-events-none">
        <span className="pointer-events-auto font-['Syne'] font-bold text-white text-sm tracking-widest uppercase">
          {IDENTITY.alias}
        </span>
        <button
          onClick={() => setOpen(true)}
          className="pointer-events-auto w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors"
          aria-label="Open menu"
        >
          <span className="flex flex-col gap-1">
            <span className="block w-4 h-px bg-white" />
            <span className="block w-4 h-px bg-white" />
          </span>
        </button>
      </nav>

      {/* Fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[900] bg-black flex flex-col justify-between p-8 md:p-12"
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Close */}
            <div className="flex justify-between items-center">
              <span className="font-['Syne'] font-bold text-white text-sm tracking-widest uppercase">
                {IDENTITY.alias}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors text-white text-xl"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left font-['Syne'] font-bold text-white leading-none hover:text-blue-400 transition-colors"
                  style={{ fontSize: "clamp(48px, 10vw, 96px)" }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* Footer row */}
            <div className="flex items-end justify-between">
              <p className="text-white/30 text-xs font-['Manrope'] tracking-widest uppercase">
                {IDENTITY.location}
              </p>
              <div className="flex gap-6">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white text-xs font-['Manrope'] tracking-wider uppercase transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: floating navbar with clip-path fullscreen menu"
```

---

## Task 8: SequenceScroll (Core Mechanic)

**Files:**
- Create: `src/components/SequenceScroll.tsx`

- [ ] **Step 1: Build the sticky canvas scroll sequence with text overlays**

```typescript
// src/components/SequenceScroll.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { SEQUENCE_FRAME_COUNT, IDENTITY } from "@/lib/constants";

const TOTAL_FRAMES = SEQUENCE_FRAME_COUNT; // 192

function frameUrl(i: number) {
  return `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
}

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Draw frame on scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loaded) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (index: number) => {
      const img = imagesRef.current[Math.round(index)];
      if (!img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // object-fit: cover logic
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    };

    const unsubscribe = frameIndex.on("change", draw);
    // Draw first frame immediately
    draw(0);

    return unsubscribe;
  }, [loaded, frameIndex]);

  // Resize canvas to window
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Text overlay visibility
  const op1 = useTransform(scrollYProgress, [0, 0.04, 0.12, 0.18], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.25, 0.30, 0.42, 0.48], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.52, 0.58, 0.70, 0.76], [0, 1, 1, 0]);
  const op4 = useTransform(scrollYProgress, [0.82, 0.88, 0.97, 1.0], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {/* Loading overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
          <p className="font-['Syne'] font-bold text-white text-6xl mb-4">{loadProgress}</p>
          <div className="w-48 h-px bg-white/10 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-white transition-all duration-100"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Sticky canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Text overlay 1 — 5% — center */}
        <motion.div
          style={{ opacity: op1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <p className="text-white/50 font-['Manrope'] text-sm tracking-[0.3em] uppercase mb-4">
            My name is
          </p>
          <h1
            className="font-['Syne'] font-bold text-white leading-none"
            style={{ fontSize: "clamp(40px, 8vw, 96px)" }}
          >
            {IDENTITY.alias}
          </h1>
          <p className="text-white/60 font-['Manrope'] text-lg mt-4 tracking-widest uppercase">
            {IDENTITY.role}
          </p>
        </motion.div>

        {/* Text overlay 2 — 30% — left */}
        <motion.div
          style={{ opacity: op2 }}
          className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 pointer-events-none max-w-lg"
        >
          <p className="text-white/30 font-['Manrope'] text-xs tracking-[0.3em] uppercase mb-4">
            About
          </p>
          <p
            className="font-['Syne'] font-semibold text-white leading-tight"
            style={{ fontSize: "clamp(22px, 3.5vw, 42px)" }}
          >
            {IDENTITY.description}
          </p>
        </motion.div>

        {/* Text overlay 3 — 60% — right */}
        <motion.div
          style={{ opacity: op3 }}
          className="absolute inset-0 flex flex-col justify-center items-end px-8 md:px-16 pointer-events-none text-right max-w-lg ml-auto"
        >
          <p className="text-white/30 font-['Manrope'] text-xs tracking-[0.3em] uppercase mb-4">
            Philosophy
          </p>
          <p
            className="font-['Syne'] font-bold text-white leading-tight"
            style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
          >
            {IDENTITY.motto}
          </p>
        </motion.div>

        {/* Text overlay 4 — 90% — center CTA */}
        <motion.div
          style={{ opacity: op4 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <p
            className="font-['Syne'] font-bold text-white leading-tight mb-8"
            style={{ fontSize: "clamp(28px, 5vw, 60px)" }}
          >
            Let's build
            <br />
            something great.
          </p>
          <a
            href={`mailto:${IDENTITY.email}`}
            className="pointer-events-auto group relative inline-flex items-center gap-3 border border-white/30 rounded-full px-8 py-4 font-['Manrope'] text-white text-sm tracking-wider uppercase hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
          >
            <span>{IDENTITY.email}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <p className="text-white/30 text-xs font-['Manrope'] tracking-widest uppercase">
            Scroll
          </p>
          <motion.div
            className="w-px h-8 bg-white/20"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SequenceScroll.tsx
git commit -m "feat: sequence scroll canvas hero with text overlays"
```

---

## Task 9: Projects Section

**Files:**
- Create: `src/components/Projects.tsx`

- [ ] **Step 1: Build project cards with cursor glow effect**

```typescript
// src/components/Projects.tsx
"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { PROJECTS } from "@/lib/constants";

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className="relative block border border-white/10 rounded-2xl p-8 overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Cursor glow */}
      {hovered && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: glowPos.x,
            top: glowPos.y,
            width: 300,
            height: 300,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <span className="text-white/20 font-['Manrope'] text-xs tracking-widest">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-white/20 font-['Manrope'] text-xs">{project.year}</span>
        </div>

        <h3
          className="font-['Syne'] font-bold text-white group-hover:text-blue-400 transition-colors leading-none mb-3"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          {project.title}
        </h3>
        <p className="text-white/50 font-['Manrope'] text-sm mb-6">{project.subtitle}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-['Manrope'] text-white/30 border border-white/10 rounded-full px-3 py-1">
            {project.tech}
          </span>
          <span className="text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
            →
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative -mt-[100vh] z-10 bg-black px-6 md:px-12 py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/30 font-['Manrope'] text-xs tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2
            className="font-['Syne'] font-bold text-white leading-none"
            style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
          >
            Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://github.com/farizink"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 rounded-full px-8 py-3 font-['Manrope'] text-white/60 text-sm tracking-wider uppercase hover:text-white hover:border-white/60 transition-all"
          >
            See All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: projects section with cursor glow cards"
```

---

## Task 10: About Section (Split Text Reveal)

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1: Build scroll-scrub character reveal**

```typescript
// src/components/About.tsx
"use client";
import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { IDENTITY } from "@/lib/constants";

const ABOUT_TEXT =
  "Hi, I'm Fariz — a Software Crafter from Sidoarjo, Indonesia. I focus on backend systems, high-quality web apps, and developer tooling. I love building things that are fast, useful, and a little bit weird.";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });

  const chars = ABOUT_TEXT.split("");

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-10 bg-black px-6 md:px-12 py-24 md:py-40"
    >
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-white/20 font-['Manrope'] text-xs tracking-[0.3em] uppercase mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          About
        </motion.p>

        <p
          className="font-['Syne'] font-semibold text-white leading-tight"
          style={{ fontSize: "clamp(24px, 4vw, 52px)" }}
        >
          {chars.map((char, i) => {
            const start = i / chars.length;
            const end = start + 1 / chars.length + 0.05;
            return (
              <CharReveal
                key={i}
                char={char}
                progress={scrollYProgress}
                start={Math.min(start, 0.95)}
                end={Math.min(end, 1)}
              />
            );
          })}
        </p>

        <motion.div
          className="mt-16 flex flex-wrap gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {["Backend Systems", "TypeScript", "Node.js", "Svelte", "APIs", "Dev Tools"].map(
            (skill) => (
              <span
                key={skill}
                className="border border-white/10 rounded-full px-4 py-2 text-white/40 font-['Manrope'] text-sm"
              >
                {skill}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}

function CharReveal({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);
  if (char === " ") return <span> </span>;
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {char}
    </motion.span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: about section with scroll-scrub character reveal"
```

---

## Task 11: Services, Marquee, Contact, Footer

**Files:**
- Create: `src/components/Services.tsx`
- Create: `src/components/Marquee.tsx`
- Create: `src/components/Contact.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Services section**

```typescript
// src/components/Services.tsx
"use client";
import { motion } from "motion/react";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-10 bg-black px-6 md:px-12 py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/30 font-['Manrope'] text-xs tracking-[0.3em] uppercase mb-4">
            What I do
          </p>
          <h2
            className="font-['Syne'] font-bold text-white leading-none"
            style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
          >
            Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              className="bg-black p-10 group hover:bg-white/[0.02] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-3xl mb-6 block">{service.icon}</span>
              <h3 className="font-['Syne'] font-bold text-white text-xl mb-3 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-white/40 font-['Manrope'] text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Marquee component**

```typescript
// src/components/Marquee.tsx
"use client";
import { motion } from "motion/react";
import { MARQUEE_ITEMS } from "@/lib/constants";

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative z-10 bg-black border-y border-white/5 py-5 overflow-hidden">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-['Syne'] font-bold text-white/10 text-sm tracking-[0.3em] uppercase flex-shrink-0 flex items-center gap-12"
          >
            {item}
            <span className="text-blue-500/40">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 3: Contact section**

```typescript
// src/components/Contact.tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { IDENTITY, SOCIALS } from "@/lib/constants";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 bg-black px-6 md:px-12 py-32 md:py-48 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          className="text-white/30 font-['Manrope'] text-xs tracking-[0.3em] uppercase mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Get in touch
        </motion.p>

        <motion.h2
          className="font-['Syne'] font-bold text-white leading-none mb-4"
          style={{ fontSize: "clamp(40px, 8vw, 96px)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Let's build
          <br />
          <span className="text-blue-400">something great.</span>
        </motion.h2>

        <motion.p
          className="text-white/40 font-['Manrope'] text-lg mb-12 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Open to new opportunities, collaborations, and interesting projects.
        </motion.p>

        <motion.a
          href={`mailto:${IDENTITY.email}`}
          className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-400 text-black font-['Syne'] font-bold rounded-full px-10 py-5 text-sm tracking-wider uppercase transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {IDENTITY.email}
          <span>→</span>
        </motion.a>

        {/* Floating social icons with parallax */}
        <motion.div style={{ y }} className="mt-20 flex justify-center gap-8">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 font-['Manrope'] text-xs tracking-widest uppercase hover:text-white transition-colors"
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Footer**

```typescript
// src/components/Footer.tsx
"use client";
import { motion } from "motion/react";
import { IDENTITY } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black border-t border-white/5 px-6 py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <p className="text-white/20 font-['Manrope'] text-xs tracking-widest">
          © {new Date().getFullYear()} {IDENTITY.name}
        </p>

        <motion.p
          className="font-['Syne'] font-bold text-white/5 leading-none select-none"
          style={{ fontSize: "clamp(60px, 12vw, 160px)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          FARIZ
        </motion.p>

        <p className="text-white/20 font-['Manrope'] text-xs tracking-widest">
          {IDENTITY.location}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Services.tsx src/components/Marquee.tsx src/components/Contact.tsx src/components/Footer.tsx
git commit -m "feat: services, marquee, contact, footer sections"
```

---

## Task 12: Assemble page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Wire all components together**

```typescript
// src/app/page.tsx
"use client";
import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Services from "@/components/Services";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { useLenis } from "@/hooks/useLenis";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  useLenis();

  return (
    <>
      <CustomCursor />
      <Preloader onComplete={() => setPreloaderDone(true)} />
      {preloaderDone && (
        <main>
          <Navbar />
          <SequenceScroll />
          <Projects />
          <About />
          <Marquee />
          <Services />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
}
```

- [ ] **Step 2: Run dev server and verify**

```bash
cd /Users/ktz/migrate && npm run dev
```

Open `http://localhost:3000`. Verify:
- Preloader counts to 100 and wipes up
- Canvas loads frames and scrubs on scroll
- Each text overlay fades in/out at correct scroll positions
- Projects section closes canvas cleanly
- All sections render below

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble full page — all sections wired"
```

---

## Task 13: Deploy to Vercel

**Files:**
- None (Vercel config via CLI)

- [ ] **Step 1: Build prod and check for errors**

```bash
cd /Users/ktz/migrate && npm run build
```

Expected: `✓ Compiled successfully`. Fix any TypeScript errors before continuing.

- [ ] **Step 2: Deploy to Vercel**

```bash
npx vercel --prod
```

Follow prompts: link to project, set root directory to `.`, confirm settings.

- [ ] **Step 3: Verify live site**

Open the Vercel URL. Confirm:
- Preloader runs
- Canvas sequence plays on scroll
- All sections visible
- Mobile canvas scales correctly (cover fit)

---

## Self-Review: Spec Coverage

| Requirement | Task |
|---|---|
| Next.js + TS + Tailwind | Task 1 |
| Motion animations | Tasks 6,7,8,9,10 |
| Lenis smooth scroll | Task 4 |
| #000000 background | Task 2 |
| Syne + Manrope fonts | Task 2 |
| Electric blue accent | Tasks 2, 9, 10, 11 |
| Preloader (counter + clip-path) | Task 6 |
| Navbar + fullscreen menu | Task 7 |
| Sticky canvas sequence (192 frames) | Task 8 |
| Text overlays at 5/30/60/90% | Task 8 |
| Projects -mt-[100vh] z-10 | Task 9 |
| About split text scroll reveal | Task 10 |
| Services section | Task 11 |
| Infinite marquee | Task 11 |
| Contact section + email CTA | Task 11 |
| Footer screenfit text | Task 11 |
| Custom cursor | Task 5 |
| Vercel deploy | Task 13 |
| Mobile canvas cover fit | Task 8 |
| Fariz identity data | Task 2 |
