import { aboutPage } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LineDraw } from "@/components/motion/LineDraw";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";

/** Philosophy — compact Obsidian section: statement + three pillars with drawn architectural linework. */
export function AboutPhilosophy() {
  const { philosophy } = aboutPage;

  return (
    <section
      id="philosophy"
      data-tone="dark"
      aria-labelledby="philosophy-title"
      className="relative isolate overflow-hidden bg-obsidian py-20 text-white md:py-24 lg:py-28"
    >
      <LineDraw>
        {/* Architectural linework: arches + horizon, drawn on entry */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_100%_0%,rgb(18_72_216/0.32),transparent_70%)]" />
          <svg viewBox="0 0 1400 600" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
            <g fill="none" stroke="#c5cbd6">
              {[520, 420, 320].map((r, i) => (
                <path
                  key={r}
                  data-draw
                  d={`M ${1100 - r} 600 A ${r} ${r} 0 0 1 ${1100 + r} 600`}
                  strokeOpacity={0.06 + i * 0.03}
                  pathLength={1}
                  strokeDasharray="1"
                />
              ))}
            </g>
            <path
              data-draw
              d="M 680 600 A 420 420 0 0 1 1520 600"
              fill="none"
              stroke="#8aa6ef"
              strokeOpacity="0.4"
              pathLength={1}
              strokeDasharray="1"
            />
          </svg>
        </div>

        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow tone="dark">{philosophy.eyebrow}</Eyebrow>
              </Reveal>
              <MaskedHeading
                id="philosophy-title"
                lines={philosophy.heading}
                className="mt-6 text-heading-lg lg:text-[2.75rem]"
                lineClassNames={[undefined, "text-platinum/70"]}
                delay={0.1}
              />
            </div>
            <Reveal className="lg:col-span-5" delay={0.2}>
              <ScrollWords text={philosophy.description} className="leading-relaxed text-platinum lg:text-lg" />
            </Reveal>
          </div>

          <ol className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-16 lg:gap-5">
            {philosophy.pillars.map((p, i) => (
              <Reveal
                key={p.title}
                as="li"
                delay={i * 0.1}
                className="group/pillar relative overflow-hidden rounded-md border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-[border-color,background-color] duration-700 ease-expo hover:border-imperial-300/50 hover:bg-white/[0.06] lg:p-9"
              >
                <span
                  aria-hidden
                  data-rule
                  className="absolute top-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-imperial-300 to-transparent"
                />
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden
                    className="font-display text-4xl font-medium tracking-[-0.04em] text-white/20 tabular-nums transition-colors duration-700 ease-expo group-hover/pillar:text-imperial-300"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <svg
                    aria-hidden
                    viewBox="0 0 32 32"
                    className="size-7 fill-none stroke-white/30 stroke-1 transition-colors duration-700 group-hover/pillar:stroke-imperial-300"
                  >
                    <path d="M2 30h28M6 30V12M16 30V4M26 30V12M2 12h28" />
                  </svg>
                </div>
                <h3 className="mt-10 font-display text-xl font-semibold tracking-[-0.02em] lg:text-2xl">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-platinum">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </LineDraw>
    </section>
  );
}
