import Image from "next/image";
import Link from "next/link";
import type { SectorPageData } from "@/content/sectors";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { KenBurns } from "@/components/motion/KenBurns";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { HeroBars } from "@/components/motion/HeroBars";

function Breadcrumb({ name }: { name: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[0.6875rem] font-medium tracking-[0.14em] text-platinum uppercase backdrop-blur-md">
        <li>
          <Link href="/" className="transition-colors duration-300 hover:text-white">
            Home
          </Link>
        </li>
        <li aria-hidden className="text-white/30">
          /
        </li>
        <li>
          <Link href="/investments" className="transition-colors duration-300 hover:text-white">
            Investments
          </Link>
        </li>
        <li aria-hidden className="text-white/30">
          /
        </li>
        <li aria-current="page" className="text-white">
          {name}
        </li>
      </ol>
    </nav>
  );
}

/**
 * Sector hero — full-width cinematic photograph (continuous Ken Burns), layered Obsidian grade,
 * glass breadcrumb and introduction card, and a focus-area index along the base.
 * Variants: "editorial" (headline left, intro card right) · "centered" (stacked, centred).
 */
export function SectorHero({ data }: { data: SectorPageData }) {
  const { hero } = data;
  const img = images[hero.image];
  const centered = hero.layout === "centered";

  return (
    <section
      data-hero-dark
      data-tone="dark"
      aria-labelledby="sector-hero-title"
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
          className="object-cover"
          style={hero.position ? { objectPosition: hero.position } : undefined}
        />
      </KenBurns>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(16_19_32/0.96)_0%,rgb(16_19_32/0.62)_42%,rgb(16_19_32/0.25)_72%,rgb(16_19_32/0.55)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(16_19_32/0.7),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(40%_60%_at_100%_100%,rgb(18_72_216/0.35),transparent_70%)]"
      />
      {/* Architectural hairlines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <div className="mx-auto grid h-full max-w-site grid-cols-4 px-12">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i} className="h-full border-l border-white/[0.06] last:border-r" />
          ))}
        </div>
      </div>

      <Container
        className={cn(
          "flex min-h-[36rem] flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-8 lg:min-h-[44rem] lg:pb-10",
          centered && "items-center text-center",
        )}
      >
        <Reveal>
          <Breadcrumb name={data.name} />
        </Reveal>

        <div className={cn("mt-8 grid w-full gap-8 lg:mt-10", !centered && "lg:grid-cols-12 lg:items-end")}>
          <div className={cn(!centered && "lg:col-span-7")}>
            <Reveal delay={0.1}>
              <p className={cn("flex items-center gap-3 text-eyebrow text-platinum", centered && "justify-center")}>
                <span aria-hidden className="h-px w-8 bg-imperial-300" />
                {hero.eyebrow}
              </p>
            </Reveal>
            <MaskedHeading
              as="h1"
              id="sector-hero-title"
              lines={hero.heading}
              className="mt-5 font-display text-[clamp(2.5rem,1.4rem+3.6vw,4.5rem)] leading-[1.02] font-medium tracking-[-0.045em]"
              lineClassNames={[undefined, "text-platinum"]}
              delay={0.2}
            />
          </div>

          {/* Glass introduction card */}
          <Reveal className={cn(!centered && "lg:col-span-5", centered && "mx-auto max-w-2xl")} delay={0.45} y={24}>
            <div className="rounded-md border border-white/15 bg-obsidian/45 p-6 text-left shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] backdrop-blur-md lg:p-7">
              <p className="text-[1.0625rem] leading-relaxed text-white">{hero.intro[0]}</p>
              {hero.intro[1] ? (
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-platinum">{hero.intro[1]}</p>
              ) : null}
            </div>
          </Reveal>
        </div>

        {/* Base strip */}
        <Reveal className="mt-10 w-full lg:mt-12" delay={0.6}>
          <div className="flex items-center justify-between gap-6 border-t border-white/15 pt-5">
            <p className="text-xs font-medium tracking-[0.16em] text-mist uppercase">
              Investment sector · {data.focus.items.length} areas of focus
            </p>
            <a
              href="#overview"
              className="ml-auto flex items-center gap-4 text-xs font-medium tracking-[0.2em] text-platinum uppercase transition-colors duration-300 hover:text-white"
            >
              <span>Scroll</span>
              <span aria-hidden className="relative block h-9 w-px overflow-hidden bg-white/20">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-white motion-safe:animate-[scroll-cue_2.4s_var(--ease-smooth)_infinite]" />
              </span>
              <span className="sr-only">to the overview</span>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
