/**
 * Single source of truth for company facts, navigation and SEO defaults.
 * Only verified company information belongs here — no invented figures.
 */
export const site = {
  name: "Blubeard Investment AG",
  shortName: "Blubeard",
  tagline: "Capital with Vision. Value with Purpose.",
  description:
    "Blubeard Investment AG is a Swiss investment company in Samedan, focused on strategic opportunities across established industries and emerging technologies.",
  /** Brand statement used in the footer (client-approved). */
  statement:
    "A Swiss investment company focused on strategic opportunities, disciplined thinking, and long-term value.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_CH",
  address: {
    street: "Chiss 12a",
    postalCode: "7503",
    locality: "Samedan",
    region: "Graubünden",
    country: "Switzerland",
    countryCode: "CH",
  },
  /** General enquiries (client-provided). */
  email: "info@blubeard-investment.com",
  /** Commercial register facts as published on Moneyhouse (verified by the client). */
  registry: {
    legalForm: "Aktiengesellschaft (AG)",
    seat: "Samedan, Graubünden, Switzerland",
    uid: "CHE-413.084.994",
    registerNumber: "CH-350.3.011.746-6",
    registerEntry: "2013-08-14",
    boardMember: "Robert Albertin",
    profileUrl: "https://www.moneyhouse.ch/de/company/blubeard-investment-ag-17018227861",
    /** Commercial register summary (Moneyhouse company dossier, PDF), opened in the browser's PDF viewer. */
    document: "/documents/company-registration/blubeard-investment-ag-company-registration.pdf",
  },
  /** Approximate coordinates of Samedan, used for decorative labelling only. */
  coordinates: { lat: "46.53° N", lng: "9.87° E" },
} as const;

/** Routes without `ready: true` are still placeholders: noindex and excluded from the sitemap. */
export type NavItem = {
  label: string;
  href: string;
  ready?: boolean;
  /** Shorter label for the header navigation (falls back to label). */
  short?: string;
};

/** Also linked from the footer. */
export const partnersNav: NavItem = { label: "Our Partners", short: "Partners", href: "/partners", ready: true };

export const mainNav: readonly NavItem[] = [
  { label: "Home", href: "/", ready: true },
  { label: "About Us", short: "About", href: "/about", ready: true },
  { label: "Investments", href: "/investments", ready: true },
  { label: "Services", href: "/services", ready: true },
  { label: "Our Approach", short: "Approach", href: "/approach", ready: true },
  { label: "Our Team", href: "/team", ready: true },
  partnersNav,
  { label: "Contact", href: "/contact", ready: true },
] as const;

export const legalNav: readonly NavItem[] = [
  { label: "Impressum", href: "/legal-notice" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Image Credits", href: "/image-credits" },
] as const;

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
