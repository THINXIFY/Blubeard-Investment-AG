import { ogImages } from "@/lib/seo";
import type { Metadata } from "next";
import { partnersPage, partnersPublished } from "@/content/partners";
import { site } from "@/lib/site";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { PartnersLogos } from "@/components/partners/PartnersLogos";
import { PartnersPhilosophy } from "@/components/partners/PartnersPhilosophy";
import { PartnersPrinciples } from "@/components/partners/PartnersPrinciples";
import { PartnersClosing } from "@/components/partners/PartnersClosing";

const { title, description } = partnersPage.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/partners" },
  // Internal review only until verified partners and approved logos exist (see content/partners.ts).
  robots: partnersPublished ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    images: ogImages,
    type: "website",
    url: "/partners",
    siteName: site.name,
    locale: site.locale,
    title: `${title} — ${site.name}`,
    description,
  },
  twitter: {
    images: ogImages,
    card: "summary_large_image",
    title: `${title} — ${site.name}`,
    description,
  },
};

/** WebPage + breadcrumb only: no partner organisations are asserted in structured data. */
function PartnersJsonLd() {
  const url = `${site.url}/partners`;
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

export default function PartnersPage() {
  return (
    <div>
      <PartnersHero />
      <PartnersLogos />
      <PartnersPhilosophy />
      <PartnersPrinciples />
      <PartnersClosing />
      <PartnersJsonLd />
    </div>
  );
}
