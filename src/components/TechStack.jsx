"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiDaisyui,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNetlify,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import SectionHeading from "./SectionHeading";
import { techCategories } from "@/data/technologies";

const ICON_MAP = {
  html5: SiHtml5,
  css3: SiCss,
  javascript: SiJavascript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  daisyui: SiDaisyui,
  c: SiC,
  cpp: SiCplusplus,
  java: FaJava,
  python: SiPython,
  git: SiGit,
  github: SiGithub,
  vscode: VscVscode,
  figma: SiFigma,
  netlify: SiNetlify,
  vercel: SiVercel,
};

function TiltTechCard({ item }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const Icon = ICON_MAP[item.iconKey] || SiReact;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 12,
      rotateY: x * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div className="gsap-stagger-item" style={{ perspective: 900 }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className="group relative glass-panel glass-panel-hover rounded-2xl p-5 flex items-center gap-4 overflow-hidden will-change-transform"
      >
        {/* Subtle hover radial glow matched to tech brand color */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-35"
          style={{ backgroundColor: item.glow }}
        />

        <div
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#080B12]/80 transition-all duration-300 group-hover:scale-110"
          style={{
            boxShadow: `0 0 0 1px rgba(255,255,255,0.04)`,
          }}
        >
          <Icon
            className="h-6 w-6 transition-all duration-300"
            style={{
              color: item.glow,
              filter: `drop-shadow(0 0 8px ${item.glow}55)`,
            }}
          />
        </div>

        <div className="min-w-0">
          <h4 className="text-sm sm:text-base font-semibold text-white truncate">
            {item.name}
          </h4>
          <p className="text-xs font-mono text-slate-400 truncate mt-0.5">
            {item.tag}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState("all");

  const visibleCategories =
    activeCategory === "all"
      ? techCategories
      : techCategories.filter((c) => c.id === activeCategory);

  return (
    <section
      id="tech-stack"
      className="relative z-10 py-24 sm:py-28 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Technologies I"
          highlight="Work With"
          subtitle="Core languages, frameworks, and developer tools I use to design, build, and ship web applications."
        />

        {/* Interactive Filter Tabs */}
        <div className="gsap-reveal flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: "all", label: "All Technologies" },
            ...techCategories.map((c) => ({ id: c.id, label: c.title })),
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200 border border-white/8 bg-white/[0.02]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="techFilterPill"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    className="absolute inset-0 rounded-full btn-glow-primary"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Categorized Glass Grids */}
        <div className="space-y-12">
          {visibleCategories.map((category) => (
            <div key={category.id} className="space-y-5">
              <div className="gsap-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/8 pb-3">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {category.subtitle}
                  </p>
                </div>
                <span className="font-mono text-xs text-[#00D4FF]">
                  {category.items.length} Tools
                </span>
              </div>

              <div className="gsap-stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.items.map((item) => (
                  <TiltTechCard key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
