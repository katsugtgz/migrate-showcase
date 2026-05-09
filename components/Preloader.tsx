"use client";
import { useEffect, useReducer } from "react";
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

export default function Preloader() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
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

  return (
    <LazyMotion features={domAnimation}>
    <AnimatePresence>
      {state.visible && (
        <m.div
          className="fixed inset-0 z-[9000] bg-white flex flex-col items-center justify-center"
          exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mb-8 text-center">
            <p className="text-[#0F172A]/40 text-xs tracking-[0.3em] uppercase font-body">
              {IDENTITY.alias}
            </p>
            <p className="text-[#0F172A]/20 text-xs tracking-[0.2em] uppercase font-body mt-1">
              {IDENTITY.role}
            </p>
          </div>

          <div className="relative">
            <span
              className="text-[#0F172A] font-heading font-bold leading-none"
              style={{ fontSize: "clamp(80px, 15vw, 160px)" }}
            >
              {String(state.count).padStart(2, "0")}
            </span>
            <span className="text-[#0F172A]/40 text-2xl font-heading absolute -right-8 bottom-4">
              %
            </span>
          </div>

          <div className="mt-8 w-48 h-px bg-[#0F172A]/10 relative overflow-hidden">
            <m.div
              className="absolute inset-y-0 left-0 bg-[#D97706]"
              style={{ width: `${state.count}%` }}
            />
          </div>
        </m.div>
      )}
    </AnimatePresence>
    </LazyMotion>
  );
}
