"use client";

import { useRef, type ReactNode } from "react";
import { ensureGsap, gsap, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

/** A large panel that opens up to full size as it scrolls into place. Disabled for reduced motion. */
export function ScaleIn({
  children,
  className,
  from = 0.92,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { scale: from },
          { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 100%", end: "top 55%", scrub: 0.5 } },
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
