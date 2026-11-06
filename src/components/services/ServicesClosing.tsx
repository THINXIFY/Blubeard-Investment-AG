import Image from "next/image";
import { servicesPage } from "@/content/services";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Closing — a blue-hour waterfront panorama left open in its upper half; the statement and
 * actions sit along the base in an editorial split, with the office address as a quiet sign-off.
 */
export function ServicesClosing() {
  const { closing } = servicesPage;
  const img = images[closing.image];
  const { address } = site;

  return (
    <section
      data-tone="dark"
      aria-labelledby="services-closing-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <ImageReveal className="absolute inset-0 -z-10" mode="zoom" drift={10}>
        <Image src={img.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover object-[50%_35%]" />
      </ImageReveal>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(16_19_32/0.97)_0%,rgb(16_19_32/0.82)_42%,rgb(16_19_32/0.25)_78%,rgb(16_19_32/0.4)_100%)]"
      />

      <Container className="flex min-h-[34rem] flex-col justify-end pt-40 pb-10 md:min-h-[40rem] lg:min-h-[44rem] lg:pb-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="dark">{closing.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="services-closing-title"
              lines={closing.heading}
              className="mt-6 font-display text-[clamp(2.6rem,1.3rem+4.4vw,5.5rem)] leading-[0.98] font-medium tracking-[-0.05em]"
              lineClassNames={[undefined, "text-platinum"]}
            />
          </div>
          <Reveal className="lg:col-span-5" delay={0.2}>
            <p className="max-w-[44ch] text-lead text-platinum">{closing.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
          </Reveal>
        </div>

        <Reveal
          delay={0.3}
          className="mt-14 flex flex-col gap-2 border-t border-white/15 pt-5 text-xs font-medium tracking-[0.16em] text-mist uppercase sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{site.name}</span>
          <span>
            {address.street} · {address.postalCode} {address.locality} · {address.country}
          </span>
        </Reveal>
      </Container>
    </section>
  );
}
