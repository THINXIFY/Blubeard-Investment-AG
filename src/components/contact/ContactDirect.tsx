"use client";

import { useEffect, useRef, useState } from "react";
import { contactPage } from "@/content/contact";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

type CopyState = "idle" | "copied" | "failed";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers without async clipboard permission.
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

/**
 * Direct contact — the email address is the centrepiece, set at display scale between fine rules.
 * Hovering sweeps an underline and sends the arrow on its diagonal; Copy Email confirms with an
 * animated check and an aria-live message.
 */
export function ContactDirect() {
  const { direct } = contactPage;
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [local, domain] = site.email.split("@");

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyText(site.email);
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2600);
  };

  const { address } = site;

  return (
    <section
      id="direct-contact"
      data-tone="light"
      aria-labelledby="contact-direct-title"
      className="bg-white py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{direct.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="contact-direct-title"
              lines={[direct.heading]}
              className="mt-6 font-display text-[clamp(2.125rem,1.3rem+2.4vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.042em] text-ink"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-lg leading-relaxed text-slate">{direct.lead}</p>
          </Reveal>
        </div>

        {/* Email feature */}
        <Reveal delay={0.15} className="mt-12 border-y border-line-strong py-10 lg:mt-14 lg:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-[0.6875rem] font-medium tracking-[0.22em] text-slate uppercase">
                General enquiries · Email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="group/mail mt-4 inline-flex max-w-full items-center gap-4 text-ink outline-none focus-visible:ring-2 focus-visible:ring-imperial focus-visible:ring-offset-4 md:gap-6"
              >
                <span className="min-w-0 bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 font-display text-[clamp(1.375rem,0.7rem+3.4vw,3.75rem)] leading-tight font-medium tracking-[-0.035em] break-words transition-[background-size,color] duration-700 ease-expo group-hover/mail:bg-[length:100%_2px] group-hover/mail:text-imperial group-focus-visible/mail:bg-[length:100%_2px]">
                  {local}
                  <span className="text-imperial">@</span>
                  <wbr />
                  {domain}
                </span>
                <span
                  aria-hidden
                  className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border border-line-strong transition-colors duration-500 group-hover/mail:border-imperial group-hover/mail:bg-imperial group-hover/mail:text-white md:size-16"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-4 transition-transform duration-700 ease-expo group-hover/mail:translate-x-[180%] group-hover/mail:-translate-y-[180%] md:size-5"
                  >
                    <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  <svg
                    viewBox="0 0 16 16"
                    className="absolute size-4 -translate-x-[180%] translate-y-[180%] transition-transform duration-700 ease-expo group-hover/mail:translate-x-0 group-hover/mail:translate-y-0 md:size-5"
                  >
                    <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
                <span className="sr-only">(opens your email application)</span>
              </a>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <button
                type="button"
                onClick={onCopy}
                className={cn(
                  "group/copy inline-flex h-12 items-center justify-center gap-3 rounded-sm border px-6 text-[0.9375rem] font-medium transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial",
                  state === "copied"
                    ? "border-imperial bg-imperial text-white"
                    : "border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-white",
                )}
              >
                <span aria-hidden className="relative grid size-4 place-items-center">
                  <svg
                    viewBox="0 0 16 16"
                    className={cn(
                      "absolute size-4 transition-[opacity,transform] duration-500 ease-expo",
                      state === "copied" ? "scale-50 opacity-0" : "scale-100 opacity-100",
                    )}
                  >
                    <rect
                      x="5"
                      y="5"
                      width="8.5"
                      height="8.5"
                      rx="1.2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <path d="M3 10.5V3.8C3 3.4 3.4 3 3.8 3h6.7" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                  <svg
                    viewBox="0 0 16 16"
                    className={cn(
                      "absolute size-4 transition-[opacity,transform] duration-500 ease-expo",
                      state === "copied" ? "scale-100 opacity-100" : "scale-50 opacity-0",
                    )}
                  >
                    <path
                      d="m3 8.5 3.2 3.2L13 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={1}
                      strokeDasharray={1}
                      strokeDashoffset={state === "copied" ? 0 : 1}
                      className="transition-[stroke-dashoffset] delay-150 duration-700 ease-expo"
                    />
                  </svg>
                </span>
                <span>
                  {state === "copied" ? "Email copied" : state === "failed" ? "Copy unavailable" : "Copy Email"}
                </span>
              </button>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-12 items-center justify-center gap-3 rounded-sm bg-imperial px-6 text-[0.9375rem] font-medium text-white transition-colors duration-500 hover:bg-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial"
              >
                Write to Us
              </a>
              <p aria-live="polite" className="sr-only">
                {state === "copied"
                  ? `${site.email} copied to clipboard`
                  : state === "failed"
                    ? "Copying is not available"
                    : ""}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Supporting details */}
        <Reveal as="dl" stagger={0.08} className="mt-10 grid gap-8 sm:grid-cols-3 lg:mt-12">
          <div data-reveal-item>
            <dt className="text-[0.6875rem] font-medium tracking-[0.2em] text-slate uppercase">Write to us about</dt>
            <dd className="mt-3">
              <ul className="space-y-1.5 text-ink">
                {direct.topics.map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span aria-hidden className="size-1 rounded-full bg-imperial" />
                    {t}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div data-reveal-item>
            <dt className="text-[0.6875rem] font-medium tracking-[0.2em] text-slate uppercase">Company</dt>
            <dd className="mt-3 text-ink">
              <span className="block font-display text-lg font-semibold tracking-[-0.015em]">{site.name}</span>
              <span className="text-slate">Swiss Aktiengesellschaft</span>
            </dd>
          </div>
          <div data-reveal-item>
            <dt className="text-[0.6875rem] font-medium tracking-[0.2em] text-slate uppercase">Headquarters</dt>
            <dd className="mt-3 leading-relaxed text-ink">
              {address.street}
              <br />
              {address.postalCode} {address.locality}, {address.country}
            </dd>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
