
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  Code2,
  Cpu,
  Download,
  Sparkles,
  Terminal,
} from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useSmoothScroll } from "./SmoothScroll";
import MagneticButton from "./MagneticButton";

const ROTATING_PHRASES = [
  "Web Developer",
  "Problem Solver",
  "Turning Ideas Into Digital Products",
  "Competitive Programmer",
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/AI-SajidX",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/feed/",
    icon: FaLinkedinIn,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ahmed.ibrahim.sajid",
    icon: FaFacebookF,
  },
];

export default function Hero() {
  const heroRef = useRef(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const { scrollTo } = useSmoothScroll();

  // Rotating phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // Hero entrance animation
  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".hero-stagger",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.78,
          stagger: 0.09,
          delay: 0.25,
          clearProps: "transform",
        }
      ).fromTo(
        ".hero-visual-reveal",
        { scale: 0.94, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          clearProps: "transform",
        },
        "-=0.55"
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative z-10 min-h-screen flex items-center pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Availability Badge */}
            <div className="hero-stagger inline-flex items-center gap-2.5 rounded-full border border-[#3264FF]/35 bg-[#0D1220]/80 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-200 shadow-[0_0_24px_rgba(50,100,255,0.2)] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D4FF]" />
              </span>
              Available for Opportunities
            </div>

            {/* Main Heading */}
            <h1 className="hero-stagger text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Hi, I&apos;m{" "}
              <span className="text-gradient-electric block sm:inline">
                Ahmed Ibrahim Sajid
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-stagger mt-4 text-base sm:text-xl font-medium text-slate-300 tracking-tight">
              CSE Undergraduate{" "}
              <span className="text-[#3264FF] px-1.5">|</span> Aspiring
              Full-Stack Developer
            </p>

            {/* Animated Rotating Statement */}
            <div className="hero-stagger mt-4 min-h-9 sm:min-h-10 flex items-center">
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#00D4FF] shrink-0" />

                <AnimatePresence mode="wait">
                  <motion.span
                    key={phraseIndex}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-mono text-xs sm:text-sm text-[#00D4FF] whitespace-nowrap"
                  >
                    {ROTATING_PHRASES[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Description */}
            <p className="hero-stagger mt-5 max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed">
              I&apos;m a Computer Science &amp; Engineering undergraduate at IIUC
              who enjoys building modern, responsive, and user-friendly web
              applications. I love exploring new technologies and turning
              creative ideas into real-world digital experiences.
            </p>

            {/* Hero Highlight Metrics */}
            <div className="hero-stagger mt-6 flex flex-wrap items-center gap-3">
              <div className="glass-panel rounded-2xl px-4 py-2.5 border border-[#3264FF]/30 flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-gradient-electric">
                  20+
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-300">
                  Projects Built
                </span>
              </div>

              <div className="glass-panel rounded-2xl px-4 py-2.5 border border-[#00D4FF]/30 flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-gradient-electric">
                  350+
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-300">
                  Problems Solved
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-stagger mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#projects");
                  }}
                  className="btn-glow-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300"
                >
                  <span>Explore My Work</span>
                  <ArrowDownRight className="h-4 w-4" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="/Ahmed-Ibrahim-Sajid-Resume.pdf"
                  download="Ahmed-Ibrahim-Sajid-Resume.pdf"
                  className="glass-panel glass-panel-hover inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-slate-100"
                >
                  <Download className="h-4 w-4 text-[#00D4FF]" />
                  <span>Download Resume</span>
                </a>
              </MagneticButton>
            </div>

            {/* Social Links */}
            <div className="hero-stagger mt-8 flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 mr-1">
                Connect
              </span>

              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0D1220]/80 text-slate-300 hover:border-[#3264FF]/60 hover:text-[#00D4FF] hover:shadow-[0_0_20px_rgba(50,100,255,0.3)] transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Right Profile Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="hero-visual-reveal relative w-full max-w-[360px] sm:max-w-[400px]">
              {/* Animated Glowing Gradient Orb */}
              <div
                aria-hidden="true"
                className="animate-orb-slow absolute -inset-6 rounded-full blur-3xl opacity-75"
                style={{
                  background:
                    "radial-gradient(circle at 45% 40%, rgba(50, 100, 255, 0.42), rgba(0, 212, 255, 0.2) 55%, transparent 75%)",
                }}
              />

              {/* Profile Frame Card */}
              <div className="relative rounded-[2rem] glass-panel p-3 border border-white/12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
                <div className="relative aspect-[4/4.3] w-full overflow-hidden rounded-[1.5rem] bg-[#080B12]">
                  <Image
                    src="/images/sajid-profile.jpg"
                    alt="Ahmed Ibrahim Sajid portrait"
                    fill
                    priority
                    sizes="(max-width: 768px) 340px, 400px"
                    className="object-cover object-top"
                  />

                  {/* Bottom subtle dark vignette for contrast */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#080B12]/90 via-transparent to-transparent"
                  />

                  {/* Bottom inside identity strip */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between rounded-2xl border border-white/10 bg-[#080B12]/75 backdrop-blur-md px-3.5 py-2.5">
                    <div>
                      <p className="text-xs font-semibold text-white">
                        Ahmed Ibrahim Sajid
                      </p>
                      <p className="text-[11px] font-mono text-[#00D4FF]">
                        @AI-SajidX • IIUC
                      </p>
                    </div>

                    <span className="rounded-full bg-[#3264FF]/20 border border-[#3264FF]/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-blue-200">
                      CSE
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Glass Technology Cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hidden sm:flex items-center gap-2.5 absolute -left-8 top-10 rounded-2xl glass-panel px-3.5 py-2.5 border border-[#3264FF]/35 shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#3264FF]/20 text-[#00D4FF]">
                  <Code2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    Next.js &amp; React
                  </p>
                  <p className="text-[10px] text-slate-400">Frontend Craft</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="hidden sm:flex items-center gap-2.5 absolute -right-6 bottom-24 rounded-2xl glass-panel px-3.5 py-2.5 border border-[#00D4FF]/30 shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#00D4FF]/15 text-[#00D4FF]">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    C / C++ &amp; DSA
                  </p>
                  <p className="text-[10px] text-slate-400">Problem Solving</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.1,
                }}
                className="hidden md:flex items-center gap-2 absolute -right-4 top-8 rounded-full glass-panel px-3 py-1.5 border border-white/15"
              >
                <Cpu className="h-3.5 w-3.5 text-[#3264FF]" />
                <span className="text-[11px] font-mono text-slate-200">
                  Full-Stack
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
