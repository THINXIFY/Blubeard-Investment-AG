"use client";

import { useRef, type ReactNode } from "react";
import { ensureGsap, gsap, PIN_MEDIA, pinFits, scrollToY, useGSAP } from "@/lib/motion";

ensureGsap();

/**
 * The end of the Contact page on large screens: the section holds while the statement grows to full size and the glow
 * deepens, then the description and the email action arrive. Elsewhere this is the ordinary closing band.
 */
export function ContactFinale({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trackEl = track.current;
      const stageEl = stage.current;
      if (!trackEl || !stageEl) return;
      const q = gsap.utils.selector(stageEl);
      const mm = gsap.matchMedia();

      mm.add(PIN_MEDIA, () => {
        if (!pinFits(trackEl, stageEl)) return;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: trackEl, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });
        tl.fromTo(q("[data-finale-head]"), { scale: 0.62 }, { scale: 1, duration: 0.6, ease: "power2.out" }, 0)
          .fromTo(q("[data-finale-glow]"), { opacity: 0.25 }, { opacity: 1, duration: 0.7 }, 0)
          // Opacity only: the action stays reachable by keyboard while it is still faint.
          .fromTo(
            q("[data-finale-late]"),
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.25, stagger: 0.08, ease: "power2.out" },
            0.52,
          )
          .to({}, { duration: 0.1 }, 0.9);

        const onFocus = () => {
          const st = tl.scrollTrigger;
          if (st && st.progress < 0.9) scrollToY(st.end, true);
        };
        stageEl.addEventListener("focusin", onFocus);
        return () => stageEl.removeEventListener("focusin", onFocus);
      });
      return () => mm.revert();
    },
    { scope: track },
  );

  return (
    <div ref={track} className="pin-track" style={{ "--pin-h": "calc(100svh + 80vh)" } as React.CSSProperties}>
      <div ref={stage} className="pin-stage relative">
        {children}
      </div>
    </div>
  );
}
