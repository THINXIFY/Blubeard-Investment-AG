import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** `site` = standard page width, `narrow` = reading width, `wide` = full bleed with gutters. */
  size?: "site" | "narrow" | "wide";
} & Omit<ComponentPropsWithoutRef<T>, "as">;

const sizes = {
  site: "max-w-site",
  narrow: "max-w-3xl",
  wide: "max-w-none",
} as const;

/** Horizontal layout container with consistent responsive gutters. */
export function Container<T extends ElementType = "div">({
  as,
  size = "site",
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizes[size], className)} {...props} />;
}
