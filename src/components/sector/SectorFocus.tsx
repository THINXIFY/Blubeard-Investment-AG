"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SectorPageData } from "@/content/sectors";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Areas of focus — editorial carousel. Large image-led cards in alternating widths sit on a native
 * snap-scrolling track (touch, trackpad, keyboard). Prev/next controls and a progress rail; each card
 * carries an anchor (#focus-n) used by the hero and overview indexes.
 */
export function SectorFocus({ data }: { data: SectorPageData }) {
  const { focus } = data;
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const frame = requestAnimationFrame(measure);
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    const amount = (card?.offsetWidth ?? el.clientWidth * 0.8) + 20;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * amount, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      id="focus"
      data-tone="light"
      aria-labelledby="sector-focus-title"
      className="overflow-hidden bg-porcelain py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Eyebrow>{focus.eyebrow}</Eyebrow>
            <h2 id="sector-focus-title" className="mt-6 max-w-[20ch] text-heading-lg">
              {focus.heading}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate">
              Areas of investment interest — not a list of holdings or transactions.
            </p>
          </Reveal>
          <Reveal className="flex items-center gap-3" delay={0.1}>
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={edges.start}
              aria-label="Previous focus areas"
              aria-controls="focus-track"
              className="grid size-12 place-items-center rounded-full border border-line-strong bg-white text-ink transition-[background-color,border-color,color,opacity] duration-300 hover:border-obsidian hover:bg-obsidian hover:text-white disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowRightIcon className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={edges.end}
              aria-label="Next focus areas"
              aria-controls="focus-track"
              className="grid size-12 place-items-center rounded-full border border-line-strong bg-white text-ink transition-[background-color,border-color,color,opacity] duration-300 hover:border-obsidian hover:bg-obsidian hover:text-white disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowRightIcon className="size-4" />
            </button>
          </Reveal>
        </div>
      </Container>

      {/* Track — aligned to the container's left edge, bleeding off the right */}
      <Reveal className="mt-10 lg:mt-12" y={40}>
        <ul
          ref={track}
          id="focus-track"
          tabIndex={0}
          aria-label={`${focus.heading} — ${focus.items.length} areas`}
          className="flex snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] gap-4 overflow-x-auto px-5 pb-2 focus-visible:outline-offset-[-4px] sm:scroll-px-8 sm:px-8 lg:scroll-px-[max(3rem,calc((100vw-86rem)/2+3rem))] lg:gap-5 lg:px-[max(3rem,calc((100vw-86rem)/2+3rem))] [&::-webkit-scrollbar]:hidden"
        >
          {focus.items.map((item, i) => {
            const img = images[item.image];
            const wide = i % 2 === 0;
            return (
              <li
                key={item.title}
                id={`focus-${i + 1}`}
                className={cn(
                  "w-[84vw] shrink-0 snap-start scroll-mt-28 sm:w-[60vw]",
                  wide ? "lg:w-[40rem]" : "lg:w-[28rem]",
                )}
              >
                <article
                  tabIndex={-1}
                  className="group/f relative isolate flex h-[28rem] flex-col justify-end overflow-hidden rounded-md bg-obsidian text-white lg:h-[34rem]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={wide ? "(min-width: 1024px) 40rem, 84vw" : "(min-width: 1024px) 28rem, 84vw"}
                    placeholder="blur"
                    className="-z-10 object-cover transition-transform duration-1200 ease-expo group-hover/f:scale-[1.06]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian/92 via-obsidian/25 to-obsidian/10"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(18_72_216/0.4),transparent_55%)] opacity-0 transition-opacity duration-700 ease-expo group-hover/f:opacity-100"
                  />

                  <div className="absolute inset-x-6 top-6 flex items-center justify-between">
                    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.6875rem] font-medium tracking-[0.08em] uppercase backdrop-blur-md">
                      {data.name}
                    </span>
                    <span aria-hidden className="font-display text-sm font-semibold text-white/70 tabular-nums">
                      {num(i)} / {num(focus.items.length - 1)}
                    </span>
                  </div>

                  <div className="p-6 lg:p-8">
                    <span
                      aria-hidden
                      className="block h-px w-10 bg-imperial-300 transition-[width] duration-700 ease-expo group-hover/f:w-24"
                    />
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.025em] lg:text-[1.75rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[40ch] leading-relaxed text-platinum transition-transform duration-700 ease-expo group-hover/f:-translate-y-0.5">
                      {item.text}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
          {/* trailing spacer so the last card can snap to the start */}
          <li aria-hidden className="w-px shrink-0" />
        </ul>
      </Reveal>

      <Container>
        <div className="mt-8 flex items-center gap-6">
          <div aria-hidden className="relative h-px flex-1 bg-line-strong">
            <span
              className="absolute inset-y-0 left-0 bg-imperial transition-[width] duration-300 ease-out"
              style={{ width: `${Math.max(8, progress * 100)}%` }}
            />
          </div>
          <span aria-hidden className="text-xs text-slate tabular-nums">
            {num(focus.items.length - 1)} areas
          </span>
        </div>
      </Container>
    </section>
  );
}
