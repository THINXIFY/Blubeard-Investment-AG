import type { ServicePageData } from "./types";

export const mergersAndAcquisitions: ServicePageData = {
  slug: "mergers-and-acquisitions",
  name: "Mergers & Acquisitions",
  meta: {
    title: "Mergers & Acquisitions",
    description:
      "Our perspective on mergers and acquisitions: transaction strategy, target assessment, valuation, due diligence, structuring and integration.",
  },
  hero: {
    subtitle: "Strategic perspectives on corporate transactions, valuation and due diligence.",
    image: "svcMna",
    position: "50% 40%",
  },
  capabilities: {
    eyebrow: "Core Capabilities",
    heading: "Perspective Across the Transaction.",
    items: [
      {
        title: "Transaction Strategy",
        text: "Clarifying the strategic rationale, objectives and boundaries of a potential transaction.",
        icon: "transaction",
      },
      {
        title: "Target Assessment",
        text: "Evaluating businesses on strategic fit, market position, quality and long-term potential.",
        icon: "assessment",
      },
      {
        title: "Valuation Perspective",
        text: "Considering the methods, assumptions and value drivers that shape a realistic valuation.",
        icon: "valuation",
      },
      {
        title: "Due Diligence Coordination",
        text: "Structuring the review of financial, commercial and operational information.",
        icon: "diligence",
      },
      {
        title: "Integration Considerations",
        text: "Anticipating the organisational and operational questions that follow a transaction.",
        icon: "integration",
      },
      {
        title: "Structuring Considerations",
        text: "Reviewing how a transaction may be structured with regard to risk, financing and objectives.",
        icon: "layers",
      },
    ],
    featured: { index: 4, image: "industrial" },
  },
  expertise: {
    eyebrow: "Expertise & Strategic Value",
    heading: "Informed Decisions at Decisive Moments.",
    body: "Transactions shape companies for years. We help bring structure and objectivity to each stage — from the first strategic question to the considerations that follow completion.",
    image: "realEstate",
    points: [
      {
        title: "Strategic Rationale",
        text: "Every transaction is tested against a clear purpose and its contribution to long-term objectives.",
      },
      {
        title: "Rigorous Review",
        text: "Valuation and due diligence are approached methodically, with assumptions made explicit.",
      },
      {
        title: "Beyond Completion",
        text: "Integration and the realities of combining organisations are considered from the outset.",
      },
    ],
  },
  approach: {
    eyebrow: "Our Strategic Approach",
    heading: "Structure at Every Step.",
    description: "Three stages that bring clarity to corporate transactions.",
    steps: [
      {
        title: "Define the Rationale",
        text: "Clarifying objectives, criteria and the strategic case for a transaction.",
        icon: "objectives",
      },
      {
        title: "Assess and Value",
        text: "Evaluating targets, value drivers and risks through structured review.",
        icon: "evaluate",
      },
      {
        title: "Shape the Transaction",
        text: "Considering structure, terms and integration in line with long-term goals.",
        icon: "strategy",
      },
    ],
  },
  related: [
    "private-equity-and-capital-advisory",
    "corporate-and-strategic-consulting",
    "investment-research-and-risk-advisory",
  ],
  contact: {
    heading: "Let’s Discuss Your Transaction Objectives.",
    description:
      "Connect with Blubeard Investment AG to discuss strategic transactions, valuation and due diligence considerations.",
    cta: { label: "Contact Us", href: "/contact" },
    image: "peq1",
    position: "50% 50%",
  },
};
