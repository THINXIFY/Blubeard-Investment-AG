import Image from "next/image";
import { perspective } from "@/content/home";
import { images, type ImageKey } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";

/** Samedan — the company's Swiss base. Position of the town within the aerial photograph (fractions). */
const MARKER = { x: 0.2, y: 0.3 };
const RINGS = [90, 170, 260, 370, 490];

function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={`absolute z-10 rounded-full bg-obsidian/70 px-3 py-1.5 text-[0.625rem] font-medium tracking-[0.14em] text-white uppercase backdrop-blur ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

function Photo({ name, sizes, className }: { name: ImageKey; sizes: string; className?: string }) {
  const img = images[name];
  return (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      sizes={sizes}
      placeholder="blur"
      className={`object-cover ${className ?? ""}`}
    />
  );
}

/**
 * International perspective — a dark editorial composition. The Samedan aerial anchors the layout; two
 * international architecture photographs are layered beside it. Fine concentric rings centred on Samedan
 * provide a quiet cartographic reference (not a claim of presence).
 */
export function Perspective() {
  return (
    <section
      id="perspective"
      data-tone="dark"
      aria-labelledby="perspective-title"
      className="relative isolate overflow-hidden bg-obsidian py-20 text-white md:py-28 lg:py-28"
    >
      {/* Atmosphere: a single soft Imperial glow behind the composition */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_55%_at_72%_46%,rgb(18_72_216/0.2),transparent_72%)]"
      />

      <Container>
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12 lg:gap-y-12">
          {/* Heading */}
          <Reveal className="lg:col-span-9">
            <Eyebrow tone="dark">{perspective.eyebrow}</Eyebrow>
            <MaskedHeading
              id="perspective-title"
              lines={perspective.heading}
              className="mt-7 font-display text-[clamp(2.125rem,1.35rem+2.9vw,3.75rem)] leading-[1.05] font-medium tracking-[-0.038em]"
              lineClassNames={[undefined, "text-platinum/70"]}
              delay={0.1}
            />
          </Reveal>

          {/* Copy */}
          <Reveal
            stagger
            className="md:grid md:grid-cols-2 md:gap-x-10 lg:col-span-4 lg:row-start-2 lg:block lg:self-end lg:pb-4"
          >
            {perspective.body.map((para, i) => (
              <p
                data-reveal-item
                key={para}
                className={
                  i === 0
                    ? "max-w-[44ch] border-l-2 border-imperial-300/70 pl-5 text-lead text-platinum"
                    : "mt-7 max-w-[46ch] leading-relaxed text-mist md:mt-0 lg:mt-7"
                }
              >
                {para}
              </p>
            ))}
          </Reveal>

          {/* Composition */}
          <div className="relative md:aspect-[16/9.4] lg:col-span-8 lg:col-start-5 lg:row-start-2">
            {/* A — Samedan, with concentric rings centred on the town */}
            <div className="relative aspect-[4/3] md:absolute md:top-0 md:left-0 md:aspect-auto md:h-[76%] md:w-[64%]">
              <svg
                aria-hidden
                viewBox="0 0 1000 1000"
                fill="none"
                className="pointer-events-none absolute aspect-square w-[230%] -translate-x-1/2 -translate-y-1/2 md:w-[170%]"
                style={{ left: `${MARKER.x * 100}%`, top: `${MARKER.y * 100}%` }}
              >
                {RINGS.map((r) => (
                  <circle key={r} cx="500" cy="500" r={r} stroke="rgb(197 203 214 / 0.11)" strokeWidth="1.2" />
                ))}
              </svg>
              <ImageReveal className="absolute inset-0 rounded-sm" drift={6}>
                <Photo name="ctAerial" sizes="(min-width: 1024px) 44vw, 100vw" className="object-[40%_50%]" />
              </ImageReveal>
              <span
                aria-hidden
                className="absolute inset-0 rounded-sm bg-[linear-gradient(to_top,rgb(16_19_32/0.5),transparent_45%)]"
              />
              <span
                aria-hidden
                className="absolute z-10 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-imperial shadow-[0_0_0_6px_rgb(18_72_216/0.25)]"
                style={{ left: `${MARKER.x * 100}%`, top: `${MARKER.y * 100}%` }}
              />
              <span
                className="absolute z-10 rounded-sm bg-obsidian/75 px-3 py-2 backdrop-blur"
                style={{ left: `calc(${MARKER.x * 100}% + 1.1rem)`, top: `calc(${MARKER.y * 100}% - 1.1rem)` }}
              >
                <span className="block text-[0.6875rem] font-semibold tracking-[0.14em] text-white uppercase">
                  Samedan, CH
                </span>
              </span>
            </div>

            {/* B + C — international architecture, layered */}
            <div className="mt-3 grid grid-cols-2 gap-3 md:contents">
              <Parallax
                amount={7}
                className="relative aspect-[4/5] md:absolute md:top-[10%] md:right-0 md:aspect-auto md:h-[64%] md:w-[32%]"
              >
                <ImageReveal className="absolute inset-0 rounded-sm" drift={0} delay={0.15}>
                  <Photo name="privateEquity" sizes="(min-width: 1024px) 22vw, 50vw" className="object-[50%_40%]" />
                </ImageReveal>
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-sm bg-[linear-gradient(to_top,rgb(16_19_32/0.55),transparent_45%)]"
                />
                <Tag className="top-3 left-3">City of London</Tag>
              </Parallax>

              <Parallax
                amount={11}
                className="relative aspect-[4/5] md:absolute md:bottom-0 md:left-[36%] md:aspect-auto md:h-[40%] md:w-[40%] md:border-[10px] md:border-obsidian"
              >
                <ImageReveal className="absolute inset-0 rounded-sm" drift={0} delay={0.3}>
                  <Photo
                    name="fnWall"
                    sizes="(min-width: 1024px) 26vw, 50vw"
                    className="object-[32%_50%] md:object-center"
                  />
                </ImageReveal>
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-sm bg-[linear-gradient(to_top,rgb(16_19_32/0.5),transparent_45%)]"
                />
                <Tag className="bottom-3 left-3">New York</Tag>
              </Parallax>
            </div>
          </div>
        </div>

        {/* Supporting statement */}
        <Reveal stagger={0.12} as="ul" className="mt-16 grid border-t border-white/10 sm:grid-cols-3 lg:mt-20">
          {perspective.statement.map((line, i) => (
            <li
              key={line}
              data-reveal-item
              className="flex items-baseline gap-4 border-b border-white/10 py-7 sm:border-b-0 sm:border-l sm:px-8 sm:first:border-l-0 sm:first:pl-0"
            >
              <span aria-hidden className="text-xs font-medium text-imperial-300 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl font-medium tracking-[-0.02em] text-white lg:text-2xl">{line}</span>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
