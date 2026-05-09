"use client";
import { motion } from "motion/react";
import { IDENTITY } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black border-t border-white/5 px-6 py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <p className="text-white/20 font-['Manrope'] text-xs tracking-widest">
          © {new Date().getFullYear()} {IDENTITY.name}
        </p>
        <motion.p
          className="font-['Syne'] font-bold text-white/5 leading-none select-none"
          style={{ fontSize: "clamp(60px, 12vw, 160px)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          FARIZ
        </motion.p>
        <p className="text-white/20 font-['Manrope'] text-xs tracking-widest">
          {IDENTITY.location}
        </p>
      </div>
    </footer>
  );
}
