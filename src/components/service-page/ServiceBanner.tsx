import Image from "next/image";
import { PhotoNote } from "@/components/ui/PhotoNote";
import Link from "next/link";
import type { ServicePageData } from "@/content/service-pages";
import { serviceEntries } from "@/content/services";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { KenBurns } from "@/components/motion/KenBurns";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { HeroBars } from "@/components/motion/HeroBars";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Compact cinematic banner (~420px on desktop): architectural photograph under a slow drift,
 * a restrained Obsidian overlay, breadcrumb, title and one-line subtitle.
 */
export function ServiceBanner({ data }: { data: ServicePageData }) {
  const { hero } = data;
  const img = images[hero.image];
  const index = serviceEntries.findIndex((s) => s.slug === data.slug);

  return (
    <section
      data-hero-dark
      data-tone="dark"
      aria-labelledby="service-hero-title"
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
          className="object-cover"
          style={{ objectPosition: hero.position }}
        />
      </KenBurns>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(16_19_32/0.88)_0%,rgb(16_19_32/0.62)_45%,rgb(16_19_32/0.35)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(16_19_32/0.5)_0%,transparent_35%,rgb(16_19_32/0.55)_100%)]"
      />

      <PhotoNote image={img} className="right-5 sm:right-8 lg:right-12" />
      <Container className="flex min-h-[23rem] flex-col justify-end pt-[calc(var(--header-h)+2.5rem)] pb-10 md:min-h-[25rem] lg:min-h-[27rem] lg:pb-12">
        <Reveal start="top bottom">
          <nav aria-label="Breadcrumb" className="text-sm text-platinum">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors duration-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/35">
                /
              </li>
              <li>
                <Link href="/services" className="transition-colors duration-300 hover:text-white">
                  Services
                </Link>
              </li>
              <li aria-hidden className="text-white/35">
                /
              </li>
              <li aria-current="page" className="text-white">
                {data.name}
              </li>
            </ol>
          </nav>
        </Reveal>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <MaskedHeading
              as="h1"
              id="service-hero-title"
              lines={[data.name]}
              className="font-display text-[clamp(2.375rem,1.4rem+2.8vw,4rem)] leading-[1.02] font-medium tracking-[-0.04em]"
              delay={0.1}
            />
            <Reveal start="top bottom" delay={0.35}>
              <p className="mt-4 max-w-[44ch] text-lead text-white/80">{hero.subtitle}</p>
            </Reveal>
          </div>
          <Reveal start="top bottom" delay={0.55} className="hidden shrink-0 lg:block">
            <p className="flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.2em] text-platinum uppercase">
              <span className="h-px w-8 bg-white/30" aria-hidden />
              Area of expertise
              <span className="text-white tabular-nums">
                {pad(index + 1)} / {pad(serviceEntries.length)}
              </span>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
