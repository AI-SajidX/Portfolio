"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only ambient spotlight & precision ring that follows the pointer.
 * Automatically stays hidden on touch pointers and when prefers-reduced-motion is set.
 */
export default function CustomCursor() {
  const spotlightRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!finePointer || reducedMotion) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isInteractive = false;
    let rafId = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target;
      isInteractive = Boolean(
        target?.closest("a, button, input, textarea, [data-cursor-interactive]")
      );

      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "1";
        spotlightRef.current.style.transform = `translate3d(${mouseX - 240}px, ${mouseY - 240}px, 0)`;
      }
    };

    const onMouseLeave = () => {
      if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        const scale = isInteractive ? 1.65 : 1;
        ringRef.current.style.opacity = "1";
        ringRef.current.style.transform = `translate3d(${ringX - 14}px, ${ringY - 14}px, 0) scale(${scale})`;
        ringRef.current.style.borderColor = isInteractive
          ? "rgba(0, 212, 255, 0.75)"
          : "rgba(50, 100, 255, 0.45)";
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block overflow-hidden"
    >
      {/* Soft mouse-following electric-blue radial spotlight */}
      <div
        ref={spotlightRef}
        className="h-[480px] w-[480px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(50, 100, 255, 0.12) 0%, rgba(0, 212, 255, 0.05) 36%, transparent 70%)",
        }}
      />
      {/* Subtle precision cursor ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-7 w-7 rounded-full border opacity-0 transition-[border-color,opacity] duration-200 will-change-transform"
      />
    </div>
  );
}
