import type { ServicePageData } from "./types";

export const privateEquityAndCapitalAdvisory: ServicePageData = {
  slug: "private-equity-and-capital-advisory",
  name: "Private Equity & Capital Advisory",
  meta: {
    title: "Private Equity & Capital Advisory",
    description:
      "Our perspective on private equity and capital: private capital opportunities, financing structures, capital requirements and strategic business growth.",
  },
  hero: {
    subtitle: "Insights into private capital opportunities, financing structures and strategic growth.",
    image: "svcCapital",
    position: "50% 45%",
  },
  capabilities: {
    eyebrow: "Core Capabilities",
    heading: "Perspective on Private Capital.",
    items: [
      {
        title: "Private Capital Opportunities",
        text: "Evaluating opportunities in privately held businesses on their fundamentals and potential.",
        icon: "capital",
      },
      {
        title: "Financing Structures",
        text: "Considering equity, debt and hybrid structures and how they fit a company’s situation.",
        icon: "layers",
      },
      {
        title: "Capital Requirements",
        text: "Assessing how much capital a business needs, when, and for which purpose.",
        icon: "valuation",
      },
      {
        title: "Business Growth Assessment",
        text: "Reviewing growth plans and the operational foundations required to deliver them.",
        icon: "growth",
      },
      {
        title: "Ownership Considerations",
        text: "Examining governance, alignment and the long-term implications of ownership changes.",
        icon: "governance",
      },
      {
        title: "Value Creation Perspective",
        text: "Identifying the strategic and operational levers that can build value over time.",
        icon: "strategy",
      },
    ],
    featured: { index: 3, image: "man5" },
  },
  expertise: {
    eyebrow: "Expertise & Strategic Value",
    heading: "Capital Aligned with Strategy.",
    body: "The right capital supports a company’s strategy rather than steering it. We consider financing and ownership questions in the context of each business, its stage and its long-term ambitions.",
    image: "peq4",
    points: [
      {
        title: "Business-First View",
        text: "Capital questions are considered alongside the company’s strategy, operations and market.",
      },
      {
        title: "Structured Evaluation",
        text: "Financing options are compared on cost, flexibility, control and risk — side by side.",
      },
      {
        title: "Long-Term Alignment",
        text: "Ownership and financing decisions are weighed for their effect over many years, not one cycle.",
      },
    ],
  },
  approach: {
    eyebrow: "Our Strategic Approach",
    heading: "Clarity Before Capital.",
    description: "Three stages that connect capital decisions to the strategy they are meant to serve.",
    steps: [
      {
        title: "Understand the Business",
        text: "Clarifying strategy, stage, objectives and the purpose of new capital.",
        icon: "objectives",
      },
      {
        title: "Assess Options",
        text: "Evaluating financing structures, requirements and risks in context.",
        icon: "evaluate",
      },
      {
        title: "Shape the Approach",
        text: "Developing a considered capital perspective aligned with long-term growth.",
        icon: "strategy",
      },
    ],
  },
  related: ["mergers-and-acquisitions", "venture-capital-and-growth-investments", "asset-and-portfolio-management"],
  contact: {
    heading: "Let’s Discuss Your Capital Objectives.",
    description:
      "Connect with Blubeard Investment AG to discuss private capital opportunities, financing structures and strategic growth.",
    cta: { label: "Contact Us", href: "/contact" },
    image: "privateEquity",
    position: "50% 50%",
  },
};
