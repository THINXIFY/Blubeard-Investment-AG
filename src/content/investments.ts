/**
 * Investments page content (IP-02A). Sector interests are areas of focus — not holdings,
 * transactions or results.
 */
import { industries, industryCategories, type IndustryCategoryId } from "./home";
import type { ImageKey } from "./images";
import { isSectorPublished } from "./sectors";

/** Concise sector descriptions (IP-02A brief). Keyed by the shared industry id. */
const shortDescriptions: Record<string, string> = {
  "real-estate": "Commercial, residential and industrial property opportunities.",
  biotechnology: "Life sciences, pharmaceutical research and biological innovation.",
  technology: "Enterprise software, digital infrastructure and cybersecurity.",
  "artificial-intelligence": "AI infrastructure, automation, robotics and intelligent systems.",
  "petroleum-oil": "Petroleum infrastructure, refining and energy supply chains.",
  "energy-solar": "Renewable energy, solar infrastructure and energy storage.",
  "industrial-manufacturing": "Advanced manufacturing, engineering and industrial automation.",
  "logistics-infrastructure": "Transportation, warehousing and supply-chain infrastructure.",
  "healthcare-medtech": "Medical devices, diagnostics and healthcare innovation.",
  "private-equity": "Business acquisitions, established enterprises and growth capital.",
  "aerospace-defense": "Aerospace engineering, satellite technologies and advanced systems.",
  "agriculture-foodtech": "Agribusiness, precision agriculture and food innovation.",
};

export type Sector = {
  id: string;
  title: string;
  description: string;
  category: IndustryCategoryId;
  image: ImageKey;
  /** Future dedicated page (IP-02B). Not linked until `available` is true. */
  href: string;
  available: boolean;
};

export const sectors: Sector[] = industries.map((i) => ({
  id: i.id,
  title: i.title,
  description: shortDescriptions[i.id] ?? i.description,
  category: i.category,
  image: i.image,
  href: `/investments/${i.id}`,
  available: isSectorPublished(i.id),
}));

export { industryCategories };

export const investmentsPage = {
  meta: {
    title: "Investments",
    description:
      "Explore the investment sectors of Blubeard Investment AG, from real estate, energy and infrastructure to technology, AI, biotechnology and healthcare.",
  },
  hero: {
    eyebrow: "Our Investments",
    heading: ["Investing Across Industries.", "Shaping Tomorrow."],
    description:
      "A disciplined investment perspective spanning established industries, essential infrastructure, and emerging technologies.",
    image: "svcCapital" as ImageKey,
  },
  intro: {
    eyebrow: "Our Perspective",
    heading: "A Broader Perspective on Opportunity.",
    lead: "Blubeard Investment AG approaches investment opportunities through industry understanding, strategic evaluation, and long-term thinking.",
    body: "Our perspective connects established economic foundations with industries driving innovation and transformation.",
    lenses: ["Industry understanding", "Strategic evaluation", "Long-term thinking"],
    image: "services" as ImageKey,
  },
  directory: {
    eyebrow: "Investment Universe",
    heading: "Explore Our Investment Sectors.",
    description:
      "Discover the industries that shape our investment perspective, from established economic foundations to emerging areas of innovation.",
    allLabel: "All Industries",
    note: "Sector descriptions reflect areas of investment interest and do not represent specific holdings or transactions.",
  },
  philosophy: {
    eyebrow: "Investment Philosophy",
    heading: "Opportunity Guided by Discipline.",
    description:
      "Our investment perspective combines industry awareness, careful evaluation, and an understanding of long-term developments.",
    principles: [
      {
        title: "Strategic Analysis",
        text: "Understanding market conditions and business fundamentals.",
        focus: ["Market conditions", "Business fundamentals"],
        image: "svcResearch" as ImageKey,
      },
      {
        title: "Risk Awareness",
        text: "Evaluating uncertainties and potential challenges.",
        focus: ["Uncertainties", "Potential challenges"],
        image: "svcPortfolio" as ImageKey,
      },
      {
        title: "Long-Term Perspective",
        text: "Looking beyond immediate market movements.",
        focus: ["Beyond market movements", "Lasting value"],
        image: "fnFloor" as ImageKey,
      },
    ],
  },
  duality: {
    eyebrow: "Established × Emerging",
    heading: "Where Established Strength Meets Future Potential.",
    body: [
      "Established industries form essential economic foundations.",
      "Emerging technologies introduce new possibilities for efficiency, progress, and transformation.",
      "Our perspective recognizes the importance of both.",
    ],
    established: {
      label: "Established Industries",
      caption: "Infrastructure · Logistics · Production",
      image: "logistics" as ImageKey,
    },
    emerging: {
      label: "Emerging Innovation",
      caption: "Computing · Intelligence · Automation",
      image: "ai" as ImageKey,
    },
  },
  closing: {
    eyebrow: "Investment Inquiries",
    heading: ["Let’s Explore", "Opportunities Together."],
    description:
      "Connect with Blubeard Investment AG to discuss strategic investment interests, corporate initiatives, and potential opportunities.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "Our Approach", href: "/approach" },
    image: "fnRoomDark" as ImageKey,
  },
} as const;
