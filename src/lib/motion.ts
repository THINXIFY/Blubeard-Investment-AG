import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

/** Register GSAP plugins once, client-side only. */
export function ensureGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: motion.ease.out, duration: motion.duration.base });
  registered = true;
}

/**
 * Motion tokens — the single timing system for GSAP and CSS.
 * CSS mirrors these tiers: duration-300 (fast), duration-700 (base), duration-1200 (slow),
 * all on the shared expo-out curve (`ease-expo` = cubic-bezier(0.16, 1, 0.3, 1)).
 */
export const motion = {
  ease: {
    out: "expo.out",
    inOut: "expo.inOut",
    soft: "power2.out",
  },
  duration: {
    /** Colour changes, micro feedback. */
    fast: 0.3,
    /** UI movement: lines, icons, panels. */
    base: 0.7,
    /** Images and content reveals. */
    slow: 1.2,
    /** Section-level entrances (hero, headings). */
    cinematic: 1.6,
  },
  stagger: 0.08,
  distance: 28,
  /** Shared ScrollTrigger start for reveals. */
  revealStart: "top 85%",
} as const;

/** Media query used with gsap.matchMedia() so every animation respects user preference. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_REDUCED = "(prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger, useGSAP };
