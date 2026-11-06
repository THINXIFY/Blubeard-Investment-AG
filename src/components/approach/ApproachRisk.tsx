import Image from "next/image";
import { approachPage } from "@/content/approach";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Risk & responsibility — the page's dramatic Obsidian moment. A night photograph of sculpted
 * architecture mirrored in water drifts slowly behind a deep overlay; the statement sits centred
 * and three commitments rest on frosted panels along a blue-lit horizon line.
 */
export function ApproachRisk() {
  const { risk } = approachPage;
  const img = images[risk.image];

  return (
    <section
      data-tone="dark"
      aria-labelledby="approach-risk-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <ImageReveal className="absolute inset-0 -z-10" mode="zoom" drift={14}>
        <Image src={img.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover object-[50%_60%]" />
      </ImageReveal>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(16_19_32/0.92)_0%,rgb(16_19_32/0.62)_40%,rgb(16_19_32/0.72)_70%,rgb(16_19_32/0.96)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_68%,rgb(18_72_216/0.35),transparent_70%)]"
      />

      <Container className="py-20 md:py-24 lg:py-28">
        <div className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
          <Reveal>
            <Eyebrow tone="dark">{risk.eyebrow}</Eyebrow>
          </Reveal>
          <MaskedHeading
            id="approach-risk-title"
            lines={risk.heading}
            className="mt-6 font-display text-[clamp(2.25rem,1.3rem+2.8vw,4rem)] leading-[1.03] font-medium tracking-[-0.042em]"
            lineClassNames={[undefined, "text-platinum"]}
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-7 max-w-[48ch] text-lead text-white/80">{risk.description}</p>
          </Reveal>
        </div>

        {/* Horizon line */}
        <div aria-hidden className="relative mx-auto mt-16 h-px max-w-[60rem] lg:mt-20">
          <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgb(138_166_239/0.7),transparent)]" />
          <span className="absolute inset-x-[20%] -top-6 h-12 bg-[radial-gradient(50%_50%_at_50%_50%,rgb(18_72_216/0.35),transparent)] blur-md" />
        </div>

        <Reveal as="ul" stagger={0.12} className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12 lg:gap-5">
          {risk.items.map((item, i) => (
            <li
              key={item.title}
              data-reveal-item
              className="group/rk relative overflow-hidden rounded-md border border-white/10 bg-white/[0.05] p-7 backdrop-blur-md transition-[border-color,background-color] duration-700 hover:border-imperial-300/40 hover:bg-white/[0.08] lg:p-8"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-imperial-300 transition-transform duration-700 ease-expo group-hover/rk:scale-x-100"
              />
              <span aria-hidden className="text-xs font-medium tracking-[0.18em] text-imperial-300 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-platinum">{item.text}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
