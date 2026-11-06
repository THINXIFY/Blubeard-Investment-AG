"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Enough repeats that short lists still fill very wide screens without a gap. */
const MIN_ITEMS_ACROSS = 14;

type LogoMarqueeProps = {
  items: { key: string; node: ReactNode }[];
  label: string;
  /** Shown instead of the moving row when the visitor prefers reduced motion. */
  staticList: ReactNode;
};

/**
 * Seamless logo row: identical copies travel left by exactly one copy's width, so the loop has no
 * jump. Only the first copy is exposed to assistive technology and the keyboard. Pauses on hover and
 * while held on touch; a button pauses it for everyone. Keyboard focus stops the motion and lets the
 * row scroll to the focused link. CSS lives in globals.css (.pm-*).
 */
export function LogoMarquee({ items, label, staticList }: LogoMarqueeProps) {
  const [paused, setPaused] = useState(false);
  const copies = Math.max(2, Math.ceil(MIN_ITEMS_ACROSS / items.length) + 1);
  const seconds = Math.max(24, items.length * 7);

  return (
    <>
      <div className="motion-reduce:hidden">
        <div
          data-paused={paused || undefined}
          style={{ "--pm-copies": copies, "--pm-duration": `${seconds}s` } as React.CSSProperties}
          className="pm-root"
        >
          <div className="pm-track">
            {Array.from({ length: copies }, (_, copy) => (
              <ul
                key={copy}
                aria-label={copy === 0 ? label : undefined}
                aria-hidden={copy > 0 || undefined}
                inert={copy > 0}
                className="pm-copy"
              >
                {items.map((item) => (
                  <li key={item.key} className="shrink-0">
                    {item.node}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className={cn(
              "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-[0.8125rem] font-medium text-slate transition-colors duration-300 hover:text-ink",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial",
            )}
          >
            <svg aria-hidden viewBox="0 0 12 12" className="size-3 fill-current">
              {paused ? <path d="M3 1.5v9l7-4.5z" /> : <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />}
            </svg>
            {paused ? "Play logos" : "Pause logos"}
          </button>
        </div>
      </div>
      <div className="hidden motion-reduce:block">{staticList}</div>
    </>
  );
}
