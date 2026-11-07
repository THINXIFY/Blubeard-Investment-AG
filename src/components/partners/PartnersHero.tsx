import Image from "next/image";
import Link from "next/link";
import { partnersPage } from "@/content/partners";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { KenBurns } from "@/components/motion/KenBurns";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { HeroBars } from "@/components/motion/HeroBars";

/** Cinematic editorial hero: the London skyline at dusk in slow motion, an oversized headline and a quiet supporting column. */
export function PartnersHero() {
  const { hero } = partnersPage;
  const img = images[hero.image];

  return (
    <section
      data-hero-dark
      data-tone="dark"
      aria-labelledby="partners-hero-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <HeroBars />
      <KenBurns className="-z-10">
        <Image
          src={img.src}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[50%_34%]"
        />
      </KenBurns>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(16_19_32/0.96)_0%,rgb(16_19_32/0.62)_45%,rgb(16_19_32/0.42)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(16_19_32/0.62),transparent_68%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_70%_at_0%_100%,rgb(18_72_216/0.32),transparent_70%)]"
      />

      <Container className="flex min-h-[32rem] flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-9 md:min-h-[35rem] lg:min-h-[38rem] lg:pb-12">
        <Reveal start="top bottom">
          <nav aria-label="Breadcrumb" className="text-sm text-platinum">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors duration-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/35">
                /
              </li>
              <li aria-current="page" className="text-white">
                {hero.eyebrow}
              </li>
            </ol>
          </nav>
        </Reveal>
        <Reveal start="top bottom" delay={0.05} className="mt-7">
          <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
        </Reveal>
        <MaskedHeading
          as="h1"
          id="partners-hero-title"
          lines={hero.heading}
          className="mt-5 font-display text-[clamp(2.5rem,1.15rem+4.6vw,5.5rem)] leading-[1] font-medium tracking-[-0.048em]"
          lineClassNames={[undefined, "text-platinum"]}
          delay={0.15}
        />
        <Reveal
          start="top bottom"
          delay={0.35}
          className="mt-7 grid gap-5 border-t border-white/15 pt-5 md:grid-cols-12 md:items-baseline lg:mt-9"
        >
          <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/85 md:col-span-8">
            {hero.description}
          </p>
          {img.caption ? (
            <p className="text-xs tracking-[0.04em] text-platinum md:col-span-4 md:text-right">{img.caption}</p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
