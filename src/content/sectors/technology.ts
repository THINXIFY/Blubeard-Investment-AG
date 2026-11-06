import type { SectorPageData } from "./types";

/** Technology — focus areas are investment interests, not holdings. */
export const technology: SectorPageData = {
  slug: "technology",
  name: "Technology",
  meta: {
    title: "Technology Investments",
    description:
      "Blubeard Investment AG's perspective on technology — enterprise software, cloud and data infrastructure, cybersecurity, semiconductors and connectivity, evaluated with a long-term view.",
  },
  hero: {
    eyebrow: "Technology Investments",
    heading: ["Digital Infrastructure.", "Enduring Foundations."],
    intro: [
      "Technology underpins nearly every modern business — from the software that runs operations to the networks and data centres that connect markets.",
      "Blubeard Investment AG approaches technology opportunities by looking beyond trends to the durable infrastructure, products and capabilities that create lasting value.",
    ],
    image: "tec1",
    layout: "editorial",
  },
  perspective: {
    eyebrow: "Technology Perspective",
    heading: "Separating Lasting Platforms from Passing Trends.",
    body: [
      "Technology markets evolve quickly, which makes careful evaluation of product relevance, customer value, and competitive dynamics especially important.",
      "Our perspective focuses on businesses and infrastructure with clear practical utility — technologies that organisations depend on and that remain relevant as markets change.",
    ],
    image: "tec2",
  },
  focus: {
    eyebrow: "Areas of Focus",
    heading: "The Systems Behind the Digital Economy.",
    items: [
      {
        title: "Enterprise Software",
        text: "Business applications, workflow platforms, and software that organisations rely on every day.",
        image: "svcVenture",
      },
      {
        title: "Cloud & Data Infrastructure",
        text: "Data centres, cloud platforms, and the infrastructure that stores and processes information.",
        image: "technology",
      },
      {
        title: "Cybersecurity",
        text: "Network protection, identity, and technologies that safeguard data and digital operations.",
        image: "tec5",
      },
      {
        title: "Semiconductors & Hardware",
        text: "Chips, components, and the hardware foundations of modern computing.",
        image: "tec6",
      },
      {
        title: "Telecommunications & Connectivity",
        text: "Fibre networks, wireless infrastructure, and the connectivity that links people and systems.",
        image: "tec7",
      },
      {
        title: "Financial & Business Technology",
        text: "Payments, financial infrastructure, and technologies that modernise business processes.",
        image: "svcPortfolio",
      },
    ],
  },
  considerations: {
    eyebrow: "Investment Considerations",
    heading: ["Clear Thinking.", "Durable Technology."],
    intro:
      "Evaluating technology opportunities means balancing innovation with practicality — understanding market position, scalability, and the risks that accompany rapid change.",
    items: [
      { title: "Market Position & Differentiation" },
      { title: "Scalability & Recurring Demand" },
      { title: "Technology & Execution Risk" },
      { title: "Security, Regulation & Governance" },
    ],
    image: "tec3",
  },
  longTerm: {
    eyebrow: "Long-Term Perspective",
    heading: ["Constant Change.", "Lasting Infrastructure."],
    body: [
      "While individual products and platforms change, the need for reliable digital infrastructure continues to grow across every industry.",
      "Our perspective considers how technology adoption, connectivity, and data needs evolve over time — and which foundations are likely to remain essential.",
    ],
    image: "tec4",
  },
  related: ["artificial-intelligence", "aerospace-defense", "private-equity"],
  closing: {
    eyebrow: "Technology Inquiries",
    heading: ["Let’s Discuss", "Technology Opportunities."],
    description:
      "Connect with Blubeard Investment AG to explore strategic discussions related to software, digital infrastructure, and long-term technology development.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "All Investments", href: "/investments" },
    image: "ai",
    layout: "glass",
  },
};
