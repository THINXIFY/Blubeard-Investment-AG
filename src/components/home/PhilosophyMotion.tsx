"use client";

import { useRef, type ReactNode } from "react";
import { ensureGsap, gsap, motion, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

/**
 * Architectural choreography for the Philosophy section (markup stays server-rendered):
 *  [data-col]    colonnade lines draw in from the centre outward
 *  [data-light]  the blue light source brightens as the section reaches mid-viewport
 *  [data-rule]   pillar hairlines draw in (scaleX on mobile, scaleY on desktop)
 */
export function PhilosophyMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cols = gsap.utils.toArray<SVGLineElement>("[data-col]", el);
        gsap.fromTo(
          cols,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: motion.duration.cinematic * 1.4,
            ease: motion.ease.inOut,
            stagger: { each: 0.09, from: "center" },
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          },
        );

        gsap.fromTo(
          "[data-light]",
          { opacity: 0.45 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: 0.8 },
          },
        );

        gsap.from("[data-rule]", {
          scale: 0,
          duration: motion.duration.slow,
          ease: motion.ease.out,
          stagger: 0.14,
          scrollTrigger: { trigger: "#philosophy-pillars", start: motion.revealStart, once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
