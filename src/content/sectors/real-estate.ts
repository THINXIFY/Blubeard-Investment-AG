import type { SectorPageData } from "./types";

/** Real Estate — approved IP-02B.1 copy. Focus areas are investment interests, not holdings. */
export const realEstate: SectorPageData = {
  slug: "real-estate",
  name: "Real Estate",
  meta: {
    title: "Real Estate Investments",
    description:
      "Blubeard Investment AG's perspective on real estate investment — commercial, residential, industrial, logistics, hospitality and development opportunities, evaluated with a long-term view.",
  },
  hero: {
    eyebrow: "Real Estate Investments",
    heading: ["Investing in Places.", "Creating Lasting Value."],
    intro: [
      "Real estate remains an important foundation of economic activity, connecting physical assets with evolving business, residential, and infrastructure needs.",
      "Blubeard Investment AG approaches real estate investment opportunities through strategic evaluation, market understanding, and a long-term perspective on asset potential.",
    ],
    image: "reHero",
    position: "50% 78%",
    layout: "editorial",
  },
  perspective: {
    eyebrow: "Real Estate Perspective",
    heading: "Understanding the Value Behind Every Property.",
    body: [
      "Real estate investment requires careful consideration of location, market conditions, asset characteristics, and long-term demand.",
      "Our perspective considers both the fundamentals of individual properties and the wider economic conditions that may influence their future potential.",
    ],
    image: "services",
    detailImage: "aboutDetail",
  },
  focus: {
    eyebrow: "Areas of Focus",
    heading: "Opportunities Across the Built Environment.",
    items: [
      {
        title: "Commercial Properties",
        text: "Office buildings, business districts, and income-generating commercial spaces.",
        image: "svcCapital",
      },
      {
        title: "Residential Developments",
        text: "Residential properties, housing developments, and evolving urban communities.",
        image: "reResidential",
      },
      {
        title: "Industrial Real Estate",
        text: "Industrial facilities, production sites, and specialized operational properties.",
        image: "reIndustrial",
      },
      {
        title: "Logistics & Warehousing",
        text: "Distribution centers, logistics facilities, and supply-chain real estate.",
        image: "reLogistics",
      },
      {
        title: "Hospitality Properties",
        text: "Hotels, hospitality developments, and destination-oriented property assets.",
        image: "reHotel",
      },
      {
        title: "Real Estate Development",
        text: "Property development, redevelopment, and long-term urban transformation.",
        image: "reDev",
      },
    ],
  },
  considerations: {
    eyebrow: "Investment Considerations",
    heading: ["Disciplined Thinking.", "Informed Decisions."],
    intro:
      "Evaluating real estate opportunities involves balancing market potential, financial considerations, operational factors, and long-term objectives.",
    items: [
      { title: "Location & Market Dynamics" },
      { title: "Asset Quality & Fundamentals" },
      { title: "Financial & Risk Evaluation" },
      { title: "Long-Term Value Potential" },
    ],
    image: "realEstate",
    frames: ["30% 70%", "62% 30%", "80% 60%", "45% 15%"],
  },
  longTerm: {
    eyebrow: "Long-Term Perspective",
    heading: ["Real Assets.", "Enduring Relevance."],
    body: [
      "As cities, industries, and communities evolve, real estate continues to play an essential role in supporting economic activity.",
      "Our perspective considers changing demand, infrastructure development, and the importance of understanding how physical assets contribute to long-term economic growth.",
    ],
    image: "reSkyline",
  },
  related: ["logistics-infrastructure", "industrial-manufacturing", "energy-solar"],
  closing: {
    eyebrow: "Real Estate Inquiries",
    heading: ["Let’s Discuss", "Real Estate Opportunities."],
    description:
      "Connect with Blubeard Investment AG to explore strategic discussions related to real estate investment and long-term development opportunities.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "All Investments", href: "/investments" },
    image: "about",
    layout: "glass",
  },
};
