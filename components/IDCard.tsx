"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { IDENTITY } from "@/lib/constants";

const IDCardScene = dynamic(
  () =>
    import("@/components/IDCardScene").then((mod) => ({
      default: mod.IDCardScene,
    })),
  { ssr: false },
);

const SMALL_VIEWPORT_PX = 640;

function StaticCard({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex items-center justify-center h-full px-4">
      <div
        className={`rounded-xl border p-6 sm:p-8 max-w-xs sm:max-w-sm ${
          isDark
            ? "bg-slate-800 border-slate-700"
            : "bg-stone-50 border-stone-200"
        }`}
      >
        <div
          className={`h-1.5 w-[calc(100%+3rem)] -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-4 sm:mb-6 rounded-t-xl ${
            isDark ? "bg-amber-500" : "bg-amber-600"
          }`}
        />
        <h3
          className={`text-xl sm:text-2xl font-bold ${
            isDark ? "text-slate-50" : "text-stone-900"
          }`}
        >
          {IDENTITY.name}
        </h3>
        <p
          className={`text-sm mt-1 ${
            isDark ? "text-slate-400" : "text-stone-500"
          }`}
        >
          a.k.a. {IDENTITY.alias}
        </p>
        <p
          className={`text-sm tracking-widest uppercase mt-2 ${
            isDark ? "text-slate-300" : "text-stone-700"
          }`}
        >
          {IDENTITY.role}
        </p>
        <p
          className={`text-xs italic mt-4 sm:mt-6 ${
            isDark ? "text-slate-500" : "text-stone-400"
          }`}
        >
          &ldquo;{IDENTITY.motto}&rdquo;
        </p>
        <p
          className={`text-xs mt-1.5 ${
            isDark ? "text-slate-500" : "text-stone-400"
          }`}
        >
          {IDENTITY.email}
        </p>
      </div>
      <p className="sr-only">Interactive 3D card is available on larger screens without reduced motion preference.</p>
    </div>
  );
}

export default function IDCard() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [viewport, setViewport] = useState<{
    prefersReducedMotion: boolean;
    isSmallViewport: boolean;
  } | null>(null);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkSize = () =>
      setViewport({
        prefersReducedMotion: motionMq.matches,
        isSmallViewport: window.innerWidth < SMALL_VIEWPORT_PX,
      });

    checkSize();

    const onMotionChange = (e: MediaQueryListEvent) =>
      setViewport((prev) => prev ? { ...prev, prefersReducedMotion: e.matches } : prev);

    motionMq.addEventListener("change", onMotionChange);
    window.addEventListener("resize", checkSize);

    return () => {
      motionMq.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  const prefersReducedMotion = viewport?.prefersReducedMotion ?? false;
  const isSmallViewport = viewport?.isSmallViewport ?? false;

  const useStaticCard = prefersReducedMotion || isSmallViewport;

  return (
    <section id="id-card" className="relative z-10 bg-[#E8E8E8] dark:bg-[#1a1a1a] h-screen w-full overflow-hidden">
      <div className="absolute top-8 left-8 z-10">
        <p className="text-[#555] dark:text-[var(--fg-muted)] font-body text-xs tracking-[0.3em] uppercase">
          my card
        </p>
      </div>
      {useStaticCard ? (
        <StaticCard isDark={isDark} />
      ) : (
        <IDCardScene isMobile={isSmallViewport} isDark={isDark} />
      )}
    </section>
  );
}
