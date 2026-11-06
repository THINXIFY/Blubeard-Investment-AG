import type { ServicePageData } from "./types";

export const realEstateManagement: ServicePageData = {
  slug: "real-estate-management",
  name: "Real Estate Management",
  meta: {
    title: "Real Estate Management",
    description:
      "Blubeard Investment AG's perspective on real estate: property investment assessment, asset positioning, oversight, market and location analysis, development evaluation and risk considerations.",
  },
  hero: {
    subtitle: "Strategic insight for property assets, informed decisions and long-term value.",
    image: "about",
    position: "50% 38%",
    video: {
      src: "/media/real-estate/hero-1080.mp4",
      srcSmall: "/media/real-estate/hero-720.mp4",
      poster: "/media/real-estate/hero-poster.jpg",
      posterSmall: "/media/real-estate/hero-poster-sm.jpg",
      heading: ["Strategic Thinking for", "Lasting Property Value."],
      tag: "Assessment. Positioning. Oversight.",
      secondaryCta: { label: "Explore Capabilities", href: "#capabilities" },
    },
  },
  capabilities: {
    eyebrow: "Core Capabilities",
    heading: "Comprehensive Real Estate Expertise.",
    items: [
      {
        title: "Property Investment Assessment",
        text: "Evaluating properties on their fundamentals, income characteristics and long-term potential.",
        icon: "assessment",
      },
      {
        title: "Asset Positioning",
        text: "Considering how a property is positioned within its market — and how that role can evolve.",
        icon: "positioning",
      },
      {
        title: "Property Oversight",
        text: "Maintaining a clear view of the operational, physical and financial aspects of a property.",
        icon: "oversight",
      },
      {
        title: "Market & Location Analysis",
        text: "Examining local markets, demand drivers and the location characteristics that shape value.",
        icon: "market",
      },
      {
        title: "Development Evaluation",
        text: "Assessing development and redevelopment opportunities, including feasibility, timing and key risks.",
        icon: "development",
      },
      {
        title: "Risk & Performance Considerations",
        text: "Reviewing risk factors and performance considerations so decisions remain grounded and informed.",
        icon: "risk",
      },
    ],
    featured: { index: 4, image: "reDev" },
  },
  expertise: {
    eyebrow: "Expertise & Strategic Value",
    heading: "A Considered Approach to Property Value.",
    body: "Real estate is a long-term asset. We assess each property in the context of its market, its condition and the objectives it is meant to serve — so that decisions rest on understanding rather than momentum.",
    image: "services",
    points: [
      {
        title: "Market Understanding",
        text: "Local market conditions, demand and supply dynamics, and the location factors that influence how a property performs over time.",
      },
      {
        title: "Disciplined Evaluation",
        text: "A structured review of fundamentals, physical condition, financial considerations and risks — weighed side by side before any decision.",
      },
      {
        title: "Long-Term Perspective",
        text: "Looking beyond short-term movements to the lasting quality, relevance and positioning of a property within its market.",
      },
    ],
  },
  approach: {
    eyebrow: "Our Strategic Approach",
    heading: "Clarity at Every Stage.",
    description: "A focused three-stage approach that keeps every property decision connected to its objectives.",
    steps: [
      {
        title: "Understand Objectives",
        text: "Clarifying goals, priorities, time horizon and the wider context of the property or portfolio.",
        icon: "objectives",
      },
      {
        title: "Assess Opportunities",
        text: "Examining the property, its market and its risks to form a clear, grounded view.",
        icon: "evaluate",
      },
      {
        title: "Develop Strategy",
        text: "Shaping a considered direction for positioning, oversight or development, aligned with long-term objectives.",
        icon: "strategy",
      },
    ],
  },
  related: [
    "asset-and-portfolio-management",
    "corporate-and-strategic-consulting",
    "investment-research-and-risk-advisory",
  ],
  contact: {
    heading: "Let’s Discuss Your Real Estate Objectives.",
    description:
      "Connect with Blubeard Investment AG to discuss property assessment, positioning or long-term real estate objectives.",
    cta: { label: "Contact Us", href: "/contact" },
    image: "reSkyline",
    position: "50% 55%",
  },
};
