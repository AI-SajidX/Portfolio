"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Code2, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects } from "@/data/projects";

function ProjectCard({ project }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 5,
      rotateY: x * 5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <article className="gsap-project-card" style={{ perspective: 1200 }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="group glass-panel glass-panel-hover h-full rounded-3xl overflow-hidden flex flex-col will-change-transform"
      >
        {/* Preview Image */}
        <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-[#080B12] border-b border-white/8">
          <Image
            src={project.image}
            alt={`${project.title} web application preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/20 to-transparent opacity-80"
          />

          {/* Top Floating Project Meta */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
            <span className="rounded-full border border-white/15 bg-[#080B12]/80 backdrop-blur-md px-3 py-1 font-mono text-xs font-semibold text-[#00D4FF]">
              Project {project.number}
            </span>
            <span className="rounded-full border border-white/10 bg-[#080B12]/75 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-slate-300">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-6 sm:p-7 flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#00D4FF] transition-colors">
              {project.title}
            </h3>

            <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>

            {/* Key Verified Highlights */}
            <ul className="mt-4 space-y-1.5">
              {project.highlights.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-xs text-slate-400"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#3264FF] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Technology Badges */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#3264FF]/25 bg-[#3264FF]/10 px-2.5 py-1 text-[11px] font-mono text-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
            <motion.a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex flex-1 min-w-[155px] items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:border-[#3264FF]/50 hover:bg-[#3264FF]/15 transition-colors"
            >
              <Code2 className="h-4 w-4 text-[#00D4FF]" />
              <span>View Source Code</span>
            </motion.a>

            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-glow-primary inline-flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Demo</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 py-24 sm:py-28 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured"
          highlight="Projects"
          subtitle="Some things I've built with passion and code."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
