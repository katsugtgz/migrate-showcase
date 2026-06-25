"use client";
import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";
import { NAV_LINKS, SOCIALS, IDENTITY } from "@/lib/constants";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

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

  // Focus trap + inert when mobile menu is open
  useEffect(() => {
    if (!open) {
      const main = document.getElementById("main");
      if (main) main.removeAttribute("inert");
      if (wasOpenRef.current) hamburgerRef.current?.focus();
      wasOpenRef.current = true;
      return;
    }
    wasOpenRef.current = true;

    const main = document.getElementById("main");
    if (main) main.setAttribute("inert", "");

    // Focus close button after a tick (let AnimatePresence render)
    const t = setTimeout(() => closeBtnRef.current?.focus(), 50);

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTabTrap);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", handleTabTrap);
    };
  }, [open]);

  // Reduced motion check for clip-path animation
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const clipOpen = reducedMotion
    ? { opacity: 1 }
    : { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" };
  const clipClosed = reducedMotion
    ? { opacity: 0 }
    : { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" };

  return (
    <LazyMotion features={domAnimation}>
      <nav
        aria-label="Main navigation"
        className="fixed top-6 left-0 right-0 z-[800] px-6 flex items-center justify-between pointer-events-none mix-blend-difference text-white"
      >
        <span className="pointer-events-auto font-heading font-bold text-white text-sm tracking-widest uppercase">
          {IDENTITY.alias}
        </span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            ref={hamburgerRef}
            onClick={() => setOpen(true)}
            className="pointer-events-auto size-11 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="flex flex-col gap-1">
              <span className="block w-4 h-px bg-white" />
              <span className="block w-4 h-px bg-white" />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            ref={dialogRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            data-lenis-prevent
            className="fixed inset-0 z-[900] bg-[var(--bg)] flex flex-col justify-between p-8 md:p-12"
            initial={clipClosed}
            animate={clipOpen}
            exit={clipClosed}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
            }
          >
            <div className="flex justify-between items-center">
              <span className="font-heading font-bold text-[var(--fg)] text-sm tracking-widest uppercase">
                {IDENTITY.alias}
              </span>
              <button
                type="button"
                ref={closeBtnRef}
                onClick={() => setOpen(false)}
                className="size-11 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--fg)]/60 transition-colors text-[var(--fg)] text-xl"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <m.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-left font-heading font-bold text-[var(--fg)] leading-none hover:text-[var(--accent)] transition-colors py-2"
                  style={{ fontSize: "clamp(48px, 10vw, 96px)" }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : 0.1 + i * 0.07,
                    duration: reducedMotion ? 0 : 0.5,
                  }}
                >
                  {link.label}
                </m.a>
              ))}
            </div>

            <div className="flex items-end justify-between">
              <p className="text-[var(--fg)] text-xs font-body tracking-widest uppercase">
                {IDENTITY.location}
              </p>
              <div className="flex gap-6">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--fg)] hover:text-[var(--accent)] text-xs font-body tracking-wider uppercase transition-colors min-h-11 flex items-center"
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
