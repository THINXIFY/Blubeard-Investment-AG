import Image from "next/image";
import { PhotoNote } from "@/components/ui/PhotoNote";
import Link from "next/link";
import { serviceEntries, servicesPage, type ServiceEntry } from "@/content/services";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ScaleIn } from "@/components/motion/ScaleIn";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Editorial layout: rhythm of 7/5 · 4/4/4 · 5/7 on desktop, closed by one full-width feature.
 * `span` = desktop columns; `h` = desktop image height (shared per row so rows align).
 */
const layout = [
  { span: "lg:col-span-7", h: "lg:h-[30rem]", size: "lg" },
  { span: "lg:col-span-5", h: "lg:h-[30rem]", size: "lg" },
  { span: "lg:col-span-4", h: "lg:h-[21rem]", size: "md" },
  { span: "lg:col-span-4", h: "lg:h-[21rem]", size: "md" },
  { span: "lg:col-span-4", h: "lg:h-[21rem]", size: "md" },
  { span: "lg:col-span-5", h: "lg:h-[27rem]", size: "lg" },
  { span: "md:col-span-2 lg:col-span-7", h: "md:aspect-[2/1] lg:h-[27rem]", size: "lg" },
] as const;

function EnquireLink({ title, href, tone = "light" }: { title: string; href?: string; tone?: "light" | "dark" }) {
  const { cta, pageCta } = servicesPage.directory;
  const label = href ? pageCta : cta.label;
  return (
    <Link
      href={href ?? cta.href}
      aria-label={`${label}: ${title}`}
      className={cn(
        "group/cta inline-flex min-h-11 items-center gap-2.5 text-sm font-medium transition-colors duration-300 sm:min-h-0",
        tone === "dark" ? "text-white hover:text-imperial-300" : "text-imperial hover:text-ink",
      )}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-700 ease-expo group-hover/cta:bg-[length:100%_1px]">
        {label}
      </span>
      <ArrowRightIcon
        aria-hidden
        className="size-4 transition-transform duration-700 ease-expo group-hover/cta:translate-x-1"
      />
    </Link>
  );
}

function ServiceCard({ s, i }: { s: ServiceEntry; i: number }) {
  const img = images[s.image];
  const l = layout[i];
  return (
    <article
      id={`service-${s.slug}`}
      data-slug={s.slug}
      aria-labelledby={`service-${s.slug}-title`}
      className={cn("group/card scroll-mt-28", l.span)}
    >
      <ScaleIn from={0.95}>
        <div className={cn("relative aspect-[4/3] overflow-hidden rounded-md bg-platinum/40 lg:aspect-auto", l.h)}>
          <ImageReveal bars className="absolute inset-0" drift={0}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={
                l.size === "lg"
                  ? "(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw"
                  : "(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw"
              }
              placeholder="blur"
              className="object-cover transition-transform duration-[1600ms] ease-expo group-hover/card:scale-[1.06]"
            />
          </ImageReveal>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(16_19_32/0.35),transparent_40%)] opacity-60 transition-opacity duration-700 group-hover/card:opacity-100"
          />
          <span
            aria-hidden
            className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink tabular-nums backdrop-blur"
          >
            {pad(i + 1)}
          </span>
          {s.href ? <Link href={s.href} tabIndex={-1} aria-hidden className="absolute inset-0 z-[1]" /> : null}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-imperial transition-transform duration-700 ease-expo group-hover/card:scale-x-100"
          />
        </div>
      </ScaleIn>

      <Reveal className="pt-6">
        <h3
          id={`service-${s.slug}-title`}
          className={cn(
            "font-display font-medium tracking-[-0.025em] text-ink",
            l.size === "lg" ? "text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] leading-[1.1]" : "text-[1.375rem] leading-tight",
          )}
        >
          {s.href ? (
            <Link href={s.href} className="transition-colors duration-300 hover:text-imperial">
              {s.title}
            </Link>
          ) : (
            s.title
          )}
        </h3>
        <p className={cn("mt-3 leading-relaxed text-slate", l.size === "lg" ? "max-w-[52ch] text-lg" : "text-base")}>
          {s.text}
        </p>
        <p className="mt-4 text-xs leading-relaxed font-medium tracking-[0.12em] text-slate uppercase">
          {s.facets.join(" · ")}
        </p>
        <div className="mt-4 border-t border-line pt-1.5 sm:mt-5 sm:pt-4">
          <EnquireLink title={s.title} href={s.href} />
        </div>
      </Reveal>
    </article>
  );
}

/** Closing feature — the eighth area set as a wide Obsidian panel. */
function FeatureCard({ s, i }: { s: ServiceEntry; i: number }) {
  const img = images[s.image];
  return (
    <ScaleIn className="md:col-span-2 lg:col-span-12">
      <article
        id={`service-${s.slug}`}
        data-slug={s.slug}
        aria-labelledby={`service-${s.slug}-title`}
        className="group/card scroll-mt-28 overflow-hidden rounded-md bg-obsidian text-white"
        data-tone="dark"
      >
        <div className="grid lg:grid-cols-12">
          <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:h-[26rem]">
            <PhotoNote image={img} />
            <ImageReveal bars className="absolute inset-0" from="left" drift={0}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                placeholder="blur"
                className="object-cover transition-transform duration-[1600ms] ease-expo group-hover/card:scale-[1.05]"
              />
            </ImageReveal>
            <span
              aria-hidden
              className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink tabular-nums"
            >
              {pad(i + 1)}
            </span>
          </div>
          <Reveal className="flex flex-col justify-center p-5 sm:p-8 md:p-10 lg:col-span-5 lg:p-12">
            <p className="text-eyebrow text-imperial-300">Area of expertise · {pad(i + 1)}</p>
            <h3
              id={`service-${s.slug}-title`}
              className="mt-4 font-display text-[clamp(1.6rem,1.2rem+1.1vw,2.25rem)] leading-[1.08] font-medium tracking-[-0.03em]"
            >
              {s.title}
            </h3>
            <p className="mt-4 leading-relaxed text-platinum sm:text-lg">{s.text}</p>
            <ul className="mt-6 hidden flex-wrap gap-2 sm:flex">
              {s.facets.map((f) => (
                <li key={f} className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/85">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <EnquireLink title={s.title} href={s.href} tone="dark" />
            </div>
          </Reveal>
        </div>
      </article>
    </ScaleIn>
  );
}

/**
 * Signature service gallery — all eight areas visible at once, each with its own photograph,
 * description and enquiry link. Anchors (`#service-<slug>`) are ready for future detail pages.
 */
export function ServicesGallery() {
  const { directory } = servicesPage;
  const last = serviceEntries.length - 1;

  return (
    <section
      id="services-directory"
      data-tone="light"
      aria-labelledby="services-directory-title"
      className="bg-porcelain py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{directory.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="services-directory-title"
              lines={[directory.heading]}
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.25rem,1.2rem+3.4vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.045em] text-ink"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-lg leading-relaxed text-slate">{directory.description}</p>
          </Reveal>
        </div>

        <div className="m-rail mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-y-16">
          {serviceEntries.map((s, i) =>
            i === last ? <FeatureCard key={s.slug} s={s} i={i} /> : <ServiceCard key={s.slug} s={s} i={i} />,
          )}
        </div>

        <p className="mt-10 max-w-[70ch] text-xs leading-relaxed text-slate">{directory.note}</p>
      </Container>
    </section>
  );
}
