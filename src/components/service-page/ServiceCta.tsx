import Image from "next/image";
import Link from "next/link";
import type { ServicePageData } from "@/content/service-pages";
import { serviceEntries } from "@/content/services";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Contact — full-width architectural photograph under a restrained Obsidian overlay, one statement,
 * one prominent action. A quiet row of related areas of expertise closes the page.
 */
export function ServiceCta({ data }: { data: ServicePageData }) {
  const { contact } = data;
  const img = images[contact.image];
  const related = data.related
    .map((slug) => serviceEntries.find((s) => s.slug === slug))
    .filter((s): s is (typeof serviceEntries)[number] => Boolean(s));

  return (
    <section
      data-tone="dark"
      aria-labelledby="service-contact-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <ImageReveal className="absolute inset-0 -z-10" mode="zoom" drift={10}>
        <Image
          src={img.src}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition: contact.position }}
        />
      </ImageReveal>
      <div aria-hidden className="absolute inset-0 -z-10 bg-obsidian/72" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_50%_45%,transparent,rgb(16_19_32/0.5))]"
      />

      <Container className="pt-20 pb-10 md:pt-24 lg:pt-28">
        <div className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <MaskedHeading
            id="service-contact-title"
            lines={[contact.heading]}
            className="font-display text-[clamp(2rem,1.3rem+2.2vw,3.25rem)] leading-[1.06] font-medium tracking-[-0.04em] text-balance"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-[46ch] text-lead text-white/80">{contact.description}</p>
            <Button href={contact.cta.href} tone="dark" size="lg" arrow className="mt-9">
              {contact.cta.label}
            </Button>
          </Reveal>
        </div>

        {related.length ? (
          <Reveal delay={0.25} className="mt-16 border-t border-white/15 pt-6 md:mt-20">
            <nav aria-label="Related expertise" className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
              <p className="text-[0.6875rem] font-medium tracking-[0.2em] text-platinum uppercase">Related expertise</p>
              <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={s.href ?? `/services#service-${s.slug}`}
                      className="group/rel inline-flex items-center gap-2 text-sm text-white/85 transition-colors duration-300 hover:text-white"
                    >
                      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-700 ease-expo group-hover/rel:bg-[length:100%_1px]">
                        {s.title}
                      </span>
                      <span
                        aria-hidden
                        className="text-imperial-300 transition-transform duration-500 group-hover/rel:translate-x-0.5"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
