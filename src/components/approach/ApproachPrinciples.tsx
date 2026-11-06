"use client";

import Image from "next/image";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { useState } from "react";
import { approachPage } from "@/content/approach";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Investment principles — three photographic panels side by side. The selected panel opens wide
 * (its photograph settles from a slight zoom, the copy rises in); the others narrow to a titled
 * spine. Hover, focus or click selects. Below lg the panels stack with all copy visible.
 */
export function ApproachPrinciples() {
  const { principles } = approachPage;
  const [active, setActive] = useState(0);

  return (
    <section
      id="principles"
      data-tone="light"
      aria-labelledby="approach-principles-title"
      className="scroll-mt-16 bg-white py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{principles.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="approach-principles-title"
              lines={[principles.heading]}
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.125rem,1.2rem+2.6vw,3.75rem)] leading-[1.04] font-medium tracking-[-0.042em] text-ink"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-lg leading-relaxed text-slate">{principles.intro}</p>
          </Reveal>
        </div>

        {/* Desktop: expanding panels */}
        <Reveal delay={0.1} className="mt-14 hidden h-[34rem] gap-3 lg:flex">
          {principles.items.map((p, i) => {
            const on = i === active;
            const img = images[p.image];
            return (
              <button
                key={p.title}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "group/pr relative isolate overflow-hidden rounded-md text-left text-white outline-none",
                  "transition-[flex-grow] duration-[1100ms] ease-[cubic-bezier(0.77,0,0.18,1)]",
                  "focus-visible:ring-2 focus-visible:ring-imperial focus-visible:ring-offset-4",
                  on ? "grow-[3.4]" : "grow",
                )}
                style={{ flexBasis: 0 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="62vw"
                  placeholder="blur"
                  className={cn(
                    "-z-10 object-cover transition-[transform,filter] duration-[1600ms] ease-expo",
                    on ? "scale-100 saturate-100" : "scale-[1.18] saturate-[0.35]",
                  )}
                />
                {on ? <PhotoNote image={img} className="top-3 right-4 bottom-auto" /> : null}
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 -z-10 transition-opacity duration-1000",
                    "bg-[linear-gradient(to_top,rgb(16_19_32/0.92)_0%,rgb(16_19_32/0.45)_45%,rgb(16_19_32/0.15)_100%)]",
                  )}
                />
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 -z-10 bg-obsidian/55 transition-opacity duration-1000",
                    on ? "opacity-0" : "opacity-100",
                  )}
                />

                {/* Numeral */}
                <span className="absolute top-7 left-7 font-display text-sm font-medium text-white/80 tabular-nums">
                  {pad(i + 1)}
                  <span className="text-white/40"> / {pad(principles.items.length)}</span>
                </span>

                {/* Collapsed spine title */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-8 left-6 rotate-180 font-display text-xl font-medium tracking-[-0.02em] whitespace-nowrap transition-opacity duration-500 [writing-mode:vertical-rl]",
                    on ? "opacity-0" : "opacity-100 delay-300",
                  )}
                >
                  {p.title}
                </span>

                {/* Open content */}
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 block p-9 transition-[opacity,transform] duration-700 ease-expo xl:p-11",
                    on ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-6 opacity-0",
                  )}
                >
                  <span className="block h-0.5 w-12 bg-imperial-300" aria-hidden />
                  <span className="mt-6 block font-display text-[clamp(1.75rem,1.2rem+1.2vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.035em]">
                    {p.title}
                  </span>
                  <span className="mt-4 block max-w-[40ch] text-lg leading-relaxed text-white/85">{p.text}</span>
                  <span className="mt-6 flex flex-wrap gap-2">
                    {p.keywords.map((k) => (
                      <span
                        key={k}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/90 backdrop-blur-md"
                      >
                        {k}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* Smaller screens: stacked */}
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-5 lg:hidden">
          {principles.items.map((p, i) => {
            const img = images[p.image];
            return (
              <li key={p.title}>
                <Reveal>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md md:aspect-[3/4]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink tabular-nums">
                      {pad(i + 1)}
                    </span>
                    <PhotoNote image={img} />
                  </div>
                  <h3 className="mt-5 font-display text-[1.5rem] leading-tight font-medium tracking-[-0.03em] text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-slate">{p.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
