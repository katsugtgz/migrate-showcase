"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { IDENTITY, SOCIALS } from "@/lib/constants";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 bg-black px-6 md:px-12 py-32 md:py-48 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          className="text-white/30 font-['Manrope'] text-xs tracking-[0.3em] uppercase mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Get in touch
        </motion.p>
        <motion.h2
          className="font-['Syne'] font-bold text-white leading-none mb-4"
          style={{ fontSize: "clamp(40px, 8vw, 96px)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Let&apos;s build
          <br />
          <span className="text-blue-400">something great.</span>
        </motion.h2>
        <motion.p
          className="text-white/40 font-['Manrope'] text-lg mb-12 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Open to new opportunities, collaborations, and interesting projects.
        </motion.p>
        <motion.a
          href={`mailto:${IDENTITY.email}`}
          className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-400 text-black font-['Syne'] font-bold rounded-full px-10 py-5 text-sm tracking-wider uppercase transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {IDENTITY.email}
          <span>→</span>
        </motion.a>
        <motion.div style={{ y }} className="mt-20 flex justify-center gap-8">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 font-['Manrope'] text-xs tracking-widest uppercase hover:text-white transition-colors"
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
