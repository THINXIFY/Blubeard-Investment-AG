"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { isMainRoute, MOTION_OK } from "@/lib/motion";

/** The three bars of the emblem, traced from the logo artwork (640 × 139): bottom-left, top-left, top-right, bottom-right. */
const BARS = ["30,114.5 30,79 47,67 47,107", "53,106 53,63 71,49 71,100.5", "77,99 77,45 97,29 97,94.5"];
const TOP = 29;
const BOTTOM = 115;

/**
 * Reading progress on the six main pages: the emblem's three bars fill with Imperial Blue from the bottom,
 * one after another, as the page is read. Sits exactly over the artwork; decorative, so hidden from assistive tech.
 */
export function LogoProgress() {
  const pathname = usePathname();
  const clips = useRef<(SVGRectElement | null)[]>([]);

  useEffect(() => {
    if (!isMainRoute(pathname) || !window.matchMedia(MOTION_OK).matches) return;
    const rects = clips.current;
    let frame = 0;
    const draw = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      clips.current.forEach((rect, i) => {
        if (!rect) return;
        const part = Math.min(Math.max(p * BARS.length - i, 0), 1);
        const height = (BOTTOM - TOP) * part;
        rect.setAttribute("y", String(BOTTOM - height));
        rect.setAttribute("height", String(height));
      });
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      rects.forEach((rect) => rect?.setAttribute("height", "0"));
    };
  }, [pathname]);

  return (
    <svg
      aria-hidden
      viewBox="0 0 640 139"
      preserveAspectRatio="none"
      data-logo-progress
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        {BARS.map((_, i) => (
          <clipPath key={i} id={`logo-progress-${i}`}>
            <rect
              ref={(el) => {
                clips.current[i] = el;
              }}
              x="0"
              y={BOTTOM}
              width="640"
              height="0"
            />
          </clipPath>
        ))}
      </defs>
      {BARS.map((points, i) => (
        <polygon key={i} points={points} fill="var(--color-imperial)" clipPath={`url(#logo-progress-${i})`} />
      ))}
    </svg>
  );
}
