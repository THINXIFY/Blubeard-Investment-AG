import type { ServicePageData } from "@/content/service-pages";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineDraw } from "@/components/motion/LineDraw";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceIcon } from "./ServiceIcons";

/**
 * Strategic approach — three stages on one drawn line (horizontal on desktop, vertical when
 * stacked). Each stage: icon node, numeral, title and one sentence. No pinning, no long timeline.
 */
export function ServiceApproach({ data }: { data: ServicePageData }) {
  const { approach } = data;

  return (
    <section data-tone="light" aria-labelledby="service-approach-title" className="bg-porcelain py-20 md:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>{approach.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading id="service-approach-title" lines={[approach.heading]} className="mt-5 text-heading-lg" />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="text-lg leading-relaxed text-slate">{approach.description}</p>
          </Reveal>
        </div>

        <LineDraw as="ol" className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-14">
          {/* Connecting line through the nodes */}
          <span
            aria-hidden
            data-rule
            className="absolute top-6 right-[calc(100%/6)] left-[calc(100%/6)] hidden h-px origin-left bg-line-strong md:block"
          />
          <span aria-hidden className="absolute top-6 bottom-6 left-6 w-px bg-line-strong md:hidden" />

          {approach.steps.map((s, i) => (
            <li
              key={s.title}
              className="group/step relative flex gap-6 md:flex-col md:items-center md:gap-0 md:text-center"
            >
              <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border border-line-strong bg-white text-imperial transition-colors duration-500 group-hover/step:border-imperial group-hover/step:bg-imperial group-hover/step:text-white">
                <ServiceIcon name={s.icon} className="size-5" />
              </span>
              <div className="md:mt-6">
                <p className="text-xs font-medium tracking-[0.18em] text-imperial uppercase tabular-nums">
                  Stage {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2.5 font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.02em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-2.5 max-w-[32ch] leading-relaxed text-slate md:mx-auto">{s.text}</p>
              </div>
            </li>
          ))}
        </LineDraw>
      </Container>
    </section>
  );
}
