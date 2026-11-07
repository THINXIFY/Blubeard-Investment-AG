import { site } from "@/lib/site";
import { fittedTitle, socialMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedSectorSlugs, sectorPages } from "@/content/sectors";
import { SectorTemplate } from "@/components/sector/SectorTemplate";

/** Only published sectors are generated; every other slug returns 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedSectorSlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = sectorPages[slug];
  if (!data) return {};
  const path = `/investments/${slug}`;
  const title = fittedTitle(data.meta.title);
  return {
    title: { absolute: title },
    description: data.meta.description,
    alternates: { canonical: path },
    ...socialMetadata({ path, title, description: data.meta.description }),
  };
}

export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const data = sectorPages[slug];
  if (!data) notFound();

  const url = `${site.url}/investments/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${data.meta.title} — ${site.name}`,
        description: data.meta.description,
        inLanguage: "en",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
        keywords: data.focus.items.map((i) => i.title).join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Investments", item: `${site.url}/investments` },
          { "@type": "ListItem", position: 3, name: data.name, item: url },
        ],
      },
    ],
  };

  return (
    <div>
      <SectorTemplate data={data} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
