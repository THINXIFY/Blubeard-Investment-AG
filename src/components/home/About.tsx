import Image from "next/image";
import { about } from "@/content/home";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";

/**
 * Company introduction — asymmetric editorial composition.
 * The headline leads from the left; a tall architectural photograph is dropped lower on the right,
 * with a small Engadin view set into its corner as the Swiss anchor. A single hairline runs down the
 * gutter. On small screens everything stacks: headline, image, then copy.
 */
export function About() {
  const img = images[about.image];
  const inset = images.aboutEngadin;

  return (
    <section
      id="about"
      data-tone="light"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-36"
    >
      <Container className="relative">
        {/* Gutter hairline */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-[62.5%] hidden w-px bg-gradient-to-b from-transparent via-line-strong to-transparent lg:block"
        />

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-y-10">
          {/* Headline */}
          <Reveal stagger className="md:col-span-12 lg:col-span-7 lg:row-start-1">
            <div data-reveal-item>
              <Eyebrow>{about.eyebrow}</Eyebrow>
            </div>
            <MaskedHeading
              id="about-title"
              lines={about.heading}
              className="mt-7 font-display text-[clamp(2.125rem,1.4rem+2.2vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.035em] text-ink"
              lineClassNames={[undefined, "text-slate/80"]}
            />
          </Reveal>

          {/* Photograph with Swiss inset */}
          <figure className="relative mb-10 sm:mx-auto sm:w-4/5 md:col-span-5 md:row-start-2 md:mx-0 md:mb-0 md:w-auto lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-20">
            <ImageReveal bars className="aspect-[4/5] w-full rounded-sm lg:aspect-[10/12.6]" drift={7}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 80vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </ImageReveal>

            <Reveal
              delay={0.5}
              y={18}
              className="absolute right-4 -bottom-9 aspect-[4/3] w-[44%] max-w-[15rem] overflow-hidden rounded-sm border-[5px] border-white shadow-[0_18px_40px_-18px_rgb(16_19_32/0.45)] sm:-right-6 md:-right-5 lg:right-auto lg:-left-12"
            >
              <Image
                src={inset.src}
                alt={inset.alt}
                fill
                sizes="(min-width: 1024px) 14rem, 40vw"
                placeholder="blur"
                className="object-cover object-[50%_60%]"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/75 to-transparent px-2.5 pt-6 pb-2 text-[0.5625rem] font-medium tracking-[0.14em] text-white uppercase"
              >
                Upper Engadin
              </span>
            </Reveal>

            {img.caption ? (
              <figcaption className="mt-4 flex items-center justify-start gap-3 text-[0.6875rem] tracking-[0.16em] text-slate uppercase lg:justify-end">
                {img.caption}
                <span aria-hidden className="hidden h-px w-6 bg-line-strong lg:block" />
              </figcaption>
            ) : null}
          </figure>

          {/* Statement and supporting copy */}
          <Reveal
            stagger
            className="flex flex-col md:col-span-7 md:row-start-2 md:self-start lg:col-span-6 lg:col-start-1 lg:self-end lg:pr-6 lg:pb-12"
          >
            <p
              data-reveal-item
              className="max-w-[34ch] border-l-2 border-imperial pl-5 font-display text-[clamp(1.25rem,1.05rem+0.75vw,1.625rem)] leading-[1.42] font-medium tracking-[-0.018em] text-ink lg:pl-6"
            >
              {about.lead}
            </p>
            <div className="mt-9 grid gap-6 text-[0.9375rem] leading-relaxed text-slate sm:grid-cols-2 sm:gap-8 md:grid-cols-1 md:gap-5 lg:grid-cols-2 lg:gap-8">
              {about.body.map((para) => (
                <p data-reveal-item key={para}>
                  {para}
                </p>
              ))}
            </div>
            <div data-reveal-item className="mt-10 flex items-center gap-6">
              <Button href={about.cta.href} variant="secondary" arrow>
                {about.cta.label}
              </Button>
              <span aria-hidden className="hidden h-px flex-1 bg-line sm:block" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
