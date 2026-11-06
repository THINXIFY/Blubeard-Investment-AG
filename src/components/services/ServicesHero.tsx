import Image from "next/image";
import Link from "next/link";
import { serviceEntries, servicesPage } from "@/content/services";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { KenBurns } from "@/components/motion/KenBurns";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Cinematic photographic hero — dusk glass towers under a slow, seamless zoom and drift.
 * One editorial block (eyebrow → two-line headline → description → actions) sits low-left,
 * leaving the architecture open on the right; an index of all eight areas closes the frame.
 */
export function ServicesHero() {
  const { hero } = servicesPage;
  const img = images[hero.image];

  return (
    <section
      data-hero-dark
      data-tone="dark"
      aria-labelledby="services-hero-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <KenBurns className="-z-10">
        <Image
          src={img.src}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[62%_40%]"
        />
      </KenBurns>
      {/* Overlay: directional shade behind the copy, architecture left clear on the right */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(16_19_32/0.86)_0%,rgb(16_19_32/0.66)_34%,rgb(16_19_32/0.22)_66%,rgb(16_19_32/0.12)_100%)]"
      />
      {/* Narrower screens: copy spans the bright façade, so add an even veil */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-obsidian/40 lg:hidden" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(16_19_32/0.55)_0%,transparent_22%,transparent_55%,rgb(16_19_32/0.88)_100%)]"
      />

      <Container className="flex min-h-[40rem] flex-col pt-[calc(var(--header-h)+1.75rem)] pb-8 md:min-h-[46rem] lg:min-h-[min(92svh,56rem)] lg:pb-10">
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
                Services
              </li>
            </ol>
          </nav>
        </Reveal>

        {/* Editorial block */}
        <div className="mt-auto pt-16">
          <div className="max-w-[54rem]">
            <Reveal start="top bottom" delay={0.05}>
              <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              as="h1"
              id="services-hero-title"
              lines={hero.heading}
              className="mt-6 font-display text-[clamp(2.375rem,1.25rem+3.3vw,4.5rem)] leading-[1.04] font-medium tracking-[-0.038em] text-balance text-white md:mt-7"
              lineClassNames={[undefined, "text-platinum"]}
              delay={0.2}
            />
          </div>

          <div className="mt-7 flex flex-col gap-10 md:mt-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal start="top bottom" delay={0.55} stagger={0.14} className="max-w-[36rem]">
              <p data-reveal-item className="text-lead text-white/80">
                {hero.description}
              </p>
              <div data-reveal-item className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={hero.primaryCta.href} tone="dark" size="lg" arrow>
                  {hero.primaryCta.label}
                </Button>
                <Button
                  href={hero.secondaryCta.href}
                  tone="dark"
                  variant="secondary"
                  size="lg"
                  className="bg-white/[0.04] backdrop-blur-md"
                >
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>

            {/* Scroll cue */}
            <Reveal start="top bottom" delay={1} className="hidden lg:block">
              <a
                href="#services-intro"
                className="flex flex-col items-center gap-4 text-[0.6875rem] font-medium tracking-[0.24em] text-platinum uppercase transition-colors duration-300 hover:text-white"
              >
                <span className="[writing-mode:vertical-rl]">Scroll</span>
                <span aria-hidden className="relative block h-14 w-px overflow-hidden bg-white/20">
                  <span className="absolute inset-x-0 top-0 h-1/2 bg-white motion-safe:animate-[scroll-cue_2.4s_var(--ease-smooth)_infinite]" />
                </span>
                <span className="sr-only">to the next section</span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* Index of all areas — each links to its entry in the gallery */}
        <Reveal start="top bottom" delay={0.85} className="mt-12 hidden md:block lg:mt-14">
          <nav aria-label="Areas of expertise">
            <ol className="grid grid-cols-4 border-t border-white/15">
              {serviceEntries.map((s, i) => (
                <li key={s.slug} className="border-white/10 [&:nth-child(n+5)]:border-t">
                  <a
                    href={`#service-${s.slug}`}
                    className="group/idx flex h-full items-baseline gap-3 py-3.5 pr-4 text-sm text-white/70 transition-colors duration-300 hover:text-white focus-visible:text-white"
                  >
                    <span className="text-xs text-imperial-300 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-700 ease-expo group-hover/idx:bg-[length:100%_1px]">
                      {s.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>
      </Container>
    </section>
  );
}
