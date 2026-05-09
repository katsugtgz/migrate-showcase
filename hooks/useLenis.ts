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

function getLenis() {
  return lenisInstance;
}
