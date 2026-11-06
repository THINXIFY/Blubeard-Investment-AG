"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { ensureGsap, gsap, motion, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

type LineDrawProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/**
 * Draws architectural linework when the container scrolls into view:
 *  [data-draw]  SVG strokes with pathLength={1} and strokeDasharray="1" — drawn via dash offset
 *  [data-rule]  hairlines — extended via scale (set transform-origin on the element)
 * Static (fully drawn) without JavaScript or with reduced motion.
 */
export function LineDraw({ children, className, as: Tag = "div" }: LineDrawProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const draws = el.querySelectorAll("[data-draw]");
        if (draws.length) {
          gsap.fromTo(
            draws,
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: motion.duration.cinematic * 1.5,
              ease: motion.ease.inOut,
              stagger: { each: 0.12, from: "start" },
              scrollTrigger: { trigger: el, start: "top 75%", once: true },
            },
          );
        }
        const rules = el.querySelectorAll("[data-rule]");
        if (rules.length) {
          gsap.from(rules, {
            scale: 0,
            duration: motion.duration.slow,
            ease: motion.ease.out,
            stagger: 0.14,
            scrollTrigger: { trigger: rules[0], start: motion.revealStart, once: true },
          });
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
