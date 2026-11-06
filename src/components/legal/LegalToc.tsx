"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Item = { id: string; title: string };

/**
 * Active section = the last section whose top has passed a reading line just below the floating
 * header (rAF-throttled scroll). At the very end of the page the last section is always active.
 */
/** `mobileOffset`: extra px added to the reading line below lg (e.g. a sticky chip bar). */
export function useActiveSection(ids: readonly string[], mobileOffset = 0) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    let frame = 0;
    const update = () => {
      frame = 0;
      const line =
        parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop || "0") +
        48 +
        (window.innerWidth < 1024 ? mobileOffset : 0);
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      if (atEnd && els.length) current = els[els.length - 1].id;
      if (current) setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids, mobileOffset]);
  return active;
}

/** Desktop: sticky list with an Imperial marker on the active section. */
export function LegalTocDesktop({ items }: { items: readonly Item[] }) {
  const key = items.map((i) => i.id).join("|");
  const ids = useMemo(() => key.split("|"), [key]);
  const active = useActiveSection(ids);
  return (
    <nav
      aria-label="On this page"
      className="sticky top-[calc(var(--header-h)+2.5rem)] max-h-[calc(100svh-var(--header-h)-4rem)] overflow-y-auto pb-6"
    >
      <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-slate uppercase">On this page</p>
      <ol className="mt-4 border-l border-line">
        {items.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pr-2 pl-4 text-[0.875rem] leading-snug transition-colors duration-300 outline-none",
                  "focus-visible:rounded-r-sm focus-visible:ring-2 focus-visible:ring-imperial",
                  on
                    ? "border-imperial font-medium text-ink"
                    : "border-transparent text-slate hover:border-line-strong hover:text-ink",
                )}
              >
                {s.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Mobile & tablet: compact native disclosure; choosing a section closes it. */
export function LegalTocMobile({ items }: { items: readonly Item[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details ref={ref} className="group/toc rounded-md border border-line bg-porcelain">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 text-sm font-medium text-ink outline-none focus-visible:ring-2 focus-visible:ring-imperial [&::-webkit-details-marker]:hidden">
        On this page
        <span className="flex items-center gap-2 text-xs font-normal text-slate">
          {items.length} sections
          <svg
            aria-hidden
            viewBox="0 0 12 12"
            className="size-3 transition-transform duration-300 group-open/toc:rotate-180 motion-reduce:transition-none"
          >
            <path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <ol className="border-t border-line px-2 py-2">
        {items.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={() => ref.current?.removeAttribute("open")}
              className="flex min-h-11 items-center rounded-sm px-2 text-[0.9375rem] text-slate outline-none hover:bg-white hover:text-ink focus-visible:bg-white focus-visible:text-ink focus-visible:ring-2 focus-visible:ring-imperial"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
