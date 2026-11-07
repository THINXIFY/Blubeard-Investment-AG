import type { ServicePageData } from "./types";

export const corporateAndStrategicConsulting: ServicePageData = {
  slug: "corporate-and-strategic-consulting",
  name: "Corporate & Strategic Consulting",
  meta: {
    title: "Corporate & Strategic Consulting",
    description:
      "Our perspective on corporate strategy: business strategy, organisational development, market expansion, operational review and key corporate decisions.",
  },
  hero: {
    subtitle: "Supporting business strategy, organisational development and important corporate decisions.",
    image: "svcConsulting",
    position: "50% 50%",
  },
  capabilities: {
    eyebrow: "Core Capabilities",
    heading: "Strategic Support for Important Decisions.",
    items: [
      {
        title: "Business Strategy",
        text: "Clarifying direction, priorities and competitive positioning for the years ahead.",
        icon: "strategy",
      },
      {
        title: "Organisational Development",
        text: "Considering structures, responsibilities and capabilities that support a company’s goals.",
        icon: "organisation",
      },
      {
        title: "Market Expansion",
        text: "Assessing new markets, regions and segments — including their risks and requirements.",
        icon: "expansion",
      },
      {
        title: "Operational Review",
        text: "Examining processes and operations to understand efficiency, resilience and constraints.",
        icon: "oversight",
      },
      {
        title: "Corporate Decision Support",
        text: "Structuring the options and considerations behind significant corporate decisions.",
        icon: "scenario",
      },
      {
        title: "Governance Perspective",
        text: "Reviewing how decisions are prepared, made and monitored within an organisation.",
        icon: "governance",
      },
    ],
    featured: { index: 2, image: "logistics" },
  },
  expertise: {
    eyebrow: "Expertise & Strategic Value",
    heading: "Clear Thinking for Complex Situations.",
    body: "Important decisions rarely have obvious answers. We help structure the question, examine the options and weigh the consequences — so that leadership can decide with clarity.",
    image: "fnRoomDark",
    points: [
      {
        title: "Structured Analysis",
        text: "Complex issues are broken down into clear questions, options and decision criteria.",
      },
      {
        title: "Independent Perspective",
        text: "An outside view that challenges assumptions constructively and brings fresh reference points.",
      },
      {
        title: "Practical Direction",
        text: "Recommendations focus on what is achievable, prioritised and aligned with long-term goals.",
      },
    ],
  },
  approach: {
    eyebrow: "Our Strategic Approach",
    heading: "From Question to Direction.",
    description: "Three stages that turn complex corporate questions into considered direction.",
    steps: [
      {
        title: "Understand the Business",
        text: "Clarifying objectives, context, constraints and the decision to be made.",
        icon: "objectives",
      },
      {
        title: "Analyse Options",
        text: "Examining alternatives, markets and operational implications side by side.",
        icon: "evaluate",
      },
      {
        title: "Shape Direction",
        text: "Developing a prioritised, practical strategy aligned with long-term goals.",
        icon: "strategy",
      },
    ],
  },
  related: [
    "mergers-and-acquisitions",
    "venture-capital-and-growth-investments",
    "private-equity-and-capital-advisory",
  ],
  contact: {
    heading: "Let’s Discuss Your Strategic Priorities.",
    description:
      "Connect with Blubeard Investment AG to discuss business strategy, organisational development and important corporate decisions.",
    cta: { label: "Contact Us", href: "/contact" },
    image: "reHero",
    position: "50% 88%",
  },
};
