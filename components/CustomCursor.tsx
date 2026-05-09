"use client";
import { useEffect, useRef } from "react";
import { LazyMotion, domAnimation, m, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
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

  useEffect(() => {
    if (prefersReducedMotion) return;

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

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY, ringScale, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="fixed top-0 left-0 size-2 bg-[#0F172A] rounded-full pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <m.div
        className="fixed top-0 left-0 size-8 border border-[#0F172A] rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScaleSpring,
        }}
      />
    </LazyMotion>
  );
}
