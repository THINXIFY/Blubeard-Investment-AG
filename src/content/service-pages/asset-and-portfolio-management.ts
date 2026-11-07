import type { ServicePageData } from "./types";

export const assetAndPortfolioManagement: ServicePageData = {
  slug: "asset-and-portfolio-management",
  name: "Asset & Portfolio Management",
  meta: {
    title: "Asset & Portfolio Management",
    description:
      "Our perspective on asset and portfolio management: allocation, portfolio evaluation, diversification and strategic asset oversight.",
  },
  hero: {
    subtitle: "Structured perspectives on allocation, evaluation and strategic asset oversight.",
    image: "svcPortfolio",
    position: "50% 45%",
  },
  capabilities: {
    eyebrow: "Core Capabilities",
    heading: "Disciplined Portfolio Expertise.",
    items: [
      {
        title: "Investment Allocation",
        text: "Considering how capital is distributed across asset classes, regions and investment horizons.",
        icon: "allocation",
      },
      {
        title: "Portfolio Evaluation",
        text: "Reviewing the composition, quality and consistency of a portfolio against its objectives.",
        icon: "analysis",
      },
      {
        title: "Diversification Review",
        text: "Examining concentrations and correlations to understand how resilient a portfolio really is.",
        icon: "balance",
      },
      {
        title: "Risk Considerations",
        text: "Identifying market, liquidity and concentration risks and how they interact across holdings.",
        icon: "risk",
      },
      {
        title: "Strategic Asset Oversight",
        text: "Maintaining a clear, ongoing view of assets, their roles and their contribution to the whole.",
        icon: "monitor",
      },
      {
        title: "Rebalancing Perspective",
        text: "Assessing when and how a portfolio may need to be realigned with its intended structure.",
        icon: "scenario",
      },
    ],
    featured: { index: 4, image: "technology" },
  },
  expertise: {
    eyebrow: "Expertise & Strategic Value",
    heading: "Structure Behind Every Allocation.",
    body: "A portfolio is more than a list of assets. We look at how each position relates to the others and to the objectives they serve — so that structure, not momentum, guides decisions.",
    image: "svcResearch",
    points: [
      {
        title: "Clear Objectives",
        text: "Every allocation starts from defined goals, time horizons and tolerance for risk.",
      },
      {
        title: "Balanced Construction",
        text: "Weighing return potential, diversification and liquidity side by side rather than in isolation.",
      },
      {
        title: "Consistent Oversight",
        text: "Regular, structured review keeps the portfolio aligned as markets and circumstances change.",
      },
    ],
  },
  approach: {
    eyebrow: "Our Strategic Approach",
    heading: "From Objectives to Oversight.",
    description: "A three-stage approach that connects portfolio decisions to clearly defined objectives.",
    steps: [
      {
        title: "Define Objectives",
        text: "Establishing goals, constraints, time horizon and the role of each asset class.",
        icon: "objectives",
      },
      {
        title: "Evaluate the Portfolio",
        text: "Analysing composition, diversification and risk to understand current positioning.",
        icon: "evaluate",
      },
      {
        title: "Shape the Allocation",
        text: "Developing a considered allocation and a framework for ongoing review.",
        icon: "strategy",
      },
    ],
  },
  related: ["wealth-management", "investment-research-and-risk-advisory", "private-equity-and-capital-advisory"],
  contact: {
    heading: "Let’s Discuss Your Portfolio Objectives.",
    description:
      "Connect with Blubeard Investment AG to discuss allocation, portfolio evaluation and long-term asset oversight.",
    cta: { label: "Contact Us", href: "/contact" },
    image: "peq2",
    position: "50% 50%",
  },
};
