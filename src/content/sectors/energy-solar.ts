import type { SectorPageData } from "./types";

/** Energy & Solar — focus areas are investment interests, not holdings. */
export const energySolar: SectorPageData = {
  slug: "energy-solar",
  name: "Energy & Solar",
  meta: {
    title: "Energy & Solar Investments",
    description:
      "Blubeard Investment AG's perspective on renewable energy — utility-scale and distributed solar, wind, energy storage and grid infrastructure, evaluated with a long-term view.",
  },
  hero: {
    eyebrow: "Energy & Solar Investments",
    heading: ["Powering Transition.", "Building Resilience."],
    intro: [
      "Renewable energy is becoming an increasingly important part of how economies generate, store, and distribute power.",
      "Blubeard Investment AG approaches energy and solar opportunities by considering resource quality, infrastructure needs, and the long-term development of resilient power systems.",
    ],
    image: "enr1",
    layout: "centered",
  },
  perspective: {
    eyebrow: "Energy Perspective",
    heading: "Generation, Storage and the Grid Between Them.",
    body: [
      "A reliable energy system depends not only on generation, but on the storage, transmission, and flexibility that connect supply with demand.",
      "Our perspective considers renewable projects within this wider system — evaluating site conditions, grid access, technology choices, and the policies that shape long-term development.",
    ],
    image: "enr2",
  },
  focus: {
    eyebrow: "Areas of Focus",
    heading: "The Infrastructure of Cleaner Power.",
    items: [
      {
        title: "Utility-Scale Solar",
        text: "Large solar installations and concentrated solar power generating electricity at scale.",
        image: "solar",
      },
      {
        title: "Wind Energy",
        text: "Onshore and offshore wind farms harnessing consistent, renewable resources.",
        image: "enr5",
      },
      {
        title: "Energy Storage",
        text: "Battery systems and storage technologies that balance supply and demand.",
        image: "enr6",
      },
      {
        title: "Transmission & Grid",
        text: "Power lines, substations, and grid infrastructure that deliver electricity reliably.",
        image: "enr7",
      },
      {
        title: "Distributed Solar",
        text: "Rooftop and commercial solar systems generating power close to where it is used.",
        image: "enr8",
      },
      {
        title: "Energy Infrastructure Development",
        text: "Planning, construction, and the long-term development of new energy assets.",
        image: "reDev",
      },
    ],
  },
  considerations: {
    eyebrow: "Investment Considerations",
    heading: ["Resource Quality.", "Long-Term Resilience."],
    intro:
      "Evaluating renewable energy opportunities involves understanding site conditions, grid connections, technology performance, and the policy frameworks that influence long-term demand.",
    items: [
      { title: "Resource Quality & Site Conditions" },
      { title: "Grid Access & Offtake" },
      { title: "Technology & Operational Risk" },
      { title: "Policy & Long-Term Demand" },
    ],
    image: "enr3",
  },
  longTerm: {
    eyebrow: "Long-Term Perspective",
    heading: ["Lasting Infrastructure.", "Evolving Energy Systems."],
    body: [
      "As electricity demand grows and energy systems modernise, renewable generation and storage are becoming increasingly central to reliable supply.",
      "Our perspective considers the long lifespans of energy infrastructure and the importance of resilience, flexibility, and careful planning in an evolving power landscape.",
    ],
    image: "enr4",
  },
  related: ["petroleum-oil", "industrial-manufacturing", "logistics-infrastructure"],
  closing: {
    eyebrow: "Energy Inquiries",
    heading: ["Let’s Discuss", "Renewable Energy."],
    description:
      "Connect with Blubeard Investment AG to explore strategic discussions related to solar, wind, storage, and long-term energy infrastructure.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "All Investments", href: "/investments" },
    image: "enr6",
    layout: "glass",
  },
};
