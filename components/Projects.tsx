"use client";

import { LazyMotion, domAnimation, m } from "motion/react";
import { PROJECTS } from "@/lib/constants";
import Image from "next/image";

export default function Projects() {
  return (
    <LazyMotion features={domAnimation}>
      <section
        id="projects"
        className="relative -mt-[100vh] z-10 bg-[var(--bg)] px-6 md:px-12 py-24 md:py-32"
      >
        <div className="max-w-6xl mx-auto">
          <m.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[var(--fg-muted)] font-body text-xs tracking-[0.3em] uppercase mb-4">
              Selected Work
            </p>
            <h2
              className="font-heading font-semibold text-[var(--fg)] leading-none"
              style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
            >
              Projects
            </h2>
          </m.div>

          <div className="flex flex-col">
            {PROJECTS.map((project, i) => (
              <m.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block py-8 px-4 border-b border-[var(--border)] transition-colors hover:bg-[var(--border)]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-0 scale-95 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 -top-[220px] md:-top-[340px]">
                  <div className="w-[300px] h-[200px] md:w-[450px] md:h-[300px] relative rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 300px, 450px"
                    />
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3
                      className="font-heading font-semibold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors leading-none"
                      style={{ fontSize: "clamp(28px, 5vw, 56px)" }}
                    >
                      {project.displayTitle ?? project.title}
                    </h3>
                    <p className="text-sm tracking-widest uppercase mt-2 text-[var(--fg-muted)]">
                      {project.tech} - {project.year}
                    </p>
                  </div>
                  <span className="hidden md:block text-3xl transition-transform duration-300 group-hover:translate-x-4 text-[var(--fg)]">
                    →
                  </span>
                </div>
              </m.a>
            ))}
          </div>

          <m.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="https://github.com/farizink"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--border)] rounded-full px-8 py-3 font-body text-[var(--fg)] text-sm tracking-wider uppercase hover:border-[var(--accent)] transition-all"
            >
              See All on GitHub
            </a>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
