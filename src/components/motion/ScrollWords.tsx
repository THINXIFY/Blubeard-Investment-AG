"use client";

import { useRef, type ElementType } from "react";
import { ensureGsap, gsap, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

type ScrollWordsProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** How faint each word starts. */
  from?: number;
  start?: string;
  end?: string;
};

/**
 * A statement that lights up word by word at the reader's pace, tied to scroll position.
 * Remains ordinary readable text without JavaScript and for reduced motion.
 */
export function ScrollWords({
  text,
  as: Tag = "p",
  className,
  from = 0.2,
  start = "top 85%",
  end = "top 50%",
}: ScrollWordsProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el.querySelectorAll("[data-word]"),
          { opacity: from },
          { opacity: 1, ease: "none", stagger: 0.08, scrollTrigger: { trigger: el, start, end, scrub: 0.4 } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`}>
          {i > 0 ? " " : null}
          <span data-word>{word}</span>
        </span>
      ))}
    </Tag>
  );
}
