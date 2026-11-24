"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Brief non-blocking entrance loader revealing the SajidX brand mark
 * before sliding away. Automatically bypassed under prefers-reduced-motion.
 */
export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const timer = setTimeout(
      () => {
        setVisible(false);
      },
      prefersReduced ? 0 : 650
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080B12]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#3264FF]/40 bg-[#0D1220] shadow-[0_0_40px_rgba(50,100,255,0.35)]">
              <span className="font-mono text-xl font-bold tracking-tight text-gradient-electric">
                SX
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-ping" />
              SajidX
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
