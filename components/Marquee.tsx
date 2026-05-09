"use client";
import { LazyMotion, domAnimation, m } from "motion/react";
import { MARQUEE_ITEMS } from "@/lib/constants";

export default function Marquee() {
  const items = MARQUEE_ITEMS.map((text, idx) => ({ text, id: `${text}-${idx}` }));
  const doubled = [...items.map((x) => ({ ...x, copy: "a" })), ...items.map((x) => ({ ...x, copy: "b" }))];

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative z-10 bg-white border-y border-[#0F172A]/5 py-5 overflow-hidden">
        <m.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        >
          {doubled.map((item) => (
            <span
              key={`${item.id}-${item.copy}`}
              className="font-heading font-bold text-[#0F172A]/10 text-sm tracking-[0.3em] uppercase flex-shrink-0 flex items-center gap-12"
            >
              {item.text}
              <span className="text-[#D97706]/40">✦</span>
            </span>
          ))}
        </m.div>
      </div>
    </LazyMotion>
  );
}
