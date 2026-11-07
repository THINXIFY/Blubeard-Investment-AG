import Image from "next/image";
import { aboutPage } from "@/content/about";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";

/** Who we are — copy left; layered architectural photographs right with a floating location tag. */
export function AboutIntro() {
  const { intro } = aboutPage;
  const main = images[intro.image];
  const detail = images[intro.detailImage];

  return (
    <section
      id="who-we-are"
      data-tone="light"
      aria-labelledby="intro-title"
      className="bg-white py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Copy */}
          <div className="lg:col-span-6 lg:pr-8">
            <Reveal>
              <Eyebrow>{intro.eyebrow}</Eyebrow>
              <MaskedHeading
                id="intro-title"
                lines={intro.heading}
                className="mt-6 text-heading-lg"
                lineClassNames={[undefined, "text-slate/80"]}
              />
            </Reveal>
            <Reveal stagger className="mt-7 flex flex-col gap-5">
              <p data-reveal-item className="text-lead text-ink">
                {intro.lead}
              </p>
              {intro.body.map((para) => (
                <p data-reveal-item key={para} className="leading-relaxed text-slate">
                  {para}
                </p>
              ))}
              <ul data-reveal-item className="mt-2 grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
                {intro.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-sm font-medium text-ink">
                    <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-imperial-50">
                      <span className="size-1.5 rounded-full bg-imperial" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              <div data-reveal-item className="mt-3">
                <Button href={intro.cta.href} size="lg" arrow>
                  {intro.cta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Layered photographs */}
          <div className="relative lg:col-span-6">
            <figure className="relative ml-auto w-full sm:w-[86%]">
              <ImageReveal bars className="aspect-[4/3] w-full rounded-md sm:aspect-[5/6]" drift={8}>
                <Image
                  src={main.src}
                  alt={main.alt}
                  fill
                  sizes="(min-width: 1024px) 42vw, (min-width: 640px) 75vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </ImageReveal>
            </figure>

            {/* Detail photograph — set forward */}
            <Parallax amount={-12} className="absolute bottom-10 left-0 hidden w-[38%] sm:block lg:bottom-14">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md border-[8px] border-white shadow-[0_30px_70px_-30px_rgb(16_19_32/0.45)]">
                <Image
                  src={detail.src}
                  alt={detail.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, 30vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            </Parallax>

            {/* Location tag */}
            <Reveal className="absolute top-6 right-6 sm:top-8 sm:right-8" delay={0.3}>
              <div className="rounded-md bg-white/90 px-5 py-4 shadow-[0_20px_50px_-25px_rgb(16_19_32/0.5)] backdrop-blur">
                <p className="text-eyebrow text-slate">Headquarters</p>
                <p className="mt-1.5 font-display text-lg font-semibold tracking-[-0.015em] text-ink">
                  {site.address.locality}, CH
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
