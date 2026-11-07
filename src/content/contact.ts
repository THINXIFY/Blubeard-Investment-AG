import type { ImageKey } from "./images";
import { site } from "@/lib/site";

const { address, registry } = site;
const fullAddress = `${site.name}, ${address.street}, ${address.postalCode} ${address.locality}, ${address.country}`;

/**
 * Contact page content (IP-06). Direct email only — no form, phone numbers or social profiles.
 * Register details are the client-verified Moneyhouse entries held in lib/site.ts.
 */
export const contactPage = {
  meta: {
    title: "Contact",
    description: `Contact ${site.name} by email at ${site.email}. Headquarters: ${address.street}, ${address.postalCode} ${address.locality}, ${address.country}.`,
  },
  hero: {
    eyebrow: "Contact Blubeard",
    heading: ["Let’s Talk", "Capital."],
    description:
      "Connect with Blubeard Investment AG for investment-related inquiries, corporate discussions and strategic opportunities.",
    cta: { label: "Email Us", href: `mailto:${site.email}` },
    image: "svcMna" as ImageKey,
  },
  direct: {
    eyebrow: "Direct Contact",
    heading: "Let’s Start a Conversation.",
    lead: "For investment-related inquiries, corporate discussions and strategic opportunities, please write to us directly.",
    topics: ["Investment-related inquiries", "Corporate discussions", "Strategic opportunities"],
  },
  clocks: {
    eyebrow: "World Clocks",
    heading: "Connected Across Time Zones.",
    note: "Our headquarters is in Switzerland. The other cities are major international markets, shown for reference only.",
    cities: [
      { city: "Samedan / Zürich", country: "Switzerland", timeZone: "Europe/Zurich", headquarters: true },
      { city: "London", country: "United Kingdom", timeZone: "Europe/London", headquarters: false },
      { city: "New York", country: "United States", timeZone: "America/New_York", headquarters: false },
      { city: "Tokyo", country: "Japan", timeZone: "Asia/Tokyo", headquarters: false },
    ],
  },
  headquarters: {
    eyebrow: "Swiss Headquarters",
    heading: "Rooted in Switzerland.",
    lead: "Blubeard Investment AG is registered in Samedan, in the Upper Engadin valley of the canton of Graubünden.",
    region: "Upper Engadin · Graubünden",
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`,
    image: "ctSamedan" as ImageKey,
    imageCaption: "View from Samedan, Upper Engadin",
    detailImage: "ctAerial" as ImageKey,
    detailCaption: "Samedan and the Engadin valley",
  },
  corporate: {
    eyebrow: "Official Information",
    heading: "Corporate Information.",
    lead: "Details as entered in the Swiss commercial register.",
    rows: [
      { label: "Registered company", value: site.name },
      { label: "Legal form", value: registry.legalForm },
      { label: "Registered office", value: registry.seat },
      { label: "UID", value: registry.uid, mono: true },
      { label: "Commercial register number", value: registry.registerNumber, mono: true },
      { label: "Commercial register entry", value: "14 August 2013", dateTime: registry.registerEntry },
      { label: "Registered board member", value: registry.boardMember },
    ],
    profile: { label: "View the Moneyhouse company profile", href: registry.profileUrl },
  },
  closing: {
    heading: ["We Welcome", "Meaningful Dialogue."],
    description:
      "Whether exploring strategic interests or discussing corporate opportunities, we welcome professional communication built on clarity and shared objectives.",
    cta: { label: "Email Us", href: `mailto:${site.email}` },
    image: "apCity" as ImageKey,
  },
} as const;
