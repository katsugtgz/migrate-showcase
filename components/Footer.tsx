"use client";
import { useSyncExternalStore } from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import { IDENTITY } from "@/lib/constants";

const emptySubscribe = () => () => {};

export default function Footer() {
  const year = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => 2025
  );

  return (
    <LazyMotion features={domAnimation}>
      <footer className="relative z-10 bg-[var(--bg)] border-t border-[var(--border)] px-6 py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[var(--fg)] font-body text-xs tracking-widest">
            © {year} {IDENTITY.name}
          </p>
          <m.p
            className="font-heading font-bold text-[var(--fg-muted)] leading-none select-none"
            style={{ fontSize: "clamp(60px, 12vw, 160px)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            FARIZ
          </m.p>
          <p className="text-[var(--fg)] font-body text-xs tracking-widest">
            {IDENTITY.location}
          </p>
        </div>
      </footer>
    </LazyMotion>
  );
}
