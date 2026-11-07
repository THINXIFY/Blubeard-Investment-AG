import Image from "next/image";
import { servicesPage } from "@/content/services";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";

/**
 * Advisory philosophy: a boardroom photograph that matches the height of the copy, beside a short statement and
 * the three principles as a ledger. A row's Imperial rule extends on hover; every principle is always readable.
 */
export function ServicesPhilosophy() {
  const { philosophy } = servicesPage;
  const img = images[philosophy.image];

  return (
    <section
      data-tone="dark"
      aria-labelledby="services-philosophy-title"
      className="relative isolate overflow-hidden bg-obsidian py-16 text-white md:py-20"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_15%_50%,rgb(18_72_216/0.18),transparent_70%)]"
      />

      <Container>
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-14">
          <div className="relative min-h-[15rem] sm:min-h-[20rem] lg:col-span-5 lg:min-h-0">
            <ImageReveal bars className="absolute inset-0 rounded-md" drift={8}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                placeholder="blur"
                className="object-cover object-[45%_50%] saturate-[0.72]"
              />
            </ImageReveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="dark">{philosophy.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="services-philosophy-title"
              lines={philosophy.heading}
              className="mt-5 font-display text-[clamp(2.125rem,1.65rem+1.7vw,3.125rem)] leading-[1.06] font-medium tracking-[-0.035em]"
              lineClassNames={[undefined, "text-platinum"]}
            />
            <Reveal delay={0.15}>
              <ScrollWords
                text={philosophy.lead}
                className="mt-5 max-w-[52ch] leading-relaxed text-platinum md:text-[1.0625rem]"
              />
            </Reveal>

            <Reveal as="ul" stagger={0.1} className="mt-8 border-b border-white/15">
              {philosophy.principles.map((p) => (
                <li
                  key={p.title}
                  data-reveal-item
                  className="group/pr relative grid gap-1.5 border-t border-white/15 py-5 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-8"
                >
                  <span
                    aria-hidden
                    className="absolute -top-px left-0 h-px w-10 bg-imperial-300 transition-[width] duration-700 ease-expo group-hover/pr:w-full motion-reduce:transition-none"
                  />
                  <h3 className="font-display text-[1.1875rem] leading-snug font-medium tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <p className="leading-relaxed text-platinum">{p.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
