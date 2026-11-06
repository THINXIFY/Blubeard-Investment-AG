import Image from "next/image";
import { contact } from "@/content/home";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Closing statement: a full-bleed blue-hour skyline with the message on its dark side, running into the footer. */
export function ContactCta() {
  const img = images.peq1;

  return (
    <section
      id="contact"
      data-tone="dark"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <ImageReveal className="absolute inset-0 -z-10" mode="zoom" drift={6}>
        <Image src={img.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover object-[68%_50%]" />
      </ImageReveal>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(16_19_32/0.94)_0%,rgb(16_19_32/0.82)_42%,rgb(16_19_32/0.18)_80%,rgb(16_19_32/0.1)_100%)] max-lg:bg-[linear-gradient(to_top,rgb(16_19_32/0.96)_0%,rgb(16_19_32/0.84)_60%,rgb(16_19_32/0.45)_100%)]"
      />

      <Container className="py-20 md:py-24 lg:py-28">
        <div className="max-w-[40rem]">
          <Reveal>
            <Eyebrow tone="dark">{contact.eyebrow}</Eyebrow>
          </Reveal>
          <MaskedHeading
            id="contact-title"
            lines={contact.heading}
            className="mt-7 font-display text-[clamp(2.25rem,1.5rem+3vw,4.25rem)] leading-[1.03] font-medium tracking-[-0.04em]"
            lineClassNames={[undefined, "text-imperial-300"]}
            delay={0.1}
          />
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-[50ch] leading-relaxed text-platinum md:text-[1.0625rem]">{contact.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={contact.primaryCta.href} size="lg" tone="dark" arrow>
                {contact.primaryCta.label}
              </Button>
              <Button href={contact.secondaryCta.href} size="lg" variant="secondary" tone="dark">
                {contact.secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
