import Image from "next/image";
import Link from "next/link";
import type { SectorPageData } from "@/content/sectors";
import { isSectorPublished, sectorPages } from "@/content/sectors";
import { industries, industryCategories } from "@/content/home";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";

const categoryLabel = Object.fromEntries(industryCategories.map((c) => [c.id, c.label])) as Record<string, string>;

/**
 * Related sectors — portrait photographic previews. Published sectors link to their page;
 * unpublished ones link to the sector directory (never to an unbuilt route).
 */
export function SectorRelated({ data }: { data: SectorPageData }) {
  const related = data.related
    .map((id) => industries.find((i) => i.id === id))
    .filter((i): i is (typeof industries)[number] => Boolean(i));

  return (
    <section
      id="related"
      data-tone="light"
      aria-labelledby="sector-related-title"
      className="bg-porcelain py-20 md:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="flex flex-col lg:col-span-4">
            <Eyebrow>Related Sectors</Eyebrow>
            <h2 id="sector-related-title" className="mt-6 text-heading-lg">
              Connected Investment Perspectives
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-slate">
              Sectors that share infrastructure, demand drivers or operational links with {data.name.toLowerCase()}.
            </p>
            <Link
              href="/investments#sectors"
              className="group/all mt-8 inline-flex items-center gap-3 self-start text-sm font-medium text-ink lg:mt-auto"
            >
              <span className="link-underline">View all investment sectors</span>
              <ArrowRightIcon className="size-4 transition-transform duration-500 ease-expo group-hover/all:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal as="ul" stagger={0.08} className="grid gap-4 sm:grid-cols-3 lg:col-span-8 lg:gap-5">
            {related.map((ind) => {
              // Prefer the related sector page’s own hero photograph (unique site-wide) over the directory image.
              const img = images[sectorPages[ind.id]?.hero.image ?? ind.image];
              const published = isSectorPublished(ind.id);
              const href = published ? `/investments/${ind.id}` : "/investments#sectors";
              return (
                <li key={ind.id} data-reveal-item>
                  <Link
                    href={href}
                    className="group/r relative block aspect-[4/5] overflow-hidden rounded-md bg-obsidian text-white focus-visible:outline-offset-4 sm:aspect-[3/4]"
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 32vw, 100vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-1200 ease-expo group-hover/r:scale-[1.07]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-obsidian/10"
                    />
                    <span className="absolute top-4 left-4 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.625rem] font-medium tracking-[0.1em] uppercase backdrop-blur-md">
                      {categoryLabel[ind.category]}
                    </span>
                    <span className="absolute inset-x-5 bottom-5">
                      <span className="block font-display text-xl leading-tight font-semibold tracking-[-0.02em]">
                        {ind.title}
                      </span>
                      <span className="mt-3 flex items-center justify-between border-t border-white/20 pt-3 text-xs tracking-[0.08em] text-platinum uppercase">
                        {published ? "Explore sector" : "View in directory"}
                        <ArrowRightIcon
                          aria-hidden
                          className="size-4 -translate-x-1 transition-transform duration-700 ease-expo group-hover/r:translate-x-0"
                        />
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-imperial-300 transition-transform duration-700 ease-expo group-hover/r:scale-x-100"
                    />
                  </Link>
                </li>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
