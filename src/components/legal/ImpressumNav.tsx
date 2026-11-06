"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/cn";
import { useActiveSection } from "./LegalToc";
import { ImpressumCopy } from "./ImpressumCopy";

type Item = { id: string; title: string };

/**
 * Desktop: sticky index with a progress rail (sections passed are filled), plus quick actions
 * (copy UID, write by email, print). Mobile/tablet: a sticky, horizontally scrollable chip bar.
 */
export function ImpressumNav({ items, uid, email }: { items: readonly Item[]; uid: string; email: string }) {
  const key = items.map((i) => i.id).join("|");
  const ids = useMemo(() => key.split("|"), [key]);
  const active = useActiveSection(ids, 64);
  const index = Math.max(0, ids.indexOf(active));
  const chips = useRef<HTMLDivElement>(null);

  // Keep the active chip in view on small screens.
  useEffect(() => {
    const el = chips.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const bar = chips.current;
    if (!el || !bar) return;
    bar.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  return (
    <>
      {/* Mobile / tablet */}
      <div className="sticky top-[4.25rem] z-30 -mx-5 border-y border-line bg-white/90 backdrop-blur-md sm:-mx-8 lg:hidden">
        <nav aria-label="Sections">
          <div
            ref={chips}
            className="flex [scrollbar-width:none] gap-2 overflow-x-auto px-5 py-2.5 sm:px-8 [&::-webkit-scrollbar]:hidden"
          >
            {items.map((s) => {
              const on = s.id === active;
              return (
                <a
                  key={s.id}
                  data-id={s.id}
                  href={`#${s.id}`}
                  aria-current={on ? "location" : undefined}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-[0.8125rem] font-medium whitespace-nowrap transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-imperial",
                    on
                      ? "border-obsidian bg-obsidian text-white"
                      : "border-line-strong bg-white text-slate hover:text-ink",
                  )}
                >
                  {s.title}
                </a>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Desktop */}
      <div className="sticky top-[calc(var(--header-h)+2.5rem)] hidden lg:block">
        <nav aria-label="Sections">
          <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-slate uppercase">Contents</p>
          <ol className="relative mt-5">
            <span aria-hidden className="absolute top-2 bottom-2 left-[0.3125rem] w-px bg-line" />
            <span
              aria-hidden
              className="absolute top-2 left-[0.3125rem] w-px bg-imperial transition-[height] duration-500 ease-expo motion-reduce:transition-none"
              style={{
                height: `calc(${(index / Math.max(1, items.length - 1)) * 100}% - ${index === items.length - 1 ? 16 : 0}px)`,
              }}
            />
            {items.map((s, i) => {
              const on = s.id === active;
              const passed = i < index;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? "location" : undefined}
                    className="group/n relative flex items-center gap-4 rounded-sm py-2 outline-none focus-visible:ring-2 focus-visible:ring-imperial"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "relative z-10 size-[0.6875rem] shrink-0 rounded-full border-2 bg-white transition-colors duration-300",
                        on
                          ? "border-imperial bg-imperial"
                          : passed
                            ? "border-imperial"
                            : "border-line-strong group-hover/n:border-ink",
                      )}
                    />
                    <span
                      className={cn(
                        "text-[0.875rem] leading-snug transition-colors duration-300",
                        on ? "font-semibold text-ink" : "text-slate group-hover/n:text-ink",
                      )}
                    >
                      {s.title}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-8 rounded-md border border-line bg-porcelain p-4">
          <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-slate uppercase">Quick actions</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-sm text-ink tabular-nums">{uid}</span>
            <ImpressumCopy value={uid} label="UID" />
          </div>
          <div className="mt-3 flex flex-col gap-1 border-t border-line pt-3 text-sm">
            <a href={`mailto:${email}`} className="py-1 text-imperial underline-offset-4 hover:underline">
              Write to {email}
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="self-start py-1 text-ink underline-offset-4 hover:text-imperial hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial"
            >
              Print this page
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
