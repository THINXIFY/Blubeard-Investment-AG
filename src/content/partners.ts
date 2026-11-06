import type { ImageKey } from "./images";

/**
 * Our Partners page content.
 *
 * To add a partner: put its approved logo in public/media/partners and add an entry to `partners`.
 * List only verified partners whose name and logo the company has approved for publication.
 * The logo section is omitted from the live site while this list is empty.
 */
export type Partner = {
  name: string;
  /** Path under /public, e.g. "/media/partners/example.svg". */
  logo: string;
  /** Intrinsic logo size, used to reserve space and keep proportions. */
  width: number;
  height: number;
  website?: string;
  category?: string;
};

export const partners: Partner[] = [
  { name: "Allianz", logo: "/media/partners/allianz.png", width: 560, height: 139 },
  { name: "Shell", logo: "/media/partners/shell.png", width: 560, height: 522 },
  { name: "Mercedes-Benz", logo: "/media/partners/mercedes-benz.png", width: 560, height: 142 },
  { name: "Deutsche Telekom", logo: "/media/partners/deutsche-telekom.png", width: 560, height: 275 },
  { name: "Vodafone", logo: "/media/partners/vodafone.png", width: 560, height: 138 },
  { name: "UBS", logo: "/media/partners/ubs.png", width: 560, height: 203 },
  { name: "Newmont", logo: "/media/partners/newmont.png", width: 560, height: 83 },
  { name: "Sauber Motorsport", logo: "/media/partners/sauber-motorsport.png", width: 304, height: 58 },
];

/**
 * Set to true only once Blubeard has confirmed the partner names above and its authorisation to show
 * each logo. Until then the page stays reachable for internal review but is `noindex` and out of the
 * sitemap. (The logos themselves already display on the page.)
 */
export const partnersApproved = true;

export const partnersPublished = partners.length > 0 && partnersApproved;

export const partnersPage = {
  meta: {
    title: "Our Partners",
    description:
      "How Blubeard Investment AG approaches partnership: thoughtful collaboration, shared perspectives and relationships built for the long term.",
  },
  hero: {
    eyebrow: "Our Partners",
    heading: ["Strong Relationships.", "Shared Ambitions."],
    description: "We value thoughtful collaboration, shared perspectives and relationships built for the long term.",
    image: "ptHero" as ImageKey,
  },
  logos: {
    eyebrow: "Partners",
    heading: "Working Together.",
  },
  philosophy: {
    eyebrow: "Partnership Philosophy",
    heading: ["Built on Trust.", "Guided by Perspective."],
    body: [
      "We approach collaboration with the same discipline we bring to every decision: clear objectives, careful preparation and honest conversation.",
      "Trust is built over time. We value relationships in which expectations are understood, information is shared openly and decisions are made with the long term in mind.",
    ],
    values: ["Disciplined collaboration", "Shared objectives", "Transparency", "Long-term thinking"],
    image: "ptPhilosophy" as ImageKey,
  },
  principles: {
    eyebrow: "Partnership Principles",
    heading: "What Good Partnership Asks of Us.",
    items: [
      {
        title: "Shared Vision",
        text: "Meaningful collaboration begins with clarity about what each side wants to achieve, and why it matters.",
        image: "ptVision" as ImageKey,
      },
      {
        title: "Disciplined Collaboration",
        text: "Clear responsibilities, open communication and careful preparation keep shared work focused on its objectives.",
        image: "ptCollab" as ImageKey,
      },
      {
        title: "Long-Term Perspective",
        text: "We value relationships that can grow over time, guided by patience and considered judgment rather than short-term momentum.",
        image: "tmUnited" as ImageKey,
      },
    ],
  },
  closing: {
    eyebrow: "Partnership Enquiries",
    heading: ["Let’s Explore What", "We Can Build Together."],
    description: "We welcome professional conversations about shared objectives and long-term collaboration.",
    cta: { label: "Start a Conversation", href: "/contact" },
  },
} as const;
