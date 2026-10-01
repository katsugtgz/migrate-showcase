"use client";
import { useEffect, useSyncExternalStore } from "react";
import { LazyMotion, domAnimation, m, useMotionValue, useSpring } from "motion/react";

const springConfig = { damping: 25, stiffness: 700 };
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const CURSOR_PREFERENCE_EVENT = "cursor-preference-change";

function subscribeToCursorPreference(onChange: () => void) {
  window.addEventListener(CURSOR_PREFERENCE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CURSOR_PREFERENCE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getCursorPreference() {
  try {
    return localStorage.getItem("cursor-opt-out") === "true";
  } catch {
    return true;
  }
}

function subscribeToMediaQueries(onChange: () => void) {
  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
  const finePointer = window.matchMedia(FINE_POINTER_QUERY);
  reducedMotion.addEventListener("change", onChange);
  finePointer.addEventListener("change", onChange);
  return () => {
    reducedMotion.removeEventListener("change", onChange);
    finePointer.removeEventListener("change", onChange);
  };
}

function getMediaQuerySnapshot() {
  return `${window.matchMedia(REDUCED_MOTION_QUERY).matches}:${window.matchMedia(FINE_POINTER_QUERY).matches}`;
}

function getServerMediaQuerySnapshot() {
  return "false:false";
}

export default function CustomCursor() {
  const hidden = useSyncExternalStore(
    subscribeToCursorPreference,
    getCursorPreference,
    () => true,
  );

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, { damping: 40, stiffness: 900 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 900 });
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const ringScale = useMotionValue(1);
  const ringScaleSpring = useSpring(ringScale, { damping: 20, stiffness: 300 });

  const mediaQuerySnapshot = useSyncExternalStore(
    subscribeToMediaQueries,
    getMediaQuerySnapshot,
    getServerMediaQuerySnapshot,
  );
  const [prefersReducedMotion, hasFinePointer] = mediaQuerySnapshot
    .split(":")
    .map((value) => value === "true");

  useEffect(() => {
    if (prefersReducedMotion || !hasFinePointer) return;

    // Single owner for data-cursor: sync on every preference/pointer/motion
    // change, including cross-tab storage events, so `cursor: none` never
    // outlives the custom cursor.
    if (hidden) {
      document.documentElement.removeAttribute("data-cursor");
      return;
    }
    document.documentElement.setAttribute("data-cursor", "custom");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        try {
          localStorage.setItem("cursor-opt-out", "true");
        } catch {
          // Storage blocked: preference won't persist, still apply for this session.
        }
        // Preference event flips `hidden`, which re-runs this effect; its
        // hidden branch removes data-cursor and tears the listeners down.
        window.dispatchEvent(new Event(CURSOR_PREFERENCE_EVENT));
      }
    };

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button']")) {
        ringScale.set(2.2);
      }
    };

    const handleOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button']")) {
        ringScale.set(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.documentElement.removeAttribute("data-cursor");
    };
  }, [cursorX, cursorY, ringScale, prefersReducedMotion, hasFinePointer, hidden]);

  const shouldRender = !prefersReducedMotion && hasFinePointer && !hidden;

  return shouldRender ? (
    <LazyMotion features={domAnimation}>
      <m.div
        aria-hidden="true"
        className="fixed top-0 left-0 size-2 bg-[var(--fg)] rounded-full pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <m.div
        aria-hidden="true"
        className="fixed top-0 left-0 size-8 border border-[var(--fg)] rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScaleSpring,
        }}
      />
    </LazyMotion>
  ) : null;
}
