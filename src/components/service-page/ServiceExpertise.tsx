"use client";

import Image from "next/image";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { useId, useState } from "react";
import type { ServicePageData } from "@/content/service-pages";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Expertise & strategic value — portrait architectural photograph (gentle parallax) beside a
 * concise statement and a single-open accordion of three points.
 */
export function ServiceExpertise({ data }: { data: ServicePageData }) {
  const { expertise } = data;
  const img = images[expertise.image];
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <section data-tone="light" aria-labelledby="service-expertise-title" className="bg-white py-20 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="relative lg:col-span-5">
            <ImageReveal className="aspect-[4/3] w-full rounded-md md:aspect-[16/10] lg:aspect-[4/5]" drift={12}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </ImageReveal>
            <PhotoNote image={img} />
            <span aria-hidden className="absolute -bottom-3 left-8 h-[3px] w-20 bg-imperial" />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow>{expertise.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="service-expertise-title"
              lines={[expertise.heading]}
              className="mt-5 max-w-[18ch] text-heading-lg"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-slate">{expertise.body}</p>
            </Reveal>

            <Reveal delay={0.2} className="mt-9 border-t border-line">
              {expertise.points.map((p, i) => {
                const on = open === i;
                const panel = `${uid}-panel-${i}`;
                return (
                  <div key={p.title} className="border-b border-line">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={on}
                        aria-controls={panel}
                        onClick={() => setOpen(on ? -1 : i)}
                        className="group/acc flex w-full items-center gap-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial"
                      >
                        <span
                          className={cn(
                            "w-6 text-xs font-medium tabular-nums transition-colors duration-300",
                            on ? "text-imperial" : "text-slate",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "flex-1 font-display text-[1.25rem] font-semibold tracking-[-0.02em] transition-colors duration-300",
                            on ? "text-ink" : "text-ink/70 group-hover/acc:text-ink",
                          )}
                        >
                          {p.title}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "relative grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-500",
                            on
                              ? "border-imperial bg-imperial text-white"
                              : "border-line-strong text-ink group-hover/acc:border-ink",
                          )}
                        >
                          <span className="absolute h-px w-3 bg-current" />
                          <span
                            className={cn(
                              "absolute h-3 w-px bg-current transition-transform duration-500 ease-expo",
                              on && "scale-y-0",
                            )}
                          />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panel}
                      role="region"
                      aria-label={p.title}
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-700 ease-expo",
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden" inert={!on}>
                        <p className="max-w-[52ch] pb-6 pl-11 leading-relaxed text-slate">{p.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
