import type { SectorPageData } from "./types";

/** Artificial Intelligence — focus areas are investment interests, not holdings. */
export const artificialIntelligence: SectorPageData = {
  slug: "artificial-intelligence",
  name: "Artificial Intelligence",
  meta: {
    title: "Artificial Intelligence Investments",
    description:
      "Our perspective on artificial intelligence: AI infrastructure, robotics, applied machine learning, autonomous systems and enterprise AI.",
  },
  hero: {
    eyebrow: "Artificial Intelligence Investments",
    heading: ["Intelligent Systems.", "Considered Progress."],
    intro: [
      "Artificial intelligence is changing how organisations analyse information, automate processes, and develop new products and services.",
      "Blubeard Investment AG approaches AI opportunities with a focus on real-world application, responsible development, and the infrastructure that makes intelligent systems possible.",
    ],
    image: "art1",
    layout: "centered",
  },
  perspective: {
    eyebrow: "AI Perspective",
    heading: "Looking Past the Excitement to Practical Value.",
    body: [
      "Artificial intelligence attracts significant attention, which makes disciplined evaluation especially important — distinguishing meaningful capability from short-lived enthusiasm.",
      "Our perspective considers where intelligent systems solve real problems, the computing and data resources they require, and how they are integrated responsibly into business and industry.",
    ],
    image: "art2",
  },
  focus: {
    eyebrow: "Areas of Focus",
    heading: "From Computing Power to Applied Intelligence.",
    items: [
      {
        title: "AI Infrastructure & Computing",
        text: "High-performance computing, specialised processors, and the facilities that train and run AI models.",
        image: "ai",
      },
      {
        title: "Robotics & Automation",
        text: "Intelligent robots, collaborative machines, and automated systems for industry and services.",
        image: "art5",
      },
      {
        title: "Applied Machine Learning",
        text: "Models and software that analyse data, support decisions, and improve operational efficiency.",
        image: "art6",
      },
      {
        title: "Autonomous Systems",
        text: "Perception, sensing, and navigation technologies for vehicles, drones, and machines.",
        image: "art7",
      },
      {
        title: "Data Platforms",
        text: "The data infrastructure, management, and governance on which reliable AI depends.",
        image: "technology",
      },
      {
        title: "Industrial & Enterprise AI",
        text: "Intelligent systems that optimise manufacturing, logistics, and business operations.",
        image: "industrial",
      },
    ],
  },
  considerations: {
    eyebrow: "Investment Considerations",
    heading: ["Responsible Innovation.", "Informed Evaluation."],
    intro:
      "Evaluating AI opportunities requires attention to genuine utility, access to data and computing resources, and the ethical and regulatory questions that accompany intelligent systems.",
    items: [
      { title: "Real-World Application" },
      { title: "Data, Compute & Talent" },
      { title: "Responsible & Regulatory Considerations" },
      { title: "Durability Beyond the Cycle" },
    ],
    image: "art3",
  },
  longTerm: {
    eyebrow: "Long-Term Perspective",
    heading: ["Intelligent Systems.", "Gradual Transformation."],
    body: [
      "The influence of artificial intelligence is likely to extend across industries as capabilities mature and adoption broadens.",
      "Our perspective considers this transformation as a long-term process — one shaped by infrastructure, regulation, trust, and the practical integration of intelligent systems into everyday operations.",
    ],
    image: "art4",
  },
  related: ["technology", "industrial-manufacturing", "healthcare-medtech"],
  closing: {
    eyebrow: "AI Inquiries",
    heading: ["Let’s Discuss", "Artificial Intelligence."],
    description:
      "Connect with Blubeard Investment AG to explore strategic discussions related to intelligent systems, AI infrastructure, and long-term technological development.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "All Investments", href: "/investments" },
    image: "tec6",
    layout: "split",
  },
};
