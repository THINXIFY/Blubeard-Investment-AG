import Image from "next/image";
import Link from "next/link";
import { contactPage } from "@/content/contact";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { KenBurns } from "@/components/motion/KenBurns";
import { Reveal } from "@/components/motion/Reveal";
import { ContactHeroHeading } from "./ContactHeroHeading";
import { RequestDocumentsButton } from "@/components/documents/RequestDocumentsButton";
import { HeroBars } from "@/components/motion/HeroBars";

/**
 * Contact hero: the statement and immediate actions on the left, the address of record and email on a
 * correspondence card on the right. The Private Documents button opens the shared OTP dialog.
 */
export function ContactHero() {
  const { hero } = contactPage;
  const img = images[hero.image];
  const { address } = site;

  return (
    <section
      data-hero-dark
      data-tone="dark"
      aria-labelledby="contact-hero-title"
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
          placeholder="blur"
          className="object-cover object-[50%_45%]"
        />
      </KenBurns>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(16_19_32/0.9)_0%,rgb(16_19_32/0.6)_45%,rgb(16_19_32/0.3)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(16_19_32/0.5)_0%,transparent_30%,rgb(16_19_32/0.75)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(35%_45%_at_78%_60%,rgb(18_72_216/0.25),transparent_70%)]"
      />

      <Container className="flex min-h-[34rem] flex-col pt-[calc(var(--header-h)+1.5rem)] pb-10 md:min-h-[36rem] lg:min-h-[min(78svh,44rem)] lg:pb-14">
        <Reveal start="top bottom">
          <nav aria-label="Breadcrumb" className="text-sm text-platinum">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors duration-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/35">
                /
              </li>
              <li aria-current="page" className="text-white">
                Contact
              </li>
            </ol>
          </nav>
        </Reveal>

        <div className="mt-auto grid gap-10 pt-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal start="top bottom" delay={0.05}>
              <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
            </Reveal>
            <ContactHeroHeading id="contact-hero-title" lines={hero.heading} />
            <Reveal start="top bottom" delay={0.5} stagger={0.14}>
              <p data-reveal-item className="mt-7 max-w-[46ch] text-lead text-white/80">
                {hero.description}
              </p>
              <div data-reveal-item className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <RequestDocumentsButton tone="dark" className="w-full px-5 sm:w-auto sm:px-7" />
                <Button href={hero.cta.href} tone="dark" variant="secondary" size="lg" arrow className="bg-obsidian/30">
                  {hero.cta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Layered correspondence card */}
          <Reveal start="top bottom" delay={0.75} className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 translate-x-3 translate-y-3 rounded-md border border-platinum/30"
              />
              <div className="relative rounded-md border border-white/15 bg-white/[0.07] p-7 backdrop-blur-xl">
                <div className="flex items-center justify-between text-[0.6875rem] font-medium tracking-[0.2em] text-platinum uppercase">
                  <span>Correspondence</span>
                </div>
                <span aria-hidden className="mt-5 block h-px w-full bg-white/15" />
                <address className="mt-5 text-[0.9375rem] leading-relaxed text-white/85 not-italic">
                  <span className="block font-display text-base font-semibold text-white">{site.name}</span>
                  {address.street}
                  <br />
                  {address.postalCode} {address.locality} · {address.country}
                </address>
                <a
                  href={hero.cta.href}
                  className="group/em mt-5 flex items-center justify-between gap-3 border-t border-white/15 pt-5 text-sm text-white transition-colors duration-300 hover:text-imperial-300"
                >
                  <span className="break-all">{site.email}</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-expo group-hover/em:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
