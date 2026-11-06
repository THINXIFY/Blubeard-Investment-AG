import type { SectorPageData } from "./types";

/** Logistics & Infrastructure — focus areas are investment interests, not holdings. */
export const logisticsInfrastructure: SectorPageData = {
  slug: "logistics-infrastructure",
  name: "Logistics & Infrastructure",
  meta: {
    title: "Logistics & Infrastructure Investments",
    description:
      "Blubeard Investment AG's perspective on logistics and infrastructure — ports, warehousing, rail, air cargo, road transport and transport infrastructure, evaluated with a long-term view.",
  },
  hero: {
    eyebrow: "Logistics & Infrastructure Investments",
    heading: ["Moving Economies.", "Connecting Markets."],
    intro: [
      "Logistics and infrastructure enable goods, people, and resources to move efficiently between producers, markets, and communities.",
      "Blubeard Investment AG approaches logistics opportunities by considering network connectivity, operational efficiency, and the long-term importance of essential transport infrastructure.",
    ],
    image: "lgs1",
    layout: "centered",
    video: {
      src: "/media/logistics/freight-1080.mp4",
      srcSmall: "/media/logistics/freight-720.mp4",
      poster: "/media/logistics/freight-poster.jpg",
    },
  },
  perspective: {
    eyebrow: "Logistics Perspective",
    heading: "The Networks Behind Every Supply Chain.",
    body: [
      "Effective logistics relies on well-located facilities, reliable transport links, and the capacity to respond to changing trade and consumer patterns.",
      "Our perspective considers the role of physical infrastructure within these networks — how ports, warehouses, rail, and roads work together to support economic activity.",
    ],
    image: "lgs2",
  },
  focus: {
    eyebrow: "Areas of Focus",
    heading: "Infrastructure That Keeps Goods Moving.",
    items: [
      {
        title: "Ports & Maritime",
        text: "Container terminals, port facilities, and the maritime gateways of global trade.",
        image: "logistics",
        icon: "port",
      },
      {
        title: "Warehousing & Distribution",
        text: "Distribution centres and warehouses that store, sort, and dispatch goods.",
        image: "lgs5",
        icon: "warehouse",
      },
      {
        title: "Rail & Intermodal",
        text: "Freight rail and intermodal networks connecting ports, industry, and inland markets.",
        image: "lgs6",
        icon: "rail",
      },
      {
        title: "Air Cargo",
        text: "Air freight operations and facilities serving time-sensitive and high-value goods.",
        image: "lgs7",
        icon: "air",
      },
      {
        title: "Road & Last-Mile",
        text: "Road freight, regional distribution, and final delivery to customers.",
        image: "reSkyline",
        icon: "road",
      },
      {
        title: "Transport Infrastructure",
        text: "The construction and development of public infrastructure that underpins every transport network.",
        image: "reDev",
        icon: "infrastructure",
      },
    ],
  },
  considerations: {
    eyebrow: "Investment Considerations",
    heading: ["Strategic Locations.", "Efficient Networks."],
    intro:
      "Evaluating logistics opportunities involves understanding location, capacity, operational efficiency, and the long-term demand drivers of trade and distribution.",
    items: [
      { title: "Location & Network Connectivity" },
      { title: "Capacity & Utilisation" },
      { title: "Operational Efficiency" },
      { title: "Infrastructure Longevity & Demand" },
    ],
    image: "lgs3",
  },
  longTerm: {
    eyebrow: "Long-Term Perspective",
    heading: ["Essential Networks.", "Enduring Relevance."],
    body: [
      "As trade patterns, e-commerce, and industrial supply chains evolve, the infrastructure that moves goods remains fundamental to economic activity.",
      "Our perspective considers how logistics networks adapt over time — and the lasting value of well-positioned, efficient, and resilient infrastructure.",
    ],
    image: "lgs4",
  },
  related: ["real-estate", "industrial-manufacturing", "petroleum-oil"],
  closing: {
    eyebrow: "Logistics Inquiries",
    heading: ["Let’s Discuss", "Logistics & Infrastructure."],
    description:
      "Connect with Blubeard Investment AG to explore strategic discussions related to transport networks, logistics facilities, and long-term infrastructure development.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "All Investments", href: "/investments" },
    image: "logistics",
    layout: "glass",
  },
};
