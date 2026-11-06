import type { ServicePageData } from "./types";

export const investmentResearchAndRiskAdvisory: ServicePageData = {
  slug: "investment-research-and-risk-advisory",
  name: "Investment Research & Risk Advisory",
  meta: {
    title: "Investment Research & Risk Advisory",
    description:
      "Blubeard Investment AG's perspective on investment research and risk: market evaluation, financial analysis, industry research, due diligence and the assessment of investment-related risks.",
  },
  hero: {
    subtitle: "Market evaluation, financial analysis and a clear view of investment-related risks.",
    image: "svcResearch",
    position: "50% 45%",
  },
  capabilities: {
    eyebrow: "Core Capabilities",
    heading: "Research That Informs Decisions.",
    items: [
      {
        title: "Market Evaluation",
        text: "Examining market conditions, trends and drivers that shape investment opportunities.",
        icon: "market",
      },
      {
        title: "Financial Analysis",
        text: "Reviewing financial statements, cash flows and key metrics to understand performance drivers.",
        icon: "analysis",
      },
      {
        title: "Industry Research",
        text: "Studying sectors, competitive dynamics and structural changes over time.",
        icon: "research",
      },
      {
        title: "Due Diligence Support",
        text: "Structuring the review of information so that important questions are addressed early.",
        icon: "diligence",
      },
      {
        title: "Risk Assessment",
        text: "Identifying and weighing market, financial, operational and concentration risks.",
        icon: "risk",
      },
      {
        title: "Scenario Analysis",
        text: "Considering how outcomes may change under different economic and market conditions.",
        icon: "scenario",
      },
    ],
    featured: { index: 4, image: "ai" },
  },
  expertise: {
    eyebrow: "Expertise & Strategic Value",
    heading: "Evidence Before Conviction.",
    body: "Sound decisions rest on sound information. Our research brings together market, financial and industry perspectives — and makes the associated risks explicit rather than implicit.",
    image: "peq3",
    points: [
      {
        title: "Objective Analysis",
        text: "Information is gathered and assessed methodically, with assumptions and limitations stated clearly.",
      },
      {
        title: "Risk Transparency",
        text: "Risks are identified, described and weighed — so that they inform decisions rather than surprise them.",
      },
      {
        title: "Relevant Insight",
        text: "Research is focused on the questions that matter for each decision, not on volume.",
      },
    ],
  },
  approach: {
    eyebrow: "Our Strategic Approach",
    heading: "From Question to Insight.",
    description: "Three stages that turn investment questions into clear, usable insight.",
    steps: [
      {
        title: "Define the Question",
        text: "Clarifying the decision, its scope and the information it requires.",
        icon: "objectives",
      },
      {
        title: "Research and Analyse",
        text: "Gathering and examining market, financial and industry evidence.",
        icon: "evaluate",
      },
      {
        title: "Assess and Report",
        text: "Presenting findings and risks clearly to support an informed decision.",
        icon: "reporting",
      },
    ],
  },
  related: ["asset-and-portfolio-management", "mergers-and-acquisitions", "wealth-management"],
  contact: {
    heading: "Let’s Discuss Your Research Needs.",
    description:
      "Connect with Blubeard Investment AG to discuss market evaluation, financial analysis and investment-related risks.",
    cta: { label: "Contact Us", href: "/contact" },
    image: "svcCapital",
    position: "50% 50%",
  },
};
