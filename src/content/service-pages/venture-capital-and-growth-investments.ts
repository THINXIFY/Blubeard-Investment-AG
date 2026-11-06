import type { ServicePageData } from "./types";

export const ventureCapitalAndGrowthInvestments: ServicePageData = {
  slug: "venture-capital-and-growth-investments",
  name: "Venture Capital & Growth Investments",
  meta: {
    title: "Venture Capital & Growth Investments",
    description:
      "Blubeard Investment AG's perspective on venture and growth investments: evaluating innovative businesses, emerging ventures, business models, markets and growth-stage opportunities.",
  },
  hero: {
    subtitle: "Evaluating innovative businesses and growth-stage opportunities with long-term potential.",
    image: "svcVenture",
    position: "50% 50%",
  },
  capabilities: {
    eyebrow: "Core Capabilities",
    heading: "Insight for Emerging Opportunities.",
    items: [
      {
        title: "Venture Assessment",
        text: "Evaluating early-stage businesses on their team, proposition, market and path to scale.",
        icon: "assessment",
      },
      {
        title: "Business Model Review",
        text: "Examining how a venture creates, delivers and captures value — and how robust that model is.",
        icon: "layers",
      },
      {
        title: "Market Opportunity Analysis",
        text: "Understanding market size, timing, competition and the conditions for sustainable growth.",
        icon: "market",
      },
      {
        title: "Technology & Innovation Review",
        text: "Considering the strength, defensibility and maturity of the technology behind a business.",
        icon: "innovation",
      },
      {
        title: "Growth-Stage Evaluation",
        text: "Assessing scaling plans, operational readiness and capital requirements for the next phase.",
        icon: "growth",
      },
      {
        title: "Risk Considerations",
        text: "Weighing execution, market, technology and financing risks typical of emerging companies.",
        icon: "risk",
      },
    ],
    featured: { index: 3, image: "tec4" },
  },
  expertise: {
    eyebrow: "Expertise & Strategic Value",
    heading: "Conviction Built on Careful Analysis.",
    body: "Innovation creates opportunity — and uncertainty. We look beyond the narrative to the fundamentals of a business, so that enthusiasm is balanced by evidence and long-term thinking.",
    image: "art1",
    points: [
      {
        title: "Fundamentals First",
        text: "Team, product, market and economics are examined before any view on potential is formed.",
      },
      {
        title: "Realistic Assessment",
        text: "Growth assumptions are tested against market evidence, competition and execution capacity.",
      },
      {
        title: "Patient Perspective",
        text: "Emerging businesses need time. Opportunities are considered over the full arc of their development.",
      },
    ],
  },
  approach: {
    eyebrow: "Our Strategic Approach",
    heading: "From Idea to Informed View.",
    description: "Three stages that bring structure to the evaluation of emerging and growing businesses.",
    steps: [
      {
        title: "Understand the Venture",
        text: "Learning the proposition, the team and the ambitions behind the business.",
        icon: "objectives",
      },
      {
        title: "Assess Potential",
        text: "Examining model, market, technology and risks to form a grounded view.",
        icon: "evaluate",
      },
      {
        title: "Develop Perspective",
        text: "Shaping a considered view on fit, timing and long-term potential.",
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
    heading: "Let’s Discuss Growth Opportunities.",
    description:
      "Connect with Blubeard Investment AG to discuss innovative businesses, emerging ventures and growth-stage opportunities.",
    cta: { label: "Contact Us", href: "/contact" },
    image: "apCity",
    position: "50% 45%",
  },
};
