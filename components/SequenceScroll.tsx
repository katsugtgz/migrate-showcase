"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, LazyMotion, domAnimation, m } from "motion/react";
import { SEQUENCE_FRAME_COUNT, IDENTITY } from "@/lib/constants";
import HeroClock from "@/components/HeroClock";

const TOTAL_FRAMES = SEQUENCE_FRAME_COUNT;

function frameUrl(i: number) {
  return `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
}

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const drawRef = useRef<(index: number) => void>(() => {});
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  // Listen for reduced-motion changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const onSettle = () => {
      if (cancelled) return;
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      if (loadedCount === TOTAL_FRAMES) setLoaded(true);
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      img.onload = onSettle;
      img.onerror = onSettle; // count errors as settled so loader never hangs
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      cancelled = true;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // Draw frame on scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loaded) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastIndex = -1;

    const draw = (index: number) => {
      const rounded = Math.round(index);
      if (rounded === lastIndex) return;
      lastIndex = rounded;
      const img = imagesRef.current[rounded];
      if (!img) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const iw = img.naturalWidth * scale;
      const ih = img.naturalHeight * scale;
      const x = (w - iw) / 2;
      const y = (h - ih) / 2;
      ctx.drawImage(img, x, y, iw, ih);
    };

    drawRef.current = draw;
    const unsubscribe = frameIndex.on("change", draw);
    draw(frameIndex.get());

    return () => {
      unsubscribe();
    };
  }, [loaded, frameIndex]);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.cssText = `width:${w}px;height:${h}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      drawRef.current(frameIndex.get());
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [frameIndex]);

  // Scroll to canvas when a child receives focus
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleFocusIn = () => {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    container.addEventListener("focusin", handleFocusIn);
    return () => container.removeEventListener("focusin", handleFocusIn);
  }, []);

  const op1 = useTransform(scrollYProgress, [0, 0.02, 0.10, 0.16], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.25, 0.30, 0.42, 0.48], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.52, 0.58, 0.70, 0.76], [0, 1, 1, 0]);
  const op4 = useTransform(scrollYProgress, [0.82, 0.88, 0.97, 1.0], [0, 1, 1, 0]);
  const scrollHintOp = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const heroClockOp = useTransform(scrollYProgress, [0, 0.03, 0.06], [1, 1, 0]);

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className="relative h-[500vh]">
        {/* Loading overlay */}
        {!loaded && (
          <output aria-live="polite" className="fixed inset-0 z-50 bg-[var(--bg)] flex flex-col items-center justify-center">
            <p className="font-heading font-bold text-[var(--fg)] text-6xl mb-4">{loadProgress}</p>
            <div className="w-48 h-px bg-[var(--border)] relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-[var(--accent)] transition-all duration-100"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="sr-only">Loading: {loadProgress}%</span>
          </output>
        )}

        {/* Sticky canvas */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-b from-transparent to-[var(--bg)] pointer-events-none z-10" />

          <m.div style={{ opacity: heroClockOp }} className="absolute inset-0 pointer-events-none z-20">
            <HeroClock />
          </m.div>

          {/* Text overlay 1 — 5% — bottom-left */}
          <m.div
            style={{ opacity: op1 }}
            className="absolute inset-0 flex flex-col items-start justify-end pb-24 pl-8 md:pl-16 pointer-events-none text-left"
          >
            <p className="text-white/80 font-body text-sm tracking-[0.3em] uppercase mb-4 drop-shadow-md">
              My name is
            </p>
            <p
              className="font-heading font-semibold text-white leading-none"
              style={{ fontSize: "clamp(40px, 8vw, 96px)", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              {IDENTITY.alias}
            </p>
            <p className="text-white/80 font-body text-lg mt-4 tracking-widest uppercase drop-shadow-md">
              {IDENTITY.role}
            </p>
          </m.div>

          {/* Text overlay 2 — 30% — left */}
          <m.div
            style={{ opacity: op2 }}
            className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 pointer-events-none max-w-lg"
          >
            <p className="text-white/80 font-body text-xs tracking-[0.3em] uppercase mb-4 drop-shadow-md">
              About
            </p>
            <p
              className="font-heading font-semibold text-white leading-tight"
              style={{ fontSize: "clamp(22px, 3.5vw, 42px)", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              {IDENTITY.description}
            </p>
          </m.div>

          {/* Text overlay 3 — 60% — right */}
          <m.div
            style={{ opacity: op3 }}
            className="absolute inset-0 flex flex-col justify-center items-end px-6 md:px-20 pointer-events-none text-right max-w-lg ml-auto"
          >
            <p className="text-white/80 font-body text-xs tracking-[0.3em] uppercase mb-4 drop-shadow-md">
              Philosophy
            </p>
            <p
              className="font-heading font-semibold text-white leading-tight"
              style={{ fontSize: "clamp(24px, 4vw, 48px)", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              {IDENTITY.motto}
            </p>
          </m.div>

          {/* Text overlay 4 — 90% — center CTA */}
          <m.div
            style={{ opacity: op4 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          >
            <p
              className="font-heading font-semibold text-white leading-tight mb-8"
              style={{ fontSize: "clamp(28px, 5vw, 60px)", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              Let&apos;s build
              <br />
              something great.
            </p>
            <a
              href={`mailto:${IDENTITY.email}`}
              className="pointer-events-auto scroll-mt-4 group relative inline-flex items-center gap-3 border border-white/30 rounded-full px-8 py-4 font-body text-white text-sm tracking-wider uppercase hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 backdrop-blur-sm bg-black/20"
            >
              <span>{IDENTITY.email}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </m.div>

          {/* Scroll hint */}
          <m.div
            data-testid="scroll-cta"
            style={{ opacity: scrollHintOp }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <p className="text-white/80 text-xs font-body tracking-widest uppercase drop-shadow-md">
              Scroll
            </p>
            <m.div
              className="w-px h-8 bg-white/50 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              animate={reducedMotion ? undefined : { scaleY: [1, 0.3, 1] }}
              transition={reducedMotion ? undefined : { duration: 1.5, repeat: Infinity }}
            />
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}
