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

/**
 * Pinned scroll stages: tablet-size phones and short screens get the ordinary layout instead.
 * Mirrors the media query around .pin-track and .pin-stage in globals.css.
 */
export const PIN_MEDIA = "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";

/** The six pages that carry the full motion treatment. */
const MAIN_ROUTES = new Set(["/", "/about", "/investments", "/services", "/team", "/contact"]);
export const isMainRoute = (pathname: string) => MAIN_ROUTES.has(pathname);

type SmoothScroller = { scrollTo: (target: number, options?: { duration?: number; immediate?: boolean }) => void };
let scroller: SmoothScroller | null = null;
export const setLenis = (next: SmoothScroller | null) => {
  scroller = next;
};

/** Moves the page to a position, through smooth scrolling where it is running. */
export function scrollToY(y: number, immediate = false) {
  if (scroller) scroller.scrollTo(y, { duration: 1.1, immediate });
  else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
}

/**
 * Turns a stage's sticky pin off when its content does not fit the screen, so nothing is ever cut off.
 * Returns false when off: the section then shows as a normal layout.
 */
export function pinFits(track: HTMLElement, stage: HTMLElement) {
  track.removeAttribute("data-pin");
  // Layout heights, not scrollHeight: an entrance still waiting to run must not count as overflow.
  const content = (el: Element) =>
    Array.from(el.children).reduce((sum, child) => {
      const node = child as HTMLElement;
      return getComputedStyle(node).position === "absolute" ? sum : sum + node.offsetHeight;
    }, 0);
  const inner = Array.from(stage.querySelectorAll<HTMLElement>(".persp-list"));
  const fits = content(stage) <= stage.clientHeight + 1 && inner.every((el) => content(el) <= el.offsetHeight + 1);
  if (!fits) track.setAttribute("data-pin", "off");
  return fits;
}

export { gsap, ScrollTrigger, useGSAP };
