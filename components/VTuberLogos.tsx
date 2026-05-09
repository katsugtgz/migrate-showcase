"use client";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "motion/react";

const BASE = "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main";

const LOGOS_ROW_1 = [
  { name: "TypeScript", src: `${BASE}/TypeScript/TypeScript.png` },
  { name: "React", src: `${BASE}/React/React.png` },
  { name: "Next.js", src: `${BASE}/Next.js/Next.js.png` },
  { name: "Tailwind CSS", src: `${BASE}/Tailwindcss/Tailwindcss6.png` },
  { name: "Node.js", src: `${BASE}/Node.js/Node.js.png` },
  { name: "Python", src: `${BASE}/Python/Python.png` },
  { name: "Vite", src: `${BASE}/Vite/Vite.png` },
  { name: "Vue", src: `${BASE}/Vue/Vue.png` },
];

const LOGOS_ROW_2 = [
  { name: "GitHub", src: `${BASE}/GitHub/GitHub.png` },
  { name: "Go", src: `${BASE}/Go/Golang.png` },
  { name: "Rust", src: `${BASE}/Rust/Rust.png` },
  { name: "HTML", src: `${BASE}/Html/HTML.png` },
  { name: "Figma", src: `${BASE}/Figma/Figma.png` },
  { name: "Java", src: `${BASE}/Java/Java.png` },
  { name: "Kotlin", src: `${BASE}/Kotlin/Kotlin.png` },
  { name: "Swift", src: `${BASE}/Swift/Swift.png` },
];

function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="relative flex-shrink-0 size-20 md:size-24 flex items-center justify-center">
      <Image
        src={src}
        alt={`${name} logo`}
        fill
        className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
        sizes="80px"
        unoptimized
      />
    </div>
  );
}

const ROW1_ITEMS = [...LOGOS_ROW_1, ...LOGOS_ROW_1].map((item, i) => ({ ...item, uid: `r1-${item.name}-${i}` }));
const ROW2_ITEMS = [...LOGOS_ROW_2, ...LOGOS_ROW_2].map((item, i) => ({ ...item, uid: `r2-${item.name}-${i}` }));

export default function VTuberLogos() {

  return (
    <LazyMotion features={domAnimation}>
      <section id="tools" className="relative z-10 bg-[var(--bg)] py-24 md:py-32">
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
          Tools I use: {LOGOS_ROW_1.map(l => l.name).join(", ")}, {LOGOS_ROW_2.map(l => l.name).join(", ")}
        </span>

        <div className="relative overflow-hidden mb-8" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />
          <m.div
            className="flex gap-8 md:gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            {ROW1_ITEMS.map((logo) => (
              <LogoItem key={logo.uid} {...logo} />
            ))}
          </m.div>
        </div>

        <div className="relative overflow-hidden" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />
          <m.div
            className="flex gap-8 md:gap-12"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            {ROW2_ITEMS.map((logo) => (
              <LogoItem key={logo.uid} {...logo} />
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
