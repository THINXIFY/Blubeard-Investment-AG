"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { investmentsPage } from "@/content/investments";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { ensureGsap, gsap, motion, MOTION_OK, useGSAP } from "@/lib/motion";

ensureGsap();

/**
 * Established × Emerging — layered dual-world image with a draggable, keyboard-accessible divider.
 * On scroll-in the divider glides from the established side to the centre (motion-safe only).
 */
export function InvestmentsDuality() {
  const { duality } = investmentsPage;
  const est = images[duality.established.image];
  const emg = images[duality.emerging.image];
  const [pos, setPos] = useState(50);
  const stageRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  useGSAP(
    () => {
      const el = stageRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const o = { v: 82 };
        setPos(82);
        gsap.to(o, {
          v: 50,
          duration: motion.duration.cinematic * 1.3,
          ease: motion.ease.inOut,
          onUpdate: () => setPos(Math.round(o.v * 10) / 10),
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: stageRef },
  );

  return (
    <section
      id="established-emerging"
      data-tone="light"
      aria-labelledby="duality-title"
      className="bg-white py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow>{duality.eyebrow}</Eyebrow>
            <h2 id="duality-title" className="mt-6 max-w-[22ch] text-heading-lg">
              {duality.heading}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="leading-relaxed text-slate">
              {duality.body[0]} {duality.body[1]} <span className="font-medium text-ink">{duality.body[2]}</span>
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-12 lg:mt-14" y={40}>
          <div
            ref={stageRef}
            className="relative aspect-[4/5] w-full touch-pan-y overflow-hidden rounded-md bg-obsidian select-none sm:aspect-[16/10] lg:aspect-[21/9]"
          >
            {/* Established (base layer) */}
            <Image
              src={est.src}
              alt={est.alt}
              fill
              sizes="(min-width: 1360px) 1280px, 100vw"
              placeholder="blur"
              className="object-cover"
            />
            {/* Emerging (top layer, revealed from the right) */}
            <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
              <Image
                src={emg.src}
                alt={emg.alt}
                fill
                sizes="(min-width: 1360px) 1280px, 100vw"
                placeholder="blur"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_left,rgb(18_72_216/0.25),transparent_60%)]"
              />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-obsidian/20"
            />

            {/* Labels */}
            <div className="pointer-events-none absolute bottom-6 left-6 max-w-[45%] text-white sm:bottom-8 sm:left-8">
              <p className="hidden text-eyebrow text-platinum sm:block">{duality.established.caption}</p>
              <p className="font-display text-lg leading-tight font-semibold tracking-[-0.02em] sm:mt-2 sm:text-3xl">
                {duality.established.label}
              </p>
            </div>
            <div className="pointer-events-none absolute right-6 bottom-6 max-w-[45%] text-right text-white sm:right-8 sm:bottom-8">
              <p className="hidden text-eyebrow text-platinum sm:block">{duality.emerging.caption}</p>
              <p className="font-display text-lg leading-tight font-semibold tracking-[-0.02em] sm:mt-2 sm:text-3xl">
                {duality.emerging.label}
              </p>
            </div>

            {/* Accessible control: native range input over the stage */}
            <label htmlFor={`${uid}-range`} className="sr-only">
              Compare established industries and emerging innovation
            </label>
            <input
              id={`${uid}-range`}
              type="range"
              min={5}
              max={95}
              step={1}
              value={Math.round(pos)}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-valuetext={`${Math.round(100 - pos)}% emerging innovation shown`}
              className="peer absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus-visible:outline-none"
            />
            {/* Divider + handle */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-px bg-white/80 peer-focus-visible:[&>span]:ring-2 peer-focus-visible:[&>span]:ring-imperial-300 peer-focus-visible:[&>span]:ring-offset-2 peer-focus-visible:[&>span]:ring-offset-obsidian"
              style={{ left: `${pos}%` }}
            >
              <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/15 text-white backdrop-blur-md">
                <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[1.5]">
                  <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </div>
          <p className="mt-4 flex items-center justify-between text-xs tracking-[0.14em] text-slate uppercase">
            <span>Drag or use arrow keys to compare</span>
            <span aria-hidden className="tabular-nums">
              {Math.round(pos)} / {Math.round(100 - pos)}
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
