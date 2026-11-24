"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useSmoothScroll } from "./SmoothScroll";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Tech Stack", href: "#tech-stack", id: "tech-stack" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -48% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e, href, id) => {
    e.preventDefault();
    setActiveId(id);
    setMobileOpen(false);
    scrollTo(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
      <nav
        aria-label="Primary navigation"
        className={`mx-auto max-w-6xl rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-[#0D1220]/80 backdrop-blur-xl border border-white/12 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.75),0_0_24px_-8px_rgba(50,100,255,0.28)]"
            : "bg-[#0D1220]/45 backdrop-blur-md border border-white/8"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home", "home")}
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#3264FF]/40 bg-[#3264FF]/15 font-mono text-xs font-bold text-[#00D4FF] shadow-[0_0_18px_rgba(50,100,255,0.3)] transition-transform duration-300 group-hover:scale-105">
              SX
            </span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white">
              Sajid<span className="text-[#00D4FF]">X</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, item.id)}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-full block group ${
                      isActive
                        ? "text-white"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                        className="absolute inset-0 rounded-full bg-white/10 border border-[#3264FF]/40 shadow-[0_0_16px_rgba(50,100,255,0.25)]"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={`absolute bottom-1 left-3.5 right-3.5 h-[1.5px] origin-left rounded-full bg-gradient-to-r from-[#3264FF] to-[#00D4FF] transition-transform duration-300 ${
                        isActive
                          ? "scale-x-0"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <MagneticButton className="hidden sm:inline-block">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact", "contact")}
                className="btn-glow-primary inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-300"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              className="inline-flex lg:hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2.5 max-w-6xl rounded-3xl glass-panel p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href, item.id)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#3264FF]/20 text-white border border-[#3264FF]/40"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 pt-3 border-t border-white/10 sm:hidden">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact", "contact")}
                className="btn-glow-primary flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-white"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
