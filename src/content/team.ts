import type { ImageKey } from "./images";
import { ceo, management } from "./people";

/** Our Team page content. Team members come from content/people.ts. */
export const teamPage = {
  meta: {
    title: "Our Team",
    description:
      "Meet the people behind Blubeard Investment AG — executive leadership and management across finance, investments, advisory and operations.",
  },
  hero: {
    eyebrow: "Our Team",
    heading: ["The People Behind", "Our Perspective."],
    description:
      "Meet the professionals contributing to Blubeard Investment AG’s financial, operational and strategic activities.",
    image: "tmHero" as ImageKey,
  },
  ceo: { ...ceo, eyebrow: "Executive Leadership" },
  management: {
    eyebrow: "Management",
    heading: "The Management Team.",
    description:
      "Responsibilities across finance, investment coordination, advisory, operations and corporate management.",
    people: management,
  },
  philosophy: {
    eyebrow: "Our Philosophy",
    heading: ["United by Perspective.", "Guided by Purpose."],
    description:
      "Professional responsibility, strategic thinking and long-term perspective are central to how we approach business and investment opportunities.",
    pillars: ["Professional Responsibility", "Strategic Thinking", "Long-Term Perspective"],
    image: "tmUnited" as ImageKey,
  },
  closing: {
    eyebrow: "Connect with Blubeard",
    heading: ["Meaningful Connections", "Begin Here."],
    description: "Connect with Blubeard Investment AG for professional inquiries and strategic discussions.",
    cta: { label: "Contact Us", href: "/contact" },
    image: "peq1" as ImageKey,
  },
} as const;
