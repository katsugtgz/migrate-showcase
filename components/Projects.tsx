"use client";
import { useRef, useState } from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import { PROJECTS } from "@/lib/constants";

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <m.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className="relative block border border-white/10 rounded-2xl p-8 overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {hovered && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: glowPos.x,
            top: glowPos.y,
            width: 300,
            height: 300,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
      )}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <span className="text-white/20 font-body text-xs tracking-widest">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-white/20 font-body text-xs">{project.year}</span>
        </div>
        <h3
          className="font-heading font-semibold text-white group-hover:text-blue-400 transition-colors leading-none mb-3"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          {project.displayTitle ?? project.title}
        </h3>
        <p className="text-white/50 font-body text-sm mb-6">{project.subtitle}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-body text-white/30 border border-white/10 rounded-full px-3 py-1">
            {project.tech}
          </span>
          <span className="text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
            →
          </span>
        </div>
      </div>
    </m.a>
  );
}

export default function Projects() {
  return (
    <LazyMotion features={domAnimation}>
    <section
      id="projects"
      className="relative -mt-[100vh] z-10 bg-[#0a0a0f] px-6 md:px-12 py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto">
        <m.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/30 font-body text-xs tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2
            className="font-heading font-semibold text-white leading-none"
            style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
          >
            Projects
          </h2>
        </m.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
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
            className="border border-white/20 rounded-full px-8 py-3 font-body text-white/60 text-sm tracking-wider uppercase hover:text-white hover:border-white/60 transition-all"
          >
            See All on GitHub
          </a>
        </m.div>
      </div>
    </section>
    </LazyMotion>
  );
}
