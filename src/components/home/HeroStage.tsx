"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { hero, industries } from "@/content/home";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "@/components/ui/Icons";

/** Must match `.hero-stage-grid` in globals.css and the stage condition in HeroMotion. */
export const STAGE_MEDIA = "(min-width: 768px) and (min-height: 640px)";

const photoOf = (ind: (typeof industries)[number]) => images[ind.cardImage ?? ind.image];

/**
 * Scroll stage: twelve sector tiles around a central window, into which the hero film shrinks (HeroMotion drives
 * the movement). Tiles are links to their sector pages, hidden from pointer and keyboard until they have arrived.
 * Hovering or focusing one previews that sector in the window and quiets the others. Touch simply follows the link.
 * Photographs load only after the page has loaded, or on first scroll.
 */
export function HeroStage() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia(`${STAGE_MEDIA} and (prefers-reduced-motion: no-preference)`).matches) return;
    const lowData =
      window.matchMedia("(prefers-reduced-data: reduce)").matches ||
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    let timer: number;
    const go = () => setReady(true);
    const onLoad = () => {
      if (!lowData) timer = window.setTimeout(go, 800);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    window.addEventListener("scroll", go, { once: true, passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("scroll", go);
    };
  }, []);

  // Scrolling moves tiles out from under a resting pointer, so a mouse preview ends. Keyboard focus keeps its preview.
  useEffect(() => {
    if (!active) return;
    const clear = () => {
      if (!root.current?.contains(document.activeElement)) setActive(null);
    };
    window.addEventListener("scroll", clear, { once: true, passive: true });
    return () => window.removeEventListener("scroll", clear);
  }, [active]);

  const current = industries.find((i) => i.id === active);

  const tile = (ind: (typeof industries)[number]) => {
    const on = ind.id === active;
    return (
      <div key={ind.id} data-hero="tile" className="pointer-events-auto relative will-change-transform">
        <Link
          href={`/investments/${ind.id}`}
          data-on={on || undefined}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") setActive(ind.id);
          }}
          onFocus={() => setActive(ind.id)}
          onBlur={() => setActive(null)}
          className={cn(
            "group/tile absolute inset-0 block overflow-hidden rounded-md bg-surface-dark text-white transition-[filter] duration-500",
            "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white",
            active && !on && "brightness-[0.5] saturate-[0.6]",
          )}
        >
          {ready ? (
            <Image
              src={photoOf(ind).src}
              alt=""
              fill
              sizes="22vw"
              placeholder="blur"
              className={cn(
                "object-cover transition-[filter,scale] duration-700 ease-expo",
                on ? "scale-105 filter-none" : "hero-grade",
              )}
            />
          ) : null}
          <span
            aria-hidden
            className={cn("absolute inset-0 bg-imperial/12 transition-opacity duration-700", on && "opacity-0")}
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(16_19_32/0.82),transparent_55%)]"
          />
          <span className="absolute inset-x-3 bottom-2.5 flex items-end justify-between gap-2 font-display text-[0.75rem] leading-tight font-medium tracking-[-0.005em] lg:inset-x-4 lg:bottom-3.5 lg:text-[0.9375rem]">
            {ind.title}
            <ArrowRightIcon
              aria-hidden
              className={cn(
                "size-3.5 shrink-0 transition-[opacity,translate] duration-500 ease-expo",
                on ? "translate-x-0 opacity-100" : "-translate-x-1.5 opacity-0",
              )}
            />
          </span>
          <span className="sr-only">: {ind.description}</span>
        </Link>
      </div>
    );
  };

  return (
    <div
      ref={root}
      data-hero="grid"
      data-animate=""
      onPointerLeave={() => setActive(null)}
      className="hero-stage-grid pointer-events-none absolute inset-x-4 top-[calc(var(--header-h)+0.75rem)] bottom-4 z-20 grid-cols-5 grid-rows-3 gap-2.5 lg:inset-x-6 lg:gap-3"
    >
      {industries.slice(0, 6).map(tile)}
      <div
        data-hero="window"
        className="relative col-span-3 flex items-center justify-center overflow-hidden rounded-[8px] px-6 text-center"
      >
        {current ? (
          <div key={current.id} aria-hidden className="hero-preview absolute inset-0 bg-obsidian text-white">
            <Image
              src={photoOf(current).src}
              alt=""
              fill
              sizes="60vw"
              placeholder="blur"
              className="object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(16_19_32/0.9),rgb(16_19_32/0.35))]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
              <p className="font-display text-[clamp(1.5rem,1rem+1.7vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.03em]">
                {current.title}
              </p>
              <span className="mt-3 block h-px w-10 bg-imperial-300" />
              <p className="mt-3 max-w-[46ch] text-[0.8125rem] leading-relaxed text-platinum lg:text-[0.9375rem]">
                {current.description}
              </p>
            </div>
          </div>
        ) : null}
        <p
          className={cn(
            "relative font-display text-[clamp(1.75rem,0.9rem+2.6vw,3.25rem)] leading-[1.06] font-medium tracking-[-0.035em] text-white",
            current && "invisible",
          )}
        >
          {hero.industriesLine.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.1em]">
              <span data-hero="word" className={i > 0 ? "block text-platinum" : "block"}>
                {line}
                {i === 0 ? " " : null}
              </span>
            </span>
          ))}
        </p>
      </div>
      {industries.slice(6).map(tile)}
    </div>
  );
}
