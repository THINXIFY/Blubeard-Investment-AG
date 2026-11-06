import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { hero, industries } from "@/content/home";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroFilm } from "./HeroFilm";
import { HeroMotion } from "./HeroMotion";
import { HeroParticles } from "./HeroParticles";
import { HeroStage } from "./HeroStage";

/** Headline line revealed word by word, each behind its own mask; padding keeps descenders and overhangs unclipped. */
function Line({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`block ${className ?? ""}`}>
      {text.split(" ").map((word, i) => (
        <span key={word}>
          {i > 0 ? " " : null}
          <span className="-mx-[0.04em] -mb-[0.1em] inline-block overflow-hidden px-[0.04em] pb-[0.1em] align-top">
            <span data-hero="line" className="inline-block">
              {word}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Art-directed opening shot: a portrait crop for phones, the wide frame elsewhere.
 * Rendered as <picture> so each device downloads only its own crop. High fetch priority (LCP).
 */
function HeroPicture() {
  const wide = images[hero.image];
  const tall = images.heroSkylineMobile;
  const common = { alt: wide.alt, sizes: "100vw", priority: true } as const;
  const {
    props: { srcSet: tallSrcSet },
  } = getImageProps({ ...common, src: tall.src });
  const { props: wideProps } = getImageProps({ ...common, src: wide.src });
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={tallSrcSet} sizes="100vw" />
      <img
        {...wideProps}
        alt={wide.alt}
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </picture>
  );
}

export function Hero() {
  const { address } = site;

  return (
    <section
      data-hero-dark
      data-tone="dark"
      aria-labelledby="hero-title"
      className="relative isolate overflow-clip bg-white text-white"
    >
      <HeroMotion className="relative flex min-h-[100svh] flex-col">
        <div aria-hidden data-hero="stagebg" className="absolute inset-0 -z-20 bg-obsidian" />
        <HeroStage />
        {/* The frame shrinks on scroll; the inner layer carries the opening bars. */}
        <div data-hero="frame" className="absolute inset-0 -z-10 overflow-hidden">
          <div data-hero="intro" className="hero-intro absolute inset-0 overflow-hidden bg-obsidian">
            <div data-hero="parallax" className="absolute inset-x-0 -top-[10%] -bottom-[2%] will-change-transform">
              <div data-hero="bg" className="absolute inset-0">
                <HeroFilm>
                  <HeroPicture />
                </HeroFilm>
              </div>
            </div>
            {/* Grade and readability: heaviest where the copy sits. Lifted during the opening so the bars read clearly. */}
            <div data-hero="grade" aria-hidden className="absolute inset-0">
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgb(16_19_32/0.97)_0%,rgb(16_19_32/0.84)_34%,rgb(16_19_32/0.34)_66%,rgb(16_19_32/0.52)_100%)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_right,rgb(16_19_32/0.72)_0%,rgb(16_19_32/0.22)_58%,transparent_82%)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(45%_40%_at_88%_92%,rgb(18_72_216/0.26),transparent_70%)]"
              />
              <div aria-hidden className="absolute inset-0 bg-obsidian/55 md:hidden" />
            </div>
            {/* A soft band of light that crosses the photograph once as it settles. */}
            <div
              data-hero="sheen"
              aria-hidden
              className="invisible absolute inset-y-[-10%] left-0 w-2/5 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.16),transparent)]"
            />
          </div>
        </div>

        <HeroParticles />

        <Container className="relative z-10 flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+3.5rem)] pb-7 sm:pb-9 lg:pb-10">
          <div data-hero="content" data-animate="">
            <div data-hero="eyebrow">
              <Eyebrow tone="dark" as="p">
                {hero.eyebrow}
              </Eyebrow>
            </div>

            <h1
              id="hero-title"
              className="mt-6 font-display text-[clamp(2.75rem,1.55rem+5.4vw,6rem)] leading-[1.01] font-medium tracking-[-0.045em] text-white lg:mt-7"
            >
              <Line text="Capital with Vision." />
              <Line text="Value with Purpose." className="text-platinum" />
            </h1>

            <span aria-hidden data-hero="rule" className="mt-8 block h-px origin-left bg-white/25 lg:mt-10" />

            <div className="mt-6 grid grid-cols-1 gap-7 md:grid-cols-12 md:items-end md:gap-x-8 lg:mt-7">
              <p
                data-hero="lead"
                className="max-w-[46ch] leading-relaxed text-platinum md:col-span-12 md:text-[1.0625rem] xl:col-span-4"
              >
                {hero.description}
              </p>

              <div
                data-hero="actions"
                className="flex flex-col gap-3 sm:flex-row sm:items-center md:col-span-8 xl:col-span-5 xl:col-start-5"
              >
                <Button href={hero.primaryCta.href} tone="dark" size="lg" arrow>
                  {hero.primaryCta.label}
                </Button>
                <Button
                  href={hero.secondaryCta.href}
                  tone="dark"
                  variant="secondary"
                  size="lg"
                  className="border-white/30 bg-obsidian/30"
                >
                  {hero.secondaryCta.label}
                </Button>
              </div>

              {/* Location and scroll cue complete the entrance */}
              <div
                data-hero="meta"
                className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 md:col-span-4 md:flex-col md:flex-nowrap md:items-end md:gap-4 xl:col-span-3"
              >
                <p className="flex items-center gap-2.5 text-xs font-medium tracking-[0.14em] whitespace-nowrap text-platinum uppercase">
                  <span aria-hidden className="size-1.5 rounded-full bg-imperial-300" />
                  {address.locality}, {address.country}
                </p>
                <Link
                  href="#about"
                  className="group/scroll flex items-center gap-3 rounded-sm text-xs font-medium tracking-[0.2em] text-platinum uppercase transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span>Scroll</span>
                  <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-white/25">
                    <span className="absolute inset-x-0 top-0 h-1/2 bg-white motion-safe:animate-[scroll-cue_2.4s_var(--ease-smooth)_infinite]" />
                  </span>
                  <span className="sr-only">to the next section</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </HeroMotion>

      {/* Phones, short screens, reduced motion and no JavaScript: the same message without the pinned stage. */}
      <div data-tone="light" className="hero-strip bg-white pt-8 pb-4 text-ink md:pt-12">
        <Container>
          <p className="font-display text-[clamp(1.75rem,1.35rem+1.6vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.03em]">
            {hero.industriesLine.map((line, i) => (
              <span key={line} className={i > 0 ? "block text-slate/80" : "block"}>
                {line}
                {i === 0 ? " " : null}
              </span>
            ))}
          </p>
          <ul className="mt-6 grid grid-cols-3 gap-1.5 sm:gap-2 md:grid-cols-6">
            {industries.map((ind) => {
              const img = images[ind.cardImage ?? ind.image];
              return (
                <li key={ind.id}>
                  <Link
                    href={`/investments/${ind.id}`}
                    aria-label={ind.title}
                    className="relative block aspect-square overflow-hidden rounded-sm bg-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial"
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 16vw, 33vw"
                      placeholder="blur"
                      className="hero-grade object-cover"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    </section>
  );
}
