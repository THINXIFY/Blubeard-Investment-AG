import Image from "next/image";
import { partnersPage } from "@/content/partners";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Editorial spread: a tall Swiss viaduct photograph beside the statement, with four values set between fine rules. */
export function PartnersPhilosophy() {
  const { philosophy } = partnersPage;
  const img = images[philosophy.image];

  return (
    <section
      data-tone="light"
      aria-labelledby="partners-philosophy-title"
      className="bg-porcelain py-16 md:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-9 lg:grid-cols-12 lg:items-center lg:gap-12">
          <figure className="lg:col-span-6">
            <ImageReveal className="relative aspect-[4/3] overflow-hidden rounded-md lg:aspect-[5/6]" drift={8}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1360px) 620px, (min-width: 1024px) 48vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </ImageReveal>
            {img.caption ? <figcaption className="mt-3 text-xs text-slate">{img.caption}</figcaption> : null}
          </figure>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <Eyebrow>{philosophy.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="partners-philosophy-title"
              lines={philosophy.heading}
              className="mt-6 font-display text-[clamp(2.125rem,1.3rem+2.4vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.042em] text-ink"
              lineClassNames={[undefined, "text-imperial"]}
            />
            <Reveal delay={0.15} className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-slate">
              {philosophy.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
            <Reveal as="ul" stagger={0.08} className="mt-8 grid border-t border-line-strong sm:grid-cols-2 sm:gap-x-8">
              {philosophy.values.map((value) => (
                <li
                  key={value}
                  data-reveal-item
                  className="border-b border-line-strong py-3.5 font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink"
                >
                  {value}
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
