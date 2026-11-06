"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ensureGsap, gsap, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

/**
 * Scroll-scrubbed window: the content opens from an inset, rounded frame to full bleed as it
 * travels through the viewport (no pinning). The inner layer counter-scales for depth.
 * Reduced motion: shown at full size.
 */
export function ScrollExpand({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const inner = el?.querySelector<HTMLElement>("[data-expand-inner]");
      if (!el || !inner) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 90%", end: "center 45%", scrub: 0.6 },
        });
        tl.fromTo(
          el,
          { clipPath: "inset(0% 9% 0% 9% round 12px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" },
          0,
        ).fromTo(inner, { scale: 1.18 }, { scale: 1.02, ease: "none" }, 0);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div data-expand-inner className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
