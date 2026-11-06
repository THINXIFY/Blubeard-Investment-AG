import type { ReactNode } from "react";
import type { SectorIcon } from "@/content/sectors/types";

/** White line icons for focus areas (34×34 design units, stroke = currentColor). */
const paths: Record<SectorIcon, ReactNode> = {
  // Ship hull with containers
  port: (
    <>
      <path d="M4 22h26l-3.5 6H7.5z" />
      <path d="M8 22v-6h6v6M14 22v-9h6v9M20 22v-6h6v6" />
      <path d="M2 31c2.5 0 2.5-1.5 5-1.5S9.5 31 12 31s2.5-1.5 5-1.5 2.5 1.5 5 1.5 2.5-1.5 5-1.5 2.5 1.5 5 1.5" />
    </>
  ),
  // Stepped stacked boxes
  warehouse: (
    <>
      <path d="M3 30h28" />
      <rect x="5" y="20" width="9" height="10" />
      <rect x="14" y="20" width="9" height="10" />
      <rect x="9.5" y="10" width="9" height="10" />
      <rect x="23" y="14" width="7" height="16" />
    </>
  ),
  // Locomotive front on rails
  rail: (
    <>
      <rect x="9" y="4" width="16" height="20" rx="3" />
      <path d="M9 13h16M13 8h8" />
      <circle cx="13.5" cy="19" r="1.4" />
      <circle cx="20.5" cy="19" r="1.4" />
      <path d="M12 24l-4 6M22 24l4 6M7 30h20" />
    </>
  ),
  // Aircraft silhouette
  air: (
    <>
      <path d="M17 3c1.4 0 2 1.6 2 3.5V13l11 6v3l-11-3v6.5l3.5 2.5V30L17 28.5 11.5 30v-2l3.5-2.5V19L4 22v-3l11-6V6.5C15 4.6 15.6 3 17 3z" />
    </>
  ),
  // Truck
  road: (
    <>
      <path d="M3 9h17v15H3z" />
      <path d="M20 14h6l5 5v5H20" />
      <circle cx="9" cy="26.5" r="2.5" />
      <circle cx="25" cy="26.5" r="2.5" />
    </>
  ),
  // Suspension bridge
  infrastructure: (
    <>
      <path d="M2 24h30" />
      <path d="M9 30V6M25 30V6" />
      <path d="M2 18c4 0 7-12 7-12s3 12 8 12 8-12 8-12 3 12 7 12" />
      <path d="M13 24v-6M17 24v-6M21 24v-6M5 24v-4M29 24v-4" />
    </>
  ),
};

export function SectorIconGlyph({ name, className }: { name: SectorIcon; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 34 34"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
