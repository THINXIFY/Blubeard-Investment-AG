import type { Metadata } from "next";
import { site } from "@/lib/site";

/** Google shows roughly this many characters of a title before cutting it off. */
const TITLE_MAX = 60;

/** The branded share image (app/opengraph-image.tsx), for pages that set their own Open Graph details. */
export const ogImages = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }];

/**
 * A page title that fits in search results: "Title — Blubeard Investment AG" where it fits, otherwise without a
 * trailing "Investments", otherwise with the short brand. Returned as an absolute title so the layout template is not
 * applied a second time.
 */
export function fittedTitle(title: string): string {
  const candidates = [
    `${title} — ${site.name}`,
    `${title.replace(/ Investments$/, "")} — ${site.name}`,
    `${title} — Blubeard`,
  ];
  return candidates.find((t) => t.length <= TITLE_MAX) ?? candidates[2];
}

/** Complete Open Graph and Twitter details for a page, so nothing falls back to the homepage's. */
export function socialMetadata({ path, title, description }: { path: string; title: string; description: string }) {
  return {
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      locale: site.locale,
      title,
      description,
      images: ogImages,
    },
    twitter: { card: "summary_large_image", title, description, images: ogImages },
  } satisfies Metadata;
}
