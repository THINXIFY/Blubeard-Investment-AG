import type { SectorPageData } from "./types";

/** Aerospace & Defense Technology — focus areas are investment interests, not holdings. */
export const aerospaceDefense: SectorPageData = {
  slug: "aerospace-defense",
  name: "Aerospace & Defense Technology",
  meta: {
    title: "Aerospace & Defense Technology Investments",
    description:
      "Blubeard Investment AG's perspective on aerospace and defence technology — aerospace engineering, satellites, propulsion, maintenance services and security technology, evaluated responsibly.",
  },
  hero: {
    eyebrow: "Aerospace & Defense Investments",
    heading: ["Engineering Ambition.", "Advanced Systems."],
    intro: [
      "Aerospace and defence technology bring together some of the most demanding engineering disciplines, from aircraft and propulsion to satellites and secure communications.",
      "Blubeard Investment AG approaches this sector with attention to engineering excellence, regulatory frameworks, and the responsible development of advanced technologies.",
    ],
    image: "aer1",
    layout: "editorial",
  },
  perspective: {
    eyebrow: "Aerospace Perspective",
    heading: "Precision, Certification and Long Horizons.",
    body: [
      "Aerospace programmes are defined by rigorous safety standards, long development cycles, and close cooperation between industry and public institutions.",
      "Our perspective considers these characteristics carefully — evaluating technical capability, programme stability, and compliance with the regulations that govern the sector.",
    ],
    image: "man5",
  },
  focus: {
    eyebrow: "Areas of Focus",
    heading: "Technologies Engineered for Demanding Environments.",
    items: [
      {
        title: "Aerospace Engineering",
        text: "Aircraft structures, systems integration, and the engineering behind modern aviation.",
        image: "aer7",
      },
      {
        title: "Satellite & Space Technologies",
        text: "Satellites, payloads, and the technologies supporting communication and observation.",
        image: "aerospace",
      },
      {
        title: "Propulsion Systems",
        text: "Engines and propulsion technologies that power aircraft and spacecraft.",
        image: "aer6",
      },
      {
        title: "Maintenance & Aviation Services",
        text: "Maintenance, repair, and services that keep aircraft safe and operational.",
        image: "aer5",
      },
      {
        title: "Security & Communications",
        text: "Secure communications, sensing, and specialised technologies for protection and resilience.",
        image: "tec3",
      },
      {
        title: "Launch & Space Infrastructure",
        text: "Launch systems and ground infrastructure enabling access to space.",
        image: "aer4",
      },
    ],
  },
  considerations: {
    eyebrow: "Investment Considerations",
    heading: ["Engineering Excellence.", "Responsible Conduct."],
    intro:
      "Evaluating aerospace and defence opportunities requires attention to certification, long programme timelines, government frameworks, and strict standards of responsible conduct.",
    items: [
      { title: "Engineering & Certification Standards" },
      { title: "Long Development Cycles" },
      { title: "Government & Regulatory Frameworks" },
      { title: "Export Controls & Responsible Conduct" },
    ],
    image: "aer3",
  },
  longTerm: {
    eyebrow: "Long-Term Perspective",
    heading: ["Advanced Engineering.", "Lasting Capability."],
    body: [
      "Aviation, space, and security technologies continue to evolve, supported by long-term research and specialised industrial expertise.",
      "Our perspective considers the sustained investment, skilled engineering, and responsible governance required to develop advanced systems over many years.",
    ],
    image: "aer2",
  },
  related: ["technology", "industrial-manufacturing", "artificial-intelligence"],
  closing: {
    eyebrow: "Aerospace Inquiries",
    heading: ["Let’s Discuss", "Aerospace Opportunities."],
    description:
      "Connect with Blubeard Investment AG to explore strategic discussions related to aerospace engineering, space technologies, and advanced systems.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "All Investments", href: "/investments" },
    image: "lgs7",
    layout: "split",
  },
};
