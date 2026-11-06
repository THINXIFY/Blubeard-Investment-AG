import Image from "next/image";
import { teamPage } from "@/content/team";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TeamEmail } from "./TeamEmail";

/**
 * Featured leadership card: the official emblem centred in a quiet Porcelain panel beside the biography.
 * An official portrait (`portrait` on the CEO in content/people.ts) fills the same panel when supplied.
 */
export function TeamCeo() {
  const { ceo } = teamPage;
  const [first, ...rest] = ceo.name.split(" ");
  const portrait = ceo.portrait ? images[ceo.portrait] : null;
  const caption = (
    <p className="text-[0.6875rem] leading-relaxed font-semibold tracking-[0.16em] text-slate uppercase">
      {ceo.eyebrow}
      <span className="block font-medium tracking-[0.12em]">
        {site.address.locality}, {site.address.country}
      </span>
    </p>
  );

  return (
    <section
      id="ceo"
      data-tone="light"
      aria-labelledby="team-ceo-name"
      className="scroll-mt-16 bg-white py-12 md:py-16"
    >
      <Container>
        <Reveal>
          <article className="relative grid overflow-hidden rounded-md border border-platinum/80 bg-white shadow-[0_30px_70px_-50px_rgb(16_19_32/0.45)] md:grid-cols-[minmax(0,15rem)_1fr] lg:grid-cols-[minmax(0,19rem)_1fr]">
            <span aria-hidden className="absolute top-0 left-0 z-10 h-0.5 w-24 bg-imperial" />

            {/* Emblem or portrait */}
            {portrait ? (
              <div className="relative min-h-72 border-b border-platinum/70 md:border-r md:border-b-0">
                <Image
                  src={portrait.src}
                  alt={`${ceo.name}, ${ceo.role}`}
                  fill
                  sizes="(min-width: 1024px) 19rem, (min-width: 768px) 15rem, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center gap-5 border-b border-platinum/70 bg-porcelain px-6 py-6 sm:px-8 md:flex-col md:justify-center md:gap-6 md:border-r md:border-b-0 md:px-6 md:py-10 md:text-center">
                <Image
                  src="/media/branding/mark-320.png"
                  alt={`${site.name} emblem`}
                  width={320}
                  height={320}
                  unoptimized
                  className="size-16 shrink-0 md:size-28 lg:size-32"
                />
                <span aria-hidden className="hidden h-px w-8 bg-imperial md:block" />
                {caption}
              </div>
            )}

            {/* Name, position, introduction, email */}
            <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:px-14 lg:py-12">
              <h2
                id="team-ceo-name"
                className="font-display text-[clamp(2.25rem,1.75rem+2vw,3.5rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-ink"
              >
                {first} <span className="text-imperial">{rest.join(" ")}</span>
              </h2>
              <p className="mt-3 text-[0.75rem] font-semibold tracking-[0.12em] text-imperial uppercase sm:text-[0.8125rem] sm:tracking-[0.14em]">
                {ceo.role}
              </p>
              <p className="mt-5 max-w-[60ch] text-[1.0625rem] leading-[1.65] text-slate">{ceo.intro}</p>
              <div className="mt-6 border-t border-platinum/70 pt-3">
                <TeamEmail email={ceo.email} name={ceo.name} className="sm:text-[0.9375rem]" />
              </div>
              {portrait ? <div className="mt-4">{caption}</div> : null}
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
