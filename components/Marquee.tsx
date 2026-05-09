"use client";
import { motion } from "motion/react";
import { MARQUEE_ITEMS } from "@/lib/constants";

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative z-10 bg-black border-y border-white/5 py-5 overflow-hidden">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-['Syne'] font-bold text-white/10 text-sm tracking-[0.3em] uppercase flex-shrink-0 flex items-center gap-12"
          >
            {item}
            <span className="text-blue-500/40">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
