import { cn } from "@/lib/cn";

type HeadingLinesProps = {
  lines: readonly string[];
  /** Index of a line rendered in a quieter tone for editorial contrast. */
  muted?: number;
  tone?: "light" | "dark";
};

/**
 * Renders deliberate line breaks for two-part headings.
 * On small screens lines may still wrap naturally; the break between them is guaranteed.
 */
export function HeadingLines({ lines, muted, tone = "light" }: HeadingLinesProps) {
  return (
    <>
      {lines.map((line, i) => (
        <span
          key={line}
          className={cn("block", i === muted && (tone === "dark" ? "text-platinum/70" : "text-slate/80"))}
        >
          {line}
        </span>
      ))}
    </>
  );
}
