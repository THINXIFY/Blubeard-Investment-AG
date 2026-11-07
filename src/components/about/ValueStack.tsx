"use client";

import { useRef, type ReactNode } from "react";
import { ensureGsap, gsap, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

/** The values stack up as they arrive on large screens (CSS sticky); each card settles back as the next covers it. */
export function ValueStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const items = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(".stack-list > li"));
        items.forEach((item, i) => {
          const next = items[i + 1];
          const card = item.querySelector(".stack-card");
          if (!next || !card) return;
          gsap.to(card, {
            scale: 0.95,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top 85%", end: "top 30%", scrub: 0.4 },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
