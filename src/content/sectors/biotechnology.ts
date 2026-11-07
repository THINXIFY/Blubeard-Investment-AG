import type { SectorPageData } from "./types";

/** Biotechnology — focus areas are investment interests, not holdings. */
export const biotechnology: SectorPageData = {
  slug: "biotechnology",
  name: "Biotechnology",
  meta: {
    title: "Biotechnology Investments",
    description:
      "Our perspective on biotechnology: pharmaceutical research, genomics, biomanufacturing, diagnostics and computational biology, with a long-term view.",
  },
  hero: {
    eyebrow: "Biotechnology Investments",
    heading: ["Science in Progress.", "Value in Discovery."],
    intro: [
      "Biotechnology connects scientific discovery with new approaches to health, food and industry — a field where careful research can translate into meaningful long-term progress.",
      "Blubeard Investment AG approaches biotechnology opportunities with respect for scientific complexity, attention to development pathways, and a patient, long-term perspective.",
    ],
    image: "bio1",
    layout: "centered",
  },
  perspective: {
    eyebrow: "Biotechnology Perspective",
    heading: "Understanding Science, Pathways and Potential.",
    body: [
      "Evaluating biotechnology requires an understanding of the underlying science, the stage of development, and the regulatory and clinical steps that lie between research and application.",
      "Our perspective considers both scientific merit and practical realities — the capabilities of a team, the strength of its platform, and the long horizons that characterise life-science innovation.",
    ],
    image: "bio2",
  },
  focus: {
    eyebrow: "Areas of Focus",
    heading: "Where Life Sciences Are Advancing.",
    items: [
      {
        title: "Pharmaceutical Research",
        text: "Drug discovery, preclinical research, and the development of new therapeutic approaches.",
        image: "biotechnology",
      },
      {
        title: "Genomics & Precision Medicine",
        text: "Sequencing technologies, genetic insight, and treatments tailored to individual biology.",
        image: "bio6",
      },
      {
        title: "Biomanufacturing",
        text: "Bioprocessing, fermentation, and the production infrastructure behind biological products.",
        image: "bio7",
      },
      {
        title: "Diagnostics & Research Tools",
        text: "Laboratory instruments, assays, and the tools that enable scientific research.",
        image: "med7",
      },
      {
        title: "Computational Biology",
        text: "Data-driven research, molecular modelling, and high-performance computing for life sciences.",
        image: "ai",
      },
      {
        title: "Agricultural & Industrial Biotech",
        text: "Biological solutions for crops, materials, and more sustainable industrial processes.",
        image: "agriculture",
      },
    ],
  },
  considerations: {
    eyebrow: "Investment Considerations",
    heading: ["Scientific Rigour.", "Measured Judgement."],
    intro:
      "Biotechnology opportunities involve scientific uncertainty, long development timelines, and demanding regulatory standards that require careful, informed evaluation.",
    items: [
      { title: "Scientific & Clinical Validation" },
      { title: "Regulatory Pathways" },
      { title: "Development Timelines & Capital Needs" },
      { title: "Intellectual Property & Market Potential" },
    ],
    image: "bio3",
  },
  longTerm: {
    eyebrow: "Long-Term Perspective",
    heading: ["Patient Perspective.", "Lasting Scientific Impact."],
    body: [
      "Advances in biology continue to reshape how diseases are understood, how food is produced, and how materials are made.",
      "Our perspective recognises that the most meaningful progress in biotechnology often unfolds over many years — and that understanding this horizon is essential to evaluating its long-term potential.",
    ],
    image: "bio4",
  },
  related: ["healthcare-medtech", "artificial-intelligence", "agriculture-foodtech"],
  closing: {
    eyebrow: "Biotechnology Inquiries",
    heading: ["Let’s Discuss", "Biotechnology Opportunities."],
    description:
      "Connect with Blubeard Investment AG to explore strategic discussions related to life sciences, biotechnology research, and long-term innovation.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "All Investments", href: "/investments" },
    image: "bio6",
    layout: "split",
  },
};
