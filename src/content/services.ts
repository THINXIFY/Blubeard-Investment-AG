import { site } from "@/lib/site";
import type { ImageKey } from "./images";
import { services } from "./home";
import { isServicePublished } from "./service-pages";

/**
 * Services page content (IP-03A).
 * Service titles, descriptions and photographs are the approved homepage entries (content/home.ts),
 * so both pages always stay in sync. Descriptions are informational: they describe areas of
 * expertise, not regulated offerings, until authorisation has been confirmed.
 */

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Short facets drawn directly from each approved description (no new claims). */
const facets: readonly (readonly string[])[] = [
  ["Investment assessment", "Property oversight", "Asset positioning"],
  ["Wealth planning", "Preservation", "Long-term objectives"],
  ["Investment allocation", "Portfolio evaluation", "Risk considerations"],
  ["Innovative businesses", "Emerging ventures", "Growth-stage opportunities"],
  ["Business strategy", "Organisational development", "Market expansion"],
  ["Corporate transactions", "Valuation", "Due diligence"],
  ["Private capital", "Financing structures", "Strategic growth"],
  ["Market evaluation", "Financial analysis", "Risk assessment"],
];

export type ServiceEntry = {
  /** Anchor id on the Services page and route of the dedicated page (/services/<slug>). */
  slug: string;
  /** Set only when the dedicated page is published. */
  href?: string;
  title: string;
  text: string;
  image: ImageKey;
  facets: readonly string[];
};

export const serviceEntries: readonly ServiceEntry[] = services.items.map((s, i) => ({
  slug: slugify(s.title),
  title: s.title,
  text: s.text,
  image: s.image,
  facets: facets[i] ?? [],
  href: isServicePublished(slugify(s.title)) ? `/services/${slugify(s.title)}` : undefined,
}));

export const servicesPage = {
  meta: {
    title: "Services",
    description:
      "The areas of expertise of Blubeard Investment AG — real estate, wealth and portfolio perspectives, venture and growth investments, corporate consulting, M&A, capital advisory and investment research.",
  },
  hero: {
    eyebrow: "Services & Expertise",
    heading: ["Strategic Expertise.", "Meaningful Solutions."],
    description:
      "Our perspective brings together investment knowledge, financial insight, and strategic thinking to address complex business and capital-related opportunities.",
    primaryCta: { label: "Explore Our Services", href: "#services-directory" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
    image: "realEstate" as ImageKey,
  },
  intro: {
    eyebrow: "Our Expertise",
    heading: ["Where Financial Insight", "Meets Strategic Thinking."],
    lead: "Blubeard Investment AG approaches business and capital-related questions from more than one angle.",
    body: "Investment knowledge, financial insight, and strategic thinking are brought together, so that each opportunity is understood in its full context — from market conditions and business fundamentals to long-term objectives.",
    disciplines: [
      { title: "Investment knowledge", text: "Understanding markets, industries, and assets." },
      { title: "Financial insight", text: "Evaluating structures, risks, and long-term potential." },
      { title: "Strategic thinking", text: "Connecting decisions to lasting objectives." },
    ],
    image: "peq5" as ImageKey,
  },
  directory: {
    eyebrow: "Areas of Expertise",
    heading: "Expertise Across Every Opportunity.",
    description:
      "Eight areas of expertise, connected by one disciplined perspective — from real assets and private capital to corporate strategy and research.",
    note: "Descriptions outline areas of expertise for information only and do not constitute an offer of regulated financial services.",
    cta: { label: "Discuss this area", href: "/contact" },
    pageCta: "Explore this area",
  },
  philosophy: {
    eyebrow: "Advisory Philosophy",
    heading: ["Insight. Discipline.", "Direction."],
    lead: "Every perspective we offer rests on three principles — applied consistently, whatever the opportunity.",
    principles: [
      {
        title: "Insight",
        text: "Understanding markets, industries, and business fundamentals before forming a view.",
      },
      {
        title: "Discipline",
        text: "Careful, structured evaluation of opportunities, risks, and financial considerations.",
      },
      {
        title: "Strategic Perspective",
        text: "Considering every decision in the context of long-term objectives.",
      },
    ],
    image: "tmUnited" as ImageKey,
  },
  process: {
    eyebrow: "Engagement Process",
    heading: "A Clear Approach to Complex Decisions.",
    description:
      "A structured, transparent process — from first conversation to ongoing review. Each stage informs the next, and review leads back to understanding.",
    steps: [
      {
        title: "Understand Objectives",
        text: "Clarifying goals, priorities, and the wider context of each situation.",
      },
      {
        title: "Evaluate Opportunities",
        text: "Examining markets, fundamentals, financial considerations, and risks.",
      },
      {
        title: "Develop Strategy",
        text: "Shaping a considered direction aligned with long-term objectives.",
      },
      {
        title: "Review & Adapt",
        text: "Maintaining perspective as markets, businesses, and objectives evolve.",
      },
    ],
  },
  closing: {
    eyebrow: "Connect with Blubeard",
    heading: ["Let’s Discuss", "Your Objectives."],
    description:
      "Connect with Blubeard Investment AG to explore strategic opportunities, corporate initiatives and professional discussions.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "Our Approach", href: "/approach" },
    image: "peq1" as ImageKey,
  },
  faq: {
    eyebrow: "Questions & Answers",
    heading: ["Clear Answers.", "Before We Speak."],
    description: "Some of the questions we are asked most often about our services, partnerships and consultations.",
    items: [
      {
        question: "What services does Blubeard Investment AG offer?",
        answer:
          "Our expertise covers eight areas: real estate management, wealth management, asset and portfolio management, venture capital and growth investments, corporate and strategic consulting, mergers and acquisitions, private equity and capital advisory, and investment research and risk advisory.",
      },
      {
        question: "Which industries do you focus on?",
        answer:
          "Our investment perspective spans twelve industries across established markets and emerging technologies, including real estate, energy, technology, healthcare and private equity.",
      },
      {
        question: "How does an engagement begin?",
        answer:
          "With a conversation. We first seek to understand your objectives and their wider context, then evaluate opportunities, develop a strategy and keep it under review as circumstances evolve.",
      },
      {
        question: "How can I arrange a consultation?",
        answer: `Email us at ${site.email} with a short description of your enquiry. We will come back to you to discuss the next steps.`,
      },
      {
        question: "Do you consider partnership enquiries?",
        answer:
          "We welcome professional discussions about corporate matters and strategic opportunities. Please send a brief outline of your proposal by email so that we can review it.",
      },
      {
        question: "Can I request further documents?",
        answer:
          "Yes. Choose Request Private Documents on our Contact page. Once you have verified your email address, the documents are sent to that address.",
      },
      {
        question: "Is the information on this website investment advice?",
        answer:
          "No. The content of this website is for general information only and does not constitute investment advice or an offer of regulated financial services.",
      },
      {
        question: "How is my enquiry handled?",
        answer:
          "Your enquiry is read by our team and used to respond to you. Our Privacy Policy explains how personal information is handled.",
      },
    ],
  },
} as const;
