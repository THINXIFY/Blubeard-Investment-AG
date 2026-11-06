import Image from "next/image";
import { servicesPage } from "@/content/services";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { LineDraw } from "@/components/motion/LineDraw";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Expertise introduction — editorial statement beside one large, classically composed photograph,
 * closed by a ruled row of the three disciplines behind every engagement.
 */
export function ServicesIntro() {
  const { intro } = servicesPage;
  const img = images[intro.image];

  return (
    <section
      id="services-intro"
      data-tone="light"
      aria-labelledby="services-intro-title"
      className="bg-white py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{intro.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="services-intro-title"
              lines={intro.heading}
              className="mt-6 text-heading-lg"
              lineClassNames={[undefined, "text-slate"]}
            />
            <Reveal delay={0.15}>
              <p className="mt-8 font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] leading-[1.35] font-medium tracking-[-0.02em] text-ink">
                {intro.lead}
              </p>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-slate">{intro.body}</p>
            </Reveal>
          </div>

          <figure className="lg:col-span-7">
            <ImageReveal className="aspect-[3/2] w-full rounded-md" drift={8}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </ImageReveal>
          </figure>
        </div>

        <LineDraw as="ul" className="mt-16 grid border-t border-line lg:mt-20 lg:grid-cols-3">
          {intro.disciplines.map((d, i) => (
            <li
              key={d.title}
              className="group/disc relative flex gap-5 border-b border-line py-7 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:[&+li]:border-l"
            >
              <span
                aria-hidden
                data-rule
                className={`absolute -top-px left-0 h-0.5 w-10 origin-left bg-imperial transition-[width] duration-700 ease-expo group-hover/disc:w-[calc(100%-2rem)] ${i > 0 ? "lg:left-8" : ""}`}
              />
              <span aria-hidden className="font-display text-[2rem] leading-none font-light text-imperial tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-display text-lg font-semibold tracking-[-0.015em] text-ink">{d.title}</span>
                <span className="mt-1.5 block leading-relaxed text-slate">{d.text}</span>
              </span>
            </li>
          ))}
        </LineDraw>
      </Container>
    </section>
  );
}
