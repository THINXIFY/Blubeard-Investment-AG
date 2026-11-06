import Image from "next/image";
import { servicesPage } from "@/content/services";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Advisory philosophy — compact Obsidian section: a framed night-time architectural photograph
 * with gentle parallax beside three principles revealed in sequence. No pinning.
 */
export function ServicesPhilosophy() {
  const { philosophy } = servicesPage;
  const img = images[philosophy.image];

  return (
    <section
      data-tone="dark"
      aria-labelledby="services-philosophy-title"
      className="relative isolate overflow-hidden bg-obsidian py-20 text-white md:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_20%_50%,rgb(18_72_216/0.18),transparent_70%)]"
      />

      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Framed photograph */}
          <div className="relative lg:col-span-6">
            <div aria-hidden className="absolute -inset-3 rounded-md border border-white/10 md:-inset-4" />
            <ImageReveal className="aspect-[4/3] w-full rounded-md md:aspect-[16/11] lg:aspect-[5/6]" drift={14}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </ImageReveal>
            <span aria-hidden className="absolute -bottom-3 left-8 h-[3px] w-24 bg-imperial md:-bottom-4" />
          </div>

          {/* Statement + principles */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <Eyebrow tone="dark">{philosophy.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="services-philosophy-title"
              lines={philosophy.heading}
              className="mt-6 font-display text-[clamp(2.25rem,1.3rem+2.6vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.045em]"
              lineClassNames={[undefined, "text-platinum", "text-platinum"]}
            />
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-[44ch] text-lead text-platinum">{philosophy.lead}</p>
            </Reveal>

            <Reveal as="ol" stagger={0.12} className="mt-10 border-t border-white/10">
              {philosophy.principles.map((p, i) => (
                <li
                  key={p.title}
                  data-reveal-item
                  className="group/pr grid grid-cols-[3rem_1fr] gap-x-4 border-b border-white/10 py-6"
                >
                  <span className="pt-1 text-sm font-medium text-imperial-300 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-platinum">{p.text}</p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
