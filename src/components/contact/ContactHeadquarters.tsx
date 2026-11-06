import Image from "next/image";
import { contactPage } from "@/content/contact";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Swiss headquarters — the Engadin as seen from Samedan (with a smaller aerial of the valley
 * set into it) beside the address of record and a directions link. Captions make clear the
 * photographs show the area, not the office.
 */
export function ContactHeadquarters() {
  const { headquarters: hq } = contactPage;
  const main = images[hq.image];
  const detail = images[hq.detailImage];
  const { address, coordinates } = site;

  return (
    <section
      id="headquarters"
      data-tone="light"
      aria-labelledby="contact-hq-title"
      className="bg-porcelain py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Photographs */}
          <div className="relative pb-[18%] lg:col-span-7 lg:pb-[12%]">
            <figure>
              <ImageReveal className="aspect-[4/3] w-full rounded-md lg:aspect-[3/2]" drift={12}>
                <Image
                  src={main.src}
                  alt={main.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </ImageReveal>
              <figcaption className="absolute top-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[0.6875rem] font-medium tracking-[0.14em] text-ink uppercase backdrop-blur">
                {hq.imageCaption}
              </figcaption>
            </figure>
            <figure className="absolute right-0 bottom-0 w-[46%] sm:w-[40%]">
              <ImageReveal
                className="aspect-[4/3] w-full rounded-md border-[5px] border-porcelain shadow-[0_30px_60px_-30px_rgb(16_19_32/0.55)]"
                from="left"
                drift={6}
                delay={0.3}
              >
                <Image
                  src={detail.src}
                  alt={detail.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </ImageReveal>
              <figcaption className="mt-2 text-right text-xs text-slate">{hq.detailCaption}</figcaption>
            </figure>
          </div>

          {/* Address */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{hq.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="contact-hq-title"
              lines={[hq.heading]}
              className="mt-6 font-display text-[clamp(2.125rem,1.3rem+2.4vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.042em] text-ink"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-slate">{hq.lead}</p>

              <address className="mt-9 border-t border-line-strong pt-7 not-italic">
                <span className="block font-display text-[1.5rem] leading-snug font-semibold tracking-[-0.025em] text-ink">
                  {site.name}
                </span>
                <span className="mt-1 block font-display text-[1.5rem] leading-snug font-light tracking-[-0.025em] text-ink">
                  {address.street}
                  <br />
                  {address.postalCode} {address.locality}
                  <br />
                  {address.country}
                </span>
              </address>

              <dl className="mt-7 grid grid-cols-2 gap-6 border-t border-line pt-5 text-sm">
                <div>
                  <dt className="text-[0.6875rem] font-medium tracking-[0.18em] text-slate uppercase">Region</dt>
                  <dd className="mt-1.5 text-ink">{hq.region}</dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] font-medium tracking-[0.18em] text-slate uppercase">Coordinates</dt>
                  <dd className="mt-1.5 text-ink tabular-nums">
                    {coordinates.lat}, {coordinates.lng}
                  </dd>
                </div>
              </dl>

              <a
                href={hq.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/dir mt-9 inline-flex h-12 items-center gap-3 rounded-sm border border-line-strong bg-white px-6 text-[0.9375rem] font-medium text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial"
              >
                <svg aria-hidden viewBox="0 0 16 16" className="size-4">
                  <path
                    d="M8 14.5s-4.5-4.2-4.5-7.6a4.5 4.5 0 0 1 9 0c0 3.4-4.5 7.6-4.5 7.6z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <circle cx="8" cy="6.8" r="1.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                Get Directions
                <span
                  aria-hidden
                  className="transition-transform duration-500 ease-expo group-hover/dir:translate-x-0.5 group-hover/dir:-translate-y-0.5"
                >
                  ↗
                </span>
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
              <p className="mt-6 max-w-[44ch] text-xs leading-relaxed text-slate">{hq.note}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
