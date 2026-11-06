import Image from "next/image";
import type { SectorPageData } from "@/content/sectors";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { KenBurns } from "@/components/motion/KenBurns";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

type Closing = SectorPageData["closing"];

function Actions({ closing }: { closing: Closing }) {
  return (
    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
      <Button href={closing.primaryCta.href} tone="dark" size="lg" arrow>
        {closing.primaryCta.label}
      </Button>
      <Button
        href={closing.secondaryCta.href}
        tone="dark"
        variant="secondary"
        size="lg"
        arrow
        className="bg-white/[0.06] backdrop-blur-md"
      >
        {closing.secondaryCta.label}
      </Button>
    </div>
  );
}

/** Variant "glass" — full-bleed cinematic photograph with a glass statement panel. */
function GlassClosing({ closing }: { closing: Closing }) {
  const img = images[closing.image];
  return (
    <section
      data-tone="dark"
      aria-labelledby="sector-closing-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <KenBurns className="-z-10">
        <Image src={img.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
      </KenBurns>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(16_19_32/0.85),rgb(16_19_32/0.45)_60%,rgb(16_19_32/0.3))]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_0%_100%,rgb(18_72_216/0.4),transparent_70%)]"
      />

      <Container className="flex min-h-[34rem] items-center py-20 lg:min-h-[38rem]">
        <div className="max-w-2xl rounded-md border border-white/15 bg-obsidian/45 p-8 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.85)] backdrop-blur-md sm:p-10 lg:p-12">
          <Reveal>
            <Eyebrow tone="dark">{closing.eyebrow}</Eyebrow>
          </Reveal>
          <MaskedHeading
            id="sector-closing-title"
            lines={closing.heading}
            className="mt-6 font-display text-[clamp(2.1rem,1.4rem+2.6vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.04em]"
            lineClassNames={[undefined, "text-platinum"]}
            delay={0.1}
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[48ch] leading-relaxed text-platinum">{closing.description}</p>
            <Actions closing={closing} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Variant "split" — statement on Obsidian beside a photograph. */
function SplitClosing({ closing }: { closing: Closing }) {
  const img = images[closing.image];
  return (
    <section aria-labelledby="sector-closing-title" data-tone="light" className="bg-white py-16 md:py-20 lg:py-24">
      <Container>
        <div data-tone="dark" className="grid overflow-hidden rounded-md bg-obsidian text-white lg:grid-cols-12">
          <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:col-span-7 lg:p-16">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(60%_70%_at_0%_100%,rgb(18_72_216/0.35),transparent_70%)]"
            />
            <Reveal className="relative">
              <Eyebrow tone="dark">{closing.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="sector-closing-title"
              lines={closing.heading}
              className="relative mt-6 font-display text-[clamp(2.1rem,1.4rem+2.6vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.04em]"
              lineClassNames={[undefined, "text-platinum"]}
              delay={0.1}
            />
            <Reveal className="relative" delay={0.2}>
              <p className="mt-6 max-w-[48ch] leading-relaxed text-platinum">{closing.description}</p>
              <Actions closing={closing} />
            </Reveal>
          </div>
          <div className="relative min-h-[16rem] lg:col-span-5 lg:min-h-[28rem]">
            <ImageReveal className="absolute inset-0" from="left" drift={8}>
              <Image
                src={img.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Closing CTA — layout chosen per sector so pages do not repeat one composition. */
export function SectorClosing({ data }: { data: SectorPageData }) {
  return data.closing.layout === "glass" ? (
    <GlassClosing closing={data.closing} />
  ) : (
    <SplitClosing closing={data.closing} />
  );
}
