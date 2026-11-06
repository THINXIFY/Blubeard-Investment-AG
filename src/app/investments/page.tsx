import type { Metadata } from "next";
import { investmentsPage, sectors } from "@/content/investments";
import { site } from "@/lib/site";
import { InvestmentsHero } from "@/components/investments/InvestmentsHero";
import { InvestmentsIntro } from "@/components/investments/InvestmentsIntro";
import { SectorDirectory } from "@/components/investments/SectorDirectory";
import { InvestmentsPhilosophy } from "@/components/investments/InvestmentsPhilosophy";
import { InvestmentsDuality } from "@/components/investments/InvestmentsDuality";
import { InvestmentsClosing } from "@/components/investments/InvestmentsClosing";

const { title, description } = investmentsPage.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/investments" },
  openGraph: {
    type: "website",
    url: "/investments",
    siteName: site.name,
    locale: site.locale,
    title: `${title} — ${site.name}`,
    description,
  },
  twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description },
};

/** CollectionPage + sector list + breadcrumb. Sectors are areas of interest, not holdings. */
function InvestmentsJsonLd() {
  const url = `${site.url}/investments`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: `${title} — ${site.name}`,
        description,
        inLanguage: "en",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          name: "Investment sectors",
          numberOfItems: sectors.length,
          itemListElement: sectors.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            description: s.description,
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

export default function InvestmentsPage() {
  return (
    <div>
      <InvestmentsHero />
      <InvestmentsIntro />
      <SectorDirectory />
      <InvestmentsPhilosophy />
      <InvestmentsDuality />
      <InvestmentsClosing />
      <InvestmentsJsonLd />
    </div>
  );
}
