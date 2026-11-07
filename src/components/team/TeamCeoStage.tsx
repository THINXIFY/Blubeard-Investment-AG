"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { ensureGsap, gsap, motion, PIN_MEDIA, pinFits, ScrollTrigger, scrollToY, useGSAP } from "@/lib/motion";

ensureGsap();

/** Position within an ancestor, ignoring transforms (a running entrance must not throw off the measurement). */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, width: el.offsetWidth, height: el.offsetHeight };
}

/**
 * The CEO introduction on large screens: the emblem opens large on a full-screen Porcelain panel, then the panel draws
 * in to its place beside the introduction, which rises into view. Elsewhere this is the ordinary card.
 */
export function TeamCeoStage({ children, emblemAlt }: { children: ReactNode; emblemAlt: string }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trackEl = track.current;
      const stageEl = stage.current;
      if (!trackEl || !stageEl) return;
      const q = gsap.utils.selector(stageEl);
      const panel = q("[data-ceo-panel]")[0] as HTMLElement | undefined;
      const emblem = q("[data-ceo-emblem]")[0] as HTMLElement | undefined;
      const cover = q("[data-ceo-cover]")[0] as HTMLElement | undefined;
      const coverEmblem = q("[data-ceo-cover-emblem]")[0] as HTMLElement | undefined;
      if (!panel || !emblem || !cover || !coverEmblem) return;
      const mm = gsap.matchMedia();

      mm.add(PIN_MEDIA, () => {
        if (!pinFits(trackEl, stageEl)) return;

        // Inset of the panel within the screen, and how far the emblem travels to its resting place.
        const end = { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0, scale: 1 };
        const measure = () => {
          const p = offsetWithin(panel, stageEl);
          const e = offsetWithin(emblem, stageEl);
          end.top = p.y;
          end.left = p.x;
          end.right = stageEl.offsetWidth - p.x - p.width;
          end.bottom = stageEl.offsetHeight - p.y - p.height;
          gsap.set(coverEmblem, { left: e.x, top: e.y, width: e.width, height: e.height });
          end.x = stageEl.offsetWidth / 2 - (e.x + e.width / 2);
          end.y = stageEl.offsetHeight / 2 - (e.y + e.height / 2);
          end.scale = Math.min(stageEl.offsetHeight * 0.34, 300) / e.height;
        };
        measure();
        ScrollTrigger.addEventListener("refreshInit", measure);

        const open = { p: 0 };
        const paint = () => {
          const { p } = open;
          cover.style.clipPath = `inset(${end.top * p}px ${end.right * p}px ${end.bottom * p}px ${end.left * p}px round ${8 * p}px)`;
          gsap.set(coverEmblem, { x: end.x * (1 - p), y: end.y * (1 - p), scale: 1 + (end.scale - 1) * (1 - p) });
        };
        paint();

        gsap.set(q("[data-ceo-name]"), { yPercent: 112 });
        // Opacity only: the email link stays reachable by keyboard while it is still faint.
        gsap.set(q("[data-ceo-text]"), { opacity: 0, y: 24 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: trackEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefresh: paint,
          },
        });
        tl.to({}, { duration: 0.08 })
          .to(open, { p: 1, duration: 0.52, ease: "power3.inOut", onUpdate: paint }, 0.08)
          .to(q("[data-ceo-name]"), { yPercent: 0, duration: 0.2, stagger: 0.04, ease: motion.ease.soft }, 0.46)
          .to(q("[data-ceo-text]"), { opacity: 1, y: 0, duration: 0.2, stagger: 0.05, ease: motion.ease.soft }, 0.54)
          .set(cover, { autoAlpha: 0 }, 0.62)
          .to({}, { duration: 0.1 }, 0.9);

        // Keyboard users: the email link is covered at first, so reaching it finishes the opening.
        const onFocus = () => {
          const st = tl.scrollTrigger;
          if (st && st.progress < 0.9) scrollToY(st.end, true);
        };
        stageEl.addEventListener("focusin", onFocus);

        return () => {
          stageEl.removeEventListener("focusin", onFocus);
          ScrollTrigger.removeEventListener("refreshInit", measure);
          gsap.set(cover, { clearProps: "clipPath,visibility,opacity" });
        };
      });
      return () => mm.revert();
    },
    { scope: track },
  );

  return (
    <div ref={track} className="pin-track" style={{ "--pin-h": "calc(100svh + 110vh)" } as React.CSSProperties}>
      <div ref={stage} className="pin-stage relative">
        {children}
        <div data-ceo-cover aria-hidden className="ceo-cover">
          <Image
            data-ceo-cover-emblem
            src="/media/branding/mark-320.png"
            alt={emblemAlt}
            width={320}
            height={320}
            unoptimized
            className="absolute"
          />
        </div>
      </div>
    </div>
  );
}
