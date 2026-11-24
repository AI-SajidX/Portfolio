"use client";

import { motion } from "framer-motion";
import { Binary, Layers, Server, Wrench } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "@/data/skills";

const CATEGORY_ICONS = {
  frontend: Layers,
  backend: Server,
  programming: Binary,
  tools: Wrench,
};

const TIER_STYLES = {
  Core: {
    bars: 3,
    badge: "border-[#3264FF]/45 bg-[#3264FF]/15 text-blue-200",
  },
  Active: {
    bars: 2,
    badge: "border-[#00D4FF]/40 bg-[#00D4FF]/12 text-cyan-200",
  },
  Foundational: {
    bars: 2,
    badge: "border-indigo-400/35 bg-indigo-500/12 text-indigo-200",
  },
  Exploring: {
    bars: 1,
    badge: "border-slate-400/30 bg-white/5 text-slate-300",
  },
};

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 py-24 sm:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="My"
          highlight="Skills"
          subtitle="Structured engineering strengths across frontend interfaces, backend foundations, problem solving, and design tooling."
        />

        <div className="gsap-stagger-group grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category.id] || Layers;

            return (
              <div key={category.id} className="gsap-stagger-item">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="glass-panel glass-panel-hover h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3264FF]/25 to-[#00D4FF]/15 border border-[#3264FF]/35 text-[#00D4FF]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white">
                            {category.title}
                          </h3>
                          <p className="text-xs font-mono text-[#00D4FF] mt-0.5">
                            {category.focus}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {category.description}
                    </p>
                  </div>

                  {/* Qualitative Skill Rows */}
                  <div className="space-y-2.5">
                    {category.skills.map((skill) => {
                      const style = TIER_STYLES[skill.tier] || TIER_STYLES.Active;

                      return (
                        <div
                          key={skill.name}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-2.5 transition-colors hover:border-[#3264FF]/35 hover:bg-white/[0.04]"
                        >
                          <span className="text-sm font-medium text-slate-100">
                            {skill.name}
                          </span>

                          <div className="flex items-center gap-2.5 shrink-0">
                            {/* 3-segment qualitative indicator */}
                            <div
                              aria-hidden="true"
                              className="hidden sm:flex items-center gap-1"
                            >
                              {[1, 2, 3].map((step) => (
                                <span
                                  key={step}
                                  className={`h-1.5 w-3.5 rounded-full transition-colors ${
                                    step <= style.bars
                                      ? "bg-gradient-to-r from-[#3264FF] to-[#00D4FF]"
                                      : "bg-white/10"
                                  }`}
                                />
                              ))}
                            </div>

                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-mono ${style.badge}`}
                            >
                              {skill.tier}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
