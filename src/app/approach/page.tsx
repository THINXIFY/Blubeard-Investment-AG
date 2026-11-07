import { ogImages } from "@/lib/seo";
import type { Metadata } from "next";
import { approachPage } from "@/content/approach";
import { site } from "@/lib/site";
import { ApproachHero } from "@/components/approach/ApproachHero";
import { ApproachPrinciples } from "@/components/approach/ApproachPrinciples";
import { ApproachProcess } from "@/components/approach/ApproachProcess";
import { ApproachRisk } from "@/components/approach/ApproachRisk";
import { ApproachClosing } from "@/components/approach/ApproachClosing";

const { title, description } = approachPage.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/approach" },
  openGraph: {
    images: ogImages,
    type: "website",
    url: "/approach",
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

function ApproachJsonLd() {
  const url = `${site.url}/approach`;
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
        keywords: approachPage.principles.items.map((p) => p.title).join(", "),
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

export default function ApproachPage() {
  return (
    <div>
      <ApproachHero />
      <ApproachPrinciples />
      <ApproachProcess />
      <ApproachRisk />
      <ApproachClosing />
      <ApproachJsonLd />
    </div>
  );
}
