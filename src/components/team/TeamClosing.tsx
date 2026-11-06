import Image from "next/image";
import { teamPage } from "@/content/team";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Closing — an Engadin landmark (Chesa Futura, St. Moritz) as a full-bleed band. A centred invitation;
 * one action; the office location as a quiet sign-off.
 */
export function TeamClosing() {
  const { closing } = teamPage;
  const img = images[closing.image];

  return (
    <section
      data-tone="dark"
      aria-labelledby="team-closing-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <ImageReveal className="absolute inset-0 -z-10" mode="zoom" drift={12}>
        <Image src={img.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover object-[45%_55%]" />
      </ImageReveal>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_75%_at_50%_50%,rgb(16_19_32/0.62)_0%,rgb(16_19_32/0.86)_100%)]"
      />

      <Container className="flex min-h-[26rem] flex-col items-center justify-center py-16 text-center md:min-h-[28rem]">
        <Reveal>
          <Eyebrow tone="dark">{closing.eyebrow}</Eyebrow>
        </Reveal>
        <MaskedHeading
          id="team-closing-title"
          lines={closing.heading}
          className="mt-6 font-display text-[clamp(1.875rem,1.15rem+3vw,4rem)] leading-[1.03] font-medium tracking-[-0.042em]"
          lineClassNames={[undefined, "text-platinum"]}
        />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-[44ch] text-lead text-white/80">{closing.description}</p>
          <Button href={closing.cta.href} tone="dark" size="lg" arrow className="mt-9">
            {closing.cta.label}
          </Button>
          <p className="mt-10 text-[0.6875rem] font-medium tracking-[0.22em] text-platinum uppercase">
            {site.name} · {site.address.locality}, {site.address.country}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
