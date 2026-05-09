"use client";
import { motion } from "motion/react";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-10 bg-black px-6 md:px-12 py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/30 font-['Manrope'] text-xs tracking-[0.3em] uppercase mb-4">
            What I do
          </p>
          <h2
            className="font-['Syne'] font-bold text-white leading-none"
            style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
          >
            Services
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              className="bg-black p-10 group hover:bg-white/[0.02] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-3xl mb-6 block">{service.icon}</span>
              <h3 className="font-['Syne'] font-bold text-white text-xl mb-3 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-white/40 font-['Manrope'] text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
