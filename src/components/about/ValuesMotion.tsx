"use client";

import { useRef, type ReactNode } from "react";
import { ensureGsap, gsap, motion, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

/**
 * Quiet scroll choreography for the values. Each word settles from a soft tint to solid ink before it reaches the
 * reading area, and the hairline and icon draw once as the row arrives. Descriptions are always fully legible, and
 * nothing moves sideways, so the list stays aligned while reading.
 */
export function ValuesMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        el.querySelectorAll<HTMLElement>(".value-row").forEach((row) => {
          const arrive = { trigger: row, start: "top 92%", once: true };

          gsap.fromTo(
            row.querySelector("[data-rule]"),
            { scaleX: 0 },
            { scaleX: 1, duration: motion.duration.cinematic, ease: motion.ease.inOut, scrollTrigger: arrive },
          );

          gsap.fromTo(
            row.querySelector("[data-value-word]"),
            { backgroundPosition: "100% 0" },
            {
              backgroundPosition: "0% 0",
              ease: "none",
              scrollTrigger: { trigger: row, start: "top 98%", end: "top 68%", scrub: 0.3 },
            },
          );

          row.querySelectorAll<SVGGeometryElement>("svg > *").forEach((shape) => {
            const length = shape.getTotalLength();
            gsap.set(shape, { strokeDasharray: length });
            gsap.fromTo(
              shape,
              { strokeDashoffset: length },
              { strokeDashoffset: 0, duration: motion.duration.slow, ease: motion.ease.inOut, scrollTrigger: arrive },
            );
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
