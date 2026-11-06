"use client";

import Image from "next/image";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { investmentsPage } from "@/content/investments";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Investment philosophy — cinematic Obsidian section.
 * Desktop: the three principles form a tab list that drives a large photographic stage
 * (layered cross-fade, glass detail panel, moving light, subtle pointer depth).
 * Tablet/mobile: the same items become an accordion with each photograph inline.
 */
export function InvestmentsPhilosophy() {
  const { philosophy } = investmentsPage;
  const principles = philosophy.principles;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = useRef<HTMLDivElement>(null);
  const uid = useId();

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = principles.length;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % n
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  // Subtle pointer depth on the stage (CSS variables; ignored under reduced motion).
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = stage.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onPointerLeave = () => {
    stage.current?.style.setProperty("--px", "0");
    stage.current?.style.setProperty("--py", "0");
  };

  return (
    <section
      id="philosophy"
      data-tone="dark"
      aria-labelledby="inv-philosophy-title"
      className="relative isolate overflow-hidden bg-obsidian py-20 text-white md:py-24 lg:py-28"
    >
      {/* Ambient light — drifts toward the active principle */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute size-[60rem] rounded-full bg-[radial-gradient(closest-side,rgb(18_72_216/0.32),transparent)] blur-2xl transition-[top,left] duration-[1600ms] ease-expo"
          style={{ top: `${-20 + active * 18}%`, left: `${35 + active * 6}%` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_0%_100%,rgb(27_32_48/0.9),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy + principles */}
          <div className="flex flex-col lg:col-span-5">
            <Reveal>
              <Eyebrow tone="dark">{philosophy.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="inv-philosophy-title"
              lines={[philosophy.heading]}
              className="mt-6 max-w-[15ch] font-display text-[clamp(2.25rem,1.5rem+2.6vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.04em]"
              delay={0.1}
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-[44ch] leading-relaxed text-platinum lg:text-lg">{philosophy.description}</p>
            </Reveal>

            <Reveal delay={0.3} className="mt-10 lg:mt-auto lg:pt-12">
              <div
                role="tablist"
                aria-label="Investment principles"
                aria-orientation="vertical"
                className="flex flex-col gap-3"
              >
                {principles.map((p, i) => {
                  const on = i === active;
                  const img = images[p.image];
                  return (
                    <div key={p.title}>
                      <button
                        ref={(el) => {
                          tabs.current[i] = el;
                        }}
                        role="tab"
                        id={`${uid}-tab-${i}`}
                        aria-selected={on}
                        aria-controls={`${uid}-panel`}
                        tabIndex={on ? 0 : -1}
                        onClick={() => setActive(i)}
                        onMouseEnter={() => setActive(i)}
                        onKeyDown={(e) => onKeyDown(e, i)}
                        className={cn(
                          "group/tab relative w-full overflow-hidden rounded-md border px-5 py-5 text-left transition-[background-color,border-color,box-shadow] duration-700 ease-expo sm:px-6",
                          on
                            ? "border-white/20 bg-white/[0.07] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md"
                            : "border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]",
                        )}
                      >
                        {/* Active accent */}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-y-0 left-0 w-0.5 origin-top bg-gradient-to-b from-imperial-300 to-imperial transition-transform duration-700 ease-expo",
                            on ? "scale-y-100" : "scale-y-0",
                          )}
                        />
                        <span className="flex items-center gap-5">
                          <span
                            aria-hidden
                            className={cn(
                              "grid size-10 shrink-0 place-items-center rounded-full border text-xs font-semibold tabular-nums transition-[background-color,border-color,color] duration-700 ease-expo",
                              on ? "border-imperial-300 bg-imperial text-white" : "border-white/20 text-mist",
                            )}
                          >
                            {num(i)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={cn(
                                "block font-display text-lg font-semibold tracking-[-0.02em] transition-colors duration-500 sm:text-xl",
                                on ? "text-white" : "text-white/60 group-hover/tab:text-white/85",
                              )}
                            >
                              {p.title}
                            </span>
                            <span
                              className={cn(
                                "grid transition-[grid-template-rows,opacity] duration-700 ease-expo",
                                on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                              )}
                            >
                              <span className="overflow-hidden">
                                <span className="block pt-2 text-[0.9375rem] leading-relaxed text-platinum">
                                  {p.text}
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>

                        {/* Tablet/mobile: inline photograph (accordion) */}
                        <span
                          className={cn(
                            "grid transition-[grid-template-rows,opacity] duration-700 ease-expo lg:hidden",
                            on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <span className="overflow-hidden">
                            <span className="relative mt-5 block aspect-[16/10] overflow-hidden rounded-md">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(min-width: 640px) 80vw, 92vw"
                                placeholder="blur"
                                className="object-cover"
                              />
                              <PhotoNote image={img} />
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent"
                              />
                              <span className="absolute bottom-3 left-4 flex flex-wrap gap-2">
                                {p.focus.map((f) => (
                                  <span
                                    key={f}
                                    className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.6875rem] font-medium tracking-[0.06em] text-white uppercase backdrop-blur-md"
                                  >
                                    {f}
                                  </span>
                                ))}
                              </span>
                            </span>
                          </span>
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Photographic stage (desktop) */}
          <Reveal className="hidden lg:col-span-7 lg:block" delay={0.15} y={40}>
            <div
              ref={stage}
              id={`${uid}-panel`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${active}`}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              className="relative h-full min-h-[38rem] [--px:0] [--py:0] [perspective:1400px]"
            >
              {/* Back plate — offset layer for depth */}
              <div
                aria-hidden
                className="absolute inset-0 translate-x-5 translate-y-5 rounded-lg border border-white/10 bg-surface-dark motion-safe:[transform:translate3d(calc(var(--px)*-10px),calc(var(--py)*-10px),0)] motion-safe:transition-transform motion-safe:duration-700"
              />

              <figure className="absolute inset-0 overflow-hidden rounded-lg bg-obsidian shadow-[0_60px_120px_-50px_rgb(0_0_0/0.9)] motion-safe:[transform:rotateY(calc(var(--px)*3deg))_rotateX(calc(var(--py)*-3deg))] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out">
                {principles.map((p, i) => {
                  const img = images[p.image];
                  const on = i === active;
                  return (
                    <div
                      key={p.title}
                      aria-hidden={!on}
                      className={cn(
                        "absolute inset-0 transition-[opacity,transform,filter] duration-[1400ms] ease-expo",
                        on ? "blur-0 scale-100 opacity-100" : "scale-[1.08] opacity-0 blur-sm",
                      )}
                    >
                      <Image
                        src={img.src}
                        alt={on ? img.alt : ""}
                        fill
                        sizes="56vw"
                        placeholder="blur"
                        className="object-cover motion-safe:[transform:scale(1.04)_translate3d(calc(var(--px)*-14px),calc(var(--py)*-14px),0)] motion-safe:transition-transform motion-safe:duration-700"
                      />
                      <PhotoNote image={img} className="right-5 bottom-4" />
                    </div>
                  );
                })}

                {/* Cinematic grading */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgb(16_19_32/0.92)_0%,rgb(16_19_32/0.25)_45%,rgb(16_19_32/0.35)_100%)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(120deg,rgb(18_72_216/0.22),transparent_45%)]"
                />
                <div aria-hidden className="absolute inset-0 rounded-lg ring-1 ring-white/10 ring-inset" />

                {/* Top meta */}
                <div className="absolute inset-x-8 top-8 flex items-center justify-between text-xs font-medium tracking-[0.16em] text-platinum uppercase">
                  <span>Principle {num(active)}</span>
                  <span className="flex items-center gap-2" aria-hidden>
                    {principles.map((p, i) => (
                      <span
                        key={p.title}
                        className={cn(
                          "h-0.5 rounded-full transition-[width,background-color] duration-700 ease-expo",
                          i === active ? "w-10 bg-white" : "w-4 bg-white/30",
                        )}
                      />
                    ))}
                  </span>
                </div>
              </figure>
              {/* Glass detail panel — outside the tilted figure so backdrop-filter composites cleanly */}
              <div className="pointer-events-none absolute inset-x-8 bottom-8 z-10 [transform:translateZ(80px)] motion-safe:[transform:translate3d(calc(var(--px)*12px),calc(var(--py)*12px),80px)] motion-safe:transition-transform motion-safe:duration-700">
                {/* All three detail panels share one grid cell and cross-fade with transitions. */}
                <div className="grid max-w-md">
                  {principles.map((pr, i) => {
                    const on = i === active;
                    return (
                      <div
                        key={pr.title}
                        aria-hidden={!on}
                        className={cn(
                          "col-start-1 row-start-1 rounded-md border border-white/15 bg-obsidian/70 p-7 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] backdrop-blur-md transition-[opacity,transform] duration-700 ease-expo",
                          on ? "translate-y-0 opacity-100 delay-150" : "translate-y-3 opacity-0",
                        )}
                      >
                        <p className="font-display text-3xl font-semibold tracking-[-0.03em]">{pr.title}</p>
                        <p className="mt-3 leading-relaxed text-platinum">{pr.text}</p>
                        <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/12 pt-5">
                          {pr.focus.map((f) => (
                            <li
                              key={f}
                              className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white"
                            >
                              <span aria-hidden className="size-1 rounded-full bg-imperial-300" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
