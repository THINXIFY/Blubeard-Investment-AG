"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { ensureGsap, gsap, motion, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

/**
 * Contact hero headline: each word rises out of its own mask in sequence, then an Imperial rule draws beneath.
 * It stays real, selectable text. Reduced motion or no JavaScript shows the finished heading immediately.
 */
export function ContactHeroHeading({
  id,
  lines,
  delay = 0.2,
}: {
  id: string;
  lines: readonly string[];
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(el, { autoAlpha: 1 });
        gsap
          .timeline({ delay })
          .from(el.querySelectorAll("[data-word]"), {
            yPercent: 115,
            rotate: 3,
            duration: motion.duration.slow,
            ease: motion.ease.out,
            stagger: 0.13,
          })
          .from(
            el.querySelector("[data-rule]"),
            { scaleX: 0, duration: motion.duration.slow, ease: motion.ease.inOut },
            "-=0.7",
          );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-animate="">
      <h1
        id={id}
        className="mt-6 font-display text-[clamp(3rem,2rem+4.2vw,5.5rem)] leading-[1.02] font-medium tracking-[-0.045em]"
      >
        {lines.map((line, i) => (
          <span key={line} className={cn("block", i > 0 && "text-platinum")}>
            {line.split(" ").map((word, w, all) => (
              <span key={word} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                <span data-word className="inline-block origin-bottom-left">
                  {word}
                </span>
                {w < all.length - 1 ? <span>&nbsp;</span> : null}
              </span>
            ))}
            {i < lines.length - 1 ? " " : null}
          </span>
        ))}
      </h1>
      <span aria-hidden data-rule className="mt-6 block h-0.5 w-20 origin-left bg-imperial-300" />
    </div>
  );
}
