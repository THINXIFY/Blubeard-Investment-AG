import type { ImageKey } from "../images";

export type Cta = { label: string; href: string };

/** Line icons available to focus areas (rendered in components/sector/SectorIcons). */
export type SectorIcon = "port" | "warehouse" | "rail" | "air" | "road" | "infrastructure";

/**
 * Data model for an investment-sector page (/investments/[slug]).
 * Every sector page renders from this shape through <SectorTemplate>, so adding a sector means
 * adding one data file and registering it in ./index.ts.
 *
 * Content rules: focus areas and considerations describe investment interests and evaluation
 * criteria — never holdings, transactions, returns or authorisations.
 */
export type SectorPageData = {
  /** URL slug — must match the industry id in content/home.ts. */
  slug: string;
  /** Short display name (breadcrumbs, related cards). */
  name: string;
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    heading: readonly string[];
    intro: readonly string[];
    image: ImageKey;
    /** CSS object-position for the hero photograph (focal point). Defaults to centre. */
    position?: string;
    /** Hero composition variant — keeps sector pages from repeating one layout. */
    layout?: "editorial" | "centered";
    /**
     * Optional scroll-scrubbed aerial video hero. When set, the hero becomes a sticky video whose
     * playhead follows scroll position, and the focus areas are presented inside it (mirrored
     * either side of the frame’s centre line) instead of in the separate focus carousel.
     */
    video?: { src: string; srcSmall: string; poster: string };
  };
  perspective: {
    eyebrow: string;
    heading: string;
    body: readonly string[];
    image: ImageKey;
    detailImage?: ImageKey;
  };
  focus: {
    eyebrow: string;
    heading: string;
    items: readonly { title: string; text: string; image: ImageKey; icon?: SectorIcon }[];
  };
  considerations: {
    eyebrow: string;
    heading: readonly string[];
    intro: string;
    items: readonly { title: string }[];
    /** One sector photograph; the stage re-frames it for each consideration. */
    image: ImageKey;
    /** Optional focal points (object-position) per consideration. */
    frames?: readonly string[];
  };
  longTerm: {
    eyebrow: string;
    heading: readonly string[];
    body: readonly string[];
    image: ImageKey;
  };
  /** Industry ids (content/home.ts) shown as related sectors. */
  related: readonly string[];
  closing: {
    eyebrow: string;
    heading: readonly string[];
    description: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    image: ImageKey;
    /** Closing composition variant. */
    layout?: "glass" | "split";
  };
};
