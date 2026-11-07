import type { SectorPageData } from "./types";

/** Agriculture & Food Technology — focus areas are investment interests, not holdings. */
export const agricultureFoodtech: SectorPageData = {
  slug: "agriculture-foodtech",
  name: "Agriculture & Food Technology",
  meta: {
    title: "Agriculture & Food Technology Investments",
    description:
      "Our perspective on agriculture and food technology: precision agriculture, controlled-environment farming, machinery, food processing and agri-biotech.",
  },
  hero: {
    eyebrow: "Agriculture & FoodTech Investments",
    heading: ["Cultivating Progress.", "Nourishing the Future."],
    intro: [
      "Agriculture and food production sustain every community, and technology is changing how crops are grown, harvested, processed, and delivered.",
      "Blubeard Investment AG approaches agriculture and food opportunities with attention to productivity, sustainability, and the long-term resilience of food systems.",
    ],
    image: "agr1",
    layout: "centered",
  },
  perspective: {
    eyebrow: "Agriculture Perspective",
    heading: "From Field to Table, a System Worth Understanding.",
    body: [
      "Food systems depend on land, climate, water, machinery, processing, and distribution — each influencing quality, cost, and reliability.",
      "Our perspective considers how technology and infrastructure can improve efficiency and sustainability across this chain, while respecting the natural factors that shape agriculture.",
    ],
    image: "agr2",
  },
  focus: {
    eyebrow: "Areas of Focus",
    heading: "Modern Tools for an Essential Industry.",
    items: [
      {
        title: "Precision Agriculture",
        text: "Drones, sensors, and data that help farmers use resources more precisely.",
        image: "agr5",
      },
      {
        title: "Controlled-Environment Farming",
        text: "Greenhouses and hydroponic systems producing crops in carefully managed conditions.",
        image: "agriculture",
      },
      {
        title: "Agricultural Machinery",
        text: "Tractors, harvesters, and equipment that improve productivity in the field.",
        image: "agr6",
      },
      {
        title: "Food Processing & Production",
        text: "Facilities and technologies that transform raw produce into safe, quality food.",
        image: "bio7",
      },
      {
        title: "Sustainable Agribusiness",
        text: "Farming enterprises and practices focused on soil health, water, and long-term productivity.",
        image: "agr8",
      },
      {
        title: "Agricultural Biotechnology",
        text: "Biological research improving crop resilience, nutrition, and sustainable yields.",
        image: "biotechnology",
      },
    ],
  },
  considerations: {
    eyebrow: "Investment Considerations",
    heading: ["Natural Factors.", "Practical Innovation."],
    intro:
      "Evaluating agriculture and food opportunities involves climate and resource conditions, technology adoption, market access, and the standards that protect food quality and safety.",
    items: [
      { title: "Climate & Resource Factors" },
      { title: "Productivity & Technology Adoption" },
      { title: "Supply Chain & Market Access" },
      { title: "Food Safety & Regulation" },
    ],
    image: "agr3",
  },
  longTerm: {
    eyebrow: "Long-Term Perspective",
    heading: ["Growing Demand.", "Resilient Food Systems."],
    body: [
      "Feeding a growing population while managing land, water, and climate pressures is one of the defining long-term challenges for agriculture.",
      "Our perspective considers how innovation, efficient infrastructure, and sustainable practices can contribute to more resilient food systems over time.",
    ],
    image: "agr4",
  },
  related: ["biotechnology", "energy-solar", "logistics-infrastructure"],
  closing: {
    eyebrow: "Agriculture Inquiries",
    heading: ["Let’s Discuss", "Agriculture & Food."],
    description:
      "Connect with Blubeard Investment AG to explore strategic discussions related to agricultural technology, food production, and long-term food-system development.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "All Investments", href: "/investments" },
    image: "agr3",
    layout: "glass",
  },
};
