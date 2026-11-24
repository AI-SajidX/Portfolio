"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, GraduationCap, MapPin, School } from "lucide-react";
import SectionHeading from "./SectionHeading";

const EDUCATION_ITEMS = [
  {
    id: "iiuc",
    badge: "Currently Studying",
    active: true,
    institution: "International Islamic University Chittagong (IIUC)",
    degree: "Bachelor of Science in Computer Science & Engineering",
    location: "Chittagong, Bangladesh",
    discipline: "Computer Science & Engineering",
    emblem: "IIUC",
    icon: GraduationCap,
    focusAreas: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Web Engineering",
      "Problem Solving",
    ],
  },
  {
    id: "hsc",
    badge: "HSC • 2023",
    active: false,
    institution: "Cambrian College, Chittagong",
    degree: "Higher Secondary Certificate (HSC)",
    location: "Chittagong, Bangladesh",
    discipline: "Higher Secondary Education",
    emblem: "HSC",
    icon: Award,
    focusAreas: [],
  },
  {
    id: "ssc",
    badge: "SSC • 2021",
    active: false,
    institution: "Bangladesh Military Academy High School",
    degree: "Secondary School Certificate (SSC)",
    location: "Chittagong, Bangladesh",
    discipline: "Secondary Education",
    emblem: "SSC",
    icon: School,
    focusAreas: [],
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative z-10 py-24 sm:py-28 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Academic Path"
          title="Education &"
          highlight="Qualifications"
          subtitle="Academic foundation shaping my engineering mindset and software development journey."
        />

        <div className="relative pl-8 sm:pl-14">
          {/* Animated Vertical Timeline Rail */}
          <div
            aria-hidden="true"
            className="absolute left-3 sm:left-6 top-2 bottom-2 w-[2px] bg-white/10 rounded-full overflow-hidden"
          >
            <div className="gsap-timeline-line h-full w-full bg-gradient-to-b from-[#00D4FF] via-[#3264FF] to-transparent rounded-full" />
          </div>

          <div className="space-y-8">
            {EDUCATION_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.id} className="gsap-reveal relative">
                  {/* Glowing Timeline Node */}
                  <div
                    aria-hidden="true"
                    className={`absolute -left-[29px] sm:-left-[41px] top-8 flex h-6 w-6 items-center justify-center rounded-full border bg-[#080B12] ${
                      item.active
                        ? "border-[#00D4FF]/80 shadow-[0_0_20px_rgba(0,212,255,0.65)]"
                        : "border-[#3264FF]/60 shadow-[0_0_16px_rgba(50,100,255,0.35)]"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        item.active ? "bg-[#00D4FF]" : "bg-[#3264FF]"
                      }`}
                    />
                  </div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8"
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Institution Emblem */}
                      <div
                        aria-label={`${item.emblem} emblem`}
                        className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#3264FF]/40 bg-gradient-to-br from-[#3264FF]/20 to-[#00D4FF]/10 shadow-[0_0_24px_rgba(50,100,255,0.22)]"
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#00D4FF]" />
                        <span className="mt-0.5 font-mono text-[10px] font-bold tracking-widest text-white">
                          {item.emblem}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-mono mb-2.5 ${
                            item.active
                              ? "border-[#00D4FF]/35 bg-[#00D4FF]/10 text-[#00D4FF]"
                              : "border-[#3264FF]/35 bg-[#3264FF]/12 text-blue-200"
                          }`}
                        >
                          {item.active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                          )}
                          {item.badge}
                        </div>

                        <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                          {item.institution}
                        </h3>

                        <p className="mt-1.5 text-sm sm:text-base font-medium text-blue-200">
                          {item.degree}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-[#3264FF]" />
                            {item.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5 text-[#00D4FF]" />
                            {item.discipline}
                          </span>
                        </div>
                      </div>
                    </div>

                    {item.focusAreas.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-white/10">
                        <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                          Core Focus Areas
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.focusAreas.map((area) => (
                            <span
                              key={area}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-200"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
