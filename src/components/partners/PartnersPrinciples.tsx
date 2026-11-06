"use client";

import { useState } from "react";
import Image from "next/image";
import { partnersPage } from "@/content/partners";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Three photographic panels. From 1024px they share one row and the chosen panel opens wide on hover,
 * focus or click, revealing its text; below that they stack with the text always visible.
 */
export function PartnersPrinciples() {
  const { principles } = partnersPage;
  const [active, setActive] = useState(0);

  return (
    <section data-tone="light" aria-labelledby="partners-principles-title" className="bg-white py-16 md:py-20 lg:py-24">
      <Container>
        <Reveal>
          <Eyebrow>{principles.eyebrow}</Eyebrow>
        </Reveal>
        <MaskedHeading
          id="partners-principles-title"
          lines={[principles.heading]}
          className="mt-5 font-display text-[clamp(2rem,1.3rem+2vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.04em] text-ink"
        />

        <Reveal
          as="ul"
          stagger={0.1}
          className="mt-9 flex flex-col gap-3 lg:mt-12 lg:h-[32rem] lg:flex-row"
          // Leaving the row keeps the last panel open, so the layout never snaps back.
        >
          {principles.items.map((item, i) => {
            const img = images[item.image];
            const open = active === i;
            return (
              <li
                key={item.title}
                data-reveal-item
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "relative isolate min-h-[17rem] overflow-hidden rounded-md bg-obsidian text-white sm:min-h-[19rem] lg:min-h-0 lg:min-w-0",
                  "transition-[flex-grow] duration-700 ease-expo motion-reduce:transition-none",
                  open ? "lg:flex-[2.6_1_0%]" : "lg:flex-[1_1_0%]",
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  placeholder="blur"
                  className={cn(
                    "-z-10 object-cover transition-transform duration-[1400ms] ease-expo motion-reduce:transition-none",
                    open && "lg:scale-[1.03]",
                  )}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(16_19_32/0.94)_0%,rgb(16_19_32/0.55)_48%,rgb(16_19_32/0.18)_100%)]"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <h3 className="font-display text-[1.5rem] leading-[1.12] font-medium tracking-[-0.03em] lg:text-[1.75rem]">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="flex w-full cursor-pointer items-baseline gap-3 rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:min-h-11"
                    >
                      <span aria-hidden className="text-xs font-medium tracking-[0.1em] text-imperial-300 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.title}
                    </button>
                  </h3>
                  <span
                    aria-hidden
                    className={cn(
                      "mt-3 block h-px w-14 origin-left bg-imperial-300 transition-[scale] duration-700 ease-expo motion-reduce:transition-none",
                      !open && "lg:scale-x-0",
                    )}
                  />
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-700 ease-expo motion-reduce:transition-none",
                      open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0",
                    )}
                  >
                    <p className="mt-3 min-h-0 max-w-[46ch] overflow-hidden leading-relaxed text-white/85">
                      {item.text}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
