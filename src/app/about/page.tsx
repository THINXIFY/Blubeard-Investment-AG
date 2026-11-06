import type { Metadata } from "next";
import { aboutPage } from "@/content/about";
import { site } from "@/lib/site";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutPerspective } from "@/components/about/AboutPerspective";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { AboutFoundations } from "@/components/about/AboutFoundations";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AboutClosing } from "@/components/about/AboutClosing";

const title = aboutPage.meta.title;
const description = aboutPage.meta.description;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    siteName: site.name,
    locale: site.locale,
    title: `${title} — ${site.name}`,
    description,
  },
  twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description },
};

/** AboutPage + breadcrumb structured data — facts only, no claims beyond the visible page. */
function AboutJsonLd() {
  const url = `${site.url}/about`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
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

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutIntro />
      <AboutValues />
      <AboutPerspective />
      <AboutPhilosophy />
      <AboutFoundations />
      <AboutLeadership />
      <AboutClosing />
      <AboutJsonLd />
    </div>
  );
}
