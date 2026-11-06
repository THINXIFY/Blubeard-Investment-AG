import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedServiceSlugs, servicePages } from "@/content/service-pages";
import { site } from "@/lib/site";
import { ServicePageTemplate } from "@/components/service-page/ServicePageTemplate";

/** Only published service pages are generated; every other slug returns 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedServiceSlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = servicePages[slug];
  if (!data) return {};
  const path = `/services/${slug}`;
  const fullTitle = `${data.meta.title} — ${site.name}`;
  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description: data.meta.description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: data.meta.description },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = servicePages[slug];
  if (!data) notFound();

  const url = `${site.url}/services/${slug}`;
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
        keywords: data.capabilities.items.map((i) => i.title).join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
          { "@type": "ListItem", position: 3, name: data.name, item: url },
        ],
      },
    ],
  };

  return (
    <div>
      <ServicePageTemplate data={data} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
