import type { ServicePageData } from "./types";

export const wealthManagement: ServicePageData = {
  slug: "wealth-management",
  name: "Wealth Management",
  meta: {
    title: "Wealth Management",
    description:
      "Blubeard Investment AG's perspective on wealth: planning, preservation, structure, long-term objectives and the considerations that shape lasting financial decisions.",
  },
  hero: {
    subtitle: "Individual perspectives on planning, preservation and long-term financial objectives.",
    image: "svcWealth",
    position: "50% 55%",
  },
  capabilities: {
    eyebrow: "Core Capabilities",
    heading: "Thoughtful Perspectives on Lasting Wealth.",
    items: [
      {
        title: "Wealth Planning",
        text: "Clarifying financial objectives, priorities and time horizons as the basis for every decision.",
        icon: "planning",
      },
      {
        title: "Preservation Considerations",
        text: "Assessing how wealth can be protected against inflation, concentration and changing conditions.",
        icon: "preservation",
      },
      {
        title: "Asset Structure Review",
        text: "Understanding how existing assets are held, organised and related to one another.",
        icon: "layers",
      },
      {
        title: "Long-Term Objectives",
        text: "Connecting today’s decisions with goals that may span many years — or generations.",
        icon: "succession",
      },
      {
        title: "Risk Awareness",
        text: "Identifying the financial, market and liquidity risks that matter for an individual situation.",
        icon: "risk",
      },
      {
        title: "Ongoing Perspective",
        text: "Revisiting objectives and circumstances as markets, needs and priorities evolve.",
        icon: "monitor",
      },
    ],
    featured: { index: 3, image: "fnFloor" },
  },
  expertise: {
    eyebrow: "Expertise & Strategic Value",
    heading: "Clarity for Considered Financial Decisions.",
    body: "Wealth is personal. We take the time to understand each situation in full — its objectives, its structure and its constraints — before forming a view on what matters most.",
    image: "peq5",
    points: [
      {
        title: "Individual Understanding",
        text: "Every situation is different. Objectives, responsibilities and preferences are understood before any perspective is offered.",
      },
      {
        title: "Measured Judgement",
        text: "Considerations are weighed calmly and in context, avoiding decisions driven by short-term market noise.",
      },
      {
        title: "Continuity",
        text: "A long-term view that keeps wealth decisions aligned as personal and economic circumstances change.",
      },
    ],
  },
  approach: {
    eyebrow: "Our Strategic Approach",
    heading: "A Calm, Structured Approach.",
    description: "Three stages that keep wealth decisions connected to the objectives behind them.",
    steps: [
      {
        title: "Understand Objectives",
        text: "Clarifying goals, responsibilities, time horizon and the wider personal context.",
        icon: "objectives",
      },
      {
        title: "Review the Situation",
        text: "Examining assets, structure and risks to form a complete and balanced picture.",
        icon: "evaluate",
      },
      {
        title: "Develop Perspective",
        text: "Shaping considered options aligned with preservation and long-term objectives.",
        icon: "strategy",
      },
    ],
  },
  related: ["asset-and-portfolio-management", "real-estate-management", "investment-research-and-risk-advisory"],
  contact: {
    heading: "Let’s Discuss Your Long-Term Objectives.",
    description:
      "Connect with Blubeard Investment AG for a discreet conversation about wealth planning, preservation and long-term priorities.",
    cta: { label: "Contact Us", href: "/contact" },
    image: "aboutHero",
    position: "50% 50%",
  },
};
