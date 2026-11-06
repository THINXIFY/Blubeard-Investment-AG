"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import type { SectorPageData } from "@/content/sectors";
import { SectorIconGlyph } from "./SectorIcons";

/* Design frame: 1280×800, 800 design px = one viewport height (positions are written as N/8 vh). */
const INTRO_TOP = 940;
const ROWS = [
  { top: 1500, offset: 78 }, // introduction paragraphs
  { top: 1790, offset: 88 }, // focus 1–2
  { top: 2080, offset: 78 }, // focus 3–4
  { top: 2370, offset: 88 }, // focus 5–6
];
const CLIMB_SHARE = 0.46; // portion of the clip used while content is on screen
const SMOOTHING = 0.22;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Scroll-scrubbed aerial video hero.
 * A sticky full-viewport video is never played — its currentTime follows scroll position:
 * the camera climbs over the train while the content scrolls up the frame's centre axis, then
 * clouds take over once the last block has left and the page continues out of the cloud.
 * Reduced motion: the poster frame is shown and no scrubbing occurs.
 */
export function SectorScrollHero({ data }: { data: SectorPageData }) {
  const { hero, focus } = data;
  const video = hero.video!;
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);

  // Headline as one word per line, rising up the axis.
  const headlineLines = hero.heading.flatMap((l) => l.split(" "));
  const mutedFrom = hero.heading[0].split(" ").length;

  useEffect(() => {
    const track = trackRef.current;
    const vid = videoRef.current;
    const last = lastRef.current;
    if (!track || !vid || !last) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const small = window.matchMedia("(max-width: 900px)").matches || Boolean(conn?.saveData);

    let end = 1;
    let knee = 0.5;
    let target = 0;
    let cur = 0;
    let frame = 0;
    let visible = true;

    const layout = () => {
      const vh = window.innerHeight;
      const lastBottom = last.offsetTop + last.offsetHeight;
      end = lastBottom + 0.75 * vh;
      knee = lastBottom / end;
      track.style.height = `${end + vh}px`;
    };

    const computeTarget = () => {
      const top = track.getBoundingClientRect().top + window.scrollY;
      const p = clamp((window.scrollY - top) / end);
      const clipP = p < knee ? (p / knee) * CLIMB_SHARE : CLIMB_SHARE + ((p - knee) / (1 - knee)) * (1 - CLIMB_SHARE);
      const duration = Number.isFinite(vid.duration) ? vid.duration : 5.04;
      target = clipP * (duration - 1 / 48);
    };

    const tick = () => {
      frame = 0;
      if (!visible) return;
      computeTarget();
      cur += (target - cur) * SMOOTHING;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      if (!vid.seeking && vid.readyState >= 1 && Math.abs(cur - vid.currentTime) > 1 / 60) {
        vid.currentTime = cur;
      }
      if (Math.abs(target - cur) > 0.0005) frame = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    layout();
    const ro = new ResizeObserver(() => {
      layout();
      kick();
    });
    ro.observe(track.querySelector("[data-fh-content]") as Element);
    window.addEventListener("resize", layout);

    if (reduce) {
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", layout);
      };
    }

    // Load the clip only when motion is allowed; choose the lighter source on small screens / Save-Data.
    vid.src = small ? video.srcSmall : video.src;
    vid.load();
    const prime = () => {
      // Some mobile browsers only paint seeked frames after a play attempt.
      vid
        .play()
        .then(() => vid.pause())
        .catch(() => undefined);
      kick();
    };
    vid.addEventListener("loadedmetadata", prime, { once: true });
    vid.addEventListener("seeked", kick);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(track);
    window.addEventListener("scroll", kick, { passive: true });

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", layout);
      window.removeEventListener("scroll", kick);
      vid.removeEventListener("seeked", kick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [video.src, video.srcSmall]);

  const items = focus.items;
  const rows: { left: { kind: "text" | "focus"; i: number }; right: { kind: "text" | "focus"; i: number } }[] = [
    { left: { kind: "text", i: 0 }, right: { kind: "text", i: 1 } },
    { left: { kind: "focus", i: 0 }, right: { kind: "focus", i: 1 } },
    { left: { kind: "focus", i: 2 }, right: { kind: "focus", i: 3 } },
    { left: { kind: "focus", i: 4 }, right: { kind: "focus", i: 5 } },
  ];

  const renderBlock = (
    cell: { kind: "text" | "focus"; i: number },
    side: "left" | "right",
    row: number,
    isLast: boolean,
  ) => {
    const style = {
      top: `${ROWS[row].top / 8}vh`,
      "--off": `calc(${ROWS[row].offset} * var(--u))`,
    } as CSSProperties;
    const cls = `fh-block fh-${side}${row === 0 && side === "left" ? " fh-first" : ""}`;
    if (cell.kind === "text") {
      const para = hero.intro[cell.i];
      if (!para) return null;
      return (
        <div key={`t${cell.i}`} className={`${cls} fh-text`} style={style}>
          <p className="fh-lead">{para}</p>
        </div>
      );
    }
    const item = items[cell.i];
    if (!item) return null;
    return (
      <div key={item.title} id={`focus-${cell.i + 1}`} ref={isLast ? lastRef : undefined} className={cls} style={style}>
        {item.icon ? <SectorIconGlyph name={item.icon} className="fh-icon" /> : null}
        <h3 className="fh-title">{item.title}</h3>
        <p className="fh-body">{item.text}</p>
      </div>
    );
  };

  return (
    <section
      data-hero-dark
      data-tone="dark"
      aria-labelledby="sector-hero-title"
      className="relative bg-[#0a0b0c] text-white"
    >
      <div ref={trackRef} className="fh-track">
        <div className="fh-scene" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element -- poster is the LCP still; video is scrubbed above it */}
          <img src={video.poster} alt="" className="fh-poster" fetchPriority="high" decoding="async" />
          <video ref={videoRef} poster={video.poster} muted playsInline preload="auto" tabIndex={-1} />
          <div className="fh-tint" />
        </div>

        <div className="fh-content" data-fh-content>
          <div className="fh-intro" style={{ top: `${INTRO_TOP / 8}vh` }}>
            <nav aria-label="Breadcrumb" className="fh-crumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/investments">Investments</Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page">{data.name}</li>
              </ol>
            </nav>
            <p className="fh-eyebrow">{hero.eyebrow}</p>
            <h1 id="sector-hero-title" className="fh-headline">
              {headlineLines.map((w, i) => (
                <span key={`${w}-${i}`} className={i >= mutedFrom ? "fh-muted" : undefined}>
                  {w}
                </span>
              ))}
            </h1>
          </div>

          {rows.map((r, row) => [
            renderBlock(r.left, "left", row, false),
            renderBlock(r.right, "right", row, row === rows.length - 1),
          ])}
        </div>
      </div>

      {/* Cloud hand-off into the light page */}
      <div aria-hidden className="fh-handoff" />
    </section>
  );
}
