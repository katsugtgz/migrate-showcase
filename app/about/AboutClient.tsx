"use client";

import { LazyMotion, domAnimation, m } from "motion/react";
import { ABOUT_COPY, IDENTITY, SOCIALS } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Link from "next/link";

export default function AboutClient() {
  return (
    <LazyMotion features={domAnimation}>
      <CustomCursor />
      <Navbar />
      <main data-testid="about-page" className="min-h-screen bg-[var(--bg)] pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--fg-muted)] font-body text-xs tracking-[0.3em] uppercase mb-8 hover:text-[var(--accent)] transition-colors"
              data-testid="back-home"
            >
              <span aria-hidden="true">←</span> Back
            </Link>
            <p className="text-[var(--fg-muted)] font-body text-xs tracking-[0.3em] uppercase mb-4">
              About
            </p>
            <h1
              className="font-heading font-semibold text-[var(--fg)] leading-none"
              style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
            >
              {ABOUT_COPY.heading}
            </h1>
          </m.div>

          <m.div
            className="mt-12 grid gap-16 md:grid-cols-[1fr_280px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <p
                className="font-heading font-semibold text-[var(--fg)] leading-tight"
                style={{ fontSize: "clamp(20px, 3vw, 36px)" }}
              >
                {ABOUT_COPY.body}
              </p>

              <div className="mt-12">
                <p className="text-[var(--fg-muted)] font-body text-xs tracking-[0.3em] uppercase mb-6">
                  Skills & Tools
                </p>
                <div className="flex flex-wrap gap-3" data-testid="skills-list">
                  {ABOUT_COPY.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-[var(--border)] rounded-full px-4 py-2 text-[var(--fg-muted)] font-body text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-[var(--duration-fast)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside aria-label="Additional information" className="flex flex-col gap-8">
              <div>
                <p className="text-[var(--fg-muted)] font-body text-xs tracking-[0.3em] uppercase mb-3">
                  Location
                </p>
                <p className="text-[var(--fg)] font-body text-sm">
                  {IDENTITY.location}
                </p>
              </div>
              <div>
                <p className="text-[var(--fg-muted)] font-body text-xs tracking-[0.3em] uppercase mb-3">
                  Role
                </p>
                <p className="text-[var(--fg)] font-body text-sm">
                  {IDENTITY.role}
                </p>
              </div>
              <div>
                <p className="text-[var(--fg-muted)] font-body text-xs tracking-[0.3em] uppercase mb-3">
                  Connect
                </p>
                <div className="flex flex-col gap-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--fg)] hover:text-[var(--accent)] font-body text-sm tracking-wider uppercase transition-colors duration-[var(--duration-fast)]"
                    >
                      {s.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
              <m.blockquote
                className="border-l-2 border-[var(--accent)] pl-4 mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-[var(--fg-muted)] font-body text-sm italic">
                  {IDENTITY.motto}
                </p>
              </m.blockquote>
            </aside>
          </m.div>
        </div>
      </main>
      <Footer />
    </LazyMotion>
  );
}
