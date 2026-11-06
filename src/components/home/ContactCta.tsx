import Image from "next/image";
import { contact } from "@/content/home";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Closing contact section — a split composition: an Obsidian statement panel beside a crisp architectural
 * detail, with the company identity set on the photograph like a plate. Compact, no background grids.
 */
export function ContactCta() {
  const { address } = site;
  const img = images.aboutDetail;

  return (
    <section
      id="contact"
      data-tone="light"
      aria-labelledby="contact-title"
      className="relative bg-white py-16 md:py-24 lg:py-28"
    >
      <Container>
        <div data-tone="dark" className="grid overflow-hidden rounded-sm bg-obsidian text-white md:grid-cols-12">
          {/* Statement */}
          <div className="relative flex flex-col justify-between gap-12 p-7 sm:p-12 md:col-span-7 md:p-10 lg:p-16 lg:pr-12">
            <Reveal stagger className="flex flex-col">
              <div data-reveal-item>
                <Eyebrow tone="dark">{contact.eyebrow}</Eyebrow>
              </div>
              <MaskedHeading
                id="contact-title"
                lines={contact.heading}
                className="mt-8 font-display text-[clamp(2.125rem,1.35rem+3vw,4rem)] leading-[1.04] font-medium tracking-[-0.04em]"
                lineClassNames={[undefined, "text-imperial-300"]}
                delay={0.1}
              />
              <p data-reveal-item className="mt-8 max-w-[46ch] leading-relaxed text-platinum lg:mt-10">
                {contact.description}
              </p>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Button href={contact.primaryCta.href} size="lg" tone="dark" arrow>
                {contact.primaryCta.label}
              </Button>
              <Button href={contact.secondaryCta.href} size="lg" variant="secondary" tone="dark">
                {contact.secondaryCta.label}
              </Button>
            </Reveal>
          </div>

          {/* Architectural plate with company identity */}
          <figure className="relative min-h-[15rem] sm:min-h-[22rem] md:col-span-5 md:min-h-[28rem] lg:min-h-[32rem]">
            <ImageReveal className="absolute inset-0" drift={6} from="left">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </ImageReveal>
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_right,rgb(16_19_32/0.5),transparent_28%)] max-md:bg-[linear-gradient(to_bottom,rgb(16_19_32/0.45),transparent_30%)]"
            />
            <span aria-hidden className="absolute top-5 right-5 size-4 border-t border-r border-obsidian/40" />
            <figcaption className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8 lg:inset-x-8">
              <address className="rounded-sm bg-white/95 px-5 py-4 text-sm leading-relaxed text-slate not-italic shadow-[0_18px_40px_-20px_rgb(16_19_32/0.5)] backdrop-blur">
                <span className="block font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">
                  {site.name}
                </span>
                {address.street}, {address.postalCode} {address.locality}, {address.country}
              </address>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
