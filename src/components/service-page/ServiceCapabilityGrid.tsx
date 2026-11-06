import Image from "next/image";
import type { ServicePageData } from "@/content/service-pages";
import { servicesPage } from "@/content/services";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceIcon } from "./ServiceIcons";

/**
 * Core capabilities — a 3×2 grid of hairline-bordered entries with line icons.
 * One capability is set as a photographic card for rhythm. Hover: border warms to Imperial,
 * the icon tile fills, a rule draws across the top.
 */
export function ServiceCapabilityGrid({ data }: { data: ServicePageData }) {
  const { capabilities } = data;
  const featuredImg = images[capabilities.featured.image];

  return (
    <section
      id="capabilities"
      data-tone="light"
      aria-labelledby="service-capabilities-title"
      className="bg-porcelain py-20 md:py-24"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{capabilities.eyebrow}</Eyebrow>
          </Reveal>
          <MaskedHeading
            id="service-capabilities-title"
            lines={[capabilities.heading]}
            className="mt-5 max-w-[22ch] text-heading-lg"
          />
        </div>

        <Reveal as="ul" stagger={0.07} className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {capabilities.items.map((c, i) => {
            const featured = i === capabilities.featured.index;
            return (
              <li
                key={c.title}
                data-reveal-item
                className={cn(
                  "group/cap relative isolate flex min-h-[15.5rem] flex-col overflow-hidden rounded-md p-7 transition-[border-color,box-shadow,transform] duration-700 ease-expo lg:p-8",
                  featured
                    ? "bg-obsidian text-white"
                    : "border border-line bg-white hover:-translate-y-1 hover:border-imperial/35 hover:shadow-[0_24px_50px_-34px_rgb(16_19_32/0.45)]",
                )}
              >
                {featured ? (
                  <>
                    <Image
                      src={featuredImg.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw"
                      placeholder="blur"
                      className="-z-10 object-cover transition-transform duration-[1600ms] ease-expo group-hover/cap:scale-[1.06]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(16_19_32/0.92)_0%,rgb(16_19_32/0.55)_55%,rgb(16_19_32/0.25)_100%)]"
                    />
                  </>
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-imperial transition-transform duration-700 ease-expo group-hover/cap:scale-x-100"
                  />
                )}

                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-sm transition-colors duration-500",
                    featured
                      ? "border border-white/25 bg-white/10 text-white backdrop-blur-md"
                      : "bg-imperial-50 text-imperial group-hover/cap:bg-imperial group-hover/cap:text-white",
                  )}
                >
                  <ServiceIcon name={c.icon} className="size-6" />
                </span>
                <h3
                  className={cn(
                    "mt-8 font-display text-[1.25rem] leading-snug font-semibold tracking-[-0.02em]",
                    featured ? "text-white" : "text-ink",
                  )}
                >
                  {c.title}
                </h3>
                <p className={cn("mt-2.5 leading-relaxed", featured ? "text-white/80" : "text-slate")}>{c.text}</p>
              </li>
            );
          })}
        </Reveal>

        <p className="mt-8 text-center text-xs leading-relaxed text-slate">{servicesPage.directory.note}</p>
      </Container>
    </section>
  );
}
