import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" {...defaults} {...props}>
      <path d="M1.5 8h12M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" {...defaults} {...props}>
      <path d="M8 14.5v-12M3.5 7 8 2.5 12.5 7" />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" {...defaults} {...props}>
      <path d="M8 1.5v12M3.5 9 8 13.5 12.5 9" />
    </svg>
  );
}
