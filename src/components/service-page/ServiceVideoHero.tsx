"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { ServicePageData } from "@/content/service-pages";
import { HeroBars } from "@/components/motion/HeroBars";

const CHAR_DELAY = 24; // ms between characters
const START = 250; // ms before the first character moves
const SMALL = "(max-width: 900px)";

/**
 * Full-screen video hero (used when `hero.video` is set). The clip plays raw — no overlay.
 *
 * Loading: a responsive poster <img> paints first (no layout shift, no black flash). The video
 * declares 720p/1080p <source>s with preload="none", so nothing is fetched until playback is
 * allowed; it then fades in over the poster once frames are actually playing.
 * Playback: skipped for reduced motion and Save-Data; paused while offscreen or in a hidden tab.
 * Legibility: a soft text shadow and a faint, localised shade behind the copy only.
 */
export function ServiceVideoHero({ data }: { data: ServicePageData }) {
  const video = data.hero.video!;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    const v = videoRef.current;
    const section = sectionRef.current;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const allowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !nav.connection?.saveData;
    if (!v || !section || !allowed) return () => cancelAnimationFrame(id);

    let visible = true;
    const sync = () => {
      if (visible && !document.hidden) v.play().catch(() => undefined);
      else v.pause();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(section);
    document.addEventListener("visibilitychange", sync);
    const onPlaying = () => setPlaying(true);
    v.addEventListener("playing", onPlaying, { once: true });
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      v.removeEventListener("playing", onPlaying);
    };
  }, []);

  // Each line → words → characters with precomputed delays (spaces become non-breaking).
  const lines = video.heading.map((line, li) => {
    const start = video.heading.slice(0, li).reduce((n, l) => n + l.length, 0);
    const words = line.split(" ");
    return words.map((word, wi) => {
      const before = words.slice(0, wi).reduce((n, w) => n + w.length + 1, 0);
      const chars = wi < words.length - 1 ? [...word, " "] : [...word];
      return chars.map((ch, ci) => ({ ch, delay: START + (start + before + ci) * CHAR_DELAY }));
    });
  });

  const fade = (delay: number): CSSProperties => ({ transitionDelay: `${delay}ms`, transitionDuration: "1000ms" });

  return (
    <section
      ref={sectionRef}
      data-hero-dark
      data-tone="dark"
      data-vh=""
      data-in={entered ? "" : undefined}
      aria-labelledby="service-hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-black text-white"
    >
      <HeroBars />
      {/* Poster: first paint, reduced motion, Save-Data and no-JS */}
      {/* eslint-disable-next-line @next/next/no-img-element -- static still in /public with art-directed srcset */}
      <img
        src={video.poster}
        srcSet={`${video.posterSmall} 800w, ${video.poster} 1600w`}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 -z-10 size-full object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
      >
        <source src={video.srcSmall} type="video/mp4" media={SMALL} />
        <source src={video.src} type="video/mp4" />
      </video>
      {/* Localised legibility: a faint shade under the copy only (no full-frame overlay) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-[radial-gradient(70%_80%_at_20%_100%,rgb(0_0_0/0.32),transparent_70%)]"
      />

      <div className="flex flex-1 flex-col justify-end px-6 pt-[calc(var(--header-h)+2rem)] pb-12 [text-shadow:0_1px_18px_rgb(0_0_0/0.28)] md:px-12 lg:px-16 lg:pb-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
          <div>
            <nav aria-label="Breadcrumb" className="vh-fade mb-6 text-sm text-white/85" style={fade(150)}>
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/services" className="transition-colors hover:text-white">
                    Services
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-white">
                  {data.name}
                </li>
              </ol>
            </nav>

            <h1
              id="service-hero-title"
              aria-label={video.heading.join(" ")}
              className="mb-4 font-sans text-4xl font-normal md:text-5xl lg:text-6xl xl:text-7xl"
              style={{ letterSpacing: "-0.04em" }}
            >
              {lines.map((words, li) => (
                <span key={li} aria-hidden className="block">
                  {words.map((chars, wi) => (
                    <span key={wi} className="inline-block whitespace-nowrap">
                      {chars.map(({ ch, delay }, ci) => (
                        <span key={ci} className="vh-char" style={{ transitionDelay: `${delay}ms` }}>
                          {ch}
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="vh-fade mb-5 text-base text-gray-200 md:text-lg" style={fade(950)}>
              {data.hero.subtitle}
            </p>

            <div className="vh-fade flex flex-wrap gap-4 [text-shadow:none]" style={fade(1150)}>
              <Link
                href={data.contact.cta.href}
                className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {data.contact.cta.label}
              </Link>
              <Link
                href={video.secondaryCta.href}
                className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {video.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="vh-fade mt-10 flex items-end justify-start lg:mt-0 lg:justify-end" style={fade(1350)}>
            <p className="liquid-glass rounded-xl border border-white/20 px-6 py-3 text-lg font-light md:text-xl lg:text-2xl">
              {video.tag}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
