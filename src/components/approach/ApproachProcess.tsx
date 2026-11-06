"use client";

import { useRef, useState, type CSSProperties } from "react";
import { approachPage } from "@/content/approach";
import { cn } from "@/lib/cn";
import { ensureGsap, gsap, MOTION_OK, useGSAP } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

ensureGsap();

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Strategic process — four stages on a single rail that fills as the section scrolls past
 * (native scroll, no pinning). Each stage comes forward as the fill reaches it: its outlined
 * numeral fills with Imperial Blue and its node lights. Hover previews any stage.
 * Reduced motion: fully drawn, all stages active.
 */
export function ApproachProcess() {
  const { process } = approachPage;
  const n = process.stages.length;
  const list = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(n - 1);
  const [hover, setHover] = useState<number | null>(null);

  useGSAP(() => {
    const el = list.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      el.style.setProperty("--p", "0");
      setReached(-1);
      const tw = gsap.to(el, {
        "--p": 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 50%",
          scrub: 0.5,
          onUpdate: (self) => setReached(Math.min(n - 1, Math.floor(self.progress * n + 0.12))),
        },
      });
      return () => {
        tw.scrollTrigger?.kill();
        el.style.setProperty("--p", "1");
        setReached(n - 1);
      };
    });
    return () => mm.revert();
  });

  return (
    <section
      data-tone="light"
      aria-labelledby="approach-process-title"
      className="relative overflow-hidden bg-porcelain py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{process.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="approach-process-title"
              lines={[process.heading]}
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.125rem,1.2rem+2.6vw,3.75rem)] leading-[1.04] font-medium tracking-[-0.042em] text-ink"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-lg leading-relaxed text-slate">{process.description}</p>
          </Reveal>
        </div>

        <ol
          ref={list}
          style={{ "--p": 1 } as CSSProperties}
          onMouseLeave={() => setHover(null)}
          className="relative mt-14 grid pl-12 md:grid-cols-2 md:gap-x-10 md:gap-y-12 md:pl-0 lg:mt-20 lg:grid-cols-4 lg:gap-8"
        >
          {/* Rail — horizontal on desktop, vertical on phones */}
          <span aria-hidden className="absolute top-[0.6875rem] right-0 left-0 hidden h-px bg-line-strong lg:block" />
          <span
            aria-hidden
            className="absolute top-[0.6875rem] left-0 hidden h-[2px] w-full origin-left scale-x-(--p) bg-imperial lg:block"
          />
          <span aria-hidden className="absolute top-3 bottom-3 left-[0.6875rem] w-px bg-line-strong md:hidden" />
          <span
            aria-hidden
            className="absolute top-3 bottom-3 left-[0.6875rem] w-[2px] origin-top scale-y-(--p) bg-imperial md:hidden"
          />

          {process.stages.map((s, i) => {
            const on = hover === null ? i <= reached : hover === i;
            const current = hover === null ? i === reached : hover === i;
            return (
              <li
                key={s.title}
                onMouseEnter={() => setHover(i)}
                className="group/st relative pb-12 last:pb-0 md:pb-0 lg:pt-12"
              >
                {/* Node */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-0 -left-12 grid size-[1.375rem] place-items-center rounded-full border-2 bg-porcelain transition-colors duration-500 md:hidden lg:left-0 lg:grid",
                    on ? "border-imperial" : "border-line-strong",
                  )}
                >
                  <span
                    className={cn(
                      "size-2 rounded-full bg-imperial transition-transform duration-500 ease-expo",
                      on ? "scale-100" : "scale-0",
                    )}
                  />
                  {current ? (
                    <span className="absolute -inset-2 rounded-full border border-imperial/30 motion-safe:animate-[pulse-ring_2.4s_ease-out_infinite]" />
                  ) : null}
                </span>

                {/* Outlined numeral fills when reached */}
                <span
                  aria-hidden
                  className={cn(
                    "block font-display text-[clamp(3.5rem,2.6rem+2.4vw,5.25rem)] leading-none font-semibold tracking-[-0.05em] transition-colors duration-700",
                    on ? "text-imperial" : "text-transparent",
                  )}
                  style={{ WebkitTextStroke: "1.25px var(--color-imperial)" }}
                >
                  {pad(i + 1)}
                </span>
                <h3
                  className={cn(
                    "mt-5 font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.02em] transition-colors duration-500",
                    on ? "text-ink" : "text-ink/55",
                  )}
                >
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[34ch] leading-relaxed text-slate">{s.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.considerations.map((c) => (
                    <li
                      key={c}
                      className={cn(
                        "rounded-full border px-3 py-1 text-[0.8125rem] transition-colors duration-500",
                        on ? "border-imperial/30 bg-white text-ink" : "border-line text-slate",
                      )}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
