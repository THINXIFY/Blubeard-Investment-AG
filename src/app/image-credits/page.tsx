import type { Metadata } from "next";
import { imageList } from "@/content/images";
import { socialMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Image Credits",
  description: "Photography credits and licences for images used on the Blubeard Investment AG website.",
  alternates: { canonical: "/image-credits" },
  ...socialMetadata({
    path: "/image-credits",
    title: `Image Credits — ${site.name}`,
    description: "Photography credits and licences for images used on the Blubeard Investment AG website.",
  }),
  robots: { index: true, follow: true },
};

/** Attribution for openly licensed photography (required by CC BY / CC BY-SA). */
export default function ImageCreditsPage() {
  return (
    <section className="bg-white" aria-labelledby="credits-title">
      <Container className="pt-[calc(var(--header-h)+5rem)] pb-24 md:pb-32">
        <Eyebrow>Legal</Eyebrow>
        <h1 id="credits-title" className="mt-8 text-display">
          Image Credits
        </h1>
        <p className="mt-8 max-w-[60ch] text-lead text-slate">
          Photographs on this website are used under the licences listed below. Images may be cropped, resized or
          retouched for display. They are illustrative only: unless stated otherwise, they do not depict the offices,
          staff, holdings, partners or performance of Blubeard Investment AG, and they imply no affiliation with or
          endorsement by any person, business or institution shown.
        </p>

        <ol className="mt-16 border-t border-line">
          {imageList.map(({ key, alt, usage, credit }) => (
            <li key={key} className="grid gap-3 border-b border-line py-6 md:grid-cols-12 md:gap-8">
              <p className="text-sm font-medium text-imperial md:col-span-3">{usage}</p>
              <div className="md:col-span-9">
                <p className="font-medium text-ink">
                  {credit.sourceUrl ? (
                    <a href={credit.sourceUrl} className="link-underline" rel="noopener noreferrer" target="_blank">
                      {credit.title}
                    </a>
                  ) : (
                    credit.title
                  )}
                </p>
                <p className="mt-1 text-sm text-slate">
                  {credit.creator ? <>By {credit.creator} · </> : null}
                  {credit.licenseUrl ? (
                    <a
                      href={credit.licenseUrl}
                      className="link-underline"
                      rel="noopener noreferrer license"
                      target="_blank"
                    >
                      {credit.license}
                    </a>
                  ) : (
                    credit.license
                  )}
                  {credit.modified ? " · cropped and resized" : null}
                </p>
                <p className="sr-only">Shows: {alt}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
