"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Flip } from "gsap/Flip";
import { investmentsPage, sectors, industryCategories, type Sector } from "@/content/investments";
import type { IndustryCategoryId } from "@/content/home";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { ensureGsap, gsap, motion, ScrollTrigger } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";

ensureGsap();
if (typeof window !== "undefined") gsap.registerPlugin(Flip);

type Filter = "all" | IndustryCategoryId;

const categoryLabel = Object.fromEntries(industryCategories.map((c) => [c.id, c.label])) as Record<
  IndustryCategoryId,
  string
>;

const filters: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: investmentsPage.directory.allLabel, count: sectors.length },
  ...industryCategories.map((c) => ({
    id: c.id,
    label: c.label,
    count: sectors.filter((s) => s.category === c.id).length,
  })),
];

/**
 * Art-directed row layout on the 12-column grid: wide pairs (7/5, 5/7) alternate with even triples.
 * The tail adapts so any filtered count fills complete rows.
 */
function layoutSpans(n: number): number[] {
  const spans: number[] = [];
  let pairFlip = false;
  let usePair = true;
  let left = n;
  while (left > 0) {
    if (left === 1) {
      spans.push(12);
      left = 0;
    } else if (left === 2 || left === 4 || (usePair && left !== 3)) {
      spans.push(...(pairFlip ? [5, 7] : [7, 5]));
      pairFlip = !pairFlip;
      left -= 2;
      usePair = false;
    } else {
      spans.push(4, 4, 4);
      left -= 3;
      usePair = true;
    }
  }
  return spans;
}

const spanClass: Record<number, string> = {
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  7: "lg:col-span-7",
  12: "lg:col-span-12",
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function SectorCard({ sector, index, span }: { sector: Sector; index: number; span: number }) {
  const img = images[sector.image];
  const inner = (
    <>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={
          span >= 7
            ? "(min-width: 1024px) 58vw, (min-width: 640px) 50vw, 100vw"
            : "(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
        }
        placeholder="blur"
        className="object-cover transition-transform duration-1200 ease-expo group-hover/card:translate-x-[-1.5%] group-hover/card:scale-[1.07]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/25 to-obsidian/5 transition-opacity duration-700 ease-expo"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgb(18_72_216/0.35),transparent_55%)] opacity-0 transition-opacity duration-700 ease-expo group-hover/card:opacity-100"
      />

      <div className="absolute inset-x-5 top-5 flex items-start justify-between sm:inset-x-6 sm:top-6">
        <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.6875rem] font-medium tracking-[0.08em] text-white uppercase backdrop-blur-md">
          {categoryLabel[sector.category]}
        </span>
        <span aria-hidden className="font-display text-sm font-semibold text-white/70 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 sm:inset-x-6 sm:bottom-6">
        <div className="transition-transform duration-700 ease-expo group-hover/card:-translate-y-1">
          <h3
            id={`sector-${sector.id}`}
            className="font-display text-xl leading-tight font-semibold tracking-[-0.02em] text-white sm:text-2xl"
          >
            {sector.title}
          </h3>
          <p className="mt-2 max-w-[42ch] text-[0.9375rem] leading-relaxed text-platinum">{sector.description}</p>
        </div>
        <span
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/30 text-white transition-[background-color,border-color,color,transform] duration-700 ease-expo group-hover/card:border-white group-hover/card:bg-white group-hover/card:text-ink"
        >
          <ArrowRightIcon className="size-4 -rotate-45 transition-transform duration-700 ease-expo group-hover/card:rotate-0" />
        </span>
      </div>
    </>
  );

  const shell =
    "group/card relative block h-full overflow-hidden rounded-md bg-obsidian focus-visible:outline-offset-4";

  // Dedicated sector pages arrive in IP-02B; until then cards are not links (no broken routes).
  return sector.available ? (
    <Link href={sector.href} aria-labelledby={`sector-${sector.id}`} className={shell}>
      {inner}
    </Link>
  ) : (
    <article aria-labelledby={`sector-${sector.id}`} className={shell}>
      {inner}
    </article>
  );
}

/** Signature investment universe — filterable, art-directed photographic directory. */
export function SectorDirectory() {
  const { directory } = investmentsPage;
  const [filter, setFilter] = useState<Filter>("all");
  const gridRef = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const activeFlip = useRef<gsap.core.Timeline | null>(null);

  const visible = useMemo(() => sectors.filter((s) => filter === "all" || s.category === filter), [filter]);
  const spans = useMemo(() => layoutSpans(visible.length), [visible.length]);
  const spanById = useMemo(() => Object.fromEntries(visible.map((s, i) => [s.id, spans[i]])), [visible, spans]);

  const select = (id: Filter) => {
    if (id === filter) return;
    activeFlip.current?.progress(1);
    if (!prefersReducedMotion() && gridRef.current) {
      flipState.current = Flip.getState(gridRef.current.querySelectorAll("[data-card]"));
    }
    setFilter(id);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    activeFlip.current = Flip.from(state, {
      duration: motion.duration.base,
      ease: motion.ease.inOut,
      absolute: true,
      stagger: 0.02,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: motion.duration.slow,
            ease: motion.ease.out,
            stagger: 0.05,
            delay: 0.1,
            clearProps: "transform",
          },
        ),
      onLeave: (els) =>
        gsap.to(els, { autoAlpha: 0, scale: 0.97, duration: motion.duration.fast, ease: motion.ease.soft }),
      onComplete: () => {
        activeFlip.current = null;
        ScrollTrigger.refresh();
      },
    });
  }, [filter]);

  useLayoutEffect(() => () => void activeFlip.current?.kill(), []);

  const activeLabel = filters.find((f) => f.id === filter)?.label ?? "";

  return (
    <section
      id="sectors"
      data-tone="light"
      aria-labelledby="sectors-title"
      className="bg-porcelain py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-6">
            <Eyebrow>{directory.eyebrow}</Eyebrow>
            <h2 id="sectors-title" className="mt-6 text-heading-lg">
              {directory.heading}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="leading-relaxed text-slate">{directory.description}</p>
          </Reveal>
        </div>

        {/* Filter navigation */}
        <Reveal className="sticky top-[calc(var(--header-h)-1px)] z-20 -mx-5 mt-10 bg-porcelain/90 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="group"
              aria-label="Filter sectors by category"
              className="-mx-5 flex [scrollbar-width:none] gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {filters.map((f) => {
                const active = f.id === filter;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => select(f.id)}
                    className={cn(
                      "inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full border px-4 text-sm font-medium transition-[color,background-color,border-color,box-shadow] duration-300 ease-expo",
                      active
                        ? "border-obsidian bg-obsidian text-white shadow-[0_12px_30px_-16px_rgb(16_19_32/0.7)]"
                        : "border-line-strong bg-white text-slate hover:border-obsidian hover:text-ink",
                    )}
                  >
                    {f.label}
                    <span
                      aria-hidden
                      className={cn("text-xs tabular-nums", active ? "text-imperial-300" : "text-slate/70")}
                    >
                      {String(f.count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
            <p aria-live="polite" className="hidden shrink-0 text-sm text-slate tabular-nums lg:block">
              Showing <span className="font-medium text-ink">{visible.length}</span> of {sectors.length} sectors
            </p>
            <p aria-live="polite" className="sr-only lg:hidden">
              Showing {visible.length} of {sectors.length} sectors{filter === "all" ? "" : ` in ${activeLabel}`}
            </p>
          </div>
        </Reveal>

        {/* Directory grid */}
        <Reveal className="mt-6 lg:mt-8" y={40}>
          <ul ref={gridRef} className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
            {sectors.map((s, i) => {
              const shown = s.id in spanById;
              const span = spanById[s.id] ?? 4;
              return (
                <li
                  key={s.id}
                  data-card
                  data-flip-id={s.id}
                  hidden={!shown}
                  className={cn("h-[21rem] sm:h-[22rem] lg:h-[25rem]", span === 12 && "sm:col-span-2", spanClass[span])}
                >
                  <SectorCard sector={s} index={i} span={span} />
                </li>
              );
            })}
          </ul>
        </Reveal>

        <p className="mt-8 text-xs leading-relaxed text-slate">{directory.note}</p>
      </Container>
    </section>
  );
}
