"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { aboutPage } from "@/content/about";
import { images } from "@/content/images";
import { cn } from "@/lib/cn";
import {
  ensureGsap,
  gsap,
  motion,
  MOTION_OK,
  PIN_MEDIA,
  pinFits,
  ScrollTrigger,
  scrollToY,
  useGSAP,
} from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CursorDepth } from "@/components/motion/CursorDepth";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

ensureGsap();

const pad = (n: number) => String(n).padStart(2, "0");

/** Three bars rising in turn, after the bars in the emblem. Each value runs from 0 (closed) to 1 (fully risen). */
function barsClip(rise: readonly number[]) {
  if (rise.every((r) => r >= 1)) return "none";
  const points = rise.flatMap((r, i) => {
    const left = (i * 100) / rise.length;
    const right = ((i + 1) * 100) / rise.length;
    const top = 100 - r * 100;
    return [`${left}% 100%`, `${left}% ${top}%`, `${right}% ${top}%`, `${right}% 100%`];
  });
  return `polygon(${points.join(",")})`;
}

/**
 * Investment perspective as a full-screen stage on large screens. A window opens onto the first sector; scrolling then
 * brings each sector up through three rising bars while its title climbs out of a mask, and a large outlined numeral
 * drifts behind. The bar along the foot tracks progress, and choosing a sector scrolls to it.
 * Phones get a swipe rail of photo cards, and other screens, reduced motion and no JavaScript a grid of the same cards.
 */
export function AboutPerspective() {
  const { perspective } = aboutPage;
  const { sectors } = perspective;
  const n = sectors.length;
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const pin = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const trackEl = track.current;
      const stageEl = stage.current;
      if (!trackEl || !stageEl) return;
      const q = gsap.utils.selector(stageEl);
      const mm = gsap.matchMedia();

      mm.add(PIN_MEDIA, () => {
        if (!pinFits(trackEl, stageEl)) return;
        const slides = q("[data-p-slide]") as HTMLElement[];
        const part = (slide: HTMLElement, name: string) => slide.querySelectorAll(`[data-p-${name}]`);

        // The window opens as the section arrives.
        gsap.fromTo(
          q("[data-p-frame]"),
          { clipPath: "inset(7% 5% 7% 5% round 14px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: { trigger: trackEl, start: "top 85%", end: "top top", scrub: 0.5 },
          },
        );

        // Explicit start states: a staggered tween only applies its start when it begins.
        slides.forEach((slide, i) => {
          if (i === 0) return;
          slide.style.clipPath = barsClip([0, 0, 0]);
          gsap.set(part(slide, "img"), { scale: 1.2 });
          gsap.set(part(slide, "line"), { y: 0, yPercent: 112 });
          gsap.set(part(slide, "fade"), { opacity: 0, y: 24 });
          gsap.set(part(slide, "ghost"), { xPercent: 12, opacity: 0 });
        });
        gsap.set(q("[data-p-bar]"), { scaleX: 0 });

        const STEP = 0.5;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: trackEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => {
              setActive(Math.min(n - 1, Math.floor(self.progress * n)));
              (q("[data-p-bar]") as HTMLElement[]).forEach((bar, i) => {
                gsap.set(bar, { scaleX: Math.min(Math.max(self.progress * n - i, 0), 1) });
              });
            },
          },
        });

        slides.forEach((slide, i) => {
          // Every sector holds, then the next rises over it. The stage rests on the first and last.
          const at = i - 1 + STEP;
          gsap.fromTo(
            part(slide, "ghost"),
            { x: 0 },
            {
              x: -70,
              ease: "none",
              scrollTrigger: {
                trigger: trackEl,
                start: () => `top+=${(i / n) * 100}% top`,
                end: () => `top+=${((i + 1) / n) * 100}% top`,
                scrub: 0.6,
              },
            },
          );
          if (i === 0) return;
          const prev = slides[i - 1];
          const rise = { a: 0, b: 0, c: 0 };
          const paint = () => {
            slide.style.clipPath = barsClip([rise.a, rise.b, rise.c]);
          };
          tl.to(rise, { a: 1, duration: 0.3, ease: "power2.inOut", onUpdate: paint }, at)
            .to(rise, { b: 1, duration: 0.3, ease: "power2.inOut", onUpdate: paint }, at + 0.06)
            .to(rise, { c: 1, duration: 0.3, ease: "power2.inOut", onUpdate: paint }, at + 0.12)
            .to(part(slide, "img"), { scale: 1, duration: 0.5, ease: "power2.out" }, at)
            .to(part(prev, "img"), { scale: 1.08, duration: 0.45 }, at)
            .to(part(prev, "line"), { yPercent: -112, duration: 0.2, stagger: 0.03, ease: "power2.in" }, at)
            .to(part(prev, "fade"), { opacity: 0, duration: 0.14 }, at)
            .to(part(prev, "ghost"), { opacity: 0, duration: 0.14 }, at)
            .to(part(slide, "line"), { yPercent: 0, duration: 0.26, stagger: 0.04, ease: "power3.out" }, at + 0.2)
            .to(part(slide, "fade"), { opacity: 1, y: 0, duration: 0.2, stagger: 0.03, ease: "power2.out" }, at + 0.28)
            .to(part(slide, "ghost"), { xPercent: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, at + 0.16);
        });
        // The last sector holds as long as the others.
        tl.to({}, { duration: STEP }, n - 1 - 1 + STEP + 0.5);
        pin.current = tl.scrollTrigger ?? null;

        return () => {
          pin.current = null;
          slides.forEach((slide) => {
            slide.style.clipPath = "";
          });
        };
      });

      // Without the stage: the cards simply rise into view.
      mm.add(`${MOTION_OK} and (max-width: 1023.98px), ${MOTION_OK} and (max-height: 639.98px)`, () => {
        gsap.fromTo(
          q("[data-p-slide]"),
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration.slow,
            ease: motion.ease.out,
            stagger: 0.08,
            scrollTrigger: { trigger: q("[data-p-slides]")[0], start: "top 88%", once: true },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: track },
  );

  const choose = (i: number) => {
    const st = pin.current;
    if (st) scrollToY(st.start + ((i + 0.3) / n) * (st.end - st.start));
  };

  return (
    <section
      id="perspective"
      data-tone="dark"
      aria-labelledby="perspective-title"
      className="persp bg-obsidian text-white"
    >
      <div
        ref={track}
        className="persp-track pin-track"
        style={{ "--pin-h": `calc(100svh + ${n * 85}vh)` } as CSSProperties}
      >
        <div ref={stage} className="pin-stage">
          <div data-p-frame className="persp-frame bg-obsidian">
            <Container className="persp-intro pt-14 md:pt-20">
              <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
                <div className="lg:col-span-7">
                  <Reveal>
                    <Eyebrow tone="dark">{perspective.eyebrow}</Eyebrow>
                  </Reveal>
                  <MaskedHeading
                    id="perspective-title"
                    lines={[perspective.heading]}
                    className="persp-heading mt-5 font-display text-[clamp(2rem,1.3rem+2.4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.038em]"
                  />
                </div>
                <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
                  <p className="persp-lead leading-relaxed text-platinum">{perspective.description}</p>
                </Reveal>
              </div>
            </Container>

            <Container className="persp-list-wrap mt-8 md:mt-10">
              <CursorDepth>
                <ul data-p-slides className="persp-slides m-rail grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {sectors.map((s, i) => {
                    const img = images[s.image];
                    const [first, second] = s.title.split(" & ");
                    return (
                      <li
                        key={s.id}
                        data-p-slide
                        style={{ zIndex: i + 1 }}
                        className="persp-slide relative isolate flex min-h-[29rem] flex-col justify-end overflow-hidden rounded-md bg-obsidian p-6"
                      >
                        <div aria-hidden className="absolute inset-0 -z-20" data-depth="-14">
                          <Image
                            data-p-img
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(min-width: 1024px) 100vw, (min-width: 640px) 50vw, 84vw"
                            placeholder="blur"
                            className="persp-img object-cover"
                          />
                        </div>
                        <div
                          aria-hidden
                          className="persp-grade absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(16_19_32/0.96)_0%,rgb(16_19_32/0.72)_42%,rgb(16_19_32/0.12)_78%)]"
                        />
                        <span aria-hidden data-p-ghost className="persp-ghost hidden">
                          {pad(i + 1)}
                        </span>
                        <div className="persp-copy">
                          <p
                            data-p-fade
                            className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-platinum tabular-nums"
                          >
                            <span aria-hidden className="h-px w-8 bg-imperial-300" />
                            {pad(i + 1)} / {pad(n)}
                          </p>
                          <h3 className="persp-title mt-4 font-display text-[1.75rem] leading-[1.06] font-medium tracking-[-0.03em]">
                            <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                              <span data-p-line className="block">
                                {first}
                                {second ? " &" : null}
                              </span>
                            </span>
                            {second ? (
                              <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                                <span data-p-line className="block text-platinum">
                                  {" "}
                                  {second}
                                </span>
                              </span>
                            ) : null}
                          </h3>
                          <p data-p-fade className="persp-text mt-4 leading-relaxed text-white/85">
                            {s.text}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CursorDepth>
            </Container>

            <Container className="persp-foot pt-8 pb-14 md:pb-20">
              <div className="flex items-end gap-10">
                {/* Follows the scroll on the stage; hidden where every card is already on view. */}
                <div role="group" aria-label="Choose a sector" className="persp-nav hidden min-w-0 flex-1 gap-3">
                  {sectors.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={i === active}
                      onClick={() => choose(i)}
                      onFocus={() => choose(i)}
                      className="group/n min-w-0 flex-1 pb-1 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      <span aria-hidden className="relative block h-px bg-white/25">
                        <span data-p-bar className="absolute inset-x-0 -top-px h-0.5 origin-left bg-white" />
                      </span>
                      <span
                        className={cn(
                          "mt-3 block text-[0.8125rem] leading-snug transition-colors duration-300",
                          i === active ? "text-white" : "text-white/60 group-hover/n:text-white",
                        )}
                      >
                        <span aria-hidden className="mr-2 tabular-nums">
                          {pad(i + 1)}
                        </span>
                        {s.title}
                      </span>
                    </button>
                  ))}
                </div>
                <Button href={perspective.cta.href} tone="dark" size="lg" arrow className="shrink-0">
                  {perspective.cta.label}
                </Button>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}
