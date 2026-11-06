"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { ensureGsap, gsap, motion, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Vertical offset in px the content travels from. */
  y?: number;
  /**
   * Stagger direct descendants marked with `data-reveal-item`
   * instead of revealing the wrapper as one block.
   */
  stagger?: boolean | number;
  /** ScrollTrigger start position. */
  start?: string;
  id?: string;
};

/**
 * Scroll-triggered fade/translate reveal.
 * - Hidden pre-hydration via `[data-animate]` (see globals.css) to avoid flashes.
 * - Fully disabled for `prefers-reduced-motion: reduce`.
 * - Runs once; cleans up on unmount.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  y = motion.distance,
  stagger = false,
  start = "top 85%",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Eyebrow rules draw in as their block arrives, the same small gesture on every page.
        const rules = el.querySelectorAll("[data-eyebrow-rule]");
        if (rules.length) {
          gsap.from(rules, {
            scaleX: 0,
            delay: delay + 0.1,
            duration: motion.duration.slow,
            ease: motion.ease.inOut,
            scrollTrigger: { trigger: el, start, once: true },
          });
        }

        const items = stagger ? el.querySelectorAll<HTMLElement>("[data-reveal-item]") : null;
        const targets = items && items.length > 0 ? items : el;
        if (targets !== el) gsap.set(el, { autoAlpha: 1 });

        gsap.fromTo(
          targets,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            delay,
            duration: motion.duration.slow,
            ease: motion.ease.out,
            stagger: typeof stagger === "number" ? stagger : motion.stagger,
            clearProps: "transform",
            scrollTrigger: { trigger: el, start, once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} data-animate="">
      {children}
    </Tag>
  );
}
