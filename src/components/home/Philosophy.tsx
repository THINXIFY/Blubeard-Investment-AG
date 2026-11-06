import { philosophy } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { PhilosophyMotion } from "./PhilosophyMotion";

/** Architectural colonnade drawn in perspective — decorative depth layer. */
function Colonnade() {
  const cols = Array.from({ length: 8 }, (_, i) => i);
  return (
    <svg aria-hidden viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="col-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c5cbd6" stopOpacity="0" />
          <stop offset="0.45" stopColor="#c5cbd6" stopOpacity="0.1" />
          <stop offset="1" stopColor="#c5cbd6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {cols.map((i) => {
        // Columns converge toward a vanishing point to suggest an architectural hall.
        const x = 100 + 171 * i;
        const top = 700 + (x - 700) * 0.62;
        // pathLength=1 lets the motion layer draw each line in with a normalised dash offset.
        return (
          <line
            key={i}
            data-col
            x1={x}
            y1={900}
            x2={top}
            y2={0}
            stroke="url(#col-fade)"
            strokeWidth="1"
            pathLength={1}
            strokeDasharray="1"
          />
        );
      })}
      <line x1="0" y1="620" x2="1400" y2="620" stroke="#c5cbd6" strokeOpacity="0.06" />
      <line x1="0" y1="300" x2="1400" y2="300" stroke="#c5cbd6" strokeOpacity="0.04" />
    </svg>
  );
}

/** Investment philosophy — cinematic Obsidian section with three pillars. */
export function Philosophy() {
  return (
    <section
      id="philosophy"
      data-tone="dark"
      aria-labelledby="philosophy-title"
      className="relative isolate overflow-hidden bg-obsidian py-24 text-white md:py-32 lg:py-40"
    >
      <PhilosophyMotion>
        {/* Depth layers */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div
            data-light
            className="absolute inset-0 bg-[radial-gradient(60%_55%_at_78%_8%,rgb(18_72_216/0.32),transparent_70%)]"
          />
          <Parallax amount={10} className="absolute inset-x-0 -inset-y-20 opacity-90">
            <Colonnade />
          </Parallax>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />
        </div>

        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <Reveal>
                <Eyebrow tone="dark">{philosophy.eyebrow}</Eyebrow>
              </Reveal>
              <MaskedHeading
                id="philosophy-title"
                lines={philosophy.heading}
                className="mt-8 text-display"
                lineClassNames={[undefined, "text-platinum/70"]}
                delay={0.1}
              />
            </div>
            <Reveal stagger className="flex flex-col gap-6 lg:col-span-4 lg:pt-24">
              <p data-reveal-item className="text-lead text-platinum">
                {philosophy.description}
              </p>
              <p data-reveal-item className="leading-relaxed text-mist">
                {philosophy.intro}
              </p>
            </Reveal>
          </div>

          <Reveal
            stagger={0.14}
            as="ol"
            className="mt-20 grid gap-y-12 md:grid-cols-3 lg:mt-28"
            id="philosophy-pillars"
          >
            {philosophy.pillars.map((pillar, i) => (
              <li
                key={pillar.title}
                data-reveal-item
                className="group/pillar relative pt-10 md:px-8 md:pt-0 first:md:pl-0 lg:px-10"
              >
                {/* Hairline dividers that draw in: horizontal on mobile, vertical on desktop */}
                <span
                  aria-hidden
                  data-rule
                  className="absolute inset-x-0 top-0 h-px origin-left bg-white/15 md:hidden"
                />
                {i > 0 ? (
                  <span
                    aria-hidden
                    data-rule
                    className="absolute inset-y-0 left-0 hidden w-px origin-top bg-white/15 md:block"
                  />
                ) : null}
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-16 bg-imperial-300 transition-[width] duration-700 ease-expo group-hover/pillar:w-full md:hidden"
                />
                <span
                  aria-hidden
                  className="font-display text-[3.5rem] leading-none font-medium tracking-[-0.04em] text-white/15 tabular-nums transition-colors duration-700 ease-expo group-hover/pillar:text-imperial-300 lg:text-[4.5rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-heading text-white">{pillar.title}</h3>
                <p className="mt-4 max-w-[34ch] leading-relaxed text-platinum">{pillar.text}</p>
              </li>
            ))}
          </Reveal>

          <div className="mt-20 flex border-t border-white/10 pt-10 lg:mt-24">
            <Button href={philosophy.cta.href} tone="dark" size="lg" arrow>
              {philosophy.cta.label}
            </Button>
          </div>
        </Container>
      </PhilosophyMotion>
    </section>
  );
}
