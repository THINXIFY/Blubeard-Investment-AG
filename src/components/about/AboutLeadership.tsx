import { aboutPage } from "@/content/about";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";

/** Architectural plate used in place of portraits until official photography is supplied. */
function Plate({ dark = false }: { dark?: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className={
          dark
            ? "absolute inset-0 bg-[radial-gradient(80%_70%_at_80%_10%,rgb(18_72_216/0.45),transparent_70%)]"
            : "absolute inset-0 bg-[radial-gradient(80%_70%_at_80%_0%,rgb(18_72_216/0.1),transparent_70%)]"
        }
      />
      <div className="absolute inset-0 flex justify-evenly">
        {Array.from({ length: 6 }, (_, i) => (
          <span
            key={i}
            className={
              dark
                ? "h-full w-px bg-gradient-to-b from-white/12 via-white/4 to-transparent transition-transform duration-1200 ease-expo group-hover/card:translate-y-4"
                : "h-full w-px bg-gradient-to-b from-line-strong/80 via-line/40 to-transparent transition-transform duration-1200 ease-expo group-hover/card:translate-y-4"
            }
            style={{ transitionDelay: `${i * 40}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Leadership — executive feature for the CEO plus a typography-led management grid.
 * Names and titles are client-provided; no portraits, biographies or credentials are shown.
 */
export function AboutLeadership() {
  const { leadership } = aboutPage;

  return (
    <section
      id="leadership"
      data-tone="light"
      aria-labelledby="leadership-title"
      className="bg-white py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Eyebrow>{leadership.eyebrow}</Eyebrow>
            <MaskedHeading id="leadership-title" lines={[leadership.heading]} className="mt-6 text-heading-lg" />
            <p className="mt-4 max-w-[54ch] leading-relaxed text-slate">{leadership.description}</p>
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <Button href={leadership.cta.href} variant="secondary" size="lg" arrow>
              {leadership.cta.label}
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-5">
          {/* CEO */}
          <Reveal className="lg:col-span-5 lg:row-span-2">
            <article
              aria-labelledby="ceo-name"
              className="group/card relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-md bg-obsidian p-8 text-white sm:min-h-[26rem] lg:p-10"
            >
              <div className="-z-10">
                <Plate dark />
              </div>
              <p className="absolute top-8 left-8 flex items-center gap-2.5 text-eyebrow text-platinum lg:top-10 lg:left-10">
                <span aria-hidden className="size-1.5 rounded-full bg-imperial-300" />
                {leadership.ceo.role}
              </p>
              <h3
                id="ceo-name"
                className="font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.04em]"
              >
                {leadership.ceo.name}
              </h3>
              <span
                aria-hidden
                className="mt-6 block h-px w-14 bg-imperial-300 transition-[width] duration-700 ease-expo group-hover/card:w-28"
              />
              <p className="mt-5 text-sm text-mist">
                {site.name} · {site.address.locality}
              </p>
            </article>
          </Reveal>

          {/* Management */}
          <Reveal as="ul" stagger={0.07} className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3 lg:gap-5">
            {leadership.team.map((person) => (
              <li key={person.name} data-reveal-item>
                <article className="group/card relative isolate flex h-full min-h-[11.5rem] flex-col justify-end overflow-hidden rounded-md border border-line bg-porcelain p-6 transition-[border-color,box-shadow,transform] duration-700 ease-expo hover:-translate-y-1 hover:border-imperial/40 hover:shadow-[0_24px_50px_-30px_rgb(16_19_32/0.35)]">
                  <div className="-z-10">
                    <Plate />
                  </div>
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-imperial transition-transform duration-700 ease-expo group-hover/card:scale-x-100"
                  />
                  <h3 className="font-display text-lg font-semibold tracking-[-0.015em] text-ink">{person.name}</h3>
                  <p className="mt-1.5 text-sm text-slate transition-colors duration-300 group-hover/card:text-imperial">
                    {person.role}
                  </p>
                </article>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
