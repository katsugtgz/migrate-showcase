"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import { MARQUEE_ROWS } from "@/lib/constants";

const SEPARATOR = "✦";
const STORAGE_KEY = "marquee-paused";

function subscribeToMarqueePreference(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function getMarqueePreference() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function MarqueeRow({
  items,
  reverse,
  paused,
}: {
  items: readonly string[];
  reverse: boolean;
  paused: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      data-testid="role-marquee-row"
      className="group/row relative overflow-hidden"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />

      <m.div
        className="flex gap-12 whitespace-nowrap group-hover/row:[animation-play-state:paused]"
        animate={
          paused
            ? { x: reverse ? "-25%" : "-25%" }
            : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={
          paused
            ? { duration: 0 }
            : {
                duration: 25,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }
        }
      >
        {doubled.map((text, i) => (
          <span
            key={`${Math.floor(i / items.length)}-${text}`}
            className="font-heading font-bold text-[var(--fg)] text-sm tracking-[0.3em] uppercase flex-shrink-0 flex items-center gap-12"
          >
            {text}
            <span className="text-[var(--accent)]/40">{SEPARATOR}</span>
          </span>
        ))}
      </m.div>
    </div>
  );
}

export default function Marquee() {
  const allRoles = MARQUEE_ROWS.flat().join(", ");
  const storedPaused = useSyncExternalStore(
    subscribeToMarqueePreference,
    getMarqueePreference,
    () => false,
  );
  const [focusPaused, setFocusPaused] = useState(false);
  const isPaused = storedPaused || focusPaused;

  const togglePause = useCallback(() => {
    const next = !isPaused;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage blocked: preference won't persist, still apply for this session.
    }
    if (!next) setFocusPaused(false);
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, [isPaused]);

  const handleFocusIn = useCallback(() => {
    setFocusPaused(true);
  }, []);

  const handleFocusOut = useCallback(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      setFocusPaused(false);
      return;
    }
    if (stored !== "true") setFocusPaused(false);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="relative z-10 bg-[var(--bg)] border-y border-[var(--border)] py-5 space-y-5 overflow-hidden"
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
      >
        <span className="sr-only">Skills: {allRoles}</span>

        <button
          type="button"
          onClick={togglePause}
          className="absolute top-2 right-3 z-20 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors text-xs tracking-wider uppercase opacity-60 hover:opacity-100"
          aria-label={isPaused ? "Play scrolling text" : "Pause scrolling text"}
          aria-pressed={isPaused}
        >
          {isPaused ? "▶" : "❚❚"}
        </button>

        <style>{`
          @media (prefers-reduced-motion: reduce) {
            [data-testid="role-marquee-row"] > div {
              animation: none !important;
              transform: none !important;
            }
          }
        `}</style>

        <MarqueeRow items={MARQUEE_ROWS[0]} reverse={false} paused={isPaused} />
        <MarqueeRow items={MARQUEE_ROWS[1]} reverse={true} paused={isPaused} />
      </div>
    </LazyMotion>
  );
}
