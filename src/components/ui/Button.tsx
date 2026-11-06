import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "./Icons";

type Variant = "primary" | "secondary" | "text";
type Tone = "light" | "dark";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  /** Tone of the surface the button sits on. */
  tone?: Tone;
  size?: Size;
  /** Show the sliding arrow affordance. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps | "href"> & { href: string };
type ButtonAsButton = CommonProps & Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap font-medium tracking-[-0.005em] select-none " +
  "transition-[color,background-color,border-color] duration-700 ease-expo disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm rounded-sm",
  md: "h-12 px-6 text-[0.9375rem] rounded-sm",
  lg: "h-14 px-7 text-base rounded-sm",
};

/* Fill layer that rises from the bottom on hover. */
const fill =
  "before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:transition-transform before:duration-700 before:ease-expo hover:before:scale-y-100 focus-visible:before:scale-y-100";

const variants: Record<Variant, Record<Tone, string>> = {
  primary: {
    light: cn("bg-imperial text-white before:bg-obsidian", fill),
    dark: cn("bg-white text-obsidian before:bg-imperial hover:text-white focus-visible:text-white", fill),
  },
  secondary: {
    light: cn(
      "border border-line-strong bg-transparent text-ink before:bg-obsidian hover:border-obsidian hover:text-white focus-visible:text-white",
      fill,
    ),
    dark: cn(
      "border border-white/25 bg-transparent text-white before:bg-white hover:border-white hover:text-obsidian focus-visible:text-obsidian",
      fill,
    ),
  },
  text: {
    light: "text-ink hover:text-imperial",
    dark: "text-white hover:text-imperial-300",
  },
};

function Arrow() {
  // Two arrows: one slides out to the right while the other slides in from the left.
  return (
    <span aria-hidden className="relative inline-flex size-4 shrink-0 overflow-hidden">
      <ArrowRightIcon className="absolute inset-0 transition-transform duration-700 ease-expo group-hover/btn:translate-x-[150%] group-focus-visible/btn:translate-x-[150%]" />
      <ArrowRightIcon className="absolute inset-0 -translate-x-[150%] transition-transform duration-700 ease-expo group-hover/btn:translate-x-0 group-focus-visible/btn:translate-x-0" />
    </span>
  );
}

/**
 * Brand button. Renders a Next.js <Link> when `href` is internal, an <a> for
 * external/mailto/tel links, and a <button> otherwise.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", tone = "light", size = "md", arrow = false, className, children, href, ...rest } = props;

  const classes = cn(
    base,
    variant === "text" ? "h-auto gap-2.5 p-0 text-[0.9375rem]" : sizes[size],
    variants[variant][tone],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </>
  );

  if (typeof href === "string") {
    const anchorProps = rest as Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps | "href">;
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
