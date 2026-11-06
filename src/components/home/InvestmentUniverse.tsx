import { investments } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IndustryExplorer } from "./IndustryExplorer";

/** Investment universe — twelve industries with sector filtering. */
export function InvestmentUniverse() {
  return (
    <Section id="investments" tone="light" spacing="md" divider aria-labelledby="investments-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal className="lg:col-span-6">
          <SectionHeading
            id="investments-title"
            eyebrow={investments.eyebrow}
            title={investments.heading}
            mutedLine={1}
          />
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.15}>
          <p className="text-lead text-slate">{investments.description}</p>
        </Reveal>
      </div>

      <div className="mt-12 lg:mt-14">
        <IndustryExplorer />
      </div>

      <div className="mt-14 flex justify-center lg:mt-16">
        <Button href={investments.cta.href} variant="secondary" size="lg" arrow>
          {investments.cta.label}
        </Button>
      </div>
    </Section>
  );
}
