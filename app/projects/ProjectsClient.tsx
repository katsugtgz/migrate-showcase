"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
import Link from "next/link";

const THUMBNAIL_MAP: Record<string, string> = {
  dea: "/projects/dea.svg",
  space: "/projects/space.svg",
  avogado6: "/projects/avogado6.svg",
  "gak-ngotak": "/projects/gak-ngotak.svg",
};

type Category = (typeof PROJECT_CATEGORIES)[number];

export default function ProjectsClient() {
  const [active, setActive] = useState<Category>("ALL");

  const visibleProjects = active === "ALL" ? PROJECTS : PROJECTS;

  return (
    <LazyMotion features={domAnimation}>
      <CustomCursor />
      <Navbar />
      <main data-testid="projects-page" className="min-h-screen bg-[var(--bg)] pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <m.div
            className="mb-12"
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
              Selected Work
            </p>
            <h1
              className="font-heading font-semibold text-[var(--fg)] leading-none"
              style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
            >
              Projects
            </h1>
          </m.div>

          <m.div
            className="mb-12 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            data-testid="category-filters"
          >
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                data-testid={`filter-${cat.toLowerCase().replace(/\//g, "-")}`}
                className={`rounded-full px-5 py-2 font-body text-xs tracking-[0.2em] uppercase border transition-all duration-[var(--duration-fast)] ${
                  active === cat
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </m.div>

          <div className="flex flex-col" data-testid="project-list">
            <AnimatePresence mode="wait">
              {visibleProjects.length > 0 ? (
                visibleProjects.map((project, i) => {
                  const thumbnailSrc =
                    THUMBNAIL_MAP[project.title] ?? project.imageUrl;

                  return (
                    <m.a
                      key={project.title}
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="project-card"
                      className="group relative block py-8 px-4 border-b border-[var(--border)] transition-colors hover:bg-[var(--border)] focus-visible:bg-[var(--border)] active:bg-[var(--border)]"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-0 scale-95 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 group-active:opacity-100 group-active:scale-100 -top-[220px] md:-top-[340px]">
                        <div className="w-[300px] h-[200px] md:w-[450px] md:h-[300px] relative rounded-xl overflow-hidden shadow-2xl bg-[var(--border)]">
                          <Image
                            src={thumbnailSrc}
                            alt={project.displayTitle ?? project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 300px, 450px"
                          />
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center justify-between">
                        <div>
                          <h3
                            className="font-heading font-semibold text-[var(--fg)] group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)] group-active:text-[var(--accent)] transition-colors leading-none"
                            style={{ fontSize: "clamp(28px, 5vw, 56px)" }}
                          >
                            {project.displayTitle ?? project.title}
                          </h3>
                          <p className="text-sm tracking-widest uppercase mt-1 text-[var(--fg-muted)]">
                            {project.subtitle}
                          </p>
                          <p className="text-xs tracking-wider mt-1 text-[var(--fg-muted)] opacity-90">
                            {project.tech}, {project.year}
                          </p>
                        </div>
                        <span className="hidden md:block text-3xl transition-transform duration-300 group-hover:translate-x-4 group-focus-visible:translate-x-4 text-[var(--fg)]" aria-hidden="true">
                          →
                        </span>
                      </div>
                    </m.a>
                  );
                })
              ) : (
                <m.div
                  key="empty"
                  className="py-24 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[var(--fg-muted)] font-body text-sm tracking-widest uppercase">
                    No projects in this category yet
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </LazyMotion>
  );
}
