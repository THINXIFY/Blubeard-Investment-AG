"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { aboutPage } from "@/content/about";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";

/**
 * Investment perspective — sector list (left) controls a large cross-fading photograph (right).
 * Desktop: hover or keyboard focus selects. Mobile: each sector shows its own photo inline.
 */
export function AboutPerspective() {
  const { perspective } = aboutPage;
  const [active, setActive] = useState(0);
  const uid = useId();

  return (
    <section
      id="perspective"
      data-tone="light"
      aria-labelledby="perspective-title"
      className="bg-white py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-6">
            <Eyebrow>{perspective.eyebrow}</Eyebrow>
            <MaskedHeading id="perspective-title" lines={[perspective.heading]} className="mt-6 text-heading-lg" />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="leading-relaxed text-slate">{perspective.description}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          {/* Sector list */}
          <Reveal as="ul" stagger={0.08} className="border-t border-line lg:col-span-5">
            {perspective.sectors.map((s, i) => {
              const selected = i === active;
              const img = images[s.image];
              return (
                <li key={s.id} data-reveal-item className="border-b border-line">
                  <button
                    type="button"
                    aria-pressed={selected}
                    aria-controls={`${uid}-visual`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group/sector relative w-full py-6 text-left lg:py-7"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-0 bottom-0 left-0 w-0.5 origin-top bg-imperial transition-transform duration-700 ease-expo",
                        selected ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    <span
                      className={cn(
                        "flex items-center justify-between gap-6 transition-[padding] duration-700 ease-expo",
                        selected && "lg:pl-6",
                      )}
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          aria-hidden
                          className={cn(
                            "text-xs font-medium tabular-nums transition-colors duration-300",
                            selected ? "text-imperial" : "text-slate",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-xl font-semibold tracking-[-0.02em] transition-colors duration-300 lg:text-[1.375rem]",
                            selected ? "text-ink" : "text-slate group-hover/sector:text-ink",
                          )}
                        >
                          {s.title}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "hidden size-2 shrink-0 rounded-full transition-colors duration-300 lg:block",
                          selected ? "bg-imperial" : "bg-line-strong",
                        )}
                      />
                    </span>
                    <span
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-700 ease-expo",
                        selected
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0 max-lg:grid-rows-[1fr] max-lg:opacity-100",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span
                          className={cn(
                            "block pt-3 pl-8 text-[0.9375rem] leading-relaxed text-slate",
                            selected && "lg:pl-14",
                          )}
                        >
                          {s.text}
                        </span>
                        {/* Mobile/tablet: inline photograph per sector */}
                        <span className="relative mt-5 ml-8 block aspect-[16/10] overflow-hidden rounded-md lg:hidden">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(min-width: 640px) 80vw, 90vw"
                            placeholder="blur"
                            className="object-cover"
                          />
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
            <li className="pt-8">
              <Button href={perspective.cta.href} size="lg" arrow>
                {perspective.cta.label}
              </Button>
            </li>
          </Reveal>

          {/* Visual stage (desktop) */}
          <Reveal className="hidden lg:col-span-7 lg:block" delay={0.1}>
            <figure
              id={`${uid}-visual`}
              aria-live="polite"
              className="relative h-full min-h-[34rem] overflow-hidden rounded-md bg-obsidian"
            >
              {perspective.sectors.map((s, i) => {
                const img = images[s.image];
                const on = i === active;
                return (
                  <div
                    key={s.id}
                    aria-hidden={!on}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform] duration-1200 ease-expo",
                      on ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={on ? img.alt : ""}
                      fill
                      sizes="55vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </div>
                );
              })}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-obsidian/5 to-transparent"
              />
              <figcaption className="absolute right-8 bottom-8 left-8 flex items-end justify-between gap-6 text-white">
                <span>
                  <span className="text-eyebrow text-platinum">Sector focus</span>
                  <span
                    key={active}
                    className="mt-2 block font-display text-2xl font-semibold tracking-[-0.02em] motion-safe:animate-[fade-up_0.7s_var(--ease-expo)]"
                  >
                    {perspective.sectors[active].title}
                  </span>
                </span>
                <span aria-hidden className="text-sm text-platinum tabular-nums">
                  {String(active + 1).padStart(2, "0")} / {String(perspective.sectors.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
