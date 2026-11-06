import { hero, industries, services } from "@/content/home";
import { site } from "@/lib/site";

/**
 * Homepage structured data (WebSite + WebPage + organisation topics).
 * Uses only approved copy — no figures, ratings, people or claims beyond the visible page.
 */
export function HomeJsonLd() {
  const orgId = `${site.url}/#organization`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: `${site.name} — ${site.tagline}`,
        description: hero.description,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "Organization",
        "@id": orgId,
        knowsAbout: [...industries.map((i) => i.title), ...services.items.map((s) => s.title)],
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
