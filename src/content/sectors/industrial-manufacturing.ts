import type { SectorPageData } from "./types";

/** Industrial & Manufacturing — focus areas are investment interests, not holdings. */
export const industrialManufacturing: SectorPageData = {
  slug: "industrial-manufacturing",
  name: "Industrial & Manufacturing",
  meta: {
    title: "Industrial & Manufacturing Investments",
    description:
      "Our perspective on industry and manufacturing: advanced manufacturing, precision engineering, automation, materials and process industries.",
  },
  hero: {
    eyebrow: "Industrial & Manufacturing Investments",
    heading: ["Precision in Production.", "Strength in Industry."],
    intro: [
      "Manufacturing and industry transform materials, engineering, and skilled work into the products and components that economies depend on.",
      "Blubeard Investment AG approaches industrial opportunities through attention to operational quality, engineering capability, and the long-term competitiveness of production.",
    ],
    image: "man1",
    layout: "editorial",
  },
  perspective: {
    eyebrow: "Industrial Perspective",
    heading: "Where Engineering Meets Operational Discipline.",
    body: [
      "Industrial businesses are shaped by production efficiency, technical expertise, supply chains, and the cycles of the markets they serve.",
      "Our perspective considers both the strength of individual operations and the broader trends influencing industry — from automation and digitalisation to resilient supply chains.",
    ],
    image: "man2",
  },
  focus: {
    eyebrow: "Areas of Focus",
    heading: "The Capabilities That Build Economies.",
    items: [
      {
        title: "Advanced Manufacturing",
        text: "Modern production lines and manufacturing systems for complex, high-quality products.",
        image: "industrial",
      },
      {
        title: "Precision Engineering",
        text: "Machining, tooling, and engineering where accuracy and quality are essential.",
        image: "man5",
      },
      {
        title: "Industrial Automation",
        text: "Robotics, control systems, and automated processes that improve productivity.",
        image: "man6",
      },
      {
        title: "Materials & Metals",
        text: "Steel, metals, and advanced materials that form the basis of industrial production.",
        image: "man7",
      },
      {
        title: "Process Industries",
        text: "Chemical, processing, and production facilities operating continuous industrial processes.",
        image: "man8",
      },
      {
        title: "Industrial Facilities & Services",
        text: "Production sites, maintenance, and the services that keep industrial operations running.",
        image: "man9",
      },
    ],
  },
  considerations: {
    eyebrow: "Investment Considerations",
    heading: ["Operational Strength.", "Considered Decisions."],
    intro:
      "Evaluating industrial opportunities involves understanding operational performance, cost structures, technology readiness, and exposure to economic cycles and supply chains.",
    items: [
      { title: "Operational Excellence" },
      { title: "Cost Structure & Cyclicality" },
      { title: "Technology & Automation Readiness" },
      { title: "Supply Chain Resilience" },
    ],
    image: "man3",
  },
  longTerm: {
    eyebrow: "Long-Term Perspective",
    heading: ["Modern Industry.", "Lasting Capability."],
    body: [
      "Industry continues to evolve through automation, digital tools, and changing supply chains, while remaining fundamental to economic activity.",
      "Our perspective considers how manufacturing capabilities, skilled expertise, and efficient production contribute to long-term industrial resilience.",
    ],
    image: "man4",
  },
  related: ["logistics-infrastructure", "artificial-intelligence", "energy-solar"],
  closing: {
    eyebrow: "Industrial Inquiries",
    heading: ["Let’s Discuss", "Industrial Opportunities."],
    description:
      "Connect with Blubeard Investment AG to explore strategic discussions related to manufacturing, engineering, and long-term industrial development.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "All Investments", href: "/investments" },
    image: "man2",
    layout: "split",
  },
};
