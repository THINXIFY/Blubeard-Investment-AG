import Image from "next/image";
import type { SectorPageData } from "@/content/sectors";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollExpand } from "@/components/motion/ScrollExpand";

/**
 * Long-term perspective — scroll storytelling: statement row, a panorama that opens from an inset
 * window to full bleed as the reader scrolls, then the closing thought as a pull quote.
 */
export function SectorLongTerm({ data }: { data: SectorPageData }) {
  const { longTerm } = data;
  const img = images[longTerm.image];
  const [lead, closing] = longTerm.body;

  return (
    <section
      id="long-term"
      data-tone="light"
      aria-labelledby="sector-longterm-title"
      className="bg-white py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>{longTerm.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="sector-longterm-title"
              lines={longTerm.heading}
              className="mt-6 font-display text-[clamp(2.25rem,1.5rem+2.8vw,3.75rem)] leading-[1.04] font-medium tracking-[-0.045em]"
              lineClassNames={[undefined, "text-slate/75"]}
              delay={0.1}
            />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.15}>
            <p className="text-lead text-ink">{lead}</p>
          </Reveal>
        </div>
      </Container>

      <figure className="mt-12 lg:mt-16">
        <ScrollExpand className="h-[22rem] sm:h-[30rem] lg:h-[38rem]">
          <Image src={img.src} alt={img.alt} fill sizes="100vw" placeholder="blur" className="object-cover" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent"
          />
        </ScrollExpand>
        {img.caption ? (
          <Container>
            <figcaption className="mt-4 flex items-center gap-3 text-xs tracking-[0.14em] text-slate uppercase">
              <span aria-hidden className="h-px w-6 bg-line-strong" />
              {img.caption}
            </figcaption>
          </Container>
        ) : null}
      </figure>

      {closing ? (
        <Container>
          <Reveal className="mx-auto mt-14 max-w-3xl text-center lg:mt-20">
            <span aria-hidden className="mx-auto block h-px w-16 bg-imperial" />
            <p className="mt-8 font-display text-[clamp(1.375rem,1.1rem+1vw,2rem)] leading-[1.35] font-medium tracking-[-0.02em] text-ink">
              {closing}
            </p>
          </Reveal>
        </Container>
      ) : null}
    </section>
  );
}
