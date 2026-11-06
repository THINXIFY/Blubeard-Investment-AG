import Image from "next/image";
import { investmentsPage } from "@/content/investments";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { LineDraw } from "@/components/motion/LineDraw";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Introduction — editorial statement wrapped around an arch-cropped tower photograph,
 * with three "lenses" set as a drawn index. Not a standard text/image split.
 */
export function InvestmentsIntro() {
  const { intro } = investmentsPage;
  const img = images[intro.image];

  return (
    <section
      id="perspective"
      data-tone="light"
      aria-labelledby="intro-title"
      className="bg-white py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Statement */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{intro.eyebrow}</Eyebrow>
              <h2 id="intro-title" className="mt-6 text-heading-lg">
                {intro.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 font-display text-[clamp(1.375rem,1.1rem+1vw,2rem)] leading-[1.3] font-medium tracking-[-0.02em] text-ink">
                {intro.lead}
              </p>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-slate">{intro.body}</p>
            </Reveal>

            <LineDraw as="ol" className="mt-10 grid border-t border-line sm:grid-cols-3">
              {intro.lenses.map((lens, i) => (
                <li
                  key={lens}
                  className="group/lens relative border-b border-line py-5 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:[&+li]:border-l"
                >
                  <span
                    aria-hidden
                    data-rule
                    className="absolute -top-px left-0 h-0.5 w-12 origin-left bg-imperial transition-[width] duration-700 ease-expo group-hover/lens:w-full"
                  />
                  <span aria-hidden className="text-xs font-medium text-imperial tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 font-display text-lg font-semibold tracking-[-0.015em] text-ink">{lens}</p>
                </li>
              ))}
            </LineDraw>
          </div>

          {/* Arch-cropped focal image */}
          <div className="relative mx-auto w-full max-w-[26rem] lg:col-span-4 lg:col-start-9 lg:max-w-none">
            <div aria-hidden className="absolute -inset-4 rounded-t-full border border-line-strong/70" />
            <ImageReveal className="aspect-[3/4] w-full rounded-t-full rounded-b-md" drift={10}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 26rem"
                placeholder="blur"
                className="object-cover"
              />
            </ImageReveal>
            <Reveal className="absolute -bottom-6 -left-4 sm:-left-10" delay={0.3}>
              <div className="rounded-md bg-obsidian px-5 py-4 text-white shadow-[0_24px_60px_-28px_rgb(16_19_32/0.7)]">
                <p className="text-eyebrow text-platinum">Focus</p>
                <p className="mt-1.5 font-display text-lg font-semibold tracking-[-0.015em]">Established × Emerging</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
