"use client";
import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";
import { NAV_LINKS, SOCIALS, IDENTITY } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <nav className="fixed top-6 left-0 right-0 z-[800] px-6 flex items-center justify-between pointer-events-none">
        <span className="pointer-events-auto font-heading font-bold text-[#0F172A] text-sm tracking-widest uppercase">
          {IDENTITY.alias}
        </span>
        <button
          onClick={() => setOpen(true)}
          className="pointer-events-auto size-10 rounded-full border border-[#0F172A]/20 flex items-center justify-center hover:border-[#0F172A]/60 transition-colors"
          aria-label="Open menu"
        >
          <span className="flex flex-col gap-1">
            <span className="block w-4 h-px bg-[#0F172A]" />
            <span className="block w-4 h-px bg-[#0F172A]" />
          </span>
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            className="fixed inset-0 z-[900] bg-white flex flex-col justify-between p-8 md:p-12"
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex justify-between items-center">
              <span className="font-heading font-bold text-[#0F172A] text-sm tracking-widest uppercase">
                {IDENTITY.alias}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="size-10 rounded-full border border-[#0F172A]/20 flex items-center justify-center hover:border-[#0F172A]/60 transition-colors text-[#0F172A] text-xl"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <m.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left font-heading font-bold text-[#0F172A] leading-none hover:text-[#D97706] transition-colors"
                  style={{ fontSize: "clamp(48px, 10vw, 96px)" }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                >
                  {link.label}
                </m.button>
              ))}
            </div>

            <div className="flex items-end justify-between">
              <p className="text-[#0F172A]/30 text-xs font-body tracking-widest uppercase">
                {IDENTITY.location}
              </p>
              <div className="flex gap-6">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0F172A]/40 hover:text-[#0F172A] text-xs font-body tracking-wider uppercase transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
