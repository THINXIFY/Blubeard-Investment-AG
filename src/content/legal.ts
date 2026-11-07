import { site } from "@/lib/site";

/** Legal pages. */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "facts"; rows: readonly { label: string; value: string; href?: string }[] };

export type LegalSection = { id: string; title: string; blocks: readonly LegalBlock[] };

export type LegalDocument = {
  slug: "legal-notice" | "privacy" | "terms";
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  sections: readonly LegalSection[];
};

const { address, registry, email, name } = site;
const postal = `${address.street}, ${address.postalCode} ${address.locality}, ${address.country}`;

/** Company positioning (client-approved wording). Describes the business; makes no regulatory claim. */
export const companyPositioning = `${name} is a Swiss investment company based in Samedan, Graubünden, Switzerland, focused on investment opportunities, strategic investments and long-term value creation.`;

/** Date shown on the legal pages. */
export const legalUpdated = { iso: "2026-11-06", label: "6 November 2026" };

export const legalNotice: LegalDocument = {
  slug: "legal-notice",
  eyebrow: "Legal",
  title: "Impressum",
  description: `Impressum of ${name}, a Swiss investment company in Samedan, Graubünden: company identification, register details and legal information.`,
  intro: `Information on the operator of this website, as required for Swiss commercial websites.`,
  sections: [
    {
      id: "operator",
      title: "Website operator",
      blocks: [
        {
          type: "facts",
          rows: [
            { label: "Company", value: name },
            { label: "Legal form", value: registry.legalForm },
            { label: "Registered office", value: registry.seat },
            { label: "Address", value: postal },
            { label: "Email", value: email, href: `mailto:${email}` },
          ],
        },
      ],
    },
    {
      id: "register",
      title: "Commercial register",
      blocks: [
        {
          type: "facts",
          rows: [
            { label: "UID", value: registry.uid },
            { label: "Commercial register number", value: registry.registerNumber },
            { label: "Register", value: "Commercial Register of the Canton of Graubünden" },
            { label: "Registered board member", value: registry.boardMember },
          ],
        },
        {
          type: "p",
          text: "The current register entry can be consulted through the Swiss commercial register (zefix.ch) and the cantonal register office.",
        },
      ],
    },
    {
      id: "content",
      title: "Website content",
      blocks: [
        {
          type: "p",
          text: `The content of this website is provided for general information about ${name}. It is prepared with care, but no representation is made that it is complete, accurate or current at all times. Content may be changed or removed without notice.`,
        },
        {
          type: "p",
          text: "Nothing on this website constitutes an offer, a solicitation, investment advice or a recommendation. Further information on the use of this website is set out in the Terms of Use.",
        },
      ],
    },
    {
      id: "links",
      title: "External links",
      blocks: [
        {
          type: "p",
          text: "This website contains links to third-party websites (for example map services, the commercial register information service and photo sources). Their content is the sole responsibility of their operators. We review linked content when the link is created but cannot monitor it continuously.",
        },
      ],
    },
    {
      id: "copyright",
      title: "Copyright and image rights",
      blocks: [
        {
          type: "p",
          text: `Texts, layout and graphics on this website are protected by copyright and belong to ${name} unless stated otherwise. Reproduction or use requires prior written consent.`,
        },
        {
          type: "p",
          text: "Photographs are used under the licences stated on the Image Credits page, which lists authors, sources and licence terms.",
        },
      ],
    },
  ],
};

export const privacyPolicy: LegalDocument = {
  slug: "privacy",
  eyebrow: "Legal",
  title: "Privacy Policy",
  description: `Privacy Policy of ${name}: how personal data is processed on this website and in email communication, and your rights under the Swiss FADP.`,
  intro:
    `${name}, a Swiss investment company based in Samedan, Graubünden, is responsible for this website. ` +
    "This policy explains which personal data is processed when you visit this website or contact us, for which purposes, and what rights you have under the Swiss Federal Act on Data Protection (FADP).",
  sections: [
    {
      id: "controller",
      title: "Controller and contact",
      blocks: [
        {
          type: "facts",
          rows: [
            { label: "Controller", value: name },
            { label: "Address", value: postal },
            { label: "Email", value: email, href: `mailto:${email}` },
          ],
        },
        { type: "p", text: "Requests concerning data protection can be sent to the address or email above." },
      ],
    },
    {
      id: "overview",
      title: "Overview of processing",
      blocks: [
        {
          type: "p",
          text: "This website is informational. It contains no contact forms, user accounts or newsletter sign-up. Its only form is the optional Request Private Documents request. Personal data is processed only in the following situations:",
        },
        {
          type: "list",
          items: [
            "Technical access data when the website is delivered to your browser (see “Website access and server logs”).",
            "Content of emails and the contact details you provide when you write to us.",
            "Your email address and related technical data when you request private documents (see “Private document requests”).",
          ],
        },
      ],
    },
    {
      id: "logs",
      title: "Website access and server logs",
      blocks: [
        {
          type: "p",
          text: "When you visit the website, the hosting infrastructure technically processes data needed to deliver the pages, typically your IP address, the date and time of access, the page requested, the referring page, and browser and operating-system information. This data is processed to deliver the website, ensure its stability and security, and investigate misuse.",
        },
      ],
    },
    {
      id: "email",
      title: "Email communication",
      blocks: [
        {
          type: "p",
          text: `If you contact us by email, we process your email address, name and any other information you include, in order to answer your enquiry and maintain our correspondence. Links on this website marked “Email Us” open your own email application; the “Copy email” function copies our address on your device only and transmits no data.`,
        },
        {
          type: "p",
          text: "Please do not send confidential or sensitive information by unencrypted email.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies, analytics and tracking",
      blocks: [
        {
          type: "p",
          text: "This website does not use cookies, analytics, advertising or tracking technologies, and does not store information in your browser’s local storage. Fonts, images and videos are served from the website itself; no content is loaded from third-party servers when you view a page.",
        },
      ],
    },
    {
      id: "external",
      title: "External links",
      blocks: [
        {
          type: "p",
          text: "Some links lead to third-party services, such as Google Maps (directions to our office), Moneyhouse (commercial register information) and Wikimedia Commons / Creative Commons (photo credits). No data is transmitted to these services when you view our pages. If you follow such a link, the respective provider processes your data under its own privacy policy.",
        },
      ],
    },
    {
      id: "private-documents",
      title: "Private document requests",
      blocks: [
        {
          type: "p",
          text: "If you use Request Private Documents, we process the email address you enter in order to send you a one-time verification code and, once it is confirmed, to email you the documents. Providing it is voluntary, but we cannot deliver the documents without it.",
        },
        {
          type: "p",
          text: "To protect this function against misuse, your IP address and email address are also used for rate limiting. These counters are held temporarily in server memory and expire within an hour.",
        },
        {
          type: "p",
          text: "The verification record contains your email address and a protected hash of the code, not the code itself. It is deleted automatically no later than one hour after the code expires.",
        },
        {
          type: "p",
          text: "The emails are sent through Resend, an email delivery provider based in the United States, which processes your email address and the messages on our behalf. See “Recipients and international transfers”. Emails are not end-to-end encrypted.",
        },
      ],
    },
    {
      id: "recipients",
      title: "Recipients and international transfers",
      blocks: [
        {
          type: "p",
          text: "We do not sell personal data. Personal data may be disclosed to service providers who support us in operating the website and our email communication (for example hosting and email providers), and to authorities where required by law.",
        },
        {
          type: "p",
          text: "If personal data is transferred to a country without an adequate level of data protection as determined by the Swiss Federal Council, we ensure appropriate safeguards, such as recognised standard contractual clauses, unless an exception under the FADP applies.",
        },
      ],
    },
    {
      id: "retention",
      title: "Retention",
      blocks: [
        {
          type: "p",
          text: "We retain personal data only for as long as necessary for the purposes described, or as required by statutory retention obligations under Swiss law.",
        },
      ],
    },
    {
      id: "security",
      title: "Data security",
      blocks: [
        {
          type: "p",
          text: "We take appropriate technical and organisational measures to protect personal data against unauthorised access, loss and misuse. No transmission over the internet can be guaranteed to be completely secure.",
        },
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      blocks: [
        {
          type: "p",
          text: "Within the scope of applicable data protection law, you have the right to:",
        },
        {
          type: "list",
          items: [
            "request information on whether and which personal data about you we process;",
            "have inaccurate personal data corrected;",
            "request the deletion of your personal data or object to its processing;",
            "receive personal data you have provided in a common electronic format or have it transferred, where applicable.",
          ],
        },
        {
          type: "p",
          text: "To exercise these rights, contact us at the address or email stated above. We may ask for proof of identity. You may also lodge a complaint with the Swiss Federal Data Protection and Information Commissioner (FDPIC).",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "We may update this policy to reflect changes to the website or legal requirements. The version published on this website applies.",
        },
      ],
    },
  ],
};

export const termsOfUse: LegalDocument = {
  slug: "terms",
  eyebrow: "Legal",
  title: "Terms of Use",
  description: `Terms of Use for the ${name} website: how we work with clients, our long-term perspective, intellectual property and applicable law.`,
  intro:
    `This website is operated by ${name}, a Swiss investment company based in Samedan, Graubünden. We help individuals and businesses invest with care, across investment opportunities, strategic investments and long-term value creation. ` +
    "By using this website you accept the following terms. Please read them, in particular the information on the nature of the content, on how we work with clients and on our investment perspective.",
  sections: [
    {
      id: "purpose",
      title: "About the content of this website",
      blocks: [
        {
          type: "p",
          text: `This website presents ${name}, its areas of expertise and the way we work with individuals and businesses, to inform you about our approach and services in general terms. Descriptions of sectors and services describe areas of focus; they do not describe specific investments, holdings, transactions or results.`,
        },
      ],
    },
    {
      id: "engagement",
      title: "Working with us",
      blocks: [
        {
          type: "p",
          text: `Our services are provided under a separate written agreement between you and ${name}, which we set up after we have discussed your objectives.`,
        },
        {
          type: "p",
          text: `At ${name}, we bring extensive experience to helping businesses identify and invest in industries that are well suited to their goals. We work closely with each client to understand their objectives, financial situation, and needs, and we tailor our guidance to those circumstances.`,
        },
      ],
    },
    {
      id: "perspective",
      title: "Our investment perspective",
      blocks: [
        {
          type: "p",
          text: `At ${name}, we bring extensive experience to helping businesses identify and invest in industries that are well suited to their goals. We combine disciplined analysis with a long-term perspective to support smarter investment decisions.`,
        },
      ],
    },
    {
      id: "regulatory",
      title: "Regulatory information",
      blocks: [
        {
          type: "p",
          text: "Information on this website is intended for use where its publication and availability are permitted under local law and regulation.",
        },
      ],
    },
    {
      id: "accuracy",
      title: "Information on this website",
      blocks: [
        {
          type: "p",
          text: `${name}, an investment company, compiles the information on this website with care and updates it from time to time. For guidance specific to your situation, please get in touch with us.`,
        },
      ],
    },
    {
      id: "ip",
      title: "Intellectual property and permitted use",
      blocks: [
        {
          type: "p",
          text: `All content on this website is protected by copyright and other rights. You may view and print pages for personal, non-commercial information. Any other reproduction, modification, distribution or commercial use requires the prior written consent of ${name}. Photographs are subject to the licences stated on the Image Credits page.`,
        },
      ],
    },
    {
      id: "links",
      title: "External links",
      blocks: [
        {
          type: "p",
          text: "Links to third-party websites are provided for convenience. Their content is managed by their respective owners.",
        },
      ],
    },
    {
      id: "availability",
      title: "Availability and changes",
      blocks: [
        {
          type: "p",
          text: "We may change, suspend or discontinue the website or any part of it, and amend these terms, at any time. The version published on this website applies.",
        },
      ],
    },
    {
      id: "law",
      title: "Applicable law and jurisdiction",
      blocks: [{ type: "p", text: "These terms are governed by Swiss law, excluding its conflict-of-law rules." }],
    },
  ],
};

export const legalDocuments = { "legal-notice": legalNotice, privacy: privacyPolicy, terms: termsOfUse };
