"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const LaserFlow = dynamic(() => import("@/components/motion/LaserFlow"), { ssr: false });

/** Runs the beam through clear space: between the columns on desktop, past the text on smaller screens. */
const beamFor = (width: number) => (width >= 1024 ? 0.54 : 0.93);

/**
 * Decorative laser behind the footer at 40% visibility. It sits apart from the footer's content, which is fully
 * server-rendered, so the footer looks complete if WebGL is unavailable. The code loads only as the footer nears the
 * screen, and rendering stops whenever it is out of view.
 */
export function FooterLaser() {
  const root = useRef<HTMLDivElement>(null);
  const [beam, setBeam] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBeam(beamFor(window.innerWidth));
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    const onResize = () => setBeam((b) => (b === null ? b : beamFor(window.innerWidth)));
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-40">
      {beam !== null ? (
        <LaserFlow
          beamPosition={beam}
          color="#3847ff"
          intensity={1.8}
          flare={1.5}
          spread={1.5}
          spill={1}
          fog={0.2}
          dust={1.6}
          dots={1.3}
          speed={1.55}
          dpr={1.5}
        />
      ) : null}
    </div>
  );
}
