import Image from "next/image";
import { aboutPage } from "@/content/about";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { ScaleIn } from "@/components/motion/ScaleIn";

/**
 * Swiss foundations — Engadin photograph (region only, not the office) beside a company
 * information panel. Side-by-side, no overlaps.
 */
export function AboutFoundations() {
  const { foundations } = aboutPage;
  const img = images[foundations.image];
  const { address } = site;

  const details = [
    { label: "Address", value: `${address.street}, ${address.postalCode} ${address.locality}` },
    { label: "Region", value: "Upper Engadin" },
    { label: "Canton", value: address.region },
    { label: "Country", value: address.country },
  ];

  return (
    <section
      id="foundations"
      data-tone="light"
      aria-labelledby="foundations-title"
      className="bg-porcelain py-20 md:py-24 lg:py-28"
    >
      <Container>
        <ScaleIn>
          <div className="grid overflow-hidden rounded-md bg-white shadow-[0_40px_90px_-60px_rgb(16_19_32/0.45)] lg:grid-cols-12">
            {/* Photograph */}
            <figure className="relative min-h-[18rem] sm:min-h-[24rem] lg:col-span-7 lg:min-h-[34rem]">
              <ImageReveal bars className="absolute inset-0" drift={8}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </ImageReveal>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent"
              />
              {img.caption ? (
                <figcaption className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-obsidian/30 px-4 py-2 text-[0.6875rem] font-medium tracking-[0.14em] text-white uppercase backdrop-blur-md lg:bottom-7 lg:left-7">
                  {img.caption}
                </figcaption>
              ) : null}
            </figure>

            {/* Information panel */}
            <div className="flex flex-col p-8 sm:p-10 lg:col-span-5 lg:p-12">
              <Reveal>
                <Eyebrow>{foundations.eyebrow}</Eyebrow>
                <MaskedHeading
                  id="foundations-title"
                  lines={foundations.heading}
                  className="mt-6 text-heading-lg lg:text-[2.25rem]"
                  lineClassNames={[undefined, "text-slate/80"]}
                />
              </Reveal>
              <Reveal stagger className="mt-6 flex flex-col gap-4">
                {foundations.body.map((para, i) => (
                  <p
                    data-reveal-item
                    key={para}
                    className={i === 0 ? "font-medium text-ink" : "leading-relaxed text-slate"}
                  >
                    {para}
                  </p>
                ))}
              </Reveal>

              <Reveal className="mt-8 lg:mt-auto lg:pt-8">
                <div className="rounded-md border border-line bg-porcelain">
                  <div className="flex items-center gap-3 border-b border-line px-6 py-4">
                    <Image
                      src="/media/branding/mark.png"
                      alt=""
                      width={160}
                      height={160}
                      unoptimized
                      className="size-7 shrink-0"
                    />
                    <p className="font-display font-semibold tracking-[-0.01em] text-ink">{site.name}</p>
                  </div>
                  <dl className="grid grid-cols-2">
                    {details.map((d, i) => (
                      <div
                        key={d.label}
                        className={
                          i === 0
                            ? "col-span-2 border-b border-line px-6 py-4"
                            : "border-line px-6 py-4 odd:border-l [&:nth-child(2)]:border-b [&:nth-child(3)]:border-b"
                        }
                      >
                        <dt className="text-eyebrow text-slate">{d.label}</dt>
                        <dd className="mt-1.5 text-[0.9375rem] font-medium text-ink">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </ScaleIn>
      </Container>
    </section>
  );
}
