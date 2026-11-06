import type { SVGProps } from "react";

const base = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  "aria-hidden": true,
  focusable: false,
} as const;

export function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7" width="10" height="7" rx="1" />
      <path d="M5 7V4.8a3 3 0 0 1 6 0V7" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m3 8.5 3.2 3.2L13 4.5" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m3.5 3.5 9 9m0-9-9 9" />
    </svg>
  );
}

export function AlertIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.75v4M8 10.5v.75" />
    </svg>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.5V8l2.25 1.5" />
    </svg>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <svg {...base} strokeWidth={1.6} className={className}>
      <path d="M8 2a6 6 0 1 0 6 6" />
    </svg>
  );
}
