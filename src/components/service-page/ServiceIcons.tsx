import type { ReactNode } from "react";
import type { ServiceIconName } from "@/content/service-pages/types";

/** Restrained line icons (24×24, stroke = currentColor) for service capabilities and stages. */
const paths: Record<ServiceIconName, ReactNode> = {
  // Building under a magnifier
  assessment: (
    <>
      <path d="M3.5 20.5V6.5l6-3v17" />
      <path d="M9.5 8.5h4v4" />
      <path d="M5.5 9h2M5.5 12h2M5.5 15h2" />
      <circle cx="16" cy="16" r="3.25" />
      <path d="m18.4 18.4 2.6 2.6" />
      <path d="M2.5 20.5h9" />
    </>
  ),
  // Compass rose
  positioning: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z" />
      <path d="M12 2v1.5M12 20.5V22M2 12h1.5M20.5 12H22" />
    </>
  ),
  // Building with an overseeing eye
  oversight: (
    <>
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M2.5 21h19" />
      <path d="M7.5 14.5s1.7-2.5 4.5-2.5 4.5 2.5 4.5 2.5-1.7 2.5-4.5 2.5-4.5-2.5-4.5-2.5z" />
      <circle cx="12" cy="14.5" r="1" />
    </>
  ),
  // Map with location pin
  market: (
    <>
      <path d="M3 6.5 8 4.5l8 2 5-2v13l-5 2-8-2-5 2z" />
      <path d="M8 4.5v13M16 6.5v13" opacity="0.55" />
      <path d="M12 13.2s-2.5-2.4-2.5-4.2a2.5 2.5 0 0 1 5 0c0 1.8-2.5 4.2-2.5 4.2z" />
    </>
  ),
  // Tower crane
  development: (
    <>
      <path d="M7 21V5" />
      <path d="M10 21V5" />
      <path d="M7 9l3-2M7 13l3-2M7 17l3-2" />
      <path d="M3 5h18" />
      <path d="M7 5l1.5-2.5L10 5" />
      <path d="M18 5v5" />
      <path d="M16.5 10h3v2.5h-3z" />
      <path d="M4.5 21h8" />
    </>
  ),
  // Shield with check
  risk: (
    <>
      <path d="M12 2.8 19.5 5.5v6c0 4.5-3.2 8.2-7.5 9.7-4.3-1.5-7.5-5.2-7.5-9.7v-6z" />
      <path d="m8.8 12 2.3 2.3 4.3-4.6" />
    </>
  ),
  // Target
  objectives: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.75" />
      <circle cx="12" cy="12" r="1.1" />
    </>
  ),
  // Balance scale
  evaluate: (
    <>
      <path d="M12 3.5v17M7.5 20.5h9" />
      <path d="M4.5 7h15" />
      <path d="M4.5 7 2 13a2.6 2.6 0 0 0 5 0z" />
      <path d="M19.5 7 17 13a2.6 2.6 0 0 0 5 0z" />
    </>
  ),
  // Route between two points
  strategy: (
    <>
      <circle cx="5.5" cy="18.5" r="2" />
      <circle cx="18.5" cy="5.5" r="2" />
      <path d="M7.5 18.5h7a3 3 0 0 0 0-6h-5a3 3 0 0 1 0-6h7" />
    </>
  ),
  // Checklist calendar
  planning: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="m8 14.5 2 2 4.5-4.5" />
    </>
  ),
  // Shield within shield
  preservation: (
    <>
      <path d="M12 2.8 19.5 5.5v6c0 4.5-3.2 8.2-7.5 9.7-4.3-1.5-7.5-5.2-7.5-9.7v-6z" />
      <path d="M12 7.5 15.5 8.8v3c0 2.2-1.5 4-3.5 4.8-2-.8-3.5-2.6-3.5-4.8v-3z" />
    </>
  ),
  // Generational tree
  succession: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="6" cy="18.5" r="2" />
      <circle cx="18" cy="18.5" r="2" />
      <path d="M12 7v4.5M6 16.5V14h12v2.5M12 11.5V14" />
    </>
  ),
  // Stacked layers
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16 8.5 4.5 8.5-4.5" />
    </>
  ),
  // Report document with chart
  reporting: (
    <>
      <path d="M6 2.8h8.5L19 7.3v13.9H6z" />
      <path d="M14.5 2.8v4.5H19" />
      <path d="M9 18v-3M12 18v-5.5M15 18v-4" />
    </>
  ),
  // Pie chart
  allocation: (
    <>
      <path d="M11 4a8.5 8.5 0 1 0 9 9h-9z" />
      <path d="M14 2.8A8 8 0 0 1 21.2 10H14z" />
    </>
  ),
  // Pulse on screen
  monitor: (
    <>
      <rect x="2.8" y="4" width="18.4" height="12.5" rx="1.5" />
      <path d="M6 11h2.5l1.5-3 2.5 6 1.5-3H18" />
      <path d="M9 20.5h6M12 16.5v4" />
    </>
  ),
  // Sliders
  balance: (
    <>
      <path d="M5 3.5v17M12 3.5v17M19 3.5v17" />
      <rect x="3" y="13" width="4" height="3" rx="0.8" />
      <rect x="10" y="6.5" width="4" height="3" rx="0.8" />
      <rect x="17" y="11" width="4" height="3" rx="0.8" />
    </>
  ),
  // Rising trend
  growth: (
    <>
      <path d="M3 20.5h18" />
      <path d="m4 16 5-5 3.5 3.5L20 7" />
      <path d="M15 7h5v5" />
    </>
  ),
  // Light bulb
  innovation: (
    <>
      <path d="M9 17.5h6M10 20.5h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1v1.5h5V16c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
    </>
  ),
  // Connected nodes
  network: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="5" cy="5" r="1.8" />
      <circle cx="19" cy="5" r="1.8" />
      <circle cx="5" cy="19" r="1.8" />
      <circle cx="19" cy="19" r="1.8" />
      <path d="m6.4 6.4 4 4M17.6 6.4l-4 4M6.4 17.6l4-4M17.6 17.6l-4-4" />
    </>
  ),
  // Organisation chart
  organisation: (
    <>
      <rect x="9" y="3" width="6" height="4.5" rx="0.8" />
      <rect x="2.8" y="16.5" width="6" height="4.5" rx="0.8" />
      <rect x="15.2" y="16.5" width="6" height="4.5" rx="0.8" />
      <path d="M12 7.5V12M5.8 16.5V12h12.4v4.5" />
    </>
  ),
  // Globe
  expansion: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5z" />
    </>
  ),
  // Exchange arrows
  transaction: (
    <>
      <path d="M4 8h15M15.5 4.5 19 8l-3.5 3.5" />
      <path d="M20 16H5M8.5 12.5 5 16l3.5 3.5" />
    </>
  ),
  // Calculator
  valuation: (
    <>
      <rect x="5" y="2.8" width="14" height="18.4" rx="1.5" />
      <rect x="8" y="5.8" width="8" height="3.5" rx="0.5" />
      <path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 17h.01M12 17h.01M15.5 17h.01" strokeWidth="2.2" />
    </>
  ),
  // Document with check
  diligence: (
    <>
      <path d="M6 2.8h8.5L19 7.3v13.9H6z" />
      <path d="M14.5 2.8v4.5H19" />
      <path d="m9 14 2.2 2.2L15.5 12" />
    </>
  ),
  // Joining pieces
  integration: (
    <>
      <path d="M4 4h7v3a1.8 1.8 0 1 0 0 3.5V13H4z" />
      <path d="M13 11h7v9h-7v-3a1.8 1.8 0 1 0 0-3.5z" />
    </>
  ),
  // Classical institution
  capital: (
    <>
      <path d="M3 9 12 4l9 5" />
      <path d="M4.5 9h15" />
      <path d="M6.5 9v8.5M10 9v8.5M14 9v8.5M17.5 9v8.5" />
      <path d="M3.5 20.5h17M4.5 17.5h15" />
    </>
  ),
  // Document under magnifier
  research: (
    <>
      <path d="M5 2.8h8l4 4V11" />
      <path d="M5 2.8v18.4h6" />
      <path d="M8 8h4M8 11.5h3" />
      <circle cx="16" cy="16" r="3.2" />
      <path d="m18.4 18.4 2.6 2.6" />
    </>
  ),
  // Bar chart
  analysis: (
    <>
      <path d="M3.5 20.5h17" />
      <rect x="5" y="12" width="3" height="8.5" />
      <rect x="10.5" y="7" width="3" height="13.5" />
      <rect x="16" y="10" width="3" height="10.5" />
    </>
  ),
  // Branching paths
  scenario: (
    <>
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M7 12h10M7 11c4 0 4-6 10-6M7 13c4 0 4 6 10 6" />
    </>
  ),
  // Clipboard with check
  governance: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <rect x="9" y="2.5" width="6" height="3.5" rx="0.8" />
      <path d="m9 13 2 2 4-4.5" />
    </>
  ),
};

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
