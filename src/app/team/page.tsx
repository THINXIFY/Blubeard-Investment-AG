import type { Metadata } from "next";
import { teamPage } from "@/content/team";
import { site } from "@/lib/site";
import { TeamHero } from "@/components/team/TeamHero";
import { TeamCeo } from "@/components/team/TeamCeo";
import { TeamManagement } from "@/components/team/TeamManagement";
import { TeamPhilosophy } from "@/components/team/TeamPhilosophy";
import { TeamClosing } from "@/components/team/TeamClosing";

const { title, description } = teamPage.meta;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/team" },
  openGraph: {
    type: "website",
    url: "/team",
    siteName: site.name,
    locale: site.locale,
    title: `${title} — ${site.name}`,
    description,
  },
  twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description },
};

/** AboutPage-style WebPage + breadcrumb. People are listed by name and title only. */
function TeamJsonLd() {
  const url = `${site.url}/team`;
  const people = [teamPage.ceo, ...teamPage.management.people];
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
          name: "Our Team",
          itemListElement: people.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Person",
              name: p.name,
              jobTitle: p.role,
              worksFor: { "@id": `${site.url}/#organization` },
            },
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

export default function TeamPage() {
  return (
    <div>
      <TeamHero />
      <TeamCeo />
      <TeamManagement />
      <TeamPhilosophy />
      <TeamClosing />
      <TeamJsonLd />
    </div>
  );
}
