"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Copies text to the clipboard with an animated tick and a polite live announcement. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
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
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-xs font-medium tracking-[0.04em] transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-imperial-300",
          copied
            ? "border-imperial-300/60 bg-imperial/25 text-white"
            : "border-white/15 text-platinum hover:border-white/40 hover:text-white",
        )}
      >
        <span aria-hidden className="relative grid size-3.5 place-items-center">
          <svg
            viewBox="0 0 16 16"
            className={cn(
              "absolute size-3.5 transition-[opacity,transform] duration-500",
              copied ? "scale-50 opacity-0" : "opacity-100",
            )}
          >
            <rect x="5" y="5" width="8.5" height="8.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M3 10.5V3.8C3 3.4 3.4 3 3.8 3h6.7" fill="none" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          <svg
            viewBox="0 0 16 16"
            className={cn(
              "absolute size-3.5 transition-[opacity,transform] duration-500",
              copied ? "opacity-100" : "scale-50 opacity-0",
            )}
          >
            <path d="m3 8.5 3.2 3.2L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        {copied ? "Copied" : "Copy email"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </>
  );
}

/** Smooth return to the top (instant for reduced motion) and focus handed to the skip link target. */
export function BackToTop() {
  const onClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.querySelector<HTMLElement>("header a[href='/']")?.focus({ preventScroll: true });
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/top inline-flex items-center gap-3 text-sm text-white outline-none"
    >
      Back to top
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-white/15 transition-colors duration-500 group-hover/top:border-white group-hover/top:bg-white group-hover/top:text-obsidian group-focus-visible/top:ring-2 group-focus-visible/top:ring-imperial-300">
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="size-3.5 transition-transform duration-500 ease-expo group-hover/top:-translate-y-[180%]"
        >
          <path d="M8 13V3.5M4 7.5l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="absolute size-3.5 translate-y-[180%] transition-transform duration-500 ease-expo group-hover/top:translate-y-0"
        >
          <path d="M8 13V3.5M4 7.5l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    </button>
  );
}
