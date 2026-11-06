import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  tone?: "light" | "dark";
  /** Optional index label, e.g. "01". */
  index?: string;
  className?: string;
  as?: "p" | "span";
};

/** Small uppercase label with a leading rule — used above headings. */
export function Eyebrow({ children, tone = "light", index, className, as: Tag = "p" }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-3 text-eyebrow",
        tone === "dark" ? "text-platinum" : "text-slate",
        className,
      )}
    >
      {index ? (
        <span className={cn("tabular-nums", tone === "dark" ? "text-imperial-300" : "text-imperial")}>{index}</span>
      ) : null}
      <span
        aria-hidden
        data-eyebrow-rule
        className={cn("h-px w-8 origin-left", tone === "dark" ? "bg-imperial-300" : "bg-imperial")}
      />
      <span>{children}</span>
    </Tag>
  );
}
