"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Seamless Ken Burns loop (CSS keyframes ken-burns-zoom / ken-burns-pan in globals.css).
 * Two nested layers with different periods alternate smoothly; paused offscreen; static for reduced motion.
 */
export function KenBurns({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => el.toggleAttribute("data-offscreen", !entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        data-kenburns
        className="absolute inset-0 will-change-transform motion-safe:animate-[ken-burns-zoom_42s_ease-in-out_infinite_alternate]"
      >
        <div
          data-kenburns
          className="absolute inset-0 will-change-transform motion-safe:animate-[ken-burns-pan_29s_ease-in-out_infinite_alternate]"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
