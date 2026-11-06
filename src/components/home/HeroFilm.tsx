"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { images, type ImageKey } from "@/content/images";
import { cn } from "@/lib/cn";

/** Time each shot holds before dissolving; matches the CSS camera and dissolve timing (.hero-shot). */
const HOLD_MS = 7000;
const FADE_MS = 1800;
const TICK_MS = 250;

type Shot = {
  /** Registry image. Omitted for the opening shot, which is server-rendered as `children`. */
  image?: ImageKey;
  /** Camera move: start and end position (x, y) and scale. */
  from: [string, string, number];
  to: [string, string, number];
  /** Focal point of the crop. */
  position?: string;
  /** Lighter sequence on phones. */
  mobile: boolean;
};

const SHOTS: Shot[] = [
  { from: ["0%", "0%", 1], to: ["0%", "-1.5%", 1.08], mobile: true },
  { image: "heroTowers", from: ["0%", "2.5%", 1.14], to: ["0%", "-2.5%", 1.14], position: "40% 45%", mobile: true },
  { image: "heroBoardroom", from: ["0%", "0%", 1.14], to: ["0%", "1%", 1.04], position: "50% 50%", mobile: true },
  { image: "heroHandshake", from: ["2.5%", "0%", 1.12], to: ["-2.5%", "0%", 1.12], position: "50% 30%", mobile: false },
];

const cameraVars = ({ from, to }: Shot) =>
  ({
    "--x0": from[0],
    "--y0": from[1],
    "--s0": from[2],
    "--x1": to[0],
    "--y1": to[1],
    "--s1": to[2],
  }) as CSSProperties;

/**
 * Cinematic photographic film: licensed stills with slow camera moves and long dissolves.
 * - The opening shot is server-rendered (`children`) and paints immediately as the LCP image.
 * - Later shots load one at a time, only after the page has loaded, and never cut to an undecoded image.
 * - Stays on the opening shot for reduced motion and reduced data, and pauses offscreen or in a hidden tab.
 */
export function HeroFilm({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [shots, setShots] = useState<Shot[] | null>(null);
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(1);
  const [paused, setPaused] = useState(false);

  // Decide whether the film runs at all, only once the page has finished loading.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowData =
      window.matchMedia("(prefers-reduced-data: reduce)").matches ||
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reduced || lowData) return;

    let timer: number;
    const start = () => {
      timer = window.setTimeout(() => {
        const phone = window.matchMedia("(max-width: 767px)").matches;
        setShots(phone ? SHOTS.filter((s) => s.mobile) : SHOTS);
        setLoaded(2);
      }, 1200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", start);
    };
  }, []);

  // Pause when the film cannot be seen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let offscreen = false;
    const update = () => setPaused(offscreen || document.hidden);
    const io = new IntersectionObserver(([entry]) => {
      offscreen = !entry.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // Advance the sequence on visible time only.
  useEffect(() => {
    if (!shots || paused) return;
    let waited = 0;
    let advancing = false;
    const id = window.setInterval(() => {
      waited += TICK_MS;
      if (waited < HOLD_MS || advancing) return;
      advancing = true;
      const next = (active + 1) % shots.length;
      const img = root.current?.querySelector<HTMLImageElement>(`[data-shot="${next}"] img`);
      const decoded = img ? img.decode().catch(() => undefined) : Promise.resolve();
      void decoded.then(() => {
        setLeaving(active);
        setActive(next);
        setLoaded((n) => Math.min(shots.length, Math.max(n, next + 2)));
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [shots, paused, active]);

  // Stop the outgoing shot's camera once it has fully dissolved.
  useEffect(() => {
    if (leaving === null) return;
    const id = window.setTimeout(() => setLeaving(null), FADE_MS + 100);
    return () => window.clearTimeout(id);
  }, [leaving]);

  const list = shots ?? SHOTS.slice(0, 1);

  return (
    <div ref={root} data-paused={paused || undefined} className="absolute inset-0">
      {list.map((shot, i) => {
        if (i >= loaded && i !== active) return null;
        const img = shot.image ? images[shot.image] : null;
        const on = i === active;
        return (
          <div
            key={shot.image ?? "opening"}
            data-shot={i}
            data-on={on || undefined}
            data-run={(shots && (on || i === leaving)) || undefined}
            className={cn("hero-shot")}
            style={cameraVars(shot)}
          >
            <div className="hero-shot-camera">
              {img ? (
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="100vw"
                  loading="eager"
                  className="object-cover"
                  style={{ objectPosition: shot.position }}
                />
              ) : (
                children
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
