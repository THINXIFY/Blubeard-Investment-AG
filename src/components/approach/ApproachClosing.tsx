import Image from "next/image";
import { approachPage } from "@/content/approach";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Closing — a framed aerial of lake, architecture and Alps (wiped in on entry, drifting slowly),
 * with the statement set low-left and the address as a quiet sign-off. Light page margin around it.
 */
export function ApproachClosing() {
  const { closing } = approachPage;
  const img = images[closing.image];
  const { address } = site;

  return (
    <section data-tone="light" aria-labelledby="approach-closing-title" className="bg-white py-6 md:py-8">
      <Container size="wide" className="px-3 sm:px-4 lg:px-6">
        <div className="relative isolate overflow-hidden rounded-md text-white">
          <ImageReveal className="absolute inset-0 -z-10" drift={10}>
            <Image
              src={img.src}
              alt=""
              fill
              sizes="100vw"
              placeholder="blur"
              className="object-cover object-[50%_40%]"
            />
          </ImageReveal>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(16_19_32/0.94)_0%,rgb(16_19_32/0.6)_45%,rgb(16_19_32/0.1)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(16_19_32/0.6)_0%,transparent_60%)]"
          />

          <div className="flex min-h-[32rem] flex-col justify-end px-6 pt-40 pb-8 sm:px-10 md:min-h-[38rem] lg:min-h-[42rem] lg:px-14 lg:pb-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <Eyebrow tone="dark">{closing.eyebrow}</Eyebrow>
                </Reveal>
                <MaskedHeading
                  id="approach-closing-title"
                  lines={closing.heading}
                  className="mt-6 font-display text-[clamp(2.5rem,1.3rem+3.6vw,5rem)] leading-[1] font-medium tracking-[-0.045em]"
                  lineClassNames={[undefined, "text-platinum"]}
                />
              </div>
              <Reveal className="lg:col-span-5" delay={0.2}>
                <p className="max-w-[40ch] text-lead text-white/85">{closing.description}</p>
                <Button href={closing.cta.href} tone="dark" size="lg" arrow className="mt-8">
                  {closing.cta.label}
                </Button>
              </Reveal>
            </div>
            <Reveal
              delay={0.3}
              className="mt-12 flex flex-col gap-2 border-t border-white/20 pt-5 text-[0.6875rem] font-medium tracking-[0.18em] text-white/70 uppercase sm:flex-row sm:justify-between"
            >
              <span>{site.name}</span>
              <span>
                {address.street} · {address.postalCode} {address.locality} · {address.country}
              </span>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
