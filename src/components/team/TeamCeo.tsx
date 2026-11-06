import Image from "next/image";
import { teamPage } from "@/content/team";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TeamEmail } from "./TeamEmail";

/**
 * Featured leadership card — typography-led, with the official emblem on a porcelain panel ruled by
 * fine architectural lines. An official portrait (`portrait` on the CEO in content/people.ts) replaces
 * the emblem in the same panel when supplied.
 */
export function TeamCeo() {
  const { ceo } = teamPage;
  const [first, ...rest] = ceo.name.split(" ");
  const portrait = ceo.portrait ? images[ceo.portrait] : null;

  return (
    <section
      id="ceo"
      data-tone="light"
      aria-labelledby="team-ceo-name"
      className="scroll-mt-16 bg-white py-12 md:py-16 lg:py-20"
    >
      <Container>
        <Reveal>
          <article className="relative grid overflow-hidden rounded-md border border-platinum/80 bg-white shadow-[0_30px_70px_-50px_rgb(16_19_32/0.45)] md:grid-cols-12">
            <span aria-hidden className="absolute top-0 left-0 z-10 h-0.5 w-24 bg-imperial" />

            {/* Emblem / portrait panel */}
            <div className="relative isolate flex items-center gap-5 overflow-hidden border-b border-platinum/70 bg-porcelain p-6 md:col-span-4 md:min-h-[24rem] md:flex-col md:items-start md:justify-between md:border-r md:border-b-0 md:p-8 lg:p-10">
              {portrait ? (
                <Image
                  src={portrait.src}
                  alt={`${ceo.name}, ${ceo.role}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  placeholder="blur"
                  className="-z-10 object-cover"
                />
              ) : (
                <>
                  {/* Fine architectural rules */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 bottom-24 -z-10 hidden border-b border-platinum/40 md:block"
                  >
                    <span className="absolute inset-y-0 left-[62%] w-px bg-platinum/40" />
                    <span className="absolute inset-y-0 left-[81%] w-px bg-platinum/40" />
                  </div>
                  <Image
                    src="/media/branding/mark-320.png"
                    alt={`${site.name} emblem`}
                    width={320}
                    height={320}
                    unoptimized
                    className="size-16 shrink-0 md:size-24 lg:size-28"
                  />
                </>
              )}
              <p className="text-[0.6875rem] leading-relaxed font-semibold tracking-[0.18em] text-slate uppercase">
                {ceo.eyebrow}
                <span className="block font-medium tracking-[0.14em]">
                  {site.address.locality}, {site.address.country}
                </span>
              </p>
            </div>

            {/* Name, position, introduction, email */}
            <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-8 md:p-10 lg:p-14">
              <h2
                id="team-ceo-name"
                className="font-display text-[clamp(2.5rem,1.75rem+3vw,4.5rem)] leading-[1] font-semibold tracking-[-0.045em] text-ink"
              >
                {first} <span className="text-imperial">{rest.join(" ")}</span>
              </h2>
              <p className="mt-4 flex items-center gap-4 text-[0.75rem] font-semibold tracking-[0.12em] text-imperial uppercase sm:text-[0.8125rem] sm:tracking-[0.14em]">
                {ceo.role}
                <span aria-hidden className="hidden h-px min-w-6 flex-1 bg-platinum/70 sm:block" />
              </p>
              <p className="mt-6 max-w-[56ch] text-[1.0625rem] leading-[1.7] text-slate lg:text-[1.1875rem]">
                {ceo.intro}
              </p>
              <TeamEmail email={ceo.email} name={ceo.name} className="mt-4 self-start sm:text-[0.9375rem]" />
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
