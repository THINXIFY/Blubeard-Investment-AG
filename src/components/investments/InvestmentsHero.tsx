import Image from "next/image";
import Link from "next/link";
import { investmentsPage, sectors, industryCategories } from "@/content/investments";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { KenBurns } from "@/components/motion/KenBurns";
import { Reveal } from "@/components/motion/Reveal";

/** Cinematic hero — continuous Ken Burns photograph, layered Obsidian overlays, sector index panel. */
export function InvestmentsHero() {
  const { hero } = investmentsPage;
  const img = images[hero.image];

  return (
    <section
      data-hero-dark
      data-tone="dark"
      aria-labelledby="investments-hero-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <KenBurns className="-z-10">
        <Image src={img.src} alt="" fill priority sizes="100vw" className="object-cover" />
      </KenBurns>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(16_19_32/0.96)_0%,rgb(16_19_32/0.7)_38%,rgb(16_19_32/0.35)_70%,rgb(16_19_32/0.6)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(16_19_32/0.75),transparent_65%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_85%_100%,rgb(18_72_216/0.3),transparent_70%)]"
      />

      <Container className="flex min-h-[40rem] flex-col justify-end pt-[calc(var(--header-h)+4rem)] pb-10 lg:min-h-[calc(100svh-4rem)] lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              as="h1"
              id="investments-hero-title"
              lines={hero.heading}
              className="mt-7 font-display text-[clamp(2.6rem,1.3rem+4.4vw,5.5rem)] leading-[1] font-medium tracking-[-0.045em]"
              lineClassNames={[undefined, "text-platinum"]}
              delay={0.15}
            />
            <Reveal delay={0.4}>
              <p className="mt-7 max-w-[48ch] text-lead text-platinum">{hero.description}</p>
            </Reveal>
          </div>

          {/* Sector index — glass panel */}
          <Reveal className="lg:col-span-4" delay={0.55}>
            <div className="rounded-md border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md">
              <div className="flex items-baseline justify-between border-b border-white/15 pb-4">
                <p className="text-eyebrow text-platinum">Sector index</p>
                <p className="text-sm text-mist tabular-nums">
                  {sectors.length} sectors · {industryCategories.length} categories
                </p>
              </div>
              <ul className="mt-3">
                {industryCategories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href="#sectors"
                      className="group/idx flex items-center justify-between py-2.5 text-[0.9375rem] text-white/85 transition-colors duration-300 hover:text-white"
                    >
                      {c.label}
                      <span className="text-xs text-mist tabular-nums transition-colors duration-300 group-hover/idx:text-imperial-300">
                        {String(sectors.filter((s) => s.category === c.id).length).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/15 pt-5">
          <p className="text-xs font-medium tracking-[0.16em] text-mist uppercase">
            Blubeard Investment AG · Switzerland
          </p>
          <a
            href="#perspective"
            className="flex items-center gap-4 text-xs font-medium tracking-[0.2em] text-platinum uppercase transition-colors duration-300 hover:text-white"
          >
            <span>Scroll</span>
            <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white motion-safe:animate-[scroll-cue_2.4s_var(--ease-smooth)_infinite]" />
            </span>
            <span className="sr-only">to the next section</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
