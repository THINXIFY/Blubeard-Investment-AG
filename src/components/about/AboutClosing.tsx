import Image from "next/image";
import { aboutPage } from "@/content/about";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { RequestDocumentsButton } from "@/components/documents/RequestDocumentsButton";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Closing CTA — inset photographic panel with an Obsidian overlay and a prominent Contact button. */
export function AboutClosing() {
  const { closing } = aboutPage;
  const img = images[closing.image];

  return (
    <section aria-labelledby="closing-title" data-tone="light" className="bg-white pb-20 md:pb-24 lg:pb-28">
      <Container>
        <div data-tone="dark" className="relative isolate overflow-hidden rounded-md text-white">
          <ImageReveal className="absolute inset-0 -z-10" drift={10}>
            <Image
              src={img.src}
              alt=""
              fill
              sizes="(min-width: 1360px) 1280px, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </ImageReveal>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(16_19_32/0.94)_0%,rgb(16_19_32/0.78)_50%,rgb(16_19_32/0.45)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(40%_60%_at_0%_100%,rgb(18_72_216/0.35),transparent_70%)]"
          />

          <div className="grid gap-10 px-7 py-16 sm:px-12 sm:py-20 lg:min-h-[28rem] lg:grid-cols-12 lg:items-end lg:px-16 lg:py-20">
            <div className="lg:col-span-7">
              <p className="mb-6 flex items-center gap-3 text-eyebrow text-platinum">
                <span aria-hidden className="h-px w-8 bg-imperial-300" />
                Connect with Blubeard
              </p>
              <MaskedHeading
                id="closing-title"
                lines={closing.heading}
                className="font-display text-[clamp(2.4rem,1.4rem+3.6vw,4.25rem)] leading-[1.04] font-medium tracking-[-0.04em]"
                lineClassNames={[undefined, "text-platinum"]}
              />
            </div>
            <Reveal className="lg:col-span-5" delay={0.2}>
              <p className="leading-relaxed text-platinum">{closing.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={closing.cta.href} tone="dark" size="lg" arrow>
                  {closing.cta.label}
                </Button>
                <RequestDocumentsButton variant="secondary" tone="dark" className="px-5 sm:px-7" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
