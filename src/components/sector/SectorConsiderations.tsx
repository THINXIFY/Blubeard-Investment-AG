"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { SectorPageData } from "@/content/sectors";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

const DEFAULT_FRAMES = ["30% 70%", "65% 30%", "80% 60%", "45% 20%", "20% 40%", "60% 80%"];
const ADVANCE_MS = 7000;
const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Investment considerations — cinematic, interactive Obsidian stage. A single sector photograph is
 * re-framed (focal point + scale) for each consideration, so the camera appears to move through
 * the scene. Tabs auto-advance while the section is visible; hover, focus or interaction pauses it.
 * Reduced motion: no auto-advance, no camera movement.
 */
export function SectorConsiderations({ data }: { data: SectorPageData }) {
  const { considerations } = data;
  const img = images[considerations.image];
  const items = considerations.items;
  const frames = considerations.frames ?? DEFAULT_FRAMES;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(false);
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduce(mq.matches);
    const frame = requestAnimationFrame(onMq);
    mq.addEventListener("change", onMq);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      mq.removeEventListener("change", onMq);
      io.disconnect();
    };
  }, []);

  const running = visible && !paused && !reduce;
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % items.length), ADVANCE_MS);
    return () => clearTimeout(t);
  }, [running, active, items.length]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = items.length;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i + 1) % n
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      ref={root}
      id="considerations"
      data-tone="dark"
      aria-labelledby="sector-considerations-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      {/* Re-framed photograph */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-[2400ms] ease-expo"
          style={{ transform: `scale(${1.12 + (active % 2) * 0.08})`, transformOrigin: frames[active % frames.length] }}
        >
          <Image
            src={img.src}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover transition-[object-position] duration-[2400ms] ease-expo"
            style={{ objectPosition: frames[active % frames.length] }}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(16_19_32/0.92)_0%,rgb(16_19_32/0.7)_45%,rgb(16_19_32/0.45)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/60" />
        <div
          className="absolute size-[50rem] rounded-full bg-[radial-gradient(closest-side,rgb(18_72_216/0.35),transparent)] blur-2xl transition-[left,top] duration-[2400ms] ease-expo"
          style={{ left: `${10 + active * 18}%`, top: `${20 + (active % 2) * 25}%` }}
        />
      </div>

      <Container className="flex min-h-[40rem] flex-col py-20 md:py-24 lg:min-h-[46rem] lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow tone="dark">{considerations.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="sector-considerations-title"
              lines={considerations.heading}
              className="mt-6 font-display text-[clamp(2.1rem,1.5rem+2.2vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.04em]"
              lineClassNames={[undefined, "text-platinum/75"]}
              delay={0.1}
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-[46ch] leading-relaxed text-platinum lg:text-lg">{considerations.intro}</p>
            </Reveal>
          </div>

          {/* Active consideration — large caption */}
          <div
            role="tabpanel"
            id={`${uid}-panel`}
            aria-labelledby={`${uid}-tab-${active}`}
            className="flex items-end lg:col-span-5 lg:col-start-8"
          >
            <div className="grid w-full">
              {items.map((item, i) => (
                <p
                  key={item.title}
                  aria-hidden={i !== active}
                  className={cn(
                    "col-start-1 row-start-1 font-display text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.03em] transition-[opacity,transform] duration-700 ease-expo",
                    i === active ? "translate-y-0 opacity-100 delay-200" : "translate-y-4 opacity-0",
                  )}
                >
                  <span className="mb-4 block text-sm font-semibold text-imperial-300 tabular-nums">
                    {num(i)} / {num(items.length - 1)}
                  </span>
                  {item.title}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Reveal className="mt-auto pt-14" delay={0.2}>
          <div
            role="tablist"
            aria-label={considerations.eyebrow}
            className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3"
            onFocus={() => setPaused(true)}
          >
            {items.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.title}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${uid}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "group/t relative overflow-hidden rounded-md border px-5 py-4 text-left backdrop-blur-md transition-[background-color,border-color] duration-500",
                    on
                      ? "border-white/30 bg-white/[0.12]"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.08]",
                  )}
                >
                  {/* Progress rail */}
                  <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-white/10">
                    <span
                      key={on && running ? `run-${active}` : `idle-${i}`}
                      className={cn(
                        "absolute inset-y-0 left-0 bg-imperial-300",
                        on ? (running ? "w-full origin-left animate-[rail_7s_linear]" : "w-full") : "w-0",
                      )}
                    />
                  </span>
                  <span className="flex items-baseline gap-3">
                    <span
                      aria-hidden
                      className={cn("text-xs font-semibold tabular-nums", on ? "text-imperial-300" : "text-mist")}
                    >
                      {num(i)}
                    </span>
                    <span
                      className={cn(
                        "text-[0.9375rem] font-medium transition-colors",
                        on ? "text-white" : "text-white/65 group-hover/t:text-white",
                      )}
                    >
                      {item.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
