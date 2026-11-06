"use client";

import { useRef, type ReactNode } from "react";
import { ensureGsap, gsap, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Total travel in percent of the element's height across the viewport pass. */
  amount?: number;
};

/** Subtle scroll-linked vertical drift. Disabled for reduced motion. */
export function Parallax({ children, className, amount = 8 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
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
