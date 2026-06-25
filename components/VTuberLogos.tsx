"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { TECH_LOGOS } from "@/lib/constants";
import { LazyMotion, domAnimation, m } from "motion/react";

const MARQUEE_ITEMS = [...TECH_LOGOS, ...TECH_LOGOS].map((item, i) => ({
  ...item,
  uid: `tech-${item.name}-${i}`,
}));

function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div
      data-testid="tech-logo"
      className="relative flex-shrink-0 size-40 md:size-48 flex items-center justify-center"
    >
      <Image
        src={src}
        alt={`${name} logo`}
        width={384}
        height={384}
        className="size-full object-contain grayscale hover:grayscale-0 transition-all duration-300 p-2"
        loading="lazy"
      />
    </div>
  );
}

export default function VTuberLogos() {
  const [isPaused, setIsPaused] = useState(false);

  const handleFocusIn = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleFocusOut = useCallback(() => {
    setIsPaused(false);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="tools"
        className="relative z-10 bg-[var(--bg)] py-24 md:py-32"
      >
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[var(--fg)] uppercase tracking-widest text-xs mb-3">
            Tech Stack
          </p>
          <h2 className="text-[var(--fg)] font-heading font-semibold text-3xl md:text-4xl">
            Tools I Use
          </h2>
        </m.div>

        <span className="sr-only">
          Tools I use: {TECH_LOGOS.map((l) => l.name).join(", ")}
        </span>

        {/* Animated marquee */}
        <div
          className="relative overflow-hidden motion-safe:block hidden"
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
        >
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="absolute top-2 right-2 z-20 size-8 rounded-full border border-[var(--border)] bg-[var(--bg)]/80 flex items-center justify-center text-[var(--fg)] text-xs hover:border-[var(--accent)] transition-colors backdrop-blur-sm"
            aria-label={isPaused ? "Play animation" : "Pause animation"}
          >
            {isPaused ? "▶" : "❚❚"}
          </button>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />
          <m.div
            className="flex gap-8 md:gap-12"
            animate={isPaused ? { x: "-25%" } : { x: ["0%", "-50%"] }}
            transition={
              isPaused
                ? { duration: 0 }
                : { duration: 30, ease: "linear", repeat: Infinity }
            }
            aria-hidden="true"
          >
            {MARQUEE_ITEMS.map((logo) => (
              <LogoItem key={logo.uid} name={logo.name} src={logo.src} />
            ))}
          </m.div>
        </div>

        {/* Reduced-motion: static grid */}
        <div className="motion-safe:hidden flex flex-wrap justify-center gap-6 md:gap-8 px-8">
          {TECH_LOGOS.map((logo) => (
            <LogoItem key={logo.name} name={logo.name} src={logo.src} />
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
