import type { Metadata } from "next";
import { contactPage } from "@/content/contact";
import { site } from "@/lib/site";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactDirect } from "@/components/contact/ContactDirect";
import { ContactHeadquarters } from "@/components/contact/ContactHeadquarters";
import { ContactClocks } from "@/components/contact/ContactClocks";
import { ContactCorporate } from "@/components/contact/ContactCorporate";
import { ContactClosing } from "@/components/contact/ContactClosing";

const { title, description } = contactPage.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    siteName: site.name,
    locale: site.locale,
    title: `${title} — ${site.name}`,
    description,
  },
  twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description },
};

/** ContactPage + breadcrumb; organisation facts reference the site-wide Organization node. */
function ContactJsonLd() {
  const url = `${site.url}/contact`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url,
        name: `${title} — ${site.name}`,
        description,
        inLanguage: "en",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
        mainEntity: {
          "@type": "Organization",
          "@id": `${site.url}/#organization`,
          name: site.name,
          email: site.email,
          contactPoint: { "@type": "ContactPoint", contactType: "general enquiries", email: site.email },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function ContactPage() {
  return (
    <div>
      <ContactHero />
      <ContactDirect />
      <ContactHeadquarters />
      <ContactClocks />
      <ContactCorporate />
      <ContactClosing />
      <ContactJsonLd />
    </div>
  );
}
