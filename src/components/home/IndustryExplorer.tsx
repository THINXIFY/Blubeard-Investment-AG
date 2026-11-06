"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { Flip } from "gsap/Flip";
import { industries, industryCategories, investments, type IndustryCategoryId } from "@/content/home";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { ensureGsap, gsap, motion, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/motion";

ensureGsap();
if (typeof window !== "undefined") gsap.registerPlugin(Flip);

type Filter = "all" | IndustryCategoryId;

const categoryLabel = Object.fromEntries(industryCategories.map((c) => [c.id, c.label])) as Record<
  IndustryCategoryId,
  string
>;

const filters: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: investments.allLabel, count: industries.length },
  ...industryCategories.map((c) => ({
    id: c.id,
    label: c.label,
    count: industries.filter((i) => i.category === c.id).length,
  })),
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Filterable grid of the twelve investment industries. */
export function IndustryExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const activeFlip = useRef<gsap.core.Timeline | null>(null);
  const entrance = useRef<ScrollTrigger[]>([]);

  // First entrance: cards rise in rows as the grid scrolls into view.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set("[data-card]", { autoAlpha: 0, y: motion.distance });
        entrance.current = ScrollTrigger.batch("[data-card]", {
          start: motion.revealStart,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: motion.duration.slow,
              ease: motion.ease.out,
              stagger: motion.stagger,
              clearProps: "transform,opacity,visibility",
            }),
        });
      });
      return () => mm.revert();
    },
    { scope: gridRef },
  );

  const select = (id: Filter) => {
    if (id === filter) return;
    // Finish any in-flight transition so the captured layout is final (rapid clicks stay stable).
    activeFlip.current?.progress(1);
    // Cards still waiting for their scroll entrance must be visible before filtering, otherwise a
    // card that moves into view keeps its pre-entrance (hidden) state.
    if (entrance.current.length && gridRef.current) {
      entrance.current.forEach((t) => t.kill());
      entrance.current = [];
      const cards = gridRef.current.querySelectorAll("[data-card]");
      gsap.killTweensOf(cards);
      gsap.set(cards, { clearProps: "transform,opacity,visibility" });
    }
    if (!prefersReducedMotion() && gridRef.current) {
      flipState.current = Flip.getState(gridRef.current.querySelectorAll("[data-card]"));
    }
    setFilter(id);
  };

  // Animate from the captured layout to the new one after React commits the filter.
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) {
      ScrollTrigger.refresh();
      return;
    }
    flipState.current = null;
    activeFlip.current = Flip.from(state, {
      duration: motion.duration.base,
      ease: motion.ease.inOut,
      absolute: true,
      stagger: 0.015,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { autoAlpha: 0, y: 24, clipPath: "inset(12% 0% 0% 0%)" },
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: motion.duration.slow,
            ease: motion.ease.out,
            stagger: 0.05,
            delay: 0.12,
            clearProps: "clipPath,transform",
          },
        ),
      onLeave: (els) =>
        gsap.to(els, { autoAlpha: 0, scale: 0.97, duration: motion.duration.fast, ease: motion.ease.soft }),
      onComplete: () => {
        activeFlip.current = null;
        // Page height changed — keep every later ScrollTrigger in sync.
        ScrollTrigger.refresh();
      },
    });
  }, [filter]);

  // Kill only on unmount.
  useLayoutEffect(() => () => void activeFlip.current?.kill(), []);

  const visibleCount = filter === "all" ? industries.length : industries.filter((i) => i.category === filter).length;
  const activeLabel = filters.find((f) => f.id === filter)?.label ?? "";

  return (
    <div ref={rootRef}>
      <div className="flex flex-col gap-6 border-y border-line py-6 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter industries by sector"
          className="-mx-5 flex min-w-0 flex-1 [scrollbar-width:none] gap-2 overflow-x-auto [mask-image:linear-gradient(to_right,black_82%,transparent)] px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:[mask-image:none] sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
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
                  "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-[color,background-color,border-color] duration-300 ease-expo",
                  active
                    ? "border-obsidian bg-obsidian text-white"
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
        <p aria-live="polite" className="shrink-0 text-sm whitespace-nowrap text-slate tabular-nums">
          Showing <span className="font-medium text-ink">{visibleCount}</span> of {industries.length} industries
          <span className="sr-only">{filter === "all" ? "" : ` in ${activeLabel}`}</span>
        </p>
      </div>

      <ul
        ref={gridRef}
        className="relative mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3 lg:gap-y-16"
      >
        {industries.map((industry, i) => {
          const visible = filter === "all" || industry.category === filter;
          const img = images[industry.image];
          return (
            <li
              key={industry.id}
              data-card
              data-flip-id={industry.id}
              className={cn(!visible && "hidden")}
              aria-hidden={!visible || undefined}
            >
              <article className="group/card flex h-full flex-col" aria-labelledby={`industry-${industry.id}`}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-porcelain sm:aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                    placeholder="blur"
                    className="object-cover transition-[transform,filter] duration-1200 ease-expo group-hover/card:scale-[1.05] group-hover/card:brightness-[1.04] group-hover/card:saturate-[1.06]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-obsidian/35 via-transparent to-transparent opacity-60 transition-opacity duration-700 ease-expo group-hover/card:opacity-100"
                  />
                  {/* Inset frame that draws in on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[2px] border border-white/0 transition-[inset,border-color] duration-700 ease-expo group-hover/card:inset-3 group-hover/card:border-white/55"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[0.6875rem] font-medium tracking-[0.08em] text-ink uppercase backdrop-blur transition-[background-color,color,transform] duration-700 ease-expo group-hover/card:translate-x-2 group-hover/card:translate-y-2 group-hover/card:bg-imperial group-hover/card:text-white">
                    {categoryLabel[industry.category]}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-imperial transition-transform duration-700 ease-expo group-hover/card:scale-x-100"
                  />
                </div>
                <div className="flex flex-1 flex-col pt-6">
                  <span aria-hidden className="text-xs font-medium text-imperial tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    id={`industry-${industry.id}`}
                    className="mt-3 text-heading transition-colors duration-700 group-hover/card:text-imperial"
                  >
                    {industry.title}
                  </h3>
                  <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-relaxed text-slate transition-colors duration-300 group-hover/card:text-ink/80">
                    {industry.description}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
