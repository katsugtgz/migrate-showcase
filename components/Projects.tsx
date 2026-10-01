"use client";

import { LazyMotion, domAnimation, m } from "motion/react";
import { PROJECTS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

const THUMBNAIL_MAP: Record<string, string> = {
  dea: "/projects/dea.svg",
  space: "/projects/space.svg",
  avogado6: "/projects/avogado6.svg",
  "gak-ngotak": "/projects/gak-ngotak.svg",
};

export default function Projects() {
  return (
    <LazyMotion features={domAnimation}>
      <section
        id="projects"
        className="relative z-10 bg-[var(--bg)] px-6 md:px-12 py-24 md:py-32"
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
            {PROJECTS.map((project, i) => {
              const thumbnailSrc =
                THUMBNAIL_MAP[project.title] ?? project.imageUrl;

              return (
                <m.a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="project-card"
                  className="group relative flex items-center justify-between border-b border-[var(--border)] py-8 px-4 transition-[padding] duration-300 hover:px-6 md:hover:pl-10"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {/* Background reveal layers */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Project image — scales in and fades up, blurred so SVG text doesn't compete */}
                    <div
                      className="absolute inset-0 scale-125 opacity-0 transition-[opacity,scale] duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none"
                      style={{
                        backgroundImage: `url(${project.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(1px)",
                      }}
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none" />
                    {/* Background that fades out to reveal image */}
                    <div className="absolute inset-0 bg-[var(--bg)] group-hover:opacity-0 transition-opacity duration-300 motion-reduce:transition-none" />
                  </div>

                  {/* Floating thumbnail preview — scales in from 0 on hover, positioned right of center */}
                  <div
                    className="absolute z-20 pointer-events-none hidden md:block"
                    style={{ top: "50%", left: "65%", transform: "translateY(-50%)" }}
                  >
                    <div className="scale-0 -rotate-12 opacity-0 transition-[opacity,scale,rotate] duration-300 ease-out group-hover:scale-100 group-hover:-rotate-6 group-hover:opacity-100 motion-reduce:transition-none">
                      <Image
                        src={thumbnailSrc}
                        alt=""
                        width={256}
                        height={160}
                        aria-hidden="true"
                        className="w-48 h-32 md:w-64 md:h-40 rounded-xl object-cover shadow-2xl"
                      />
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="relative z-10">
                    <h3
                      className="font-heading font-semibold text-[var(--fg)] group-hover:text-white leading-none transition-colors duration-300"
                      style={{ fontSize: "clamp(28px, 5vw, 56px)" }}
                    >
                      {project.displayTitle ?? project.title}
                    </h3>
                    <p className="text-sm tracking-widest uppercase mt-1 text-[var(--fg-muted)] group-hover:text-white/70 transition-colors duration-300">
                      {project.subtitle}
                    </p>
                    <p className="text-xs tracking-wider mt-1 text-[var(--fg-muted)] opacity-90 group-hover:text-white/60 transition-colors duration-300">
                      {project.tech}, {project.year}
                    </p>
                  </div>

                  {/* Arrow — slides in from right on hover */}
                  <span
                    aria-hidden="true"
                    className="relative z-10 hidden md:block text-3xl text-[var(--fg)] group-hover:text-white md:opacity-0 md:group-hover:opacity-100 md:translate-x-6 md:group-hover:translate-x-0 transition-[color,opacity,translate] duration-300 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </m.a>
              );
            })}
          </div>

          <m.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/projects"
              data-testid="projects-see-more"
              className="border border-[var(--border)] rounded-full px-8 py-3.5 font-body text-[var(--fg)] text-sm tracking-wider uppercase hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:border-[var(--accent)] focus-visible:text-[var(--accent)] transition-[border-color,color] duration-300"
            >
              View all projects
            </Link>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
