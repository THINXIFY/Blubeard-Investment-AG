"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { images, type ImageKey } from "@/content/images";
import { cn } from "@/lib/cn";
import { ensureGsap, gsap, MOTION_OK } from "@/lib/motion";

ensureGsap();

const WIDTH = 336;
const HEIGHT = 252;
const GAP = 28;
const ROW_MEDIA = `(min-width: 1024px) and (hover: hover) and (pointer: fine) and ${MOTION_OK}`;

/**
 * Homepage services for mouse users on large screens: a photograph follows the cursor over the rows and changes with
 * each one, and keyboard focus shows it by the focused row. Photographs load on first approach. Every service is
 * fully readable without it, and other devices keep the photo cards.
 */
export function ServicesFollower({ children, items }: { children: ReactNode; items: readonly { image: ImageKey }[] }) {
  const root = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;
    const box = float.current;
    if (!el || !box || !window.matchMedia(ROW_MEDIA).matches) return;

    const x = gsap.quickTo(box, "x", { duration: 0.65, ease: "power3.out" });
    const y = gsap.quickTo(box, "y", { duration: 0.65, ease: "power3.out" });
    // Tracks the cursor sideways but sits clear of the row itself, so the row being read is never covered.
    const place = (cx: number, row: HTMLElement) => {
      const r = row.getBoundingClientRect();
      const below = r.bottom + GAP / 2 + HEIGHT < window.innerHeight;
      x(Math.min(Math.max(cx - WIDTH / 2, 16), window.innerWidth - WIDTH - 16));
      y(below ? r.bottom + GAP / 2 : Math.max(r.top - GAP / 2 - HEIGHT, 16));
    };
    const rowOf = (target: EventTarget | null) => (target as Element | null)?.closest?.<HTMLElement>("[data-follow]");
    const show = (row: HTMLElement) => {
      setActive(Number(row.dataset.follow));
      gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    };
    const hide = () => {
      setActive(null);
      gsap.to(box, { autoAlpha: 0, scale: 0.92, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    };

    const onEnter = () => setReady(true);
    const onMove = (e: PointerEvent) => {
      const row = rowOf(e.target);
      if (!row) return hide();
      place(e.clientX, row);
      show(row);
    };
    const onFocus = (e: FocusEvent) => {
      const row = rowOf(e.target);
      if (!row || !(e.target as Element).matches(":focus-visible")) return;
      setReady(true);
      place(row.getBoundingClientRect().right - WIDTH / 2 - GAP, row);
      show(row);
    };

    gsap.set(box, { autoAlpha: 0, scale: 0.92 });
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", hide);
    el.addEventListener("focusin", onFocus);
    el.addEventListener("focusout", hide);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", hide);
      el.removeEventListener("focusin", onFocus);
      el.removeEventListener("focusout", hide);
      gsap.killTweensOf(box);
    };
  }, []);

  return (
    <div ref={root}>
      {children}
      <div
        ref={float}
        aria-hidden
        data-follower
        style={{ width: WIDTH, height: HEIGHT }}
        className="pointer-events-none invisible fixed top-0 left-0 z-30 overflow-hidden rounded-md bg-obsidian shadow-[0_30px_60px_-24px_rgb(16_19_32/0.55)]"
      >
        {ready
          ? items.map((item, i) => {
              const img = images[item.image];
              return (
                <Image
                  key={item.image}
                  src={img.src}
                  alt=""
                  fill
                  sizes={`${WIDTH}px`}
                  placeholder="blur"
                  className={cn(
                    "object-cover transition-[opacity,scale] duration-700 ease-expo",
                    active === i ? "scale-100 opacity-100" : "scale-[1.08] opacity-0",
                  )}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
