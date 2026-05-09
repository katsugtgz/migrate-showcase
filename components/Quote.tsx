"use client";

import { useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { QUOTE } from "@/lib/constants";

export default function Quote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shouldReduceMotion = useReducedMotion();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="quote"
        ref={ref}
        data-testid="quote-section"
        className="relative z-10 bg-[var(--bg)] px-6 md:px-12 py-32 md:py-48 overflow-hidden"
      >
        <h2 className="sr-only">Quote</h2>
        <m.span
          className="absolute top-8 left-6 md:left-12 font-display text-[var(--accent)] select-none pointer-events-none"
          style={{ fontSize: "clamp(120px, 20vw, 280px)", lineHeight: 0.8 }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 0.15, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          aria-hidden="true"
        >
          &ldquo;
        </m.span>

        <div className="max-w-5xl mx-auto">
          <m.p
            className="text-[var(--fg)] font-body text-xs tracking-[0.3em] uppercase mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Quote
          </m.p>

          <m.blockquote
            style={shouldReduceMotion ? undefined : { y: parallaxY }}
            className="relative"
          >
            <m.p
              className="font-heading font-semibold text-[var(--fg)] leading-tight"
              style={{ fontSize: "clamp(28px, 5vw, 64px)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              &ldquo;{QUOTE.text}&rdquo;
            </m.p>

            <m.footer
              className="mt-8 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="w-12 h-px bg-[var(--accent)]" aria-hidden="true" />
              <span className="text-[var(--fg-muted)] font-body text-sm tracking-wider not-italic">
                {QUOTE.author}
              </span>
            </m.footer>
          </m.blockquote>
        </div>
      </section>
    </LazyMotion>
  );
}
