import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export type SectionTone = "light" | "porcelain" | "dark" | "surface";

const tones: Record<SectionTone, string> = {
  light: "bg-white text-ink",
  porcelain: "bg-porcelain text-ink",
  dark: "bg-obsidian text-white",
  surface: "bg-surface-dark text-white",
};

const spacings = {
  none: "",
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28 lg:py-32",
  lg: "py-24 md:py-32 lg:py-40",
} as const;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  spacing?: keyof typeof spacings;
  /** Draw a hairline at the top edge to separate same-tone sections. */
  divider?: boolean;
  /** Wrap children in the standard Container (default true). */
  contained?: boolean;
  containerClassName?: string;
};

/**
 * Page section with a tone (light / porcelain / dark / surface).
 * `data-tone` lets nested components adapt (focus rings, grids, buttons).
 */
export function Section({
  tone = "light",
  spacing = "md",
  divider = false,
  contained = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  const isDark = tone === "dark" || tone === "surface";
  return (
    <section
      data-tone={isDark ? "dark" : "light"}
      className={cn(
        "relative",
        tones[tone],
        spacings[spacing],
        divider && (isDark ? "border-t border-line-dark" : "border-t border-line"),
        className,
      )}
      {...props}
    >
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  );
}
