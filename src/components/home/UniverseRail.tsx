"use client";

import { useRef, type ReactNode } from "react";
import { ensureGsap, gsap, PIN_MEDIA, pinFits, ScrollTrigger, scrollToY, useGSAP } from "@/lib/motion";

ensureGsap();

/**
 * Investment universe on large screens: the section holds while the twelve sectors travel sideways with the scroll,
 * each photograph moving at its own depth. Phones, short screens and reduced motion keep the ordinary grid, and
 * tabbing to a card brings it into view.
 */
export function UniverseRail({ children, total }: { children: ReactNode; total: number }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trackEl = track.current;
      const stageEl = stage.current;
      if (!trackEl || !stageEl) return;
      const q = gsap.utils.selector(trackEl);
      const list = q("[data-rail]")[0] as HTMLElement | undefined;
      if (!list) return;
      const mm = gsap.matchMedia();

      mm.add(PIN_MEDIA, () => {
        if (!pinFits(trackEl, stageEl)) return;

        const distance = () => Math.max(0, list.scrollWidth - window.innerWidth);
        const setHeight = () => trackEl.style.setProperty("--pin-h", `calc(100svh + ${distance()}px)`);
        setHeight();
        ScrollTrigger.addEventListener("refreshInit", setHeight);

        const bar = q("[data-rail-bar]")[0] as HTMLElement | undefined;
        const counter = q("[data-rail-count]")[0] as HTMLElement | undefined;
        const tween = gsap.to(list, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: trackEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar) gsap.set(bar, { scaleX: self.progress });
              if (counter) {
                const n = Math.min(total, Math.floor(self.progress * total) + 1);
                counter.textContent = String(n).padStart(2, "0");
              }
            },
          },
        });

        // Each photograph drifts inside its card as the card crosses the screen.
        q("[data-rail] > li").forEach((card) => {
          const img = card.querySelector("[data-rail-img]");
          if (!img) return;
          gsap.fromTo(
            img,
            { xPercent: -7, scale: 1.18 },
            {
              xPercent: 7,
              scale: 1.18,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        // Keyboard users: moving focus to a card off to the side scrolls it into view.
        const onFocus = (e: FocusEvent) => {
          const card = (e.target as Element).closest("li");
          const st = tween.scrollTrigger;
          if (!card || !st) return;
          const r = card.getBoundingClientRect();
          if (r.left >= 0 && r.right <= window.innerWidth) return;
          const x = Number(gsap.getProperty(list, "x")) || 0;
          const target = r.left - x - (window.innerWidth - r.width) / 2;
          const progress = Math.min(Math.max(target / distance(), 0), 1);
          scrollToY(st.start + (st.end - st.start) * progress, true);
        };
        list.addEventListener("focusin", onFocus);

        return () => {
          list.removeEventListener("focusin", onFocus);
          ScrollTrigger.removeEventListener("refreshInit", setHeight);
          trackEl.style.removeProperty("--pin-h");
          gsap.set(list, { clearProps: "x" });
        };
      });

      return () => mm.revert();
    },
    { scope: track },
  );

  return (
    <div
      ref={track}
      className="pin-track rail-track"
      style={{ "--pin-h": "calc(100svh + 240vw)" } as React.CSSProperties}
    >
      <div ref={stage} className="pin-stage">
        {children}
      </div>
    </div>
  );
}
