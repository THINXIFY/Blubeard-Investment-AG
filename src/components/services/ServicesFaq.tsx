"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { servicesPage } from "@/content/services";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Frequently asked questions: an accordion with one answer open at a time. Native buttons work with Enter and Space,
 * and the arrow, Home and End keys move between questions. Answers stay in the page for search engines and print.
 */
export function ServicesFaq() {
  const { faq } = servicesPage;
  const [open, setOpen] = useState<number | null>(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = faq.items.length;
    const next =
      e.key === "ArrowDown"
        ? (i + 1) % n
        : e.key === "ArrowUp"
          ? (i - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    buttons.current[next]?.focus();
  };

  return (
    <section
      id="faq"
      data-tone="light"
      aria-labelledby="services-faq-title"
      className="bg-porcelain py-16 md:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{faq.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="services-faq-title"
              lines={faq.heading}
              className="mt-6 font-display text-[clamp(2.125rem,1.65rem+1.7vw,3.125rem)] leading-[1.06] font-medium tracking-[-0.035em] text-ink"
              lineClassNames={[undefined, "text-slate/80"]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[38ch] leading-relaxed text-slate">{faq.description}</p>
            </Reveal>
          </div>

          <Reveal as="ul" stagger={0.05} className="border-t border-line-strong lg:col-span-7 lg:col-start-6">
            {faq.items.map((item, i) => {
              const on = open === i;
              return (
                <li key={item.question} data-reveal-item className="relative border-b border-line-strong">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-y-0 left-0 w-0.5 origin-top bg-imperial transition-transform duration-500 ease-expo",
                      on ? "scale-y-100" : "scale-y-0",
                    )}
                  />
                  <h3>
                    <button
                      ref={(el) => {
                        buttons.current[i] = el;
                      }}
                      type="button"
                      id={`${uid}-q-${i}`}
                      aria-expanded={on}
                      aria-controls={`${uid}-a-${i}`}
                      onClick={() => setOpen(on ? null : i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className="group/q flex w-full items-center justify-between gap-6 py-5 pl-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial sm:py-6"
                    >
                      <span
                        className={cn(
                          "font-display text-[1.125rem] leading-snug font-medium tracking-[-0.02em] transition-colors duration-300 sm:text-[1.25rem]",
                          on ? "text-imperial" : "text-ink group-hover/q:text-imperial",
                        )}
                      >
                        {item.question}
                      </span>
                      {/* A plus whose upright stroke folds away when open. */}
                      <span
                        aria-hidden
                        className={cn(
                          "relative grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-500",
                          on
                            ? "border-imperial bg-imperial text-white"
                            : "border-line-strong text-ink group-hover/q:border-imperial group-hover/q:text-imperial",
                        )}
                      >
                        <span className="absolute h-px w-3 bg-current" />
                        <span
                          className={cn(
                            "absolute h-3 w-px bg-current transition-transform duration-500 ease-expo",
                            on ? "scale-y-0" : "scale-y-100",
                          )}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${uid}-a-${i}`}
                    role="region"
                    aria-labelledby={`${uid}-q-${i}`}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-expo",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden" inert={!on}>
                      <p className="max-w-[62ch] pr-14 pb-6 pl-5 leading-relaxed text-slate">{item.answer}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
