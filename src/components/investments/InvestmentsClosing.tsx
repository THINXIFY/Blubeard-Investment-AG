import Image from "next/image";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { investmentsPage } from "@/content/investments";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Closing CTA — full-bleed architectural photograph with centred statement and two actions. */
export function InvestmentsClosing() {
  const { closing } = investmentsPage;
  const img = images[closing.image];

  return (
    <section
      data-tone="dark"
      aria-labelledby="inv-closing-title"
      className="relative isolate overflow-hidden bg-obsidian py-24 text-white md:py-32 lg:py-36"
    >
      <ImageReveal className="absolute inset-0 -z-10" mode="zoom" drift={12}>
        <Image src={img.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
      </ImageReveal>
      <div aria-hidden className="absolute inset-0 -z-10 bg-obsidian/75" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_50%_100%,rgb(18_72_216/0.35),transparent_70%)]"
      />

      <PhotoNote image={img} className="right-5 sm:right-8 lg:right-12" />
      <Container className="text-center">
        <Reveal className="flex justify-center">
          <Eyebrow tone="dark">{closing.eyebrow}</Eyebrow>
        </Reveal>
        <MaskedHeading
          id="inv-closing-title"
          lines={closing.heading}
          className="mx-auto mt-7 font-display text-[clamp(2.4rem,1.3rem+4vw,4.75rem)] leading-[1.02] font-medium tracking-[-0.045em]"
          lineClassNames={[undefined, "text-platinum"]}
          delay={0.1}
        />
        <Reveal delay={0.25}>
          <p className="mx-auto mt-7 max-w-[50ch] text-lead text-platinum">{closing.description}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
      </Container>
    </section>
  );
}
