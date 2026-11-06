import type { SectorPageData } from "./types";

/** Private Equity — focus areas are investment interests, not holdings or transactions. */
export const privateEquity: SectorPageData = {
  slug: "private-equity",
  name: "Private Equity",
  meta: {
    title: "Private Equity Investments",
    description:
      "Blubeard Investment AG's perspective on private equity — growth capital, established enterprises, strategic acquisitions, succession and operational value creation, evaluated with a long-term view.",
  },
  hero: {
    eyebrow: "Private Equity Investments",
    heading: ["Established Businesses.", "Considered Growth."],
    intro: [
      "Private equity connects capital with businesses at important moments — growth, transition, or strategic change.",
      "Blubeard Investment AG approaches private equity opportunities through careful evaluation of business quality, management, and the long-term potential to build lasting value.",
    ],
    image: "peq1",
    layout: "centered",
  },
  perspective: {
    eyebrow: "Private Equity Perspective",
    heading: "Understanding the Business Behind Every Opportunity.",
    body: [
      "Private businesses differ widely in their markets, ownership structures, and stages of development, which makes thorough understanding essential.",
      "Our perspective considers the fundamentals of each business — its competitive position, leadership, and financial structure — alongside the strategic path that may support sustainable growth.",
    ],
    image: "privateEquity",
  },
  focus: {
    eyebrow: "Areas of Focus",
    heading: "Capital for Businesses at Every Stage.",
    items: [
      {
        title: "Growth Capital",
        text: "Supporting established, growing companies as they expand operations and markets.",
        image: "svcVenture",
      },
      {
        title: "Established Enterprises",
        text: "Mature businesses with proven operations and stable market positions.",
        image: "peq5",
      },
      {
        title: "Strategic Acquisitions",
        text: "Acquisitions that strengthen capabilities, market reach, or competitive position.",
        image: "svcMna",
      },
      {
        title: "Succession & Transition",
        text: "Supporting founder and family businesses through ownership and leadership transitions.",
        image: "peq6",
      },
      {
        title: "Operational Value Creation",
        text: "Improving efficiency, governance, and operations to strengthen long-term performance.",
        image: "industrial",
      },
      {
        title: "Buy-and-Build Strategies",
        text: "Combining complementary businesses into stronger, more resilient platforms.",
        image: "svcConsulting",
      },
    ],
  },
  considerations: {
    eyebrow: "Investment Considerations",
    heading: ["Thorough Diligence.", "Long-Term Alignment."],
    intro:
      "Evaluating private equity opportunities involves careful due diligence, an understanding of leadership and governance, and a clear view of how value can be created over time.",
    items: [
      { title: "Management & Governance" },
      { title: "Business Quality & Competitive Position" },
      { title: "Valuation & Capital Structure" },
      { title: "Value Creation Pathway" },
    ],
    image: "peq3",
  },
  longTerm: {
    eyebrow: "Long-Term Perspective",
    heading: ["Patient Ownership.", "Sustainable Value."],
    body: [
      "Private businesses form a significant part of economic activity, and many benefit from capital and support during periods of growth or transition.",
      "Our perspective emphasises long-term thinking — recognising that durable value is usually built through steady operational progress rather than short-term measures.",
    ],
    image: "peq4",
  },
  related: ["industrial-manufacturing", "technology", "real-estate"],
  closing: {
    eyebrow: "Private Equity Inquiries",
    heading: ["Let’s Discuss", "Private Capital."],
    description:
      "Connect with Blubeard Investment AG to explore strategic discussions related to growth capital, acquisitions, and long-term business development.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "All Investments", href: "/investments" },
    image: "peq2",
    layout: "glass",
  },
};
