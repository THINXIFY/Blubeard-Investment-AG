import Image from "next/image";
import { philosophy } from "@/content/home";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Investment philosophy: an asymmetric composition. The statement anchors the left; the three principles run
 * as a compact ledger on the right, over a darkened colonnade that bleeds off the page edge. Each ledger rule
 * carries a short Imperial segment that extends on hover. Every principle is always readable.
 */
export function Philosophy() {
  const img = images.apHero;

  return (
    <section
      id="philosophy"
      data-tone="dark"
      aria-labelledby="philosophy-title"
      className="relative isolate overflow-hidden bg-obsidian py-20 text-white md:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[30rem] lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-[64%]"
      >
        <ImageReveal className="absolute inset-0" mode="zoom" drift={8}>
          <Image
            src={img.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 64vw, 100vw"
            placeholder="blur"
            className="origin-bottom scale-[2] object-cover object-bottom"
          />
        </ImageReveal>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(16_19_32/0.8),rgb(16_19_32/0.9)_55%,var(--color-obsidian))] lg:bg-[linear-gradient(to_right,var(--color-obsidian),rgb(16_19_32/0.88)_30%,rgb(16_19_32/0.8))]" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(55%_60%_at_100%_100%,rgb(18_72_216/0.3),transparent_70%)] lg:block" />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow tone="dark">{philosophy.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="philosophy-title"
              lines={philosophy.heading}
              className="mt-7 font-display text-[clamp(2.125rem,1.65rem+1.7vw,3.125rem)] leading-[1.08] font-medium tracking-[-0.035em]"
              lineClassNames={[undefined, "text-platinum/70"]}
              delay={0.1}
            />
            <Reveal stagger className="mt-7 flex flex-col items-start gap-8 lg:mt-8">
              <p data-reveal-item className="max-w-[46ch] leading-relaxed text-platinum md:text-[1.0625rem]">
                {philosophy.description}
              </p>
              <div data-reveal-item>
                <Button href={philosophy.cta.href} tone="dark" size="lg" arrow>
                  {philosophy.cta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="max-w-[44ch] text-sm leading-relaxed text-platinum/85">{philosophy.intro}</p>
            </Reveal>
            <Reveal as="ul" stagger={0.12} className="mt-6 border-b border-white/15">
              {philosophy.pillars.map((pillar) => (
                <li
                  key={pillar.title}
                  data-reveal-item
                  className="group/pillar relative grid gap-2.5 border-t border-white/15 py-7 sm:grid-cols-[minmax(0,11.5rem)_1fr] sm:gap-8 lg:py-8"
                >
                  <span
                    aria-hidden
                    className="absolute -top-px left-0 h-px w-10 bg-imperial-300 transition-[width] duration-700 ease-expo group-hover/pillar:w-full motion-reduce:transition-none"
                  />
                  <h3 className="font-display text-[1.25rem] leading-[1.2] font-medium tracking-[-0.02em] text-white lg:text-[1.375rem]">
                    {pillar.title}
                  </h3>
                  <p className="leading-relaxed text-platinum transition-colors duration-500 group-hover/pillar:text-white">
                    {pillar.text}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
