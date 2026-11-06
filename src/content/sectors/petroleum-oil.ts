import type { SectorPageData } from "./types";

/** Petroleum & Oil — focus areas are investment interests, not holdings. */
export const petroleumOil: SectorPageData = {
  slug: "petroleum-oil",
  name: "Petroleum & Oil",
  meta: {
    title: "Petroleum & Oil Investments",
    description:
      "Blubeard Investment AG's perspective on petroleum and oil — upstream infrastructure, pipelines, refining, storage, marine transport and efficiency, evaluated with discipline and a long-term view.",
  },
  hero: {
    eyebrow: "Petroleum & Oil Investments",
    heading: ["Essential Energy.", "Disciplined Perspective."],
    intro: [
      "Petroleum remains an important part of the global energy system, supporting transport, industry, and the production of countless everyday materials.",
      "Blubeard Investment AG approaches petroleum-related opportunities through careful evaluation of infrastructure, operations, and the evolving role of oil within a changing energy landscape.",
    ],
    image: "pet1",
    layout: "editorial",
  },
  perspective: {
    eyebrow: "Petroleum Perspective",
    heading: "Understanding a Complex Value Chain.",
    body: [
      "The petroleum sector spans exploration, transport, processing, storage, and distribution — each with distinct operational, financial, and regulatory characteristics.",
      "Our perspective considers the role of essential infrastructure within this value chain, alongside market dynamics, environmental responsibilities, and long-term energy demand.",
    ],
    image: "pet2",
  },
  focus: {
    eyebrow: "Areas of Focus",
    heading: "Infrastructure Across the Energy Value Chain.",
    items: [
      {
        title: "Upstream Infrastructure",
        text: "Production facilities, offshore platforms, and the equipment behind energy supply.",
        image: "pet5",
      },
      {
        title: "Midstream & Pipelines",
        text: "Pipeline networks and gathering systems that move energy from source to market.",
        image: "pet7",
      },
      {
        title: "Refining & Processing",
        text: "Refineries and processing facilities that convert crude oil into essential products.",
        image: "oil",
      },
      {
        title: "Storage & Terminals",
        text: "Tank farms, terminals, and storage capacity that support reliable supply.",
        image: "pet3",
      },
      {
        title: "Marine Transport & Distribution",
        text: "Tanker shipping, port facilities, and the distribution networks that serve demand.",
        image: "petTanker",
      },
      {
        title: "Efficiency & Emissions Reduction",
        text: "Technologies and practices that improve efficiency and reduce environmental impact.",
        image: "solar",
      },
    ],
  },
  considerations: {
    eyebrow: "Investment Considerations",
    heading: ["Careful Evaluation.", "Responsible Perspective."],
    intro:
      "Petroleum-related opportunities require balancing market cycles, operational complexity, environmental responsibilities, and the long-term direction of global energy use.",
    items: [
      { title: "Supply & Demand Dynamics" },
      { title: "Asset Integrity & Operations" },
      { title: "Regulatory & Environmental Factors" },
      { title: "Energy Transition Outlook" },
    ],
    image: "pet6",
  },
  longTerm: {
    eyebrow: "Long-Term Perspective",
    heading: ["A Changing System.", "Enduring Infrastructure."],
    body: [
      "The global energy system is evolving, yet petroleum infrastructure continues to play an important role in supplying transport, industry, and materials.",
      "Our perspective considers how this role may change over time — and the importance of efficiency, responsible operation, and adaptability within long-term energy planning.",
    ],
    image: "pet8",
  },
  related: ["energy-solar", "logistics-infrastructure", "industrial-manufacturing"],
  closing: {
    eyebrow: "Energy Inquiries",
    heading: ["Let’s Discuss", "Energy Infrastructure."],
    description:
      "Connect with Blubeard Investment AG to explore strategic discussions related to petroleum infrastructure, energy supply chains, and long-term energy development.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "All Investments", href: "/investments" },
    image: "oil",
    layout: "split",
  },
};
