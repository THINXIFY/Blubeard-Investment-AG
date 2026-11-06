import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { HeadingLines } from "./HeadingLines";

const isLines = (t: unknown): t is readonly string[] => Array.isArray(t);

type SectionHeadingProps = {
  eyebrow?: string;
  index?: string;
  /** String, or an array of lines rendered with deliberate breaks. */
  title: ReactNode | readonly string[];
  /** Index of a heading line shown in a quieter tone. */
  mutedLine?: number;
  titleClassName?: string;
  lead?: ReactNode;
  tone?: "light" | "dark";
  align?: "start" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "display" | "lg";
  className?: string;
  id?: string;
};

/** Eyebrow + heading + optional lead paragraph. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  mutedLine,
  titleClassName,
  lead,
  tone = "light",
  align = "start",
  as: Heading = "h2",
  size = "lg",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-6", align === "center" && "items-center text-center", className)}>
      {eyebrow ? (
        <Eyebrow tone={tone} index={index}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading id={id} className={cn(size === "display" ? "text-display" : "text-heading-lg", titleClassName)}>
        {isLines(title) ? <HeadingLines lines={title} muted={mutedLine} tone={tone} /> : title}
      </Heading>
      {lead ? (
        <p className={cn("max-w-[46ch] text-lead", tone === "dark" ? "text-platinum" : "text-slate")}>{lead}</p>
      ) : null}
    </div>
  );
}
