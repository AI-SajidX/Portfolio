"use client";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}) {
  const isLeft = align === "left";

  return (
    <div
      className={`gsap-reveal mb-14 md:mb-16 ${
        isLeft ? "text-left max-w-2xl" : "text-center max-w-2xl mx-auto"
      }`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-[#3264FF]/30 bg-[#3264FF]/10 px-3.5 py-1 text-xs font-medium tracking-wider uppercase text-[#00D4FF] mb-4 ${
            isLeft ? "" : "mx-auto"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]" />
          {eyebrow}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-white leading-[1.15]">
        {title}{" "}
        {highlight && (
          <span className="text-gradient-electric">{highlight}</span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
