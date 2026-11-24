"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Registers scoped GSAP ScrollTrigger animations for section reveals,
 * project card staggers, vertical timeline growth, and subtle parallax.
 * Respects prefers-reduced-motion and cleans up cleanly on unmount.
 */
export function useGSAPAnimations(containerRef) {
  useEffect(() => {
    const root = containerRef?.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      return;
    }

    const ctx = gsap.context(() => {
      // Section headings & generic reveal blocks
      gsap.utils.toArray(".gsap-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.78,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      // Staggered grid groups (Tech Stack, Skills, About cards)
      gsap.utils.toArray(".gsap-stagger-group").forEach((group) => {
        const items = group.querySelectorAll(".gsap-stagger-item");
        if (!items.length) return;

        gsap.fromTo(
          items,
          { y: 24, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            stagger: 0.06,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: group,
              start: "top 84%",
              once: true,
            },
          }
        );
      });

      // Featured project cards stagger
      const projectCards = gsap.utils.toArray(".gsap-project-card");
      if (projectCards.length) {
        gsap.fromTo(
          projectCards,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.14,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: projectCards[0].closest("section") || projectCards[0],
              start: "top 78%",
              once: true,
            },
          }
        );
      }

      // Vertical Education timeline line draw
      gsap.utils.toArray(".gsap-timeline-line").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      // Subtle background parallax for decorative glows
      gsap.utils.toArray(".gsap-parallax").forEach((layer) => {
        const speed = Number(layer.getAttribute("data-speed") || 40);
        gsap.to(layer, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [containerRef]);
}
