"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function whenIdle(cb: () => void) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(cb, { timeout: 1200 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(cb, 200);
  return () => clearTimeout(id);
}

/** Corner registration marks — a quiet nod to precision. */
function CornerMarks() {
  const base = "absolute size-3 border-obsidian/40";
  return (
    <>
      <span aria-hidden className={cn(base, "top-3 left-3 border-t border-l")} />
      <span aria-hidden className={cn(base, "top-3 right-3 border-t border-r")} />
      <span aria-hidden className={cn(base, "bottom-3 left-3 border-b border-l")} />
      <span aria-hidden className={cn(base, "right-3 bottom-3 border-r border-b")} />
    </>
  );
}

/* Static fallback geometry — mirrors the 3D sculpture's proportions (see three/HeroComposition). */
const FIG = (() => {
  const SLABS = 16;
  const S = 112; // scene units → SVG px
  const ELEV = 0.2; // view elevation (radians)
  const cx = 200;
  const cy = 214;
  const project = (x: number, y: number, z: number) =>
    [cx + x * S, cy - y * S * Math.cos(ELEV) + z * S * Math.sin(ELEV)] as const;
  const slabs = Array.from({ length: SLABS }, (_, i) => {
    const k = i / (SLABS - 1);
    const y = -1.32 + i * 0.165;
    const rot = i * 0.105 + 0.5;
    const w = (1.62 - k * 0.42) / 2;
    const d = (0.66 - k * 0.14) / 2;
    const corners = [
      [-w, -d],
      [w, -d],
      [w, d],
      [-w, d],
    ].map(([x, z]) => {
      const rx = x * Math.cos(rot) - z * Math.sin(rot);
      const rz = x * Math.sin(rot) + z * Math.cos(rot);
      return project(rx, y, rz);
    });
    const thickness = 0.055 * S;
    const top = corners.map(([px, py]) => `${px.toFixed(1)},${(py - thickness).toFixed(1)}`).join(" ");
    const base = corners.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
    return { top, base, k };
  });
  const [, coreTop] = project(0, -1.32 + 15 * 0.165, 0);
  const [, coreBottom] = project(0, -1.32, 0);
  const [, plinthY] = project(0, -1.44, 0);
  return { slabs, coreTop, coreBottom, plinthY, plinthRx: 1.25 * S, plinthRy: 1.25 * S * Math.sin(ELEV) };
})();

/** Static fallback: shown before WebGL loads, without WebGL, and to crawlers. */
function StaticFigure({ hidden }: { hidden: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className={cn(
        "absolute inset-0 m-auto h-[84%] w-[84%] transition-opacity duration-1200 ease-expo",
        hidden ? "opacity-0" : "opacity-100",
      )}
    >
      <defs>
        <linearGradient id="slab-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#c5cbd6" />
          <stop offset="1" stopColor="#8d94a5" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy={FIG.plinthY} rx={FIG.plinthRx} ry={FIG.plinthRy} fill="#c5cbd6" fillOpacity="0.35" />
      <ellipse
        cx="200"
        cy={FIG.plinthY}
        rx={FIG.plinthRx * 0.9}
        ry={FIG.plinthRy * 0.9}
        fill="none"
        stroke="#1248d8"
        strokeOpacity="0.6"
      />
      <line
        x1="200"
        y1={FIG.coreBottom}
        x2="200"
        y2={FIG.coreTop}
        stroke="#1248d8"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {FIG.slabs.map((slab, i) => (
        <g key={i}>
          <polygon points={slab.base} fill="#8d94a5" fillOpacity="0.55" />
          <polygon points={slab.top} fill="url(#slab-face)" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="0.6" />
        </g>
      ))}
    </svg>
  );
}

/**
 * Dedicated 3D area for the hero.
 * The WebGL scene is code-split, mounted only when visible and the browser is
 * idle, paused offscreen, and frozen for reduced-motion users.
 */
export function HeroVisual({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [still, setStill] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onReduceChange = () => setStill(reduce.matches);
    reduce.addEventListener("change", onReduceChange);

    let cancelIdle: (() => void) | undefined;
    const webgl = supportsWebGL();
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && webgl && !cancelIdle) {
          cancelIdle = whenIdle(() => {
            setStill(reduce.matches);
            setMounted(true);
          });
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelIdle?.();
      reduce.removeEventListener("change", onReduceChange);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative isolate aspect-square w-full overflow-hidden rounded-sm border border-line bg-porcelain sm:aspect-[5/4] lg:aspect-[4/5]",
        className,
      )}
    >
      {/* Measurement grid, faded toward the edges */}
      <div
        aria-hidden
        className="bg-grid-fine absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
      />
      <CornerMarks />

      <StaticFigure hidden={ready} />

      {mounted ? (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1200 ease-expo",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <HeroScene active={inView} still={still} onReady={() => setReady(true)} />
        </div>
      ) : null}

      {/* Labels */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-6 flex justify-between text-[0.6875rem] font-medium tracking-[0.16em] text-slate uppercase"
      >
        <span>Samedan</span>
        <span>Engadin · CH</span>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-6 flex justify-between text-[0.6875rem] font-medium tracking-[0.12em] text-slate tabular-nums"
      >
        <span>{site.coordinates.lat}</span>
        <span>{site.coordinates.lng}</span>
      </div>
    </div>
  );
}
