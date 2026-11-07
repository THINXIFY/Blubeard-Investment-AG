import Image from "next/image";
import { PhotoNote } from "@/components/ui/PhotoNote";
import { teamPage } from "@/content/team";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";

/**
 * Leadership philosophy — the one Obsidian section. Two towers standing side by side fill the
 * right half with a slow parallax, fading into the dark; the statement and three principles sit left.
 */
export function TeamPhilosophy() {
  const { philosophy } = teamPage;
  const img = images[philosophy.image];

  return (
    <section
      data-tone="dark"
      aria-labelledby="team-philosophy-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      {/* Photograph — right half on desktop, top band on smaller screens */}
      <div className="relative h-72 sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]">
        <ImageReveal className="absolute inset-0" mode="zoom" drift={14}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            placeholder="blur"
            className="object-cover object-[40%_30%]"
          />
        </ImageReveal>
        <PhotoNote image={img} className="top-3 bottom-auto" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-obsidian),rgb(16_19_32/0.35)_60%,rgb(16_19_32/0.55))] lg:bg-[linear-gradient(90deg,var(--color-obsidian)_0%,rgb(16_19_32/0.55)_35%,rgb(16_19_32/0.15)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(40%_50%_at_70%_30%,rgb(18_72_216/0.25),transparent_70%)]"
        />
      </div>

      <Container className="relative py-14 md:py-16 lg:py-24">
        <div className="lg:w-1/2 lg:pr-8">
          <Reveal>
            <Eyebrow tone="dark">{philosophy.eyebrow}</Eyebrow>
          </Reveal>
          <MaskedHeading
            id="team-philosophy-title"
            lines={philosophy.heading}
            className="mt-6 font-display text-[clamp(2rem,1rem+2.4vw,3.25rem)] leading-[1.03] font-medium tracking-[-0.042em]"
            lineClassNames={[undefined, "text-platinum"]}
          />
          <Reveal delay={0.15}>
            <ScrollWords text={philosophy.description} className="mt-6 max-w-[44ch] text-lead text-white/80" />
          </Reveal>

          <Reveal as="ol" stagger={0.12} className="mt-10 border-t border-white/12">
            {philosophy.pillars.map((p, i) => (
              <li
                key={p}
                data-reveal-item
                className="group/pl relative flex items-baseline gap-6 border-b border-white/12 py-4.5"
              >
                <span aria-hidden className="w-6 text-xs font-medium text-imperial-300 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[1.375rem] font-medium tracking-[-0.025em] transition-transform duration-700 ease-expo group-hover/pl:translate-x-1.5">
                  {p}
                </span>
                <span
                  aria-hidden
                  className="absolute bottom-[-1px] left-0 h-px w-0 bg-imperial-300 transition-[width] duration-700 ease-expo group-hover/pl:w-full"
                />
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
