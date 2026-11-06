import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  /** Hide the contact CTA (e.g. on the contact page itself). */
  showContact?: boolean;
};

/** Metadata for routes that exist for navigation but have no content yet. */
export function placeholderMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    robots: { index: false, follow: true },
  };
}

/**
 * Interior page header used until each page is designed in a later milestone.
 * Keeps navigation functional without publishing unverified content.
 */
export function PlaceholderPage({ eyebrow, title, lead, showContact = true }: PlaceholderPageProps) {
  return (
    <section data-tone="light" className="relative bg-white" aria-labelledby="page-title">
      <Container className="flex min-h-[70svh] flex-col justify-end pt-[calc(var(--header-h)+5rem)] pb-20 md:pb-28">
        <Reveal stagger className="flex flex-col gap-8">
          <div data-reveal-item>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 data-reveal-item id="page-title" className="max-w-[18ch] text-display">
            {title}
          </h1>
          <p data-reveal-item className="max-w-[46ch] text-lead text-slate">
            {lead}
          </p>
          <div
            data-reveal-item
            className="mt-4 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="flex items-center gap-3 text-sm text-slate">
              <span className="inline-flex items-center gap-2 rounded-full border border-imperial/30 bg-imperial-50 px-3 py-1 text-xs font-medium text-imperial">
                <span aria-hidden className="size-1.5 rounded-full bg-imperial" />
                Page in development
              </span>
              Full content for this page will be published shortly.
            </p>
            {showContact ? (
              <Button href="/contact" variant="secondary" arrow>
                Contact us
              </Button>
            ) : (
              <Button href="/" variant="secondary" arrow>
                Back to home
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
