"use client";
import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const cursorOptOutRef = useRef(false);
  const [hidden, setHidden] = useState(() => {
    if (typeof window === "undefined") return true;
    const opted = localStorage.getItem("cursor-opt-out") === "true";
    cursorOptOutRef.current = opted;
    return opted;
  });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 900 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 900 });
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const ringScale = useMotionValue(1);
  const ringScaleSpring = useSpring(ringScale, { damping: 20, stiffness: 300 });

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hasFinePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  useEffect(() => {
    if (prefersReducedMotion || !hasFinePointer) return;

    if (cursorOptOutRef.current) return;

    // Set data-cursor attribute on mount
    document.documentElement.setAttribute("data-cursor", "custom");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && !cursorOptOutRef.current) {
        localStorage.setItem("cursor-opt-out", "true");
        document.documentElement.removeAttribute("data-cursor");
        cursorOptOutRef.current = true;
        setHidden(true);
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
  }, [cursorX, cursorY, ringScale, prefersReducedMotion, hasFinePointer]);

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
