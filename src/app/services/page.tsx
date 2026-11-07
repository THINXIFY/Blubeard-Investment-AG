import type { Metadata } from "next";
import { serviceEntries, servicesPage } from "@/content/services";
import { site } from "@/lib/site";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesIntro } from "@/components/services/ServicesIntro";
import { ServicesGallery } from "@/components/services/ServicesGallery";
import { ServicesPhilosophy } from "@/components/services/ServicesPhilosophy";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ServicesClosing } from "@/components/services/ServicesClosing";

const { title, description } = servicesPage.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    siteName: site.name,
    locale: site.locale,
    title: `${title} — ${site.name}`,
    description,
  },
  twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description },
};

/** WebPage + list of areas of expertise + breadcrumb. Informational descriptions only (no offers). */
function ServicesJsonLd() {
  const url = `${site.url}/services`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${title} — ${site.name}`,
        description,
        inLanguage: "en",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          name: "Areas of expertise",
          numberOfItems: serviceEntries.length,
          itemListElement: serviceEntries.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            description: s.text,
          })),
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

export default function ServicesPage() {
  return (
    <div>
      <ServicesHero />
      <ServicesIntro />
      <ServicesGallery />
      <ServicesPhilosophy />
      <ServicesProcess />
      <ServicesFaq />
      <ServicesClosing />
      <ServicesJsonLd />
    </div>
  );
}
