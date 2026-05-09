"use client";
import { useRef } from "react";
import { useScroll, useTransform, LazyMotion, domAnimation, m, type MotionValue } from "motion/react";

import { IDENTITY } from "@/lib/constants";

const ABOUT_TEXT =
  `Hi, I'm ${IDENTITY.alias} — a ${IDENTITY.role} from ${IDENTITY.location}. ${IDENTITY.description}`;

function CharReveal({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);
  if (char === " ") return <span> </span>;
  return (
    <m.span style={{ opacity, y }} className="inline-block">
      {char}
    </m.span>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });

  const charEntries = ABOUT_TEXT.split("").map((char, idx) => ({
    char,
    id: `about-char-${idx}`,
    start: Math.min(idx / ABOUT_TEXT.length, 0.95),
    end: Math.min(idx / ABOUT_TEXT.length + 1 / ABOUT_TEXT.length + 0.05, 1),
  }));

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="about"
        ref={ref}
        className="relative z-10 bg-[var(--bg)] px-6 md:px-12 py-24 md:py-40"
      >
        <div className="max-w-5xl mx-auto">
          <m.p
            className="text-[var(--fg)] font-body text-xs tracking-[0.3em] uppercase mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            About
          </m.p>
          <p
            className="font-heading font-semibold text-[var(--fg)] leading-tight"
            style={{ fontSize: "clamp(24px, 4vw, 52px)" }}
          >
            <span className="sr-only">{ABOUT_TEXT}</span>
            <span aria-hidden="true">
              {charEntries.map((entry) => (
                <CharReveal
                  key={entry.id}
                  char={entry.char}
                  progress={scrollYProgress}
                  start={entry.start}
                  end={entry.end}
                />
              ))}
            </span>
          </p>
          <m.div
            className="mt-16 flex flex-wrap gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {["Backend Systems", "TypeScript", "Node.js", "Svelte", "APIs", "Dev Tools"].map(
              (skill) => (
                <span
                  key={skill}
                  className="border border-[var(--border)] rounded-full px-4 py-2 text-[var(--fg-muted)] font-body text-sm"
                >
                  {skill}
                </span>
              )
            )}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
