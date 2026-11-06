import { approach } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ApproachExplorer } from "./ApproachExplorer";

/** Strategic approach — interactive four-stage selector with a contextual photograph. */
export function Approach() {
  return (
    <Section id="approach" tone="porcelain" spacing="md" aria-labelledby="approach-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal className="lg:col-span-7">
          <SectionHeading id="approach-title" eyebrow={approach.eyebrow} title={approach.heading} mutedLine={1} />
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
          <p className="text-[0.9375rem] leading-relaxed text-slate md:text-base">{approach.description}</p>
        </Reveal>
      </div>

      <Reveal className="mt-12 lg:mt-16" delay={0.1}>
        <ApproachExplorer />
      </Reveal>

      <div className="mt-12 flex justify-start lg:mt-14">
        <Button href={approach.cta.href} size="lg" arrow>
          {approach.cta.label}
        </Button>
      </div>
    </Section>
  );
}
