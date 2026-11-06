import Image from "next/image";
import { PhotoNote } from "@/components/ui/PhotoNote";
import Link from "next/link";
import { services } from "@/content/home";
import { images } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Services & expertise — photography-led gallery of the eight areas of expertise. */
export function Services() {
  return (
    <Section id="services" tone="porcelain" spacing="md" aria-labelledby="services-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal className="lg:col-span-6">
          <SectionHeading id="services-title" eyebrow={services.eyebrow} title={services.heading} mutedLine={1} />
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.15}>
          <p className="text-lead text-slate">{services.description}</p>
        </Reveal>
      </div>

      <Reveal
        stagger={0.06}
        as="ul"
        className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-y-12"
      >
        {services.items.map((service, i) => {
          const img = images[service.image];
          return (
            <li key={service.title} data-reveal-item>
              <Link href={services.cta.href} className="group/svc block rounded-sm focus-visible:outline-offset-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-white sm:aspect-[4/5]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-1200 ease-expo group-hover/svc:scale-[1.05]"
                  />
                  <PhotoNote image={img} className="left-3 max-w-[85%] text-left" />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-obsidian/45 via-obsidian/0 to-obsidian/0 opacity-50 transition-opacity duration-700 ease-expo group-hover/svc:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="absolute top-4 left-4 rounded-full bg-white/90 px-2.5 py-1 text-[0.6875rem] font-semibold text-ink tabular-nums backdrop-blur"
                  >
                    {num(i)}
                  </span>
                  <span
                    aria-hidden
                    className="absolute right-4 bottom-4 grid size-10 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 transition-[opacity,transform,background-color,color] duration-700 ease-expo group-hover/svc:translate-y-0 group-hover/svc:bg-imperial group-hover/svc:text-white group-hover/svc:opacity-100 group-focus-visible/svc:translate-y-0 group-focus-visible/svc:opacity-100"
                  >
                    <ArrowRightIcon className="size-4" />
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-imperial transition-transform duration-700 ease-expo group-hover/svc:scale-x-100"
                  />
                </div>
                <div className="pt-5">
                  <h3 className="flex items-start justify-between gap-3 font-display text-lg leading-snug font-semibold tracking-[-0.015em] text-ink transition-colors duration-300 group-hover/svc:text-imperial sm:min-h-[2.75em]">
                    {service.title}
                    <ArrowRightIcon
                      aria-hidden
                      className="mt-1.5 size-3.5 shrink-0 -translate-x-1 text-slate/60 transition-[transform,color] duration-700 ease-expo group-hover/svc:translate-x-0 group-hover/svc:text-imperial"
                    />
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-slate">{service.text}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </Reveal>

      <div className="mt-12 flex flex-col gap-6 border-t border-line-strong/70 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
        <p className="max-w-xl text-xs leading-relaxed text-slate">
          The areas of expertise described here are for general information only and do not constitute an offer of
          regulated financial services.
        </p>
        <Button href={services.cta.href} size="lg" arrow className="self-start sm:self-auto">
          {services.cta.label}
        </Button>
      </div>
    </Section>
  );
}
