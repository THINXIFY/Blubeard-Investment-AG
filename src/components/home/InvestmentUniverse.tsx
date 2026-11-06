import Image from "next/image";
import Link from "next/link";
import { industries, investments } from "@/content/home";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Investment universe: a photography-led directory of all twelve industries. Each card is one link to its
 * sector page. Text is always visible, so nothing depends on hover; hover and keyboard focus share the
 * same zoom, lift, border and arrow response.
 */
export function InvestmentUniverse() {
  return (
    <Section id="investments" tone="light" spacing="md" divider aria-labelledby="investments-title">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal className="lg:col-span-7">
          <SectionHeading
            id="investments-title"
            eyebrow={investments.eyebrow}
            title={investments.heading}
            mutedLine={1}
          />
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
          <p className="text-[0.9375rem] leading-relaxed text-slate md:text-base">{investments.description}</p>
        </Reveal>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
        {industries.map((industry, i) => {
          const img = images[industry.cardImage ?? industry.image];
          return (
            <Reveal as="li" key={industry.id} delay={(i % 3) * 0.07} y={20} start="top 92%" className="h-full">
              <Link
                href={`/investments/${industry.id}`}
                aria-labelledby={`industry-${industry.id}`}
                aria-describedby={`industry-${industry.id}-text`}
                className="group/card relative isolate flex h-full min-h-[17.5rem] flex-col justify-between overflow-hidden rounded-md bg-obsidian p-5 text-white transition-[translate,box-shadow] duration-700 ease-expo hover:-translate-y-1 hover:shadow-[0_28px_50px_-28px_rgb(16_19_32/0.65)] focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-imperial motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0 sm:min-h-[21rem] lg:min-h-[23rem] lg:p-6"
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                  placeholder="blur"
                  className="-z-20 object-cover saturate-[0.85] transition-[scale,filter] duration-[1400ms] ease-expo group-hover/card:scale-[1.06] group-hover/card:saturate-100 group-focus-visible/card:scale-[1.06] group-focus-visible/card:saturate-100 motion-reduce:transition-none motion-reduce:group-hover/card:scale-100 motion-reduce:group-focus-visible/card:scale-100"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(16_19_32/0.96)_0%,rgb(16_19_32/0.8)_36%,rgb(16_19_32/0.18)_66%,rgb(16_19_32/0.68)_100%)]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-white/10 transition-shadow duration-700 ease-expo ring-inset group-hover/card:ring-imperial-300/80 group-focus-visible/card:ring-imperial-300/80"
                />

                <span className="flex items-center justify-between">
                  <span
                    aria-hidden
                    className="font-display text-xs font-medium tracking-[0.14em] text-white/80 tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="grid size-10 place-items-center rounded-full border border-white/30 bg-obsidian/25 backdrop-blur-sm transition-[background-color,border-color,color] duration-500 ease-expo group-hover/card:border-white group-hover/card:bg-white group-hover/card:text-imperial group-focus-visible/card:border-white group-focus-visible/card:bg-white group-focus-visible/card:text-imperial"
                  >
                    <ArrowRightIcon className="size-3.5 -rotate-45 transition-[rotate] duration-500 ease-expo group-hover/card:rotate-0 group-focus-visible/card:rotate-0 motion-reduce:transition-none" />
                  </span>
                </span>

                <span className="mt-16 block">
                  <span
                    id={`industry-${industry.id}`}
                    className="block font-display text-[1.375rem] leading-[1.15] font-medium tracking-[-0.025em] lg:text-[1.5rem]"
                  >
                    {industry.title}
                  </span>
                  <span
                    aria-hidden
                    className="mt-3.5 block h-px w-8 bg-imperial-300 transition-[width] duration-700 ease-expo group-hover/card:w-16 group-focus-visible/card:w-16 motion-reduce:transition-none"
                  />
                  <span
                    id={`industry-${industry.id}-text`}
                    className="mt-3.5 block max-w-[38ch] text-sm leading-relaxed text-platinum lg:min-h-[4.875em]"
                  >
                    {industry.description}
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>

      <div className="mt-10 flex justify-center lg:mt-12">
        <Button href={investments.cta.href} variant="secondary" size="lg" arrow>
          {investments.cta.label}
        </Button>
      </div>
    </Section>
  );
}
