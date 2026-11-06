"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { ensureGsap, gsap, motion, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

type MaskedHeadingProps = {
  lines: readonly string[];
  id?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Per-line classes by index (e.g. a quieter tone or an accent colour). Serialisable for server callers. */
  lineClassNames?: readonly (string | undefined)[];
  /** Seconds before the first line moves. */
  delay?: number;
};

/**
 * Editorial heading reveal: each line rises out of its own mask when the heading scrolls into view.
 * Same treatment as the hero headline, so section statements share one typographic language.
 * Text remains real, selectable heading text; reduced motion shows it immediately.
 */
export function MaskedHeading({ lines, id, as: Tag = "h2", className, lineClassNames, delay = 0 }: MaskedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(el.querySelectorAll("[data-line]"), {
          yPercent: 112,
          duration: motion.duration.cinematic,
          ease: motion.ease.out,
          stagger: 0.12,
          delay,
          scrollTrigger: { trigger: el, start: motion.revealStart, once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} data-animate="">
      {lines.map((line, i) => (
        // Padding keeps descenders inside the mask.
        <span key={line} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <span data-line className={cn("block", lineClassNames?.[i])}>
            {line}
            {/* Keeps words apart in the accessible name and copied text. */}
            {i < lines.length - 1 ? " " : null}
          </span>
        </span>
      ))}
    </Tag>
  );
}
