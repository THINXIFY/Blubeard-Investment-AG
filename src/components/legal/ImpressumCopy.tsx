"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Light "Copy" control for the Impressum identity panel, with an animated tick and live announcement. */
export function ImpressumCopy({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
        className={cn(
          "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-imperial focus-visible:ring-offset-2",
          copied ? "border-imperial bg-imperial text-white" : "border-line-strong bg-white text-ink hover:border-ink",
        )}
      >
        <svg aria-hidden viewBox="0 0 16 16" className="size-3.5">
          {copied ? (
            <path d="m3 8.5 3.2 3.2L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <>
              <rect x="5" y="5" width="8.5" height="8.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M3 10.5V3.8C3 3.4 3.4 3 3.8 3h6.7" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </>
          )}
        </svg>
        {copied ? "Copied" : "Copy"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? `${value} copied to clipboard` : ""}
      </span>
    </>
  );
}
