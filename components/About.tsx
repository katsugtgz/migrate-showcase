"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "motion/react";

const ABOUT_TEXT =
  "Hi, I'm Fariz — a Software Crafter from Sidoarjo, Indonesia. I focus on backend systems, high-quality web apps, and developer tooling. I love building things that are fast, useful, and a little bit weird.";

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
    <motion.span style={{ opacity, y }} className="inline-block">
      {char}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });

  const chars = ABOUT_TEXT.split("");

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-10 bg-black px-6 md:px-12 py-24 md:py-40"
    >
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-white/20 font-['Manrope'] text-xs tracking-[0.3em] uppercase mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          About
        </motion.p>
        <p
          className="font-['Syne'] font-semibold text-white leading-tight"
          style={{ fontSize: "clamp(24px, 4vw, 52px)" }}
        >
          {chars.map((char, i) => {
            const start = Math.min(i / chars.length, 0.95);
            const end = Math.min(start + 1 / chars.length + 0.05, 1);
            return (
              <CharReveal
                key={i}
                char={char}
                progress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </p>
        <motion.div
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
                className="border border-white/10 rounded-full px-4 py-2 text-white/40 font-['Manrope'] text-sm"
              >
                {skill}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
