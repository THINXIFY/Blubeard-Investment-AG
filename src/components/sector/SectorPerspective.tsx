import Image from "next/image";
import type { SectorPageData } from "@/content/sectors";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { LineDraw } from "@/components/motion/LineDraw";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";

const marks = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "right-0 bottom-0 border-r border-b",
];

/**
 * Industry overview — asymmetric editorial composition: heading spans the grid, a layered image
 * stack (porcelain plate, tall photograph, offset detail with its own depth) faces the narrative,
 * and an in-page index links to the focus areas.
 */
export function SectorPerspective({ data }: { data: SectorPageData }) {
  const { perspective, focus } = data;
  const main = images[perspective.image];
  const detail = perspective.detailImage ? images[perspective.detailImage] : null;

  return (
    <section
      id="overview"
      data-tone="light"
      aria-labelledby="sector-perspective-title"
      className="relative overflow-hidden bg-white py-20 md:py-24 lg:py-28"
    >
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <Eyebrow>{perspective.eyebrow}</Eyebrow>
            <h2
              id="sector-perspective-title"
              className="mt-6 max-w-[22ch] font-display text-[clamp(2rem,1.5rem+2vw,3.25rem)] leading-[1.06] font-medium tracking-[-0.04em]"
            >
              {perspective.heading}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* Layered image stack */}
          <div className="relative lg:col-span-6">
            <div aria-hidden className="absolute top-10 -left-[50vw] h-[78%] w-[calc(50vw+70%)] bg-porcelain" />
            <LineDraw className="relative">
              <figure className="relative w-[86%]">
                <ImageReveal className="aspect-[4/5] w-full rounded-md" drift={10}>
                  <Image
                    src={main.src}
                    alt={main.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 86vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                </ImageReveal>
              </figure>
              {/* registration marks around the photograph */}
              <div aria-hidden className="pointer-events-none absolute -inset-3 w-[calc(86%+1.5rem)]">
                {marks.map((m) => (
                  <span key={m} data-rule className={cn("absolute size-4 border-imperial/60", m)} />
                ))}
              </div>
              {detail ? (
                <Parallax amount={-14} className="absolute right-0 bottom-[-2.5rem] w-[42%]">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md border-[8px] border-white shadow-[0_40px_80px_-40px_rgb(16_19_32/0.55)]">
                    <Image
                      src={detail.src}
                      alt={detail.alt}
                      fill
                      sizes="(min-width: 1024px) 18vw, 40vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </div>
                </Parallax>
              ) : null}
            </LineDraw>
          </div>

          {/* Narrative */}
          <div className="flex flex-col lg:col-span-5 lg:col-start-8 lg:pt-10">
            <Reveal stagger className="flex flex-col gap-6">
              {perspective.body.map((para, i) =>
                i === 0 ? (
                  <p
                    data-reveal-item
                    key={para}
                    className="border-l-2 border-imperial pl-6 font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-[1.4] font-medium tracking-[-0.015em] text-ink"
                  >
                    {para}
                  </p>
                ) : (
                  <p data-reveal-item key={para} className="leading-relaxed text-slate lg:text-lg">
                    {para}
                  </p>
                ),
              )}
            </Reveal>

            <Reveal className="mt-10 lg:mt-auto lg:pt-10" delay={0.15}>
              <p className="text-eyebrow text-slate">In focus</p>
              <ol className="mt-4 grid border-t border-line sm:grid-cols-2">
                {focus.items.map((f, i) => (
                  <li key={f.title} className="border-b border-line sm:odd:pr-4 sm:even:border-l sm:even:pl-4">
                    <a
                      href={`#focus-${i + 1}`}
                      className="group/idx flex items-center justify-between gap-3 py-3 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:text-imperial"
                    >
                      <span className="flex items-baseline gap-3">
                        <span aria-hidden className="text-xs text-imperial tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {f.title}
                      </span>
                      <span
                        aria-hidden
                        className="text-slate transition-transform duration-500 ease-expo group-hover/idx:translate-x-1"
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
