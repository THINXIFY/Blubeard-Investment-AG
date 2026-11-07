import type { ReactNode } from "react";
import { aboutPage } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { ValuesMotion } from "./ValuesMotion";

/* Fine line icons (stroke = currentColor). */
const icons: Record<string, ReactNode> = {
  integrity: (
    <>
      <rect x="6" y="6" width="28" height="28" />
      <rect x="13" y="13" width="14" height="14" transform="rotate(45 20 20)" />
    </>
  ),
  responsibility: (
    <>
      <path d="M20 4 33 9v10c0 9-6 14-13 17C13 33 7 28 7 19V9Z" />
      <path d="M14 20l4 4 8-8" />
    </>
  ),
  expertise: (
    <>
      <circle cx="18" cy="18" r="11" />
      <path d="M26 26l8 8M12 18h12M18 12v12" />
    </>
  ),
  vision: (
    <>
      <path d="M3 30h34" />
      <path d="M9 30a11 11 0 0 1 22 0" />
      <path d="M20 6v8M8 11l4 4M32 11l-4 4" />
    </>
  ),
};

/**
 * Values as an editorial index: each is a word at display scale beside its description, which is always legible. Words
 * settle from a soft tint to solid ink as they arrive (ValuesMotion). Hover is a quiet highlight that rises in three
 * bars, after the bars in the emblem; nothing moves, so the text being read stays still.
 */
export function AboutValues() {
  const { values } = aboutPage;

  return (
    <section
      id="values"
      data-tone="light"
      aria-labelledby="values-title"
      className="overflow-x-clip bg-porcelain py-20 md:py-24 lg:py-28"
    >
      <Container>
        <Reveal>
          <Eyebrow>{values.eyebrow}</Eyebrow>
          <MaskedHeading id="values-title" lines={[values.heading]} className="mt-6 max-w-[18ch] text-heading-lg" />
        </Reveal>

        <ValuesMotion>
          <ol className="value-list mt-10 lg:mt-12">
            {values.items.map((v, i) => (
              <li key={v.id} className="value-row relative isolate lg:-mx-6">
                <span
                  aria-hidden
                  data-rule
                  className="value-rule absolute inset-x-0 top-0 block h-px origin-left bg-line-strong lg:inset-x-6"
                />
                <span aria-hidden className="value-bars absolute inset-0 -z-10 flex overflow-hidden rounded-md">
                  <span />
                  <span />
                  <span />
                </span>
                <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2.5 py-6 sm:py-7 lg:grid-cols-[3rem_minmax(0,1fr)_minmax(0,26rem)_3.5rem] lg:gap-x-8 lg:px-6 lg:py-7">
                  <span aria-hidden className="value-num text-sm font-medium text-slate tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="value-icon grid size-11 place-items-center justify-self-end rounded-full border border-line-strong bg-white text-imperial lg:order-4 lg:size-14"
                  >
                    <svg viewBox="0 0 40 40" className="size-5 fill-none stroke-current stroke-[1.75] lg:size-6">
                      {icons[v.id]}
                    </svg>
                  </span>
                  <h3
                    data-value-word
                    className="value-word col-span-2 pb-[0.1em] font-display text-[clamp(2rem,9.6vw,3rem)] leading-[1.05] font-medium tracking-[-0.04em] text-ink lg:col-span-1 lg:text-[clamp(2.5rem,4.4vw,4.5rem)]"
                  >
                    {v.title}
                  </h3>
                  <p className="value-text col-span-2 leading-relaxed text-slate lg:col-span-1 lg:text-[1.0625rem]">
                    {v.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </ValuesMotion>
      </Container>
    </section>
  );
}
