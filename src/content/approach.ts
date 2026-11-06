import type { ImageKey } from "./images";
import { approach as homeApproach } from "./home";

/**
 * Our Approach page content (IP-04).
 * Process stage descriptions are the approved homepage copy (content/home.ts) so both stay in sync.
 * Everything here describes how opportunities are considered — never results, holdings or licences.
 */
export const approachPage = {
  meta: {
    title: "Our Approach",
    description:
      "How Blubeard Investment AG considers investment opportunities: disciplined evaluation, strategic perspective, long-term thinking and a structured process from opportunity to oversight.",
  },
  hero: {
    eyebrow: "Our Approach",
    heading: ["A Disciplined Approach", "to Lasting Value."],
    subtitle:
      "Strategic thinking, careful evaluation and long-term perspective guide how we consider investment opportunities.",
    primaryCta: { label: "Our Principles", href: "#principles" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
    image: "apHero" as ImageKey,
  },
  principles: {
    eyebrow: "Investment Principles",
    heading: "Principles Behind Every Decision.",
    intro: "Three principles shape every perspective we form — whatever the industry, market or opportunity.",
    items: [
      {
        title: "Disciplined Evaluation",
        text: "Understanding fundamentals, assessing uncertainty and considering each opportunity carefully.",
        keywords: ["Fundamentals", "Uncertainty", "Careful judgement"],
        image: "svcResearch" as ImageKey,
      },
      {
        title: "Strategic Perspective",
        text: "Examining industry dynamics, market conditions and broader economic developments.",
        keywords: ["Industry dynamics", "Market conditions", "Economic developments"],
        image: "apCity" as ImageKey,
      },
      {
        title: "Long-Term Thinking",
        text: "Looking beyond immediate market movements to understand lasting potential.",
        keywords: ["Beyond short-term movements", "Lasting potential"],
        image: "fnFloor" as ImageKey,
      },
    ],
  },
  process: {
    eyebrow: "Strategic Process",
    heading: "From Opportunity to Perspective.",
    description: "Four stages connect the first observation of an opportunity with its long-term oversight.",
    stages: homeApproach.stages.map((s, i) => ({
      ...s,
      considerations: [
        ["Market developments", "Industry trends"],
        ["Business fundamentals", "Risk factors"],
        ["Investment structures", "Transaction requirements"],
        ["Market conditions", "Business development"],
      ][i],
    })),
  },
  risk: {
    eyebrow: "Risk & Responsibility",
    heading: ["Considered Decisions.", "Responsible Thinking."],
    description:
      "Investment decisions require a balanced understanding of opportunities, financial considerations and inherent uncertainty.",
    items: [
      {
        title: "Risk Awareness",
        text: "Recognising that every opportunity carries uncertainty — and identifying, describing and weighing it openly.",
      },
      {
        title: "Strategic Discipline",
        text: "Applying the same structured evaluation to every decision, regardless of market sentiment.",
      },
      {
        title: "Long-Term Perspective",
        text: "Judging decisions by their lasting consequences rather than by short-term outcomes.",
      },
    ],
    image: "apNight" as ImageKey,
  },
  closing: {
    eyebrow: "Connect with Blubeard",
    heading: ["Let’s Explore", "What Comes Next."],
    description:
      "Connect with Blubeard Investment AG to discuss strategic opportunities, corporate initiatives and long-term objectives.",
    cta: { label: "Contact Us", href: "/contact" },
    image: "privateEquity" as ImageKey,
  },
} as const;
