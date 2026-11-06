import Image from "next/image";
import { leadership } from "@/content/home";
import type { Person } from "@/content/people";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Fine vertical light study shown in the CEO frame until an official portrait is supplied. */
function ArchitecturalFrame() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_70%_20%,rgb(18_72_216/0.38),transparent_70%)]" />
      <div className="absolute inset-0 flex justify-evenly">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className="h-full w-px bg-gradient-to-b from-transparent via-white/14 to-transparent transition-transform duration-1200 ease-expo group-hover/ceo:translate-y-3"
            style={{ transitionDelay: `${i * 40}ms` }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-[28%] h-px bg-gradient-to-r from-transparent via-imperial-300/60 to-transparent" />
    </div>
  );
}

/**
 * Leadership — executive feature for the CEO plus a three-column management directory.
 * Names and titles are client-provided (pending final approval). No portraits or biographies are
 * invented; adding `portrait` to a person in content/people.ts renders it automatically.
 */
export function Leadership() {
  const { ceo, team } = leadership;
  const ceoPortrait = ceo.portrait ? images[ceo.portrait] : null;

  return (
    <Section id="leadership" tone="porcelain" spacing="md" aria-labelledby="leadership-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal className="lg:col-span-6">
          <SectionHeading id="leadership-title" eyebrow={leadership.eyebrow} title={leadership.heading} mutedLine={1} />
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.15}>
          <p className="text-lead text-slate">{leadership.description}</p>
        </Reveal>
      </div>

      {/* Executive feature */}
      <Reveal className="mt-12 lg:mt-16">
        <article
          aria-labelledby="ceo-name"
          className="group/ceo grid overflow-hidden rounded-sm bg-obsidian text-white lg:grid-cols-12"
        >
          <div className="flex flex-col justify-between gap-12 p-8 sm:p-10 lg:col-span-7 lg:p-14">
            <p className="flex items-center gap-3 text-eyebrow text-platinum">
              <span aria-hidden className="h-px w-8 bg-imperial-300" />
              {ceo.role}
            </p>
            <div>
              <h3
                id="ceo-name"
                className="font-display text-[clamp(2.5rem,1.6rem+3.6vw,4.75rem)] leading-[1] font-medium tracking-[-0.04em]"
              >
                {ceo.name}
              </h3>
              <span
                aria-hidden
                className="mt-8 block h-px w-16 bg-imperial-300 transition-[width] duration-700 ease-expo group-hover/ceo:w-32"
              />
              <p className="mt-6 text-[0.9375rem] text-mist">
                {site.name} · {site.address.locality}, {site.address.country}
              </p>
            </div>
          </div>

          {/* Portrait frame — renders an official portrait when provided */}
          <div className="relative min-h-[14rem] border-t border-white/10 lg:col-span-5 lg:min-h-[26rem] lg:border-t-0 lg:border-l">
            {ceoPortrait ? (
              <Image
                src={ceoPortrait.src}
                alt={ceoPortrait.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            ) : (
              <ArchitecturalFrame />
            )}
          </div>
        </article>
      </Reveal>

      {/* Management directory */}
      <div className="mt-14 lg:mt-16">
        <div className="flex items-baseline justify-between border-b border-line-strong pb-4">
          <h3 className="text-eyebrow text-slate">Management</h3>
          <span aria-hidden className="text-xs text-slate tabular-nums">
            {String(team.length).padStart(2, "0")}
          </span>
        </div>
        <Reveal stagger={0.06} as="ul" className="grid sm:grid-cols-2 lg:grid-cols-3">
          {team.map((person: Person, i) => {
            const portrait = person.portrait ? images[person.portrait] : null;
            return (
              <li
                key={person.name}
                data-reveal-item
                className="group/person relative border-b border-line py-8 sm:max-lg:odd:pr-8 sm:max-lg:even:border-l sm:max-lg:even:pl-8 lg:px-8 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n+3)]:border-l lg:[&:nth-child(3n+3)]:pr-0"
              >
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-imperial transition-transform duration-700 ease-expo group-hover/person:scale-x-100"
                />
                {portrait ? (
                  <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-sm bg-white">
                    <Image
                      src={portrait.src}
                      alt={portrait.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex items-start justify-between gap-6">
                  <div className="transition-transform duration-700 ease-expo group-hover/person:translate-x-1.5">
                    <p className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">{person.name}</p>
                    <p className="mt-2 text-[0.9375rem] text-slate transition-colors duration-300 group-hover/person:text-ink">
                      {person.role}
                    </p>
                  </div>
                  <span aria-hidden className="pt-1.5 text-xs font-medium text-imperial tabular-nums">
                    {num(i)}
                  </span>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>

      <div className="mt-12 flex justify-start">
        <Button href={leadership.cta.href} variant="secondary" size="lg" arrow>
          {leadership.cta.label}
        </Button>
      </div>
    </Section>
  );
}
