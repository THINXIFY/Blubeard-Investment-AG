import { partnersPage } from "@/content/partners";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Partnership enquiries: a compact Obsidian band with one action and the corporate email. */
export function PartnersClosing() {
  const { closing } = partnersPage;

  return (
    <section
      data-tone="dark"
      aria-labelledby="partners-closing-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_90%_at_90%_50%,rgb(18_72_216/0.34),transparent_70%)]"
      />
      <Container className="py-16 md:py-20">
        <div className="grid gap-9 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow tone="dark">{closing.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="partners-closing-title"
              lines={closing.heading}
              className="mt-6 font-display text-[clamp(2.125rem,1.25rem+2.6vw,3.75rem)] leading-[1.04] font-medium tracking-[-0.042em]"
              lineClassNames={[undefined, "text-platinum"]}
            />
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-[50ch] text-lead text-white/80">{closing.description}</p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-4 lg:justify-self-end lg:text-right" delay={0.25}>
            <Button href={closing.cta.href} tone="dark" size="lg" arrow>
              {closing.cta.label}
            </Button>
            <p className="mt-4 text-sm text-platinum">
              Or write to{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-white underline decoration-white/35 underline-offset-4 transition-colors duration-300 hover:decoration-white"
              >
                {site.email}
              </a>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
