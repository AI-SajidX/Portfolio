"use client";

import { motion } from "framer-motion";
import { Compass, FolderGit2, GraduationCap, Lightbulb, Sparkles, Terminal } from "lucide-react";
import SectionHeading from "./SectionHeading";

const STATS = [
  {
    value: "20+",
    label: "Projects Built",
    detail: "Web applications & coding builds",
    icon: FolderGit2,
  },
  {
    value: "350+",
    label: "Problems Solved",
    detail: "Algorithmic & DSA practice",
    icon: Terminal,
  },
  {
    value: "CSE",
    label: "Undergraduate",
    detail: "Studying at IIUC",
    icon: GraduationCap,
  },
  {
    value: "Daily",
    label: "Continuous Learning",
    detail: "Exploring full-stack architecture",
    icon: Sparkles,
  },
];

export default function About() {
  return (
    <section id="about" className="relative z-10 py-24 sm:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="About"
          highlight="Me"
          subtitle="Getting to know the developer behind the code."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Narrative & Journey Card */}
          <div className="gsap-reveal lg:col-span-7 glass-panel glass-panel-hover rounded-3xl p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#3264FF]/15 border border-[#3264FF]/30 px-3 py-1 text-xs font-mono text-[#00D4FF] mb-5">
                Developer Journey
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Crafting clean interfaces and functional web products from{" "}
                <span className="text-gradient-electric">idea to deployment</span>.
              </h3>

              <div className="mt-5 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  I&apos;m Ahmed Ibrahim Sajid, a CSE undergraduate at International
                  Islamic University Chittagong (IIUC). I am passionate about
                  frontend development, full-stack engineering, and
                  problem-solving.
                </p>
                <p>
                  I enjoy creating clean interfaces, building functional web
                  applications, and continuously improving my development skills.
                  My goal is to become a skilled full-stack developer and explore
                  AI/ML and cybersecurity in the future.
                </p>
              </div>
            </div>

            {/* Philosophy Strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white mb-1.5">
                  <Lightbulb className="h-4 w-4 text-[#00D4FF]" />
                  <span>Coding Philosophy</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Write readable, maintainable code where clarity, accessibility,
                  and thoughtful UI craft work together.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white mb-1.5">
                  <Compass className="h-4 w-4 text-[#3264FF]" />
                  <span>Future Horizon</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Deepening full-stack systems mastery while expanding toward
                  AI/ML and cybersecurity.
                </p>
              </div>
            </div>
          </div>

          {/* Animated Statistics Cards */}
          <div className="gsap-stagger-group lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="gsap-stagger-item">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="glass-panel glass-panel-hover h-full rounded-3xl p-6 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3264FF]/15 border border-[#3264FF]/30 text-[#00D4FF]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[#3264FF]/60" />
                    </div>

                    <div>
                      <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gradient-electric">
                        {stat.value}
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-white">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                        {stat.detail}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
