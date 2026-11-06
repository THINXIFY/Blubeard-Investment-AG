import Image from "next/image";
import { leadership } from "@/content/home";
import type { Person } from "@/content/people";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Leadership preview: the CEO as a compact Obsidian feature beside a two-column management ledger.
 * Names and titles come from content/people.ts; full details live on the Our Team page. Nothing is invented,
 * and adding `portrait` to a person renders it automatically.
 */
export function Leadership() {
  const { ceo, team } = leadership;
  const ceoPortrait = ceo.portrait ? images[ceo.portrait] : null;

  return (
    <Section
      id="leadership"
      tone="porcelain"
      spacing="none"
      className="py-16 md:py-20"
      aria-labelledby="leadership-title"
    >
      <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal className="lg:col-span-7">
          <SectionHeading id="leadership-title" eyebrow={leadership.eyebrow} title={leadership.heading} mutedLine={1} />
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
          <p className="text-[0.9375rem] leading-relaxed text-slate">{leadership.description}</p>
        </Reveal>
      </div>

      <div className="mt-9 grid gap-4 md:grid-cols-12 md:gap-8 lg:mt-11 lg:gap-12">
        {/* Executive feature */}
        <Reveal className="md:col-span-5 lg:col-span-4">
          <article
            aria-labelledby="ceo-name"
            data-tone="dark"
            className="group/ceo relative isolate flex h-full flex-col justify-between gap-10 overflow-hidden rounded-md bg-obsidian p-6 text-white lg:p-7"
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(85%_70%_at_100%_0%,rgb(18_72_216/0.42),transparent_70%)]"
            />
            <div className="flex items-start justify-between gap-4">
              <p className="text-[0.6875rem] leading-relaxed font-medium tracking-[0.16em] text-platinum uppercase">
                {ceo.role}
              </p>
              {ceoPortrait ? (
                <span className="relative size-14 shrink-0 overflow-hidden rounded-full">
                  <Image src={ceoPortrait.src} alt={ceoPortrait.alt} fill sizes="56px" className="object-cover" />
                </span>
              ) : null}
            </div>
            <div>
              <h3
                id="ceo-name"
                className="font-display text-[clamp(2rem,1.7rem+0.9vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.035em]"
              >
                {ceo.name}
              </h3>
              <span
                aria-hidden
                className="mt-4 block h-px w-10 bg-imperial-300 transition-[width] duration-700 ease-expo group-hover/ceo:w-20 motion-reduce:transition-none"
              />
              <p className="mt-4 text-sm text-platinum">
                {site.name} · {site.address.locality}, {site.address.country}
              </p>
            </div>
          </article>
        </Reveal>

        {/* Management ledger */}
        <div className="flex flex-col md:col-span-7 lg:col-span-8">
          <h3 className="text-eyebrow text-slate">Management</h3>
          <Reveal
            stagger={0.05}
            as="ul"
            className="mt-3 grid border-t border-line-strong sm:grid-cols-2 sm:gap-x-8 lg:gap-x-12"
          >
            {team.map((person: Person) => {
              const portrait = person.portrait ? images[person.portrait] : null;
              return (
                <li
                  key={person.name}
                  data-reveal-item
                  className="group/person relative flex items-center gap-3 border-b border-line py-4"
                >
                  <span
                    aria-hidden
                    className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-imperial transition-transform duration-700 ease-expo group-hover/person:scale-x-100 motion-reduce:transition-none"
                  />
                  {portrait ? (
                    <span className="relative size-11 shrink-0 overflow-hidden rounded-full">
                      <Image src={portrait.src} alt={portrait.alt} fill sizes="44px" className="object-cover" />
                    </span>
                  ) : null}
                  <div>
                    <p className="font-display text-[1.0625rem] leading-snug font-semibold tracking-[-0.015em] text-ink">
                      {person.name}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-slate">{person.role}</p>
                  </div>
                </li>
              );
            })}
          </Reveal>
          <div className="mt-6 md:mt-auto md:pt-6">
            <Button href={leadership.cta.href} variant="secondary" arrow>
              {leadership.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
