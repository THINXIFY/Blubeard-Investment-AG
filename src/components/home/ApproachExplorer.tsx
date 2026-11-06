"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Image from "next/image";
import { approach } from "@/content/home";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { PhotoNote } from "@/components/ui/PhotoNote";

const num = (i: number) => String(i + 1).padStart(2, "0");
const stages = approach.stages;
const total = stages.length;

/**
 * Four-stage process selector.
 *  - A horizontal rail (tabs) with a sliding Imperial marker; the active stage drives a text panel and a photograph.
 *  - Hover (fine pointers, short intent delay), click/tap, arrow keys (roving tabindex), the step buttons and
 *    horizontal swipe all change the stage. Nothing relies on hover.
 *  - Server-rendered with stage 1 active; without JavaScript the <noscript> rule shows every stage's text.
 */
export function ApproachExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverTimer = useRef<number | undefined>(undefined);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const go = (i: number, focus = false) => {
    const next = (i + total) % total;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: total - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    go(keys[e.key], true);
  };

  const onTouchStart = (e: TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const s = touch.current;
    touch.current = null;
    if (!s) return;
    const dx = e.changedTouches[0].clientX - s.x;
    const dy = e.changedTouches[0].clientY - s.y;
    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.4) go(active + (dx < 0 ? 1 : -1));
  };

  return (
    <div>
      <noscript>
        <style>{`[data-stage-panel]{display:block!important;margin-bottom:2rem}[data-stage-ui]{display:none!important}`}</style>
      </noscript>

      {/* Rail */}
      <div
        role="tablist"
        aria-label="Investment process stages"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="relative grid grid-cols-4"
      >
        {/* Track, progress and sliding marker */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line-strong" />
        <span
          aria-hidden
          className="absolute top-0 left-0 h-px w-full origin-left bg-imperial transition-transform duration-700 ease-expo motion-reduce:transition-none"
          style={{ transform: `scaleX(${active / total})` }}
        />
        <span
          aria-hidden
          className="absolute top-[-1px] left-0 h-[3px] w-1/4 bg-imperial transition-transform duration-700 ease-expo motion-reduce:transition-none"
          style={{ transform: `translateX(${active * 100}%)` }}
        />

        {stages.map((stage, i) => {
          const on = i === active;
          return (
            <button
              key={stage.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`stage-tab-${i}`}
              aria-selected={on}
              aria-controls={`stage-panel-${i}`}
              tabIndex={on ? 0 : -1}
              data-stage-ui
              onClick={() => go(i)}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                window.clearTimeout(hoverTimer.current);
                hoverTimer.current = window.setTimeout(() => setActive(i), 110);
              }}
              onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
              className={cn(
                "group/tab relative flex min-h-14 cursor-pointer flex-col items-center justify-center px-1 pt-1 text-center md:min-h-[5.75rem] md:items-start md:justify-start md:px-0 md:pt-6 md:pr-5 md:text-left",
                "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-imperial",
              )}
            >
              <span
                className={cn(
                  "font-display text-sm font-semibold tabular-nums transition-colors duration-500 md:text-xs md:tracking-[0.12em]",
                  on ? "text-imperial" : "text-slate group-hover/tab:text-ink",
                )}
              >
                {num(i)}
              </span>
              <span
                className={cn(
                  "sr-only md:not-sr-only md:mt-2 md:block md:font-display md:text-[1.0625rem] md:leading-[1.25] md:font-semibold md:tracking-[-0.015em] lg:text-lg",
                  "transition-colors duration-500",
                  on ? "text-ink" : "text-slate group-hover/tab:text-ink",
                )}
              >
                {stage.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stage */}
      <div
        className="mt-6 grid gap-7 md:mt-8 md:grid-cols-12 md:gap-8 lg:gap-12"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Contextual photograph */}
        <div
          data-stage-ui
          aria-hidden
          className="relative aspect-[16/11] overflow-hidden rounded-sm bg-obsidian md:order-2 md:col-span-7 md:aspect-auto md:min-h-[22rem] lg:min-h-[26rem]"
        >
          {stages.map((stage, i) => {
            const img = images[stage.image];
            const on = i === active;
            return (
              <Image
                key={stage.title}
                src={img.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                placeholder="blur"
                className={cn(
                  "object-cover transition-[opacity,transform] duration-[1100ms] ease-expo motion-reduce:transition-none",
                  on ? "scale-100 opacity-100" : "scale-[1.07] opacity-0",
                )}
              />
            );
          })}
          <span
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(16_19_32/0.55),transparent_45%),linear-gradient(to_bottom,rgb(16_19_32/0.28),transparent_30%)]"
          />
          <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[0.6875rem] font-medium tracking-[0.14em] text-ink uppercase backdrop-blur">
            <span className="text-imperial tabular-nums">{num(active)}</span>
            <span aria-hidden className="h-px w-3 bg-line-strong" />
            <span className="tabular-nums">{num(total - 1)}</span>
          </span>
          <PhotoNote image={images[stages[active].image]} className="right-auto bottom-3 left-4 text-left" />
          <span aria-hidden className="absolute right-4 bottom-4 size-4 border-r border-b border-white/70" />
          <span aria-hidden className="absolute top-4 right-4 size-4 border-t border-r border-white/70" />
        </div>

        {/* Text */}
        <div className="flex flex-col md:order-1 md:col-span-5 md:justify-between md:py-2">
          <div>
            <p
              aria-hidden
              data-stage-ui
              className="hidden font-display text-[6.5rem] leading-none font-medium tracking-[-0.06em] text-transparent tabular-nums [-webkit-text-stroke:1px_var(--color-line-strong)] lg:block"
            >
              {num(active)}
            </p>
            {stages.map((stage, i) => (
              <div
                key={stage.title}
                data-stage-panel
                role="tabpanel"
                id={`stage-panel-${i}`}
                aria-labelledby={`stage-tab-${i}`}
                className={cn(
                  "animate-[stage-in_800ms_var(--ease-expo)_both] motion-reduce:animate-none",
                  i !== active && "hidden",
                )}
              >
                <p className="text-eyebrow text-imperial lg:mt-8">
                  Stage {num(i)} <span className="text-mist">/ {num(total - 1)}</span>
                </p>
                <h3 className="mt-5 text-heading-lg">{stage.title}</h3>
                <p className="mt-5 max-w-[40ch] text-lead text-slate">{stage.text}</p>
              </div>
            ))}
          </div>

          <div data-stage-ui className="mt-9 flex items-center gap-4 md:mt-12">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous stage"
              className="grid size-12 cursor-pointer place-items-center rounded-full border border-line-strong text-ink transition-[background-color,color,border-color] duration-500 ease-expo hover:border-obsidian hover:bg-obsidian hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial"
            >
              <ArrowRightIcon className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next stage"
              className="grid size-12 cursor-pointer place-items-center rounded-full border border-line-strong text-ink transition-[background-color,color,border-color] duration-500 ease-expo hover:border-obsidian hover:bg-obsidian hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial"
            >
              <ArrowRightIcon className="size-4" />
            </button>
            <p aria-live="polite" className="ml-1 text-sm text-slate tabular-nums">
              <span className="font-medium text-ink">{num(active)}</span> / {num(total - 1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
