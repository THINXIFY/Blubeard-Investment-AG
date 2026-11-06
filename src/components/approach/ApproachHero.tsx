import Image from "next/image";
import Link from "next/link";
import { approachPage } from "@/content/approach";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { HeroBars } from "@/components/motion/HeroBars";

/** Where the staircase's eye sits within the frame — the dolly and the rings centre on it. */
const EYE = { x: "58%", y: "46%" };

/** Circular scroll cue: rotating caption around a fixed arrow. */
function ScrollCue() {
  return (
    <a
      href="#principles"
      className="group/cue relative grid size-[6.5rem] place-items-center rounded-full text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full motion-safe:animate-[spin-slow_22s_linear_infinite]"
      >
        <defs>
          <path id="cue-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-white/75 text-[8.6px] font-medium tracking-[0.32em] uppercase">
          <textPath href="#cue-circle">Scroll · Explore our approach ·</textPath>
        </text>
      </svg>
      <span
        aria-hidden
        className="grid size-11 place-items-center rounded-full border border-white/30 bg-white/5 backdrop-blur-md transition-colors duration-500 group-hover/cue:border-white group-hover/cue:bg-white group-hover/cue:text-obsidian"
      >
        <svg viewBox="0 0 16 16" className="size-4 motion-safe:animate-[fade-up_1.8s_var(--ease-smooth)_infinite]">
          <path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </span>
      <span className="sr-only">Scroll to our principles</span>
    </a>
  );
}

/**
 * Signature hero — looking up a spiral staircase. The camera dollies slowly into the stair's eye,
 * concentric survey rings turn around it in Imperial Blue, and the photograph drifts with scroll.
 */
export function ApproachHero() {
  const { hero } = approachPage;
  const img = images[hero.image];

  return (
    <section
      data-hero-dark
      data-tone="dark"
      aria-labelledby="approach-hero-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <HeroBars />
      {/* Photograph: scroll drift (outer) + slow dolly toward the eye (inner) */}
      <Parallax className="absolute inset-x-0 -top-[8%] -bottom-[8%] -z-20" amount={10}>
        <div
          className="absolute inset-0 will-change-transform motion-safe:animate-[ap-dolly_38s_ease-in-out_infinite_alternate]"
          style={{ transformOrigin: `${EYE.x} ${EYE.y}` }}
        >
          <Image
            src={img.src}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
            style={{ objectPosition: "50% 50%" }}
          />
        </div>
      </Parallax>

      {/* Depth & light: imperial glow in the eye, vignette, directional shade behind the copy */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 mix-blend-soft-light"
        style={{
          background: `radial-gradient(28% 34% at ${EYE.x} ${EYE.y}, rgb(18 72 216 / 0.9), transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(75%_85%_at_58%_46%,rgb(16_19_32/0.15)_0%,rgb(16_19_32/0.65)_70%,rgb(16_19_32/0.9)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(16_19_32/0.85)_0%,rgb(16_19_32/0.45)_45%,transparent_70%)]"
      />

      {/* Survey rings around the eye */}
      <svg
        aria-hidden
        viewBox="0 0 800 800"
        className="pointer-events-none absolute -z-10 hidden size-[min(78vw,62rem)] -translate-x-1/2 -translate-y-1/2 md:block"
        style={{ left: EYE.x, top: EYE.y }}
      >
        <g className="origin-center motion-safe:animate-[spin-slow_160s_linear_infinite]">
          <circle cx="400" cy="400" r="392" fill="none" stroke="rgb(138 166 239 / 0.28)" strokeDasharray="2 10" />
          <circle cx="400" cy="400" r="300" fill="none" stroke="rgb(255 255 255 / 0.12)" />
          <path d="M400 8v26M400 766v26M8 400h26M766 400h26" stroke="rgb(138 166 239 / 0.6)" />
        </g>
        <g className="origin-center motion-safe:animate-[spin-slow_90s_linear_infinite_reverse]">
          <circle cx="400" cy="400" r="200" fill="none" stroke="rgb(138 166 239 / 0.35)" strokeDasharray="60 14" />
        </g>
      </svg>

      <Container className="relative flex min-h-[40rem] flex-col pt-[calc(var(--header-h)+1.75rem)] pb-10 md:min-h-[48rem] lg:min-h-[min(94svh,58rem)] lg:pb-12">
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
                Our Approach
              </li>
            </ol>
          </nav>
        </Reveal>

        <div className="mt-auto grid gap-10 pt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal start="top bottom" delay={0.05}>
              <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              as="h1"
              id="approach-hero-title"
              lines={hero.heading}
              className="mt-6 font-display text-[clamp(2.5rem,1.3rem+3.6vw,5rem)] leading-[1.02] font-medium tracking-[-0.042em] md:mt-7"
              lineClassNames={[undefined, "text-platinum"]}
              delay={0.2}
            />
            <Reveal start="top bottom" delay={0.55} stagger={0.14}>
              <p data-reveal-item className="mt-7 max-w-[44ch] text-lead text-white/80">
                {hero.subtitle}
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
          </div>
          <Reveal start="top bottom" delay={1} className="hidden justify-self-end lg:col-span-4 lg:block">
            <ScrollCue />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
