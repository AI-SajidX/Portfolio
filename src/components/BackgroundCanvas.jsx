"use client";

/**
 * Ambient atmospheric background layers:
 * - Subtle architectural grid
 * - Angled spotlight beam inspired by dark-mode spotlight aesthetics
 * - Floating deep-blue & cyan radial glows with scroll parallax hooks
 */
export default function BackgroundCanvas() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#080B12]"
    >
      {/* Subtle architectural grid with radial mask */}
      <div
        className="absolute inset-0 bg-cyber-grid opacity-55"
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 65% at 50% 25%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 65% at 50% 25%, #000 35%, transparent 100%)",
        }}
      />

      {/* Dramatic angled atmospheric light beam */}
      <div
        className="gsap-parallax absolute -top-44 -left-24 h-[760px] w-[620px] rotate-[28deg] opacity-45 blur-3xl"
        data-speed="70"
        style={{
          background:
            "linear-gradient(180deg, rgba(50,100,255,0.28) 0%, rgba(0,212,255,0.12) 45%, transparent 100%)",
        }}
      />

      {/* Top-right secondary glow orb */}
      <div
        className="gsap-parallax animate-orb-slow absolute -top-24 right-[-8%] h-[520px] w-[520px] rounded-full blur-[130px]"
        data-speed="90"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 212, 255, 0.14) 0%, rgba(50, 100, 255, 0.08) 55%, transparent 75%)",
        }}
      />

      {/* Mid-page deep ambient accent */}
      <div
        className="gsap-parallax absolute top-[45%] left-[-10%] h-[460px] w-[460px] rounded-full blur-[140px]"
        data-speed="-60"
        style={{
          background:
            "radial-gradient(circle, rgba(50, 100, 255, 0.12) 0%, transparent 72%)",
        }}
      />

      {/* Subtle starfield dots */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 14% 18%, rgba(255,255,255,0.55) 0, transparent 100%), radial-gradient(1px 1px at 32% 8%, rgba(0,212,255,0.65) 0, transparent 100%), radial-gradient(1px 1px at 78% 22%, rgba(255,255,255,0.5) 0, transparent 100%), radial-gradient(1.5px 1.5px at 88% 12%, rgba(50,100,255,0.7) 0, transparent 100%), radial-gradient(1px 1px at 62% 38%, rgba(255,255,255,0.35) 0, transparent 100%), radial-gradient(1px 1px at 22% 68%, rgba(0,212,255,0.4) 0, transparent 100%), radial-gradient(1px 1px at 82% 76%, rgba(255,255,255,0.35) 0, transparent 100%)",
        }}
      />
    </div>
  );
}
