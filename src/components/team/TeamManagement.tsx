import Image from "next/image";
import { teamPage } from "@/content/team";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TeamEmail } from "./TeamEmail";

/**
 * Management — six individual cards (3 columns from 1280px, then 2, then 1) with equal heights per row: name, role,
 * introduction, and the email anchored to the base. Hover lifts the card slightly, warms the
 * platinum border and draws an Imperial rule. An official portrait appears when supplied.
 */
export function TeamManagement() {
  const { management } = teamPage;

  return (
    <section
      id="management"
      data-tone="light"
      aria-labelledby="team-management-title"
      className="scroll-mt-16 bg-porcelain py-14 md:py-16 lg:py-20"
    >
      <Container>
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{management.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="team-management-title"
              lines={[management.heading]}
              className="mt-5 font-display text-[clamp(2rem,1.3rem+2vw,3rem)] leading-[1.05] font-medium tracking-[-0.04em] text-ink"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="leading-relaxed text-slate md:text-lg">{management.description}</p>
          </Reveal>
        </div>

        <Reveal as="ul" stagger={0.07} className="mt-9 grid gap-4 md:grid-cols-2 lg:mt-11 lg:gap-5 xl:grid-cols-3">
          {management.people.map((p) => {
            const portrait = p.portrait ? images[p.portrait] : null;
            return (
              <li key={p.name} data-reveal-item className="h-full">
                <article className="group/card relative flex h-full flex-col overflow-hidden rounded-md border border-platinum/70 bg-white p-6 shadow-[0_18px_40px_-34px_rgb(16_19_32/0.4)] transition-[translate,border-color,box-shadow] duration-500 ease-expo hover:-translate-y-1 hover:border-imperial/35 hover:shadow-[0_26px_50px_-32px_rgb(16_19_32/0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:p-7">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-imperial transition-transform duration-700 ease-expo group-focus-within/card:scale-x-100 group-hover/card:scale-x-100 motion-reduce:transition-none"
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.5rem] leading-[1.12] font-semibold tracking-[-0.03em] text-ink">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-[0.75rem] leading-snug font-semibold tracking-[0.12em] text-imperial uppercase">
                        {p.role}
                      </p>
                    </div>
                    {portrait ? (
                      <span className="relative block size-14 shrink-0 overflow-hidden rounded-full border border-platinum/70">
                        <Image
                          src={portrait.src}
                          alt={`${p.name}, ${p.role}`}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 flex-1 border-t border-platinum/50 pt-4 text-[0.9375rem] leading-[1.65] text-slate">
                    {p.intro}
                  </p>
                  <TeamEmail email={p.email} name={p.name} className="mt-2 self-start" />
                </article>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
