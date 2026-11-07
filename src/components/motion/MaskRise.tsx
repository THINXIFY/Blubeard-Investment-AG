"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { ensureGsap, gsap, motion, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

/**
 * Small entrances for what is inside it: `[data-rise]` text climbs out of its masked parent (give the parent
 * `overflow-hidden`), and `[data-rule]` hairlines draw across from their transform origin.
 */
export function MaskRise({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        el.querySelectorAll("[data-rise]").forEach((item) => {
          gsap.fromTo(
            item,
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: motion.duration.slow,
              ease: motion.ease.out,
              delay: 0.15,
              scrollTrigger: { trigger: item.parentElement, start: "top 90%", once: true },
            },
          );
        });
        el.querySelectorAll("[data-rule]").forEach((rule) => {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: motion.duration.cinematic,
              ease: motion.ease.inOut,
              scrollTrigger: { trigger: rule, start: "top 92%", once: true },
            },
          );
        });
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
