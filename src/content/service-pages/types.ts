import type { ImageKey } from "../images";

/** Line icons available to capability cards (see components/service-page/ServiceIcons). */
export type ServiceIconName =
  | "assessment"
  | "positioning"
  | "oversight"
  | "market"
  | "development"
  | "risk"
  | "objectives"
  | "evaluate"
  | "strategy"
  | "planning"
  | "preservation"
  | "succession"
  | "layers"
  | "reporting"
  | "allocation"
  | "monitor"
  | "balance"
  | "growth"
  | "innovation"
  | "network"
  | "organisation"
  | "expansion"
  | "transaction"
  | "valuation"
  | "diligence"
  | "integration"
  | "capital"
  | "research"
  | "analysis"
  | "scenario"
  | "governance";

/**
 * Structured content for a service detail page (/services/<slug>).
 * Every page renders through the same template; copy and photography are configured per page.
 * Copy is informational — it describes areas of expertise, never results, clients or licences.
 */
export type ServicePageData = {
  /** Must match a slug in content/services.ts (serviceEntries). */
  slug: string;
  name: string;
  meta: { title: string; description: string };
  hero: {
    subtitle: string;
    image: ImageKey;
    /** CSS object-position for the banner crop. */
    position?: string;
    /** Optional full-screen video hero (replaces the banner). */
    video?: {
      /** 1080p (desktop) and 720p (≤ 900px wide) renditions. */
      src: string;
      srcSmall: string;
      /** Still frames of the clip: shown before playback, under reduced motion and with Save-Data. */
      poster: string;
      posterSmall: string;
      /** Headline lines for the character animation. */
      heading: readonly string[];
      /** Short tag shown in the glass card. */
      tag: string;
      secondaryCta: { label: string; href: string };
    };
  };
  capabilities: {
    eyebrow: string;
    heading: string;
    items: readonly { title: string; text: string; icon: ServiceIconName }[];
    /** One capability shown as a photographic card for visual variety. */
    featured: { index: number; image: ImageKey };
  };
  expertise: {
    eyebrow: string;
    heading: string;
    body: string;
    image: ImageKey;
    points: readonly { title: string; text: string }[];
  };
  approach: {
    eyebrow: string;
    heading: string;
    description: string;
    steps: readonly { title: string; text: string; icon: ServiceIconName }[];
  };
  /** Slugs of related services (resolved against content/services.ts). */
  related: readonly string[];
  contact: {
    heading: string;
    description: string;
    cta: { label: string; href: string };
    image: ImageKey;
    position?: string;
  };
};
