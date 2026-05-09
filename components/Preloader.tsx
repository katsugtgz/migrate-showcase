"use client";
import { useEffect, useReducer, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";
import { IDENTITY } from "@/lib/constants";

type State = { count: number; visible: boolean };
type Action =
  | { type: "tick"; count: number }
  | { type: "hide" };

function reducer(state: State, action: Action): State {
  if (action.type === "tick") return { ...state, count: action.count };
  return { count: state.count, visible: false };
}

const initialState: State = { count: 0, visible: true };

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [reducedExit, setReducedExit] = useState(false);

  // Detect reduced motion once
  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedExit(motionMq.matches);
  }, []);

  // Lock body scroll while preloader is visible (only if no reduced motion)
  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!motionMq.matches) {
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionMq.matches) {
      dispatch({ type: "hide" });
      return;
    }

    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;
    let t1: ReturnType<typeof setTimeout>;

    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      dispatch({ type: "tick", count: Math.min(Math.round(eased * 100), 100) });

      if (current >= steps) {
        clearInterval(timer);
        t1 = setTimeout(() => {
          dispatch({ type: "hide" });
        }, 300);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(t1);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch({ type: "hide" });
    };

    if (state.visible) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [state.visible]);

  return (
    <LazyMotion features={domAnimation}>
    <AnimatePresence onExitComplete={onComplete}>
      {state.visible && (
        <m.div
          role="status"
          aria-live="polite"
          aria-label="Loading site"
          className="fixed inset-0 z-[9000] bg-[var(--bg)] flex flex-col items-center justify-center"
          exit={reducedExit ? { opacity: 0 } : { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
          initial={reducedExit ? { opacity: 1 } : { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          transition={reducedExit ? { duration: 0 } : { duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mb-8 text-center">
            <p className="text-[var(--fg)] text-xs tracking-[0.3em] uppercase font-body">
              {IDENTITY.alias}
            </p>
            <p className="text-[var(--fg)] text-xs tracking-[0.2em] uppercase font-body mt-1">
              {IDENTITY.role}
            </p>
          </div>

          <div className="relative">
            <span
              className="text-[var(--fg)] font-heading font-bold leading-none"
              style={{ fontSize: "clamp(80px, 15vw, 160px)" }}
            >
              {String(state.count).padStart(2, "0")}
            </span>
            <span className="text-[var(--fg)] text-2xl font-heading absolute -right-8 bottom-4">
              %
            </span>
          </div>

          <div className="mt-8 w-48 h-px bg-[var(--border)] relative overflow-hidden">
            <m.div
              className="absolute inset-y-0 left-0 bg-[var(--accent)]"
              style={{ width: `${state.count}%` }}
            />
          </div>
          <span className="sr-only">Loading: {state.count}%</span>
        </m.div>
      )}
    </AnimatePresence>
    </LazyMotion>
  );
}
