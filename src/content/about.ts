/**
 * About Us page content (IP-01R2). Client-provided brand copy; values and investment descriptions are
 * proposed brand statements, not independently verified results.
 */
import type { ImageKey } from "./images";
import { ceo, management } from "./people";

export const aboutPage = {
  meta: {
    title: "About Us",
    description:
      "About Blubeard Investment AG, a Swiss investment company in Samedan, Graubünden, with a long-term perspective on established and emerging industries.",
  },

  hero: {
    eyebrow: "Blubeard Investment AG",
    heading: "About Us",
    description:
      "A Swiss investment company focused on identifying strategic opportunities, evaluating long-term potential, and connecting financial discipline with forward-looking investment perspectives.",
    image: "aboutHero" as ImageKey,
  },

  intro: {
    eyebrow: "Who We Are",
    heading: ["Investing with Perspective.", "Building for Tomorrow."],
    lead: "Blubeard Investment AG is a Swiss investment company based in Samedan, focused on strategic opportunities across established industries and emerging technologies.",
    body: [
      "Our approach is grounded in disciplined evaluation and long-term thinking — understanding businesses, industries, and the forces shaping their future before committing capital.",
      "From established real assets to transformative technologies, we approach every opportunity with careful consideration and a forward-looking mindset.",
    ],
    highlights: ["Disciplined evaluation", "Long-term perspective", "Swiss foundation"],
    cta: { label: "Explore Our Investments", href: "/investments" },
    image: "ctAerial" as ImageKey,
    detailImage: "apNight" as ImageKey,
  },

  values: {
    eyebrow: "Our Values",
    heading: "The Principles Behind Every Decision.",
    items: [
      {
        id: "integrity",
        title: "Integrity",
        text: "We place importance on transparency, professional conduct, and responsible decision-making.",
      },
      {
        id: "responsibility",
        title: "Responsibility",
        text: "We recognize the importance of evaluating opportunities with care and considering potential risks.",
      },
      {
        id: "expertise",
        title: "Expertise",
        text: "We value informed perspectives, industry knowledge, and thoughtful financial analysis.",
      },
      {
        id: "vision",
        title: "Long-Term Vision",
        text: "We look beyond short-term developments to understand lasting opportunities.",
      },
    ],
  },

  perspective: {
    eyebrow: "Our Investment Perspective",
    heading: "A Broad View of Opportunity.",
    description:
      "Our investment perspective brings together established sectors and innovative industries, recognizing the importance of both economic fundamentals and technological progress.",
    sectors: [
      {
        id: "real-estate",
        title: "Real Estate & Infrastructure",
        text: "Strategic opportunities across commercial, residential, and industrial property, together with the transport and logistics infrastructure that connects economies.",
        image: "realEstate" as ImageKey,
      },
      {
        id: "energy",
        title: "Energy & Petroleum",
        text: "Petroleum infrastructure, refining and distribution alongside renewable energy, solar infrastructure, and resilient power systems.",
        image: "oil" as ImageKey,
      },
      {
        id: "technology",
        title: "Technology & Artificial Intelligence",
        text: "Enterprise software, digital infrastructure, and intelligent systems — from advanced automation to AI infrastructure.",
        image: "ai" as ImageKey,
      },
      {
        id: "life-sciences",
        title: "Biotechnology & Healthcare",
        text: "Innovation in life sciences and pharmaceutical research, and technologies improving healthcare delivery and diagnostics.",
        image: "biotechnology" as ImageKey,
      },
    ],
    cta: { label: "Explore Our Investments", href: "/investments" },
  },

  philosophy: {
    eyebrow: "Our Philosophy",
    heading: ["Disciplined Thinking.", "Lasting Perspective."],
    description:
      "We believe lasting value is built through thoughtful decisions, a clear understanding of risk, and a commitment to long-term objectives.",
    pillars: [
      {
        title: "Disciplined Evaluation",
        text: "Understanding fundamentals, assessing risks, and considering investment opportunities with care.",
      },
      {
        title: "Strategic Perspective",
        text: "Looking beyond immediate market movements to recognize broader economic and industry developments.",
      },
      {
        title: "Long-Term Thinking",
        text: "Focusing on sustainable growth potential and meaningful value creation over time.",
      },
    ],
  },

  foundations: {
    eyebrow: "Swiss Foundations",
    heading: ["Swiss Roots.", "International Perspective."],
    body: [
      "Blubeard Investment AG is headquartered in Samedan, in the Swiss canton of Graubünden.",
      "Our Swiss location reflects the company's identity, while our investment perspective considers developments across industries and international markets.",
    ],
    image: "aboutEngadin" as ImageKey,
  },

  leadership: {
    eyebrow: "Our Team",
    heading: "Leadership with Purpose.",
    description:
      "Our leadership and management structure brings together responsibilities across investment coordination, financial oversight, operations, and corporate management.",
    ceo,
    team: management,
    cta: { label: "Meet Our Team", href: "/team" },
  },

  closing: {
    heading: ["Let’s Build", "Meaningful Connections."],
    description:
      "Meaningful business relationships begin with conversation. Connect with Blubeard Investment AG to discuss strategic opportunities, corporate initiatives, and shared objectives.",
    cta: { label: "Contact Us", href: "/contact" },
    image: "about" as ImageKey,
  },
} as const;
