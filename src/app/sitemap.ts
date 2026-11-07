import type { MetadataRoute } from "next";
import { mainNav, partnersNav, site } from "@/lib/site";
import { partnersPublished } from "@/content/partners";
import { publishedSectorSlugs } from "@/content/sectors";
import { publishedServiceSlugs } from "@/content/service-pages";

/** Only routes flagged `ready` (and published sector and service pages) are listed; placeholders stay out. /partners joins once verified partners exist. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = mainNav
    .filter((item) => item.ready && (item.href !== partnersNav.href || partnersPublished))
    .map((item) => ({
      url: `${site.url}${item.href === "/" ? "" : item.href}`,
      changeFrequency: "monthly",
      priority: item.href === "/" ? 1 : 0.7,
    }));
  const sectors: MetadataRoute.Sitemap = publishedSectorSlugs.map((slug) => ({
    url: `${site.url}/investments/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  const servicePages: MetadataRoute.Sitemap = publishedServiceSlugs.map((slug) => ({
    url: `${site.url}/services/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  // Legal pages (client-approved for publication): Impressum, Privacy Policy, Terms of Use, Image Credits.
  const legal: MetadataRoute.Sitemap = ["/legal-notice", "/privacy", "/terms", "/image-credits"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "yearly",
    priority: 0.3,
  }));
  return [...pages, ...sectors, ...servicePages, ...legal];
}
