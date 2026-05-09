"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IDENTITY } from "@/lib/constants";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.min(Math.round(eased * 100), 100));

      if (current >= steps) {
        clearInterval(timer);
        t1 = setTimeout(() => {
          setVisible(false);
          t2 = setTimeout(() => onCompleteRef.current(), 800);
        }, 300);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9000] bg-black flex flex-col items-center justify-center"
          exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mb-8 text-center">
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase font-['Manrope']">
              {IDENTITY.alias}
            </p>
            <p className="text-white/20 text-xs tracking-[0.2em] uppercase font-['Manrope'] mt-1">
              {IDENTITY.role}
            </p>
          </div>

          <div className="relative">
            <span
              className="text-white font-['Syne'] font-bold leading-none"
              style={{ fontSize: "clamp(80px, 15vw, 160px)" }}
            >
              {String(count).padStart(2, "0")}
            </span>
            <span className="text-white/40 text-2xl font-['Syne'] absolute -right-8 bottom-4">
              %
            </span>
          </div>

          <div className="mt-8 w-48 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
