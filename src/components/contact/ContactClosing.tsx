import Image from "next/image";
import { contactPage } from "@/content/contact";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Closing statement — a compact Obsidian band: an Engadin village at night drifting slowly behind
 * a deep overlay, the statement left and one prominent Email Us action right.
 */
export function ContactClosing() {
  const { closing } = contactPage;
  const img = images[closing.image];

  return (
    <section
      data-tone="dark"
      aria-labelledby="contact-closing-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <ImageReveal className="absolute inset-0 -z-10" mode="zoom" drift={12}>
        <Image src={img.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover object-[50%_45%]" />
      </ImageReveal>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(16_19_32/0.94)_0%,rgb(16_19_32/0.78)_50%,rgb(16_19_32/0.6)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_60%_at_85%_50%,rgb(18_72_216/0.3),transparent_70%)]"
      />

      <Container className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <MaskedHeading
              id="contact-closing-title"
              lines={closing.heading}
              className="font-display text-[clamp(2.25rem,1.3rem+2.8vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.042em]"
              lineClassNames={[undefined, "text-platinum"]}
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[50ch] text-lead text-white/80">{closing.description}</p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:justify-self-end" delay={0.3}>
            <Button href={closing.cta.href} tone="dark" size="lg" arrow className="h-16 px-9 text-base">
              {closing.cta.label}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
