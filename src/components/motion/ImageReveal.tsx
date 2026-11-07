"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ensureGsap, gsap, motion, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  /** Inner element receives a gentle scroll-linked drift (percent of its height). */
  drift?: number;
  /** Reveal direction of the clip mask. */
  from?: "bottom" | "left";
  /**
   * "clip" (default) wipes the image in. "zoom" only settles scale — the image is never hidden,
   * which suits above-the-fold images (no hydration flash, LCP unaffected).
   */
  mode?: "clip" | "zoom";
  /** Delay before the entrance (seconds). */
  delay?: number;
  /** Replaces the clip wipe with three bars rising in turn, after the bars in the emblem. */
  bars?: boolean;
};

/**
 * Editorial image reveal: a clip-path wipe on entry followed by a slow scroll drift.
 * The child should be a positioned element (e.g. next/image with `fill`) — it is scaled
 * slightly so drift never exposes edges. No-op for reduced motion.
 */
export function ImageReveal({
  children,
  className,
  drift = 8,
  from = "bottom",
  mode = "clip",
  delay = 0,
  bars = false,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const inner = el?.querySelector<HTMLElement>("[data-reveal-inner]");
      if (!el || !inner) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (mode === "clip" && bars) {
          const s = { a: 0, b: 0, c: 0 };
          const draw = () => {
            const points = [s.a, s.b, s.c].flatMap((rise, i) => {
              const left = (i * 100) / 3;
              const right = ((i + 1) * 100) / 3;
              const top = 100 - rise * 100;
              return [`${left}% 100%`, `${left}% ${top}%`, `${right}% ${top}%`, `${right}% 100%`];
            });
            el.style.clipPath = `polygon(${points.join(",")})`;
          };
          draw();
          gsap
            .timeline({
              delay,
              defaults: { duration: motion.duration.slow, ease: motion.ease.inOut, onUpdate: draw },
              scrollTrigger: { trigger: el, start: motion.revealStart, once: true },
              onComplete: () => {
                el.style.clipPath = "none";
              },
            })
            .to(s, { a: 1 }, 0)
            .to(s, { b: 1 }, 0.16)
            .to(s, { c: 1 }, 0.32);
        } else if (mode === "clip")
          gsap.fromTo(
            el,
            { clipPath: from === "bottom" ? "inset(100% 0% 0% 0%)" : "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: motion.duration.cinematic,
              ease: motion.ease.inOut,
              delay,
              scrollTrigger: { trigger: el, start: motion.revealStart, once: true },
            },
          );
        gsap.fromTo(
          inner,
          { scale: 1.22 },
          {
            scale: 1.08,
            duration: motion.duration.cinematic * 1.4,
            ease: motion.ease.out,
            delay,
            scrollTrigger: { trigger: el, start: motion.revealStart, once: true },
          },
        );
        if (drift) {
          gsap.fromTo(
            inner,
            { yPercent: -drift / 2 },
            {
              yPercent: drift / 2,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
            },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div data-reveal-inner className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
