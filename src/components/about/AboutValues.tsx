import type { ReactNode } from "react";
import { aboutPage } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

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

/** Values — four-column editorial row with icons, hairline dividers and hover accents. */
export function AboutValues() {
  const { values } = aboutPage;

  return (
    <section
      id="values"
      data-tone="light"
      aria-labelledby="values-title"
      className="bg-porcelain py-20 md:py-24 lg:py-28"
    >
      <Container>
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>{values.eyebrow}</Eyebrow>
            <h2 id="values-title" className="mt-6 max-w-[18ch] text-heading-lg">
              {values.heading}
            </h2>
          </div>
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.08}
          className="mt-12 grid border-t border-line-strong/70 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {values.items.map((v, i) => (
            <li
              key={v.id}
              data-reveal-item
              className="group/value relative border-b border-line-strong/70 py-9 transition-colors duration-700 ease-expo hover:bg-white sm:px-7 sm:even:border-l lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:hover:first:pl-6"
            >
              <span
                aria-hidden
                className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 bg-imperial transition-transform duration-700 ease-expo group-hover/value:scale-x-100"
              />
              <div className="flex items-start justify-between">
                <span className="grid size-14 place-items-center rounded-full border border-line-strong bg-white text-imperial transition-[background-color,border-color,color] duration-700 ease-expo group-hover/value:border-imperial group-hover/value:bg-imperial group-hover/value:text-white">
                  <svg aria-hidden viewBox="0 0 40 40" className="size-6 fill-none stroke-current stroke-[1.5]">
                    {icons[v.id]}
                  </svg>
                </span>
                <span aria-hidden className="text-xs font-medium text-slate tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-8 font-display text-xl font-semibold tracking-[-0.02em] text-ink">{v.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">{v.text}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
