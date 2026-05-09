"use client";
import { useRef } from "react";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "motion/react";
import { IDENTITY, SOCIALS } from "@/lib/constants";

const SOCIAL_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  GitHub: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  Bluesky: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 10.5c-.82-1.6-3.06-4.38-5.18-5.72C4.82 3.5 3.44 3.68 2.6 4.24 1.58 4.92 1.5 6.24 1.5 7.04c0 .8.44 5.68 1.72 7.28 1.28 1.6 2.78 1.46 3.78 1 .96-.44 2.12-1.68 3-2.82.88 1.14 2.04 2.38 3 2.82 1 .46 2.5.6 3.78-1 1.28-1.6 1.72-6.48 1.72-7.28 0-.8-.08-2.12-1.1-2.8-.84-.56-2.22-.74-4.22.54C15.06 6.12 12.82 8.9 12 10.5z" />
    </svg>
  ),
  Discord: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.5 11.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm5 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
      <path d="M18.63 6.35A14.8 14.8 0 0 0 15.09 5c-.04.07-.08.16-.12.24a13.7 13.7 0 0 0-5.94 0A8.6 8.6 0 0 0 8.91 5a14.8 14.8 0 0 0-3.54 1.35A15.4 15.4 0 0 0 2.07 17.3a14.9 14.9 0 0 0 4.56 2.3 11.2 11.2 0 0 0 .97-1.58 9.7 9.7 0 0 1-1.54-.74c.13-.09.26-.19.38-.29a10.6 10.6 0 0 0 9.12 0c.13.1.25.2.38.29a9.7 9.7 0 0 1-1.54.74c.28.56.6 1.08.97 1.58a14.9 14.9 0 0 0 4.56-2.3A15.3 15.3 0 0 0 18.63 6.35z" />
    </svg>
  ),
  Email: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="contact"
        ref={ref}
        className="relative z-10 bg-[#0a0a0f] px-6 md:px-12 py-32 md:py-48 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto text-center">
          <m.p
            className="text-white/30 font-body text-xs tracking-[0.3em] uppercase mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Get in touch
          </m.p>
          <m.h2
            className="font-heading font-semibold text-white leading-none mb-4"
            style={{ fontSize: "clamp(40px, 8vw, 96px)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Let&apos;s build
            <br />
            <span className="text-blue-400">something great.</span>
          </m.h2>
          <m.p
            className="text-white/75 font-body text-lg mb-12 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Open to new opportunities, collaborations, and interesting projects.
          </m.p>
          <m.a
            href={`mailto:${IDENTITY.email}`}
            className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-400 text-black font-heading font-bold rounded-full px-10 py-5 text-sm tracking-wider uppercase transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {IDENTITY.email}
            <span>→</span>
          </m.a>
          <m.div style={{ y }} className="mt-20 flex justify-center gap-8">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.label];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/20 hover:text-white transition-colors"
                >
                  {Icon && <Icon className="size-5" />}
                </a>
              );
            })}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
