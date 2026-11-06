"use client";

import { Fragment, useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

type OtpCodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  /** Called when the last digit is entered, typed or pasted. */
  onComplete: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
};

const LENGTH = 6;

/** Six segmented digit boxes: auto-advance, backspace and arrow navigation, paste and OTP autofill. */
export function OtpCodeInput({ value, onChange, onComplete, disabled, invalid, describedBy }: OtpCodeInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: LENGTH }, (_, i) => value[i] ?? "");

  const commit = (next: string) => {
    const code = next.slice(0, LENGTH);
    onChange(code);
    refs.current[Math.min(code.length, LENGTH - 1)]?.focus();
    if (code.length === LENGTH) onComplete(code);
  };

  const onInput = (i: number, raw: string) => {
    const clean = raw.replace(/\D/g, "");
    if (clean.length > 1) return commit(clean); // Autofill or multi-character input.
    const next = digits.slice();
    next[i] = clean;
    commit(next.join(""));
  };

  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      e.preventDefault();
      const next = digits.slice();
      next[i - 1] = "";
      onChange(next.join(""));
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowLeft" && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < LENGTH - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    e.preventDefault();
    commit(pasted);
  };

  return (
    <div role="group" aria-label="Six-digit verification code" className="flex items-center gap-1.5 sm:gap-2">
      {digits.map((d, i) => (
        <Fragment key={i}>
          {i === LENGTH / 2 ? (
            <span aria-hidden className="mx-0.5 h-px w-2 shrink-0 bg-line-strong sm:mx-1 sm:w-3" />
          ) : null}
          <input
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1} of ${LENGTH}`}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            maxLength={i === 0 ? LENGTH : 1}
            value={d}
            disabled={disabled}
            onChange={(e) => onInput(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
            onMouseDown={(e) => {
              // Digits fill left to right, so clicking a later empty box goes to the next one due.
              if (i > value.length) {
                e.preventDefault();
                refs.current[value.length]?.focus();
              }
            }}
            onFocus={(e) => e.target.select()}
            className={cn(
              "h-14 w-0 min-w-0 flex-1 rounded-md border text-center font-display text-[1.5rem] font-medium text-ink tabular-nums caret-imperial transition-[border-color,box-shadow,background-color] duration-300 outline-none sm:h-16 sm:text-[1.75rem]",
              "focus:border-imperial focus:bg-white focus:shadow-[0_0_0_3px_rgb(18_72_216/0.14)] focus-visible:outline-none disabled:text-slate",
              invalid
                ? "border-[#b42318] bg-white"
                : d
                  ? "border-obsidian/50 bg-white"
                  : "border-line-strong/80 bg-porcelain hover:border-slate/60",
            )}
          />
        </Fragment>
      ))}
    </div>
  );
}
