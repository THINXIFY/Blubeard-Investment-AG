"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ensureGsap, gsap, MOTION_OK } from "@/lib/motion";

ensureGsap();

/**
 * Layers marked `data-depth="n"` shift up to n pixels with the cursor, nearer layers further, so a composition
 * gains gentle depth. Mouse users only; nothing moves for touch or reduced motion.
 */
export function CursorDepth({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(`${MOTION_OK} and (hover: hover) and (pointer: fine)`).matches) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]")).map((node) => ({
      node,
      depth: Number(node.dataset.depth) || 0,
      x: gsap.quickTo(node, "x", { duration: 1.1, ease: "power3.out" }),
      y: gsap.quickTo(node, "y", { duration: 1.1, ease: "power3.out" }),
    }));
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach((l) => {
        l.x(px * l.depth * 2);
        l.y(py * l.depth * 2);
      });
    };
    const leave = () =>
      layers.forEach((l) => {
        l.x(0);
        l.y(0);
      });
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(layers.map((l) => l.node));
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
