"use client";

import { useEffect, useRef, useState } from "react";
import { servicesPage } from "@/content/services";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

const R = 150; // ring radius (SVG units, viewBox 400)
const C = 2 * Math.PI * R;
const ADVANCE_MS = 3800;

/** Node positions: 12, 3, 6 and 9 o'clock. */
const nodes = [0, 1, 2, 3].map((i) => {
  const a = -Math.PI / 2 + (i * Math.PI) / 2;
  return { x: 200 + Math.cos(a) * R, y: 200 + Math.sin(a) * R };
});

/**
 * Engagement process as a continuous cycle: four stages on a ring (review leads back to
 * understanding) beside a compact step list. The ring advances gently on its own while in view
 * until the visitor chooses a stage; reduced motion shows a static, fully navigable version.
 */
export function ServicesProcess() {
  const { process } = servicesPage;
  const n = process.steps.length;
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (timer) clearInterval(timer);
        timer = e.isIntersecting ? setInterval(() => setActive((a) => (a + 1) % n), ADVANCE_MS) : undefined;
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [auto, n]);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const step = process.steps[active];

  return (
    <section
      ref={ref}
      data-tone="light"
      aria-labelledby="services-process-title"
      className="bg-white py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Copy + step list */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{process.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="services-process-title"
              lines={[process.heading]}
              className="mt-6 max-w-[18ch] text-heading-lg"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-slate">{process.description}</p>
            </Reveal>

            <Reveal as="ol" delay={0.2} className="mt-10 border-t border-line">
              {process.steps.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.title} className="border-b border-line">
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`process-step-${i}`}
                      onClick={() => choose(i)}
                      className="group/st relative flex w-full items-center gap-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-y-0 -left-0 w-0.5 origin-top bg-imperial transition-transform duration-700 ease-expo",
                          on ? "scale-y-100" : "scale-y-0",
                        )}
                      />
                      <span
                        className={cn(
                          "w-8 pl-4 text-xs font-medium tabular-nums transition-colors duration-300",
                          on ? "text-imperial" : "text-slate",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 pl-2 font-display text-[1.25rem] font-medium tracking-[-0.02em] transition-colors duration-300",
                          on ? "text-ink" : "text-ink/60 group-hover/st:text-ink",
                        )}
                      >
                        {s.title}
                      </span>
                    </button>
                    <div
                      id={`process-step-${i}`}
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-700 ease-expo",
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden" inert={!on}>
                        <p className="pb-5 pl-14 leading-relaxed text-slate">{s.text}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </Reveal>
          </div>

          {/* Cycle diagram (decorative mirror of the list) */}
          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <div
              aria-hidden
              className="relative mx-auto aspect-square w-full max-w-[22rem] md:max-w-[28rem] lg:max-w-[32rem]"
            >
              <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible">
                <circle cx="200" cy="200" r={R + 34} fill="none" stroke="var(--color-line)" strokeDasharray="2 6" />
                <circle cx="200" cy="200" r={R} fill="none" stroke="var(--color-line)" strokeWidth="1.5" />
                <circle
                  cx="200"
                  cy="200"
                  r={R}
                  fill="none"
                  stroke="var(--color-imperial)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - Math.max(active, 0.02) / n)}
                  transform="rotate(-90 200 200)"
                  className="transition-[stroke-dashoffset] duration-1000 ease-expo"
                />
                {/* Return arrow: review leads back to understanding */}
                <path
                  d={`M ${200 - R * Math.sin(0.32)} ${200 - R * Math.cos(0.32)} l 9 -2 l -4 8`}
                  fill="none"
                  stroke="var(--color-mist)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {nodes.map((p, i) => (
                  <g key={i}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={i === active ? 15 : 11}
                      fill={i <= active ? "var(--color-imperial)" : "#fff"}
                      stroke={i <= active ? "var(--color-imperial)" : "var(--color-line-strong)"}
                      strokeWidth="1.5"
                      className="transition-all duration-700 ease-expo"
                    />
                    {i === active ? (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="24"
                        fill="none"
                        stroke="var(--color-imperial)"
                        strokeOpacity="0.25"
                      />
                    ) : null}
                  </g>
                ))}
              </svg>

              {/* Node labels */}
              {process.steps.map((s, i) => {
                // Anchored to each node (12.5% / 87.5% = ring radius within the 400-unit box).
                const pos = [
                  "left-1/2 top-[12.5%] -translate-x-1/2 -translate-y-[calc(100%+1.75rem)] text-center",
                  "left-[87.5%] top-1/2 translate-x-[1.75rem] -translate-y-1/2 text-left",
                  "left-1/2 top-[87.5%] -translate-x-1/2 translate-y-[1.75rem] text-center",
                  "left-[12.5%] top-1/2 -translate-x-[calc(100%+1.75rem)] -translate-y-1/2 text-right",
                ][i];
                return (
                  <button
                    key={s.title}
                    type="button"
                    tabIndex={-1}
                    onClick={() => choose(i)}
                    className={cn(
                      "absolute hidden w-max max-w-[7.5rem] text-sm leading-snug font-medium transition-colors duration-500 md:block",
                      pos,
                      i === active ? "text-ink" : "text-slate hover:text-ink",
                    )}
                  >
                    {s.title}
                  </button>
                );
              })}

              {/* Centre */}
              <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full bg-porcelain text-center">
                <p
                  key={active}
                  className="font-display text-[clamp(2.75rem,2rem+2.5vw,4.25rem)] leading-none font-light tracking-[-0.04em] text-imperial tabular-nums motion-safe:animate-[fade-up_0.8s_var(--ease-expo)_both]"
                >
                  {String(active + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 max-w-[11rem] font-display text-base leading-snug font-semibold tracking-[-0.015em] text-ink md:text-lg">
                  {step.title}
                </p>
                <p className="mt-2 text-[0.6875rem] font-medium tracking-[0.18em] text-slate uppercase">
                  Stage {active + 1} of {n}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
