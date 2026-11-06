"use client";

import { useEffect, useRef } from "react";

/** White, Platinum and a light Imperial Blue. */
const COLORS = ["255,255,255", "197,203,214", "138,166,239"];
const SPRITE_SIZE = 32;

type Particle = {
  /** Resting position as a fraction of the hero, and where it rises from. */
  homeX: number;
  homeY: number;
  startX: number;
  /** Seconds before it appears, and how long it takes to reach its resting place. */
  delay: number;
  rise: number;
  size: number;
  sprite: number;
  /** Nearer particles respond more to the pointer. */
  depth: number;
  peak: number;
  rest: number;
  phase: number;
  drift: number;
  /** Fraction of the hero's height climbed per second once settled. */
  climb: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function makeParticle(phone: boolean): Particle {
  const near = Math.random() < 0.12;
  return {
    homeX: Math.random(),
    homeY: Math.random(),
    // They rise from the same place as the opening bars: low and central.
    startX: 0.5 + rand(-1, 1) * (phone ? 0.3 : 0.18),
    delay: rand(0.15, 1.3),
    rise: rand(1.9, 3.3),
    size: near ? rand(5, 9) : rand(1.6, 4),
    sprite: Math.floor(Math.random() * COLORS.length),
    depth: near ? rand(0.7, 1) : rand(0.15, 0.5),
    peak: near ? rand(0.4, 0.6) : rand(0.7, 1),
    rest: near ? rand(0.1, 0.18) : rand(0.22, 0.55),
    phase: rand(0, Math.PI * 2),
    drift: rand(0.12, 0.34),
    climb: rand(0.004, 0.012),
  };
}

function makeSprite(rgb: string) {
  const c = document.createElement("canvas");
  c.width = c.height = SPRITE_SIZE;
  const ctx = c.getContext("2d")!;
  const r = SPRITE_SIZE / 2;
  const g = ctx.createRadialGradient(r, r, 0, r, r, r);
  g.addColorStop(0, `rgba(${rgb},1)`);
  g.addColorStop(0.25, `rgba(${rgb},0.65)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
  return c;
}

const mod = (a: number, b: number) => ((a % b) + b) % b;

/**
 * Fine points of light that rise with the opening, then settle into a slow drift over the photograph.
 * Decorative only: a plain 2D canvas with no dependencies. It stays empty for reduced motion and reduced data, stops
 * when out of view or in a hidden tab, and fades away on scroll (HeroMotion).
 */
export function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const lowData =
      window.matchMedia("(prefers-reduced-data: reduce)").matches ||
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || lowData) return;

    const sprites = COLORS.map(makeSprite);
    const phone = window.innerWidth < 768;
    const count = Math.round(Math.min(80, Math.max(28, window.innerWidth / 18)));
    const particles = Array.from({ length: count }, () => makeParticle(phone));

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Gentle parallax, for mouse users only.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    };
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (finePointer) window.addEventListener("pointermove", onMove, { passive: true });

    let time = 0;
    let last = 0;
    let raf = 0;
    let onscreen = true;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // Long gaps (a slow first paint) must not skip the opening.
      time += Math.min((now - last) / 1000, 0.05);
      last = now;
      // Faded out by the scroll animation: nothing to draw.
      if (canvas.style.visibility === "hidden") return;

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        const local = Math.min((time - p.delay) / p.rise, 1);
        if (local <= 0) continue;
        const eased = 1 - (1 - local) ** 3;

        // The resting place climbs slowly and wraps, fading at the edges so the wrap is never seen.
        const home = mod(p.homeY - time * p.climb, 1.1) - 0.05;
        const swayX = Math.sin(time * p.drift + p.phase) * 14 * eased;
        const swayY = Math.cos(time * p.drift * 0.8 + p.phase) * 10 * eased;
        const x = (p.startX + (p.homeX - p.startX) * eased) * width + swayX - pointer.x * p.depth * 26;
        const y = (1.02 + (home - 1.02) * eased) * height + swayY - pointer.y * p.depth * 18;

        // Brightest on the way up, then calms to a faint twinkle.
        const twinkle = 0.75 + 0.25 * Math.sin(time * 1.1 + p.phase * 3);
        const settled = p.rest * twinkle;
        let alpha = local < 0.4 ? (local / 0.4) * p.peak : p.peak + (settled - p.peak) * ((local - 0.4) / 0.6);
        const edge = Math.min(home + 0.05, 1.05 - home) / 0.08;
        if (local === 1) alpha *= Math.max(0, Math.min(edge, 1));

        ctx.globalAlpha = Math.max(0, alpha);
        const s = p.size * 2;
        ctx.drawImage(sprites[p.sprite], x - s / 2, y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const play = () => {
      cancelAnimationFrame(raf);
      if (!onscreen || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([entry]) => {
      onscreen = entry.isIntersecting;
      play();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", play);
    play();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      data-hero="particles"
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] block h-full w-full"
    />
  );
}
