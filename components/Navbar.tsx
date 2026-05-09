"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_LINKS, SOCIALS, IDENTITY } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-[800] px-6 flex items-center justify-between pointer-events-none">
        <span className="pointer-events-auto font-['Syne'] font-bold text-white text-sm tracking-widest uppercase">
          {IDENTITY.alias}
        </span>
        <button
          onClick={() => setOpen(true)}
          className="pointer-events-auto w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors"
          aria-label="Open menu"
        >
          <span className="flex flex-col gap-1">
            <span className="block w-4 h-px bg-white" />
            <span className="block w-4 h-px bg-white" />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[900] bg-black flex flex-col justify-between p-8 md:p-12"
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex justify-between items-center">
              <span className="font-['Syne'] font-bold text-white text-sm tracking-widest uppercase">
                {IDENTITY.alias}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors text-white text-xl"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left font-['Syne'] font-bold text-white leading-none hover:text-blue-400 transition-colors"
                  style={{ fontSize: "clamp(48px, 10vw, 96px)" }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="flex items-end justify-between">
              <p className="text-white/30 text-xs font-['Manrope'] tracking-widest uppercase">
                {IDENTITY.location}
              </p>
              <div className="flex gap-6">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white text-xs font-['Manrope'] tracking-wider uppercase transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
