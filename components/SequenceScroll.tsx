"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { SEQUENCE_FRAME_COUNT, IDENTITY } from "@/lib/constants";

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

    return unsubscribe;
  }, [loaded, frameIndex]);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      drawRef.current(frameIndex.get());
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [frameIndex]);

  const op1 = useTransform(scrollYProgress, [0, 0.04, 0.12, 0.18], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.25, 0.30, 0.42, 0.48], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.52, 0.58, 0.70, 0.76], [0, 1, 1, 0]);
  const op4 = useTransform(scrollYProgress, [0.82, 0.88, 0.97, 1.0], [0, 1, 1, 0]);
  const scrollHintOp = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

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
            Let&apos;s build
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
          style={{ opacity: scrollHintOp }}
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
