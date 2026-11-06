import Image from "next/image";
import { PhotoNote } from "@/components/ui/PhotoNote";
import Link from "next/link";
import { teamPage } from "@/content/team";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Compact photographic banner: a glass prism under a directional Obsidian overlay, with a two-line
 * headline on the left and the description balanced to the right.
 */
export function TeamHero() {
  const { hero } = teamPage;
  const img = images[hero.image];

  return (
    <section
      data-hero-dark
      data-tone="dark"
      aria-labelledby="team-hero-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <Image
        src={img.src}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="-z-10 object-cover object-[60%_35%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(16_19_32/0.92)_0%,rgb(16_19_32/0.74)_42%,rgb(16_19_32/0.4)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(16_19_32/0.55)_0%,transparent_35%,rgb(16_19_32/0.6)_100%)]"
      />

      <PhotoNote image={img} className="right-5 sm:right-8 lg:right-12" />
      <Container className="flex min-h-[24rem] flex-col justify-end pt-[calc(var(--header-h)+2rem)] pb-9 md:min-h-[26rem] lg:min-h-[28rem] lg:pb-12">
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
                Our Team
              </li>
            </ol>
          </nav>
        </Reveal>
        <div className="mt-7 grid gap-6 lg:mt-9 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal start="top bottom" delay={0.05}>
              <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              as="h1"
              id="team-hero-title"
              lines={hero.heading}
              className="mt-5 font-display text-[clamp(2.375rem,1.45rem+2.7vw,4.25rem)] leading-[1.03] font-medium tracking-[-0.042em]"
              lineClassNames={[undefined, "text-platinum"]}
              delay={0.15}
            />
          </div>
          <Reveal start="top bottom" delay={0.35} className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/85 lg:border-l lg:border-white/20 lg:pl-6">
              {hero.description}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
