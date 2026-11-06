import type { SectorPageData } from "./types";

/** Healthcare & Medical Technology — focus areas are investment interests, not holdings. */
export const healthcareMedtech: SectorPageData = {
  slug: "healthcare-medtech",
  name: "Healthcare & Medical Technology",
  meta: {
    title: "Healthcare & Medical Technology Investments",
    description:
      "Blubeard Investment AG's perspective on healthcare and medical technology — medical devices, diagnostics and imaging, surgical systems, digital health and laboratory services.",
  },
  hero: {
    eyebrow: "Healthcare & MedTech Investments",
    heading: ["Advancing Care.", "Investing in Health."],
    intro: [
      "Healthcare combines clinical expertise, technology, and infrastructure to improve how illness is diagnosed, treated, and prevented.",
      "Blubeard Investment AG approaches healthcare opportunities with careful attention to clinical value, patient safety, and the long-term development of medical technology.",
    ],
    image: "med1",
    layout: "editorial",
  },
  perspective: {
    eyebrow: "Healthcare Perspective",
    heading: "Where Clinical Need Meets Technological Progress.",
    body: [
      "Healthcare innovation must demonstrate clinical benefit, meet rigorous regulatory standards, and integrate effectively into the way care is delivered.",
      "Our perspective considers medical technologies and services in this context — evaluating their practical value for patients, clinicians, and healthcare systems.",
    ],
    image: "med2",
  },
  focus: {
    eyebrow: "Areas of Focus",
    heading: "Technologies Improving the Delivery of Care.",
    items: [
      {
        title: "Medical Devices",
        text: "Equipment and devices that support diagnosis, treatment, and patient monitoring.",
        image: "med6",
      },
      {
        title: "Diagnostics & Imaging",
        text: "Imaging systems and diagnostic technologies that enable earlier, more accurate insight.",
        image: "healthcare",
      },
      {
        title: "Surgical & Robotic Systems",
        text: "Advanced surgical tools and robotic systems supporting precise procedures.",
        image: "med4",
      },
      {
        title: "Digital Health",
        text: "Health data, software, and digital tools that improve coordination and access to care.",
        image: "technology",
      },
      {
        title: "Laboratory & Clinical Services",
        text: "Clinical laboratories and testing services at the centre of medical decision-making.",
        image: "med7",
      },
      {
        title: "Healthcare Facilities",
        text: "Hospitals, clinics, and specialised facilities where care is delivered.",
        image: "med8",
      },
    ],
  },
  considerations: {
    eyebrow: "Investment Considerations",
    heading: ["Patient Focus.", "Rigorous Evaluation."],
    intro:
      "Evaluating healthcare opportunities involves clinical evidence, regulatory approval, adoption by providers, and an uncompromising focus on quality and safety.",
    items: [
      { title: "Clinical Need & Evidence" },
      { title: "Regulatory Approval Pathways" },
      { title: "Reimbursement & Adoption" },
      { title: "Quality & Patient Safety" },
    ],
    image: "bio2",
  },
  longTerm: {
    eyebrow: "Long-Term Perspective",
    heading: ["Growing Needs.", "Lasting Importance."],
    body: [
      "Demographic change, chronic conditions, and medical progress continue to shape how healthcare is delivered around the world.",
      "Our perspective considers the long-term role of technology and infrastructure in supporting accessible, efficient, and high-quality care.",
    ],
    image: "med5",
  },
  related: ["biotechnology", "artificial-intelligence", "real-estate"],
  closing: {
    eyebrow: "Healthcare Inquiries",
    heading: ["Let’s Discuss", "Healthcare Opportunities."],
    description:
      "Connect with Blubeard Investment AG to explore strategic discussions related to medical technology, healthcare services, and long-term health innovation.",
    primaryCta: { label: "Contact Us", href: "/contact" },
    secondaryCta: { label: "All Investments", href: "/investments" },
    image: "bio1",
    layout: "split",
  },
};
