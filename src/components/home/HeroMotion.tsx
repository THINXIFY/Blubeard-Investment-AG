"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ensureGsap, gsap, motion, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

/**
 * Hero choreography. Targets children by data attribute so the hero markup stays server-rendered:
 *   [data-hero="bg"]       architectural photograph — settles from a slight zoom, then drifts with scroll
 *   [data-hero="content"]  copy block — hidden pre-hydration (via [data-animate]) then revealed
 *   [data-hero="eyebrow" | "line" | "lead" | "actions" | "meta"]  staggered entrance
 * The photograph is never hidden, so it can paint immediately as the LCP element.
 */
export function HeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Pause the continuous Ken Burns loop whenever the hero is offscreen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => el.toggleAttribute("data-offscreen", !entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(q('[data-hero="content"]'), { autoAlpha: 1 });

        const tl = gsap.timeline({ defaults: { ease: motion.ease.out, duration: motion.duration.slow } });
        tl.fromTo(
          q('[data-hero="bg"]'),
          { scale: 1.12 },
          { scale: 1, duration: motion.duration.cinematic * 1.75, ease: motion.ease.out },
          0,
        )
          .from(q('[data-hero="eyebrow"]'), { autoAlpha: 0, y: 16, duration: motion.duration.base }, 0.35)
          .from(q('[data-hero="line"]'), { yPercent: 110, stagger: 0.12, duration: motion.duration.cinematic }, 0.45)
          .from(q('[data-hero="lead"]'), { autoAlpha: 0, y: 20 }, 0.85)
          .from(q('[data-hero="actions"] > *'), { autoAlpha: 0, y: 16, stagger: motion.stagger }, 1.0)
          .from(
            q('[data-hero="meta"] > *'),
            { autoAlpha: 0, y: 12, stagger: motion.stagger, duration: motion.duration.base },
            1.2,
          );

        // Very subtle parallax: the photograph drifts slower than the page.
        gsap.to(q('[data-hero="parallax"]'), {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
        });
        // Copy recedes gently as the hero scrolls away.
        gsap.to(q('[data-hero="content"]'), {
          y: -40,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.5 },
        });
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
