"use client";
import { useRef } from "react";
import {
  useScroll,
  useTransform,
  LazyMotion,
  domAnimation,
  m,
  type MotionValue,
} from "motion/react";

import { ABOUT_COPY } from "@/lib/constants";

const READABLE_TEXT = ABOUT_COPY.body;

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

  const charEntries = READABLE_TEXT.split("").map((char, idx) => ({
    char,
    id: `about-char-${idx}`,
    start: Math.min(idx / READABLE_TEXT.length, 0.95),
    end: Math.min(idx / READABLE_TEXT.length + 1 / READABLE_TEXT.length + 0.05, 1),
  }));

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="about"
        ref={ref}
        className="relative z-10 bg-[var(--bg)] px-6 md:px-12 py-24 md:py-40"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="sr-only">About</h2>
          <m.p
            className="text-[var(--fg)] font-body text-xs tracking-[0.3em] uppercase mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            About
          </m.p>

          <p data-testid="about-readable-text" className="sr-only">
            {READABLE_TEXT}
          </p>

          <div
            data-testid="about-glitch-text"
            aria-hidden="true"
            className="relative font-heading font-semibold text-[var(--fg)] leading-tight about-glitch-container"
            style={{ fontSize: "clamp(24px, 4vw, 52px)" }}
          >
            <p>
              {charEntries.map((entry) => (
                <CharReveal
                  key={entry.id}
                  char={entry.char}
                  progress={scrollYProgress}
                  start={entry.start}
                  end={entry.end}
                />
              ))}
            </p>

            <p
              className="absolute inset-0 about-glitch-echo"
              aria-hidden="true"
            >
              {charEntries.map((entry) => (
                <CharReveal
                  key={`echo-${entry.id}`}
                  char={entry.char}
                  progress={scrollYProgress}
                  start={entry.start}
                  end={entry.end}
                />
              ))}
            </p>
          </div>

          <m.div
            className="mt-16 flex flex-wrap gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {ABOUT_COPY.skills.map((skill) => (
              <span
                key={skill}
                className="border border-[var(--border)] rounded-full px-4 py-2 text-[var(--fg-muted)] font-body text-sm"
              >
                {skill}
              </span>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
