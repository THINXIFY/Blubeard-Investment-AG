import Image from "next/image";
import { PhotoNote } from "@/components/ui/PhotoNote";
import Link from "next/link";
import { aboutPage } from "@/content/about";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowDownIcon } from "@/components/ui/Icons";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { HeroBars } from "@/components/motion/HeroBars";

/**
 * Compact inner-page hero (≈460px desktop): wide architectural banner with an Obsidian overlay,
 * breadcrumb, "About Us" heading and short introduction. Marked data-hero-dark so the header
 * renders transparent over it.
 */
export function AboutHero() {
  const { hero } = aboutPage;
  const img = images[hero.image];

  return (
    <section
      data-hero-dark
      data-tone="dark"
      aria-labelledby="about-hero-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <HeroBars />
      <ImageReveal className="absolute inset-0 -z-10" mode="zoom" drift={10}>
        <Image src={img.src} alt="" fill priority sizes="100vw" className="object-cover" />
      </ImageReveal>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(16_19_32/0.92)_0%,rgb(16_19_32/0.72)_45%,rgb(16_19_32/0.62)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian/80 via-transparent to-obsidian/40"
      />

      <PhotoNote image={img} className="right-5 sm:right-8 lg:right-12" />
      <Container className="flex min-h-[26rem] flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-10 lg:min-h-[29rem] lg:pb-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-platinum uppercase">
                  <li>
                    <Link href="/" className="transition-colors duration-300 hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden className="text-mist">
                    /
                  </li>
                  <li aria-current="page" className="text-white">
                    About Us
                  </li>
                </ol>
              </nav>
            </Reveal>
            <MaskedHeading
              as="h1"
              id="about-hero-title"
              lines={[hero.heading]}
              className="mt-6 font-display text-[clamp(2.75rem,1.6rem+3.8vw,4.75rem)] leading-[1] font-medium tracking-[-0.045em]"
              delay={0.1}
            />
          </div>
          <Reveal className="lg:col-span-5" delay={0.25}>
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-platinum lg:ml-auto">{hero.description}</p>
          </Reveal>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/15 pt-5 text-sm">
          <p className="flex items-center gap-2.5 text-platinum">
            <span aria-hidden className="size-1.5 rounded-full bg-imperial-300" />
            {site.address.locality}, {site.address.country}
          </p>
          <a
            href="#who-we-are"
            className="group/down inline-flex items-center gap-3 font-medium text-platinum transition-colors duration-300 hover:text-white"
          >
            <span className="hidden sm:inline">Scroll to discover</span>
            <span className="grid size-9 place-items-center rounded-full border border-white/25 transition-colors duration-700 ease-expo group-hover/down:border-white">
              <ArrowDownIcon className="size-3.5 [animation-duration:2.4s] motion-safe:animate-bounce" />
            </span>
            <span className="sr-only sm:hidden">Scroll to discover</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
