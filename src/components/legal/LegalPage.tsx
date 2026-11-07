import { socialMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { legalUpdated, type LegalBlock, type LegalDocument } from "@/content/legal";
import { legalNav, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { LegalTocDesktop, LegalTocMobile } from "./LegalToc";

/** Unique title/description and a self-referencing canonical. */
export function legalMetadata(doc: LegalDocument): Metadata {
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/${doc.slug}` },
    robots: { index: true, follow: true },
    ...socialMetadata({ path: `/${doc.slug}`, title: `${doc.title} — ${site.name}`, description: doc.description }),
  };
}

const textLink =
  "text-imperial underline decoration-imperial/30 underline-offset-4 transition-colors hover:decoration-imperial";

export function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="relative pl-5">
              <span aria-hidden className="absolute top-[0.72em] left-0 h-px w-2.5 bg-imperial" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "facts":
      return (
        <dl className="grid overflow-hidden rounded-md border border-line bg-porcelain/60 sm:grid-cols-2">
          {block.rows.map((row) => (
            <div
              key={row.label}
              className="border-b border-line px-5 py-4 last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0"
            >
              <dt className="text-[0.6875rem] font-semibold tracking-[0.14em] text-slate uppercase">{row.label}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-snug font-medium break-words text-ink">
                {row.href ? (
                  <a href={row.href} className={textLink}>
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

/**
 * Shared layout for the legal documents: compact editorial header, sticky contents with active-section
 * highlighting on desktop, an expandable "On this page" on smaller screens, and a comfortable
 * reading column for the approved text.
 */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  const toc = doc.sections.map((s) => ({ id: s.id, title: s.title }));
  const others = legalNav.filter((n) => n.href !== `/${doc.slug}`);

  return (
    <div>
      <section data-tone="light" aria-labelledby="legal-title" className="border-b border-line bg-porcelain">
        <Container className="pt-[calc(var(--header-h)+2.5rem)] pb-10 md:pb-12">
          <nav aria-label="Breadcrumb" className="text-sm text-slate">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="rounded-xs transition-colors hover:text-imperial focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-line-strong">
                /
              </li>
              <li aria-current="page" className="text-ink">
                {doc.title}
              </li>
            </ol>
          </nav>
          <div className="mt-8 max-w-[48rem]">
            <p className="flex items-center gap-3 text-eyebrow text-slate">
              <span aria-hidden className="h-px w-8 bg-imperial" />
              {doc.eyebrow}
            </p>
            <h1
              id="legal-title"
              className="mt-4 font-display text-[clamp(2rem,1.55rem+1.6vw,3rem)] leading-[1.08] font-medium tracking-[-0.035em] text-balance text-ink"
            >
              {doc.title}
            </h1>
            <p className="mt-4 max-w-[60ch] text-[1.0625rem] leading-relaxed text-slate">{doc.intro}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate">
              <span>
                Last updated <time dateTime={legalUpdated.iso}>{legalUpdated.label}</time>
              </span>
              <span aria-hidden className="h-3 w-px bg-line-strong" />
              <span>{site.name}</span>
            </p>
          </div>
        </Container>
      </section>

      <section data-tone="light" className="bg-white py-10 md:py-14 lg:py-16">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-10">
            <aside className="hidden lg:col-span-3 lg:block">
              <LegalTocDesktop items={toc} />
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              <div className="mb-8 lg:hidden">
                <LegalTocMobile items={toc} />
              </div>

              <article className="max-w-[44rem] text-[1rem] leading-[1.75] text-slate md:text-[1.0625rem]">
                {doc.sections.map((s) => (
                  <section
                    key={s.id}
                    id={s.id}
                    aria-labelledby={`${s.id}-title`}
                    className="border-t border-line py-8 first:border-t-0 first:pt-0 md:py-10"
                  >
                    <h2
                      id={`${s.id}-title`}
                      className="font-display text-[1.3125rem] leading-snug font-semibold tracking-[-0.02em] text-balance text-ink md:text-[1.5rem]"
                    >
                      {s.title}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {s.blocks.map((b, bi) => (
                        <Block key={bi} block={b} />
                      ))}
                    </div>
                  </section>
                ))}
              </article>

              <div className="mt-4 flex max-w-[44rem] flex-col gap-4 border-t border-line pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-slate">
                  Questions:{" "}
                  <a href={`mailto:${site.email}`} className={textLink}>
                    {site.email}
                  </a>
                </p>
                <ul className="flex flex-wrap gap-x-5 gap-y-1">
                  {others.map((n) => (
                    <li key={n.href}>
                      <Link href={n.href} className="text-ink underline-offset-4 hover:text-imperial hover:underline">
                        {n.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
