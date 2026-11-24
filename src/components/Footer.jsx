"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useSmoothScroll } from "./SmoothScroll";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
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

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#06080E]/90 backdrop-blur-xl px-4 sm:px-6 pt-14 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/8">
          {/* Brand */}
          <div className="max-w-sm">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(0);
              }}
              className="inline-flex items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#3264FF]/40 bg-[#3264FF]/15 font-mono text-xs font-bold text-[#00D4FF]">
                SX
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                Sajid<span className="text-[#00D4FF]">X</span>
              </span>
            </a>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Turning creative ideas into clean, functional, and memorable web
              experiences.
            </p>
          </div>

          {/* Quick Navigation */}
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="text-sm text-slate-400 hover:text-[#00D4FF] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Socials + Back to top */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 hover:border-[#3264FF]/50 hover:text-[#00D4FF] transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              );
            })}

            <motion.button
              type="button"
              onClick={() => scrollTo(0)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-[#3264FF]/40 bg-[#3264FF]/15 px-3.5 py-2 text-xs font-medium text-blue-200 hover:bg-[#3264FF]/25 transition-colors"
            >
              <ArrowUp className="h-3.5 w-3.5 text-[#00D4FF]" />
              <span>Top</span>
            </motion.button>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 Ahmed Ibrahim Sajid. All Rights Reserved.</p>
          <p className="font-mono text-slate-500">
            Crafted with Next.js, Tailwind CSS, GSAP &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
