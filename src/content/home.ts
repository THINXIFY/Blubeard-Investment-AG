/**
 * Homepage content — client-approved copy (HP-01B brief).
 * Keep copy here so sections stay presentational and copy edits stay in one place.
 */
import type { ImageKey } from "./images";
import { ceo, management } from "./people";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Swiss Investment Company",
  description:
    "Strategic investments across established industries and emerging technologies, guided by disciplined thinking and a long-term perspective.",
  primaryCta: { label: "Explore Investments", href: "#investments" },
  secondaryCta: { label: "Our Approach", href: "#approach" },
  image: "heroSkyline" as ImageKey,
  /** Shown as the twelve sectors assemble on scroll. */
  industriesLine: ["Twelve industries.", "One discipline."],
} as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  eyebrow: "About Blubeard",
  heading: ["Rooted in Switzerland.", "Focused on Opportunity."],
  lead: "At Blubeard Investment AG, we believe meaningful investment begins with a clear understanding of opportunity, risk, and long-term potential.",
  body: [
    "Our perspective spans traditional industries and innovative sectors, bringing together strategic thinking, financial discipline, and a commitment to lasting value.",
    "From established real assets to transformative technologies, we approach investment opportunities with careful consideration and a forward-looking mindset.",
  ],
  cta: { label: "Discover Our Company", href: "/about" },
  image: "about" as ImageKey,
} as const;

/* ------------------------------------------------------------------ */
/* Investment universe                                                 */
/* ------------------------------------------------------------------ */

export const industryCategories = [
  { id: "real-assets", label: "Real Assets & Energy" },
  { id: "technology", label: "Technology & Innovation" },
  { id: "healthcare", label: "Healthcare & Life Sciences" },
  { id: "industry", label: "Industry & Growth Capital" },
] as const;

export type IndustryCategoryId = (typeof industryCategories)[number]["id"];

export type Industry = {
  id: string;
  title: string;
  description: string;
  category: IndustryCategoryId;
  image: ImageKey;
  /** Homepage card photograph, when it differs from `image`. */
  cardImage?: ImageKey;
};

export const investments = {
  eyebrow: "Our Investments",
  heading: ["Investing Across Industries", "That Shape Tomorrow."],
  description:
    "Our investment focus spans established markets and emerging industries, reflecting a broad perspective on the sectors influencing economic growth, technological progress, and global development.",
  cta: { label: "Explore All Investment Sectors", href: "/investments" },
} as const;

export const industries: readonly Industry[] = [
  {
    id: "real-estate",
    title: "Real Estate",
    description: "Strategic opportunities across commercial, residential, and industrial property markets.",
    category: "real-assets",
    image: "realEstate",
  },
  {
    id: "biotechnology",
    title: "Biotechnology",
    description: "Innovation in life sciences, pharmaceutical research, and next-generation biological technologies.",
    category: "healthcare",
    image: "biotechnology",
    cardImage: "bio1",
  },
  {
    id: "technology",
    title: "Technology",
    description:
      "Enterprise software, digital infrastructure, cybersecurity, and transformative technology businesses.",
    category: "technology",
    image: "technology",
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    description:
      "Intelligent systems, advanced automation, AI infrastructure, and emerging applications of machine intelligence.",
    category: "technology",
    image: "ai",
  },
  {
    id: "petroleum-oil",
    title: "Petroleum & Oil",
    description:
      "Opportunities across petroleum infrastructure, refining, distribution, and essential energy supply chains.",
    category: "real-assets",
    image: "oil",
  },
  {
    id: "energy-solar",
    title: "Energy & Solar",
    description:
      "Renewable energy, solar infrastructure, energy storage, and the development of resilient power systems.",
    category: "real-assets",
    image: "solar",
  },
  {
    id: "industrial-manufacturing",
    title: "Industrial & Manufacturing",
    description: "Advanced manufacturing, industrial infrastructure, precision engineering, and automation.",
    category: "industry",
    image: "industrial",
  },
  {
    id: "logistics-infrastructure",
    title: "Logistics & Infrastructure",
    description:
      "Transportation networks, logistics facilities, supply-chain infrastructure, and essential connectivity.",
    category: "real-assets",
    image: "logistics",
  },
  {
    id: "healthcare-medtech",
    title: "Healthcare & Medical Technology",
    description: "Healthcare innovation, medical devices, diagnostics, and technologies improving healthcare delivery.",
    category: "healthcare",
    image: "healthcare",
  },
  {
    id: "private-equity",
    title: "Private Equity",
    description:
      "Investment opportunities in established businesses, strategic acquisitions, and companies positioned for growth.",
    category: "industry",
    image: "privateEquity",
  },
  {
    id: "aerospace-defense",
    title: "Aerospace & Defense Technology",
    description:
      "Advanced engineering, aerospace systems, satellite technologies, and specialized security innovation.",
    category: "technology",
    image: "aerospace",
  },
  {
    id: "agriculture-foodtech",
    title: "Agriculture & Food Technology",
    description:
      "Agribusiness, advanced agricultural technologies, sustainable food production, and modern farming infrastructure.",
    category: "industry",
    image: "agriculture",
  },
];

/* ------------------------------------------------------------------ */
/* Philosophy                                                          */
/* ------------------------------------------------------------------ */

export const philosophy = {
  eyebrow: "Our Philosophy",
  heading: ["Clear Thinking.", "Patient Capital."],
  description:
    "Successful investing requires more than identifying opportunity. It calls for thoughtful evaluation, a clear strategic direction, and the ability to see beyond immediate market movements.",
  intro: "Our investment philosophy is guided by three enduring principles.",
  pillars: [
    {
      title: "Disciplined Thinking",
      text: "We emphasize thoughtful analysis, risk awareness, and informed decision-making throughout the investment process.",
    },
    {
      title: "Strategic Perspective",
      text: "We consider broader market dynamics, industry developments, and long-term economic opportunities.",
    },
    {
      title: "Long-Term Value",
      text: "We focus on opportunities with the potential to create meaningful and sustainable value over time.",
    },
  ],
  cta: { label: "Our Investment Approach", href: "/approach" },
} as const;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = { title: string; text: string; image: ImageKey };

export const services = {
  eyebrow: "Our Expertise",
  heading: ["Strategic Expertise.", "Meaningful Solutions."],
  description:
    "Blubeard Investment AG brings together investment knowledge, financial insight, and strategic perspectives to address complex business and capital-related opportunities.",
  items: [
    {
      title: "Real Estate Management",
      text: "A strategic approach to real estate assets, including investment assessment, property oversight, and long-term asset positioning.",
      image: "services",
    },
    {
      title: "Wealth Management",
      text: "Individualized financial perspectives focused on wealth planning, preservation, and long-term financial objectives.",
      image: "svcWealth",
    },
    {
      title: "Asset & Portfolio Management",
      text: "Investment allocation, portfolio evaluation, risk considerations, and strategic asset oversight.",
      image: "svcPortfolio",
    },
    {
      title: "Venture Capital & Growth Investments",
      text: "Evaluating innovative businesses, emerging ventures, and growth-stage opportunities with long-term potential.",
      image: "svcVenture",
    },
    {
      title: "Corporate & Strategic Consulting",
      text: "Supporting business strategy, organizational development, market expansion, and important corporate decisions.",
      image: "svcConsulting",
    },
    {
      title: "Mergers & Acquisitions",
      text: "Strategic perspectives on corporate transactions, business acquisitions, valuation, and due diligence.",
      image: "svcMna",
    },
    {
      title: "Private Equity & Capital Advisory",
      text: "Insights into private capital opportunities, financing structures, and strategic business growth.",
      image: "svcCapital",
    },
    {
      title: "Investment Research & Risk Advisory",
      text: "Market evaluation, financial analysis, due diligence, and assessment of investment-related risks.",
      image: "svcResearch",
    },
  ] satisfies Service[],
  cta: { label: "Explore Our Services", href: "/services" },
} as const;

/* ------------------------------------------------------------------ */
/* Approach                                                            */
/* ------------------------------------------------------------------ */

export const approach = {
  eyebrow: "Our Approach",
  heading: ["A Considered Approach", "to Every Opportunity."],
  description:
    "Every investment opportunity deserves a thoughtful process. Our investment approach places research, strategic evaluation, and long-term perspective at the center of decision-making.",
  stages: [
    {
      title: "Opportunity Identification",
      text: "Exploring market developments, industry trends, and potential investment opportunities.",
      image: "apCity" as ImageKey,
    },
    {
      title: "Strategic Assessment",
      text: "Examining business fundamentals, financial considerations, risk factors, and long-term potential.",
      image: "svcResearch" as ImageKey,
    },
    {
      title: "Investment Execution",
      text: "Considering appropriate investment structures, transaction requirements, and strategic objectives.",
      image: "svcMna" as ImageKey,
    },
    {
      title: "Long-Term Oversight",
      text: "Maintaining perspective on evolving market conditions, business development, and asset performance.",
      image: "fnFloor" as ImageKey,
    },
  ],
  cta: { label: "Discover Our Approach", href: "/approach" },
} as const;

/* ------------------------------------------------------------------ */
/* Leadership — team members live in content/people.ts               */
/* ------------------------------------------------------------------ */

export const leadership = {
  eyebrow: "Our People",
  heading: ["Leadership Guided", "by Perspective and Purpose."],
  description:
    "Behind every strategic decision are people who bring together professional judgment, financial perspectives, and a shared commitment to responsible business development.",
  ceo,
  team: management,
  cta: { label: "Meet Our Team", href: "/team" },
} as const;

/* ------------------------------------------------------------------ */
/* Global perspective                                                  */
/* ------------------------------------------------------------------ */

export const perspective = {
  eyebrow: "Our Perspective",
  heading: ["Swiss Foundations.", "International Perspective."],
  body: [
    "Based in Switzerland, Blubeard Investment AG approaches the investment landscape with an international outlook.",
    "We recognize that opportunity is shaped by global economic developments, evolving industries, and the connections between established markets and emerging innovations.",
  ],
  statement: ["Understanding markets.", "Recognizing opportunity.", "Thinking beyond borders."],
} as const;

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  eyebrow: "Connect with Blubeard",
  heading: ["Let’s Shape", "What Comes Next."],
  description:
    "Whether exploring strategic opportunities, discussing corporate initiatives, or seeking a professional conversation, we welcome meaningful connections built on clarity, shared objectives, and long-term thinking.",
  primaryCta: { label: "Contact Blubeard", href: "/contact" },
  secondaryCta: { label: "Explore Our Expertise", href: "#services" },
} as const;
