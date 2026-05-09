"use client";

import dynamic from "next/dynamic";

const IDCardScene = dynamic(() => import("@/components/IDCardScene").then((mod) => ({ default: mod.IDCardScene })), {
  ssr: false,
});

export default function IDCard() {
  return (
    <section className="relative z-10 bg-[var(--bg)] h-screen w-full overflow-hidden">
      <div className="absolute top-8 left-8 z-10">
        <p className="text-[var(--fg-muted)] font-body text-xs tracking-[0.3em] uppercase">
          my card
        </p>
      </div>
      <IDCardScene />
    </section>
  );
}
