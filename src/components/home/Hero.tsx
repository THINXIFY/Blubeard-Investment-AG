import { getImageProps } from "next/image";
import type { ReactNode } from "react";
import { hero } from "@/content/home";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroMotion } from "./HeroMotion";

/** Masked line for the headline reveal; padding keeps descenders unclipped. */
function Line({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
      <span data-hero="line" className={`block ${className ?? ""}`}>
        {children}
      </span>
    </span>
  );
}

/**
 * Art-directed background: a portrait crop for phones, the wide frame elsewhere.
 * Rendered as <picture> so each device downloads only its own crop. High fetch priority (LCP).
 */
function HeroPicture() {
  const wide = images[hero.image];
  const tall = images.heroBgMobile;
  const common = { alt: wide.alt, sizes: "100vw", priority: true, quality: 82 } as const;
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

/** Faint 12-column guides over the photograph — the Swiss grid, made visible. */
function GridGuides() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className="mx-auto grid h-full max-w-site grid-cols-12 gap-8 px-12">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="h-full border-l border-white/[0.06] last:border-r" />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const { address } = site;

  return (
    <section
      data-hero-dark
      data-tone="dark"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <HeroMotion className="relative flex min-h-[100svh] flex-col">
        {/* Background photograph + overlays */}
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <div data-hero="parallax" className="absolute inset-x-0 -top-[12%] -bottom-[4%]">
            <div data-hero="bg" className="absolute inset-0 will-change-transform">
              {/* Ken Burns loop: two nested layers on different periods (zoom 46s, pan 33s), both
                  alternating with ease-in-out, so the path never visibly repeats or resets.
                  Min zoom 1.06 leaves 3% overscan per side; max pan offset ≈1.7%, so edges never show. */}
              <div
                data-kenburns
                className="absolute inset-0 will-change-transform motion-safe:animate-[ken-burns-zoom_46s_ease-in-out_infinite_alternate]"
              >
                <div
                  data-kenburns
                  className="absolute inset-0 will-change-transform motion-safe:animate-[ken-burns-pan_33s_ease-in-out_infinite_alternate]"
                >
                  <HeroPicture />
                </div>
              </div>
            </div>
          </div>
          {/* Readability: heavy at the bottom-left where the copy sits, light at the top for the header */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(16_19_32/0.97)_0%,rgb(16_19_32/0.78)_30%,rgb(16_19_32/0.3)_62%,rgb(16_19_32/0.55)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(16_19_32/0.7)_0%,rgb(16_19_32/0.2)_55%,transparent_80%)]" />
          {/* A single, restrained Imperial Blue light */}
          <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_88%_92%,rgb(18_72_216/0.22),transparent_70%)]" />
          <GridGuides />
        </div>

        <Container className="flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+4rem)] pb-8 sm:pb-10 lg:pb-12">
          <div data-hero="content" data-animate="" className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Copy — bottom-left */}
            <div className="lg:col-span-8">
              <div data-hero="eyebrow">
                <Eyebrow tone="dark" as="p">
                  {hero.eyebrow}
                </Eyebrow>
              </div>

              <h1
                id="hero-title"
                className="mt-7 text-display-xl text-white lg:mt-9 lg:text-[length:clamp(3.5rem,6.6vw,6rem)]"
              >
                <Line>Capital with Vision.</Line>
                <Line className="text-platinum">Value with Purpose.</Line>
              </h1>

              <p data-hero="lead" className="mt-7 max-w-[46ch] text-lead text-platinum lg:mt-9">
                {hero.description}
              </p>

              <div data-hero="actions" className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-11">
                <Button href={hero.primaryCta.href} tone="dark" size="lg" arrow>
                  {hero.primaryCta.label}
                </Button>
                <Button
                  href={hero.secondaryCta.href}
                  tone="dark"
                  variant="secondary"
                  size="lg"
                  className="border-white/25 bg-white/[0.06] backdrop-blur-md"
                >
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </div>

            {/* Location + scroll cue — bottom-right */}
            <div
              data-hero="meta"
              className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-white/15 pt-6 lg:col-span-4 lg:flex-col lg:flex-nowrap lg:items-end lg:justify-end lg:gap-10 lg:border-t-0 lg:pt-0"
            >
              <p className="flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-xs font-medium tracking-[0.14em] text-platinum uppercase backdrop-blur-md">
                <span aria-hidden className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-imperial-300/60 [animation-duration:2.6s]" />
                  <span className="relative size-1.5 rounded-full bg-imperial-300" />
                </span>
                {address.locality}, {address.country}
              </p>

              <a
                href="#about"
                className="group/scroll flex items-center gap-4 text-xs font-medium tracking-[0.2em] text-platinum uppercase transition-colors duration-300 hover:text-white"
              >
                <span>Scroll</span>
                <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-white/20">
                  <span className="absolute inset-x-0 top-0 h-1/2 bg-white motion-safe:animate-[scroll-cue_2.4s_var(--ease-smooth)_infinite]" />
                </span>
                <span className="sr-only">to the next section</span>
              </a>
            </div>
          </div>
        </Container>
      </HeroMotion>
    </section>
  );
}
