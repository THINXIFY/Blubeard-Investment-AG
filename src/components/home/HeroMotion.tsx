"use client";

import { useRef, type ReactNode } from "react";
import { ensureGsap, gsap, motion, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/motion";
import { STAGE_MEDIA } from "./HeroStage";

ensureGsap();

const SEEN_KEY = "blubeard-hero-intro";
/** Matches the CSS failsafe: if the script arrives later than this, the film is already showing. */
const INTRO_DEADLINE_MS = 2600;
const REST_HEIGHT = [34, 56, 78];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Three ascending windows along the bottom edge that widen until they fill the frame. */
function barsPolygon(rise: readonly number[], open: number, phone: boolean) {
  const width = phone ? 16 : 8;
  const gap = width * 0.22;
  const start = (100 - (width * 3 + gap * 2)) / 2;
  const points = rise.flatMap((r, i) => {
    const left = lerp(start + i * (width + gap), (i / 3) * 100, open);
    const right = lerp(start + i * (width + gap) + width, ((i + 1) / 3) * 100, open);
    const top = 100 - lerp(REST_HEIGHT[i] * r, 100, open);
    return [`${left}% 100%`, `${left}% ${top}%`, `${right}% ${top}%`, `${right}% 100%`];
  });
  return `polygon(${points.join(",")})`;
}

const seenIntro = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

/**
 * Hero choreography. Targets children by data attribute so the hero markup stays server-rendered:
 *   opening  three rising bars (after the bars in the emblem) open onto the film, once per browser session;
 *            the photograph settles as a band of light crosses it, then the headline rises word by word,
 *            followed by the rule, text, CTAs and scroll cue. Particles are in HeroParticles.
 *   stage    (tablet and desktop) a short pin of 1.5 screens: the copy lifts away, the film draws into the centre window
 *            as twelve sector tiles spread outward, the line appears, the page turns white, and the grid holds to explore.
 *   flow     (phones and short screens) no pin: the film drifts and settles into a rounded window.
 * Reduced motion gets none of this: a still hero followed by the static strip.
 */
export function HeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current;
      const el = pinRef.current;
      if (!track || !el) return;
      const q = gsap.utils.selector(track);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Explicit start states, so nothing shows before its turn in the sequence.
        gsap.set(q('[data-hero="eyebrow"]'), { autoAlpha: 0, y: 14 });
        gsap.set(q('[data-hero="line"]'), { yPercent: 115, rotate: 5, transformOrigin: "0% 100%" });
        gsap.set(q('[data-hero="rule"]'), { scaleX: 0 });
        gsap.set(q('[data-hero="lead"]'), { autoAlpha: 0, y: 16 });
        gsap.set(q('[data-hero="actions"] > *'), { autoAlpha: 0, y: 14 });
        gsap.set(q('[data-hero="meta"] > *'), { autoAlpha: 0, y: 10 });
        gsap.set(q('[data-hero="content"]'), { autoAlpha: 1 });
        const intro = q('[data-hero="intro"]')[0] as HTMLElement;
        intro.setAttribute("data-intro-run", "");

        const late = performance.now() > INTRO_DEADLINE_MS;
        const routed = document.documentElement.hasAttribute("data-routed");
        const playBars = !late && !routed && !seenIntro() && window.scrollY < 40;
        const textAt = playBars ? 1 : 0.2;

        const tl = gsap.timeline({ defaults: { ease: motion.ease.out, duration: motion.duration.slow } });
        if (playBars) {
          const phone = window.matchMedia("(max-width: 767.98px)").matches;
          const s = { a: 0, b: 0, c: 0, open: 0 };
          const draw = () => {
            intro.style.clipPath = barsPolygon([s.a, s.b, s.c], s.open, phone);
          };
          draw();
          gsap.set(q('[data-hero="grade"]'), { opacity: 0.25 });
          tl.to(q('[data-hero="grade"]'), { opacity: 1, duration: 0.85, ease: motion.ease.inOut }, 0.55);
          tl.to(s, { a: 1, duration: 0.7, onUpdate: draw }, 0)
            .to(s, { b: 1, duration: 0.7, onUpdate: draw }, 0.1)
            .to(s, { c: 1, duration: 0.7, onUpdate: draw }, 0.2)
            .to(
              s,
              {
                open: 1,
                duration: 0.85,
                ease: motion.ease.inOut,
                onUpdate: draw,
                onComplete: () => {
                  intro.style.clipPath = "none";
                  // Only once it has really played: React's development double-run must not count as a viewing.
                  try {
                    sessionStorage.setItem(SEEN_KEY, "1");
                  } catch {
                    /* Private mode: the opening simply plays again. */
                  }
                },
              },
              0.55,
            );
        } else {
          intro.style.clipPath = "none";
          // Without the bars, the photograph still opens bright and settles under its grade.
          tl.fromTo(
            q('[data-hero="grade"]'),
            { opacity: 0.45 },
            { opacity: 1, duration: 1.8, ease: motion.ease.inOut },
            0,
          );
        }

        tl.fromTo(
          q('[data-hero="bg"]'),
          { scale: 1.16 },
          { scale: 1, duration: 3.4, ease: "power3.out" },
          playBars ? 0.45 : 0,
        )
          .fromTo(
            q('[data-hero="sheen"]'),
            { autoAlpha: 1, xPercent: -130 },
            {
              xPercent: 300,
              duration: 2,
              ease: "power1.inOut",
              onComplete: () => gsap.set(q('[data-hero="sheen"]'), { autoAlpha: 0 }),
            },
            playBars ? 0.9 : 0.15,
          )
          .to(q('[data-hero="eyebrow"]'), { autoAlpha: 1, y: 0, duration: motion.duration.base }, textAt)
          .to(
            q('[data-hero="line"]'),
            { yPercent: 0, rotate: 0, stagger: 0.07, duration: motion.duration.slow },
            textAt + 0.05,
          )
          .to(
            q('[data-hero="rule"]'),
            { scaleX: 1, duration: motion.duration.slow, ease: motion.ease.inOut },
            textAt + 0.3,
          )
          .to(q('[data-hero="lead"]'), { autoAlpha: 1, y: 0, duration: motion.duration.base }, textAt + 0.45)
          .to(
            q('[data-hero="actions"] > *'),
            { autoAlpha: 1, y: 0, stagger: 0.1, duration: motion.duration.base },
            textAt + 0.6,
          )
          .to(
            q('[data-hero="meta"] > *'),
            { autoAlpha: 1, y: 0, stagger: 0.1, duration: motion.duration.base },
            textAt + 0.85,
          );
      });

      // Stage: pinned shrink into the sector grid.
      mm.add(`${STAGE_MEDIA} and ${MOTION_OK}`, () => {
        const frame = q('[data-hero="frame"]')[0] as HTMLElement;
        const win = q('[data-hero="window"]')[0] as HTMLElement;
        const inner = q('[data-hero="intro"]')[0] as HTMLElement;
        // Transform-only shrink: the frame scales to the window while its content is counter-scaled, so what is
        // visible stays in place and the browser never repaints the film (a clip-path would, every frame).
        let box = { x: 0, y: 0, sx: 1, sy: 1 };
        const shrink = { p: 0 };
        const apply = () => {
          const { p } = shrink;
          const sx = 1 + (box.sx - 1) * p;
          const sy = 1 + (box.sy - 1) * p;
          const tx = box.x * p;
          const ty = box.y * p;
          frame.style.transform = `translate3d(${tx}px,${ty}px,0) scale(${sx},${sy})`;
          inner.style.transform = `translate3d(${-tx / sx}px,${-ty / sy}px,0) scale(${1 / sx},${1 / sy})`;
          frame.style.borderRadius = p > 0.97 ? `${8 / sx}px / ${8 / sy}px` : "";
        };
        const measure = () => {
          const f = el.getBoundingClientRect();
          const w = win.getBoundingClientRect();
          box = { x: w.left - f.left, y: w.top - f.top, sx: w.width / f.width, sy: w.height / f.height };
          apply();
        };
        gsap.set([frame, inner], { transformOrigin: "0 0", willChange: "transform" });
        measure();
        ScrollTrigger.addEventListener("refresh", measure);
        const tiles = gsap.utils.toArray<HTMLElement>(q('[data-hero="tile"]'));
        const words = q('[data-hero="word"]');
        // Hidden before the grid is revealed. A staggered tween only applies its start state when it begins.
        gsap.set(words, { yPercent: 110, autoAlpha: 0 });
        gsap.set(q('[data-hero="grid"]'), { autoAlpha: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            // The hold itself is CSS position: sticky (.hero-track), so the browser keeps it perfectly still.
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        const FILM = { duration: 0.46, ease: "power3.inOut" };
        tl.to(q('[data-hero="content"]'), { y: -64, autoAlpha: 0, duration: 0.16, ease: "power2.in" }, 0)
          .to(q('[data-hero="particles"]'), { autoAlpha: 0, duration: 0.16, ease: "power2.in" }, 0)
          .to(shrink, { p: 1, onUpdate: apply, ...FILM }, 0.06)
          .fromTo(q('[data-hero="parallax"]'), { scale: 1 }, { scale: 0.74, ...FILM }, 0.06);
        // Tiles spread outward from the window in a wave, nearest first, as the film draws in.
        tiles.forEach((tile, i) => {
          const col = i < 5 ? i : i === 5 ? 0 : i === 6 ? 4 : i - 7;
          const row = i < 5 ? 0 : i < 7 ? 1 : 2;
          const dx = col - 2;
          const dy = row - 1;
          const reach = Math.hypot(dx * 0.7, dy) / Math.hypot(1.4, 1);
          tl.fromTo(
            tile,
            { autoAlpha: 0, x: -dx * 30, y: -dy * 44, scale: 0.9 },
            { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.26, ease: "power3.out" },
            0.2 + reach * 0.18,
          );
        });
        tl.to(words, { yPercent: 0, autoAlpha: 1, duration: 0.18, stagger: 0.05, ease: "power3.out" }, 0.5)
          .to(q('[data-hero="stagebg"]'), { opacity: 0, duration: 0.12, ease: "power1.inOut" }, 0.72)
          .to({}, { duration: 0.16 }, 0.84);

        return () => {
          ScrollTrigger.removeEventListener("refresh", measure);
          gsap.set([frame, inner], { clearProps: "transform,transformOrigin,willChange,borderRadius" });
        };
      });

      // Flow: no pin on phones and short screens.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 767.98px), (prefers-reduced-motion: no-preference) and (max-height: 639.98px)",
        () => {
          const scrub = { trigger: el, start: "top top", end: "bottom top" };
          gsap.fromTo(
            q('[data-hero="parallax"]'),
            { yPercent: 0, scale: 1 },
            { yPercent: 7, scale: 1.07, ease: "none", scrollTrigger: { ...scrub, scrub: 0.6 } },
          );
          gsap.fromTo(
            q('[data-hero="frame"]'),
            { clipPath: "inset(0% 0% 0% 0% round 0px)" },
            { clipPath: "inset(0% 2.5% 7% 2.5% round 14px)", ease: "none", scrollTrigger: { ...scrub, scrub: 0.4 } },
          );
          gsap.to(q('[data-hero="stagebg"]'), {
            opacity: 0,
            ease: "none",
            scrollTrigger: { ...scrub, end: "20% top", scrub: 0.3 },
          });
          gsap.to(q('[data-hero="particles"]'), {
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "60% top", scrub: 0.4 },
          });
          gsap.to(q('[data-hero="content"]'), {
            y: -56,
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "60% top", scrub: 0.4 },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="hero-track">
      <div ref={pinRef} className={`hero-pin ${className ?? ""}`}>
        {children}
      </div>
    </div>
  );
}
