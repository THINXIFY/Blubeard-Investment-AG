import Image from "next/image";
import Link from "next/link";
import { companyPositioning, legalNotice, legalUpdated, type LegalBlock } from "@/content/legal";
import { images } from "@/content/images";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Block } from "./LegalPage";
import { ImpressumCopy } from "./ImpressumCopy";
import { ImpressumNav } from "./ImpressumNav";

type FactRow = { label: string; value: string; href?: string };

const section = (id: string) => legalNotice.sections.find((s) => s.id === id)!;
const factsOf = (id: string) =>
  section(id).blocks.flatMap((b) => (b.type === "facts" ? (b.rows as readonly FactRow[]) : []));
const parasOf = (id: string) =>
  section(id).blocks.filter((b): b is Extract<LegalBlock, { type: "p" }> => b.type === "p");

/** Values visitors commonly need to paste elsewhere. */
const copyable = new Set(["Email", "UID", "Commercial register number"]);

const externalRefs = [
  {
    label: "UID register",
    note: "Federal Statistical Office",
    href: `https://www.uid.admin.ch/Detail.aspx?uid_id=${site.registry.uid.replace(/[-.]/g, "")}`,
  },
  { label: "Zefix", note: "Central business name index", href: "https://www.zefix.ch/en/search/entity/welcome" },
  { label: "Moneyhouse", note: "Company profile", href: site.registry.profileUrl },
];

const eyebrow = "flex items-center gap-3 text-[0.6875rem] font-semibold tracking-[0.2em] uppercase";
const pad = (n: number) => String(n).padStart(2, "0");

function ExtArrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={className}>
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** One fact as a tile inside a hairline grid. */
function FactTile({ row, wide }: { row: FactRow; wide?: boolean }) {
  return (
    <div
      className={`group/t relative bg-white px-5 py-5 transition-colors duration-500 hover:bg-porcelain sm:px-6 ${wide ? "sm:col-span-2" : ""}`}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-imperial transition-transform duration-700 ease-expo group-hover/t:scale-x-100 motion-reduce:transition-none"
      />
      <dt className="text-[0.6875rem] font-semibold tracking-[0.16em] text-slate uppercase">{row.label}</dt>
      <dd className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span className="font-display text-[1.0625rem] leading-snug font-semibold tracking-[-0.01em] break-words text-ink tabular-nums md:text-[1.125rem]">
          {row.href ? (
            <a
              href={row.href}
              className="text-imperial underline decoration-imperial/30 underline-offset-4 hover:decoration-imperial"
            >
              {row.value}
            </a>
          ) : (
            row.value
          )}
        </span>
        {copyable.has(row.label) ? <ImpressumCopy value={row.value} label={row.label} /> : null}
      </dd>
    </div>
  );
}

/**
 * Impressum (/legal-notice). Approved wording and verified facts from content/legal.ts, presented as:
 * hero with at-a-glance facts → corporate identity register → provisions (editorial two-column rows)
 * → Samedan registered office → further information. Section index: sticky sidebar (desktop) /
 * sticky chip bar (mobile).
 */
export function ImpressumPage() {
  const operator = factsOf("operator");
  const register = factsOf("register");
  const company = operator.find((r) => r.label === "Company")?.value ?? site.name;
  const form = operator.find((r) => r.label === "Legal form")?.value;
  const operatorRows = operator.filter((r) => !["Company", "Legal form"].includes(r.label));
  const provisions = legalNotice.sections.filter((s) => !["operator", "register"].includes(s.id));
  const toc = [
    { id: "identity", title: "Corporate identity" },
    ...provisions.map((s) => ({ id: s.id, title: s.title })),
    { id: "location", title: "Registered office" },
  ];
  const glance = [
    { label: "UID", value: site.registry.uid },
    { label: "Register no.", value: site.registry.registerNumber },
    { label: "Registered office", value: `${site.address.locality}, GR` },
  ];
  const hero = images.aboutCompany;
  const place = images.ctSamedan;
  const sectionOffset = "scroll-mt-14 lg:scroll-mt-0";

  return (
    <div>
      {/* 1 — Hero */}
      <section data-tone="light" aria-labelledby="legal-title" className="relative overflow-hidden bg-porcelain">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_0%_0%,rgb(18_72_216/0.06),transparent_70%)]"
        />
        <Container className="relative grid gap-10 pt-[calc(var(--header-h)+2rem)] pb-12 md:pb-14 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <div className="flex flex-col lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-sm text-slate">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="rounded-xs transition-colors hover:text-imperial">
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-line-strong">
                  /
                </li>
                <li aria-current="page" className="text-ink">
                  Impressum
                </li>
              </ol>
            </nav>
            <Reveal start="top bottom" stagger={0.1} className="mt-10 lg:mt-auto lg:pt-14">
              <p data-reveal-item className={`${eyebrow} text-slate`}>
                <span aria-hidden className="h-px w-8 bg-imperial" />
                Corporate &amp; Legal Information
              </p>
              <h1
                data-reveal-item
                id="legal-title"
                className="mt-5 font-display text-[clamp(3rem,2rem+3.6vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.05em] text-ink"
              >
                Impressum
              </h1>
              <p data-reveal-item className="mt-6 max-w-[44ch] text-lg leading-relaxed text-slate">
                Official company identification and legal information for {site.name}.
              </p>
              <dl data-reveal-item className="mt-10 grid grid-cols-1 border-y border-line-strong sm:grid-cols-3">
                {glance.map((g) => (
                  <div
                    key={g.label}
                    className="border-b border-line py-4 last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:[&+div]:border-l"
                  >
                    <dt className="text-[0.6875rem] font-semibold tracking-[0.16em] text-slate uppercase">{g.label}</dt>
                    <dd className="mt-1.5 font-display text-[1.0625rem] font-semibold text-ink tabular-nums">
                      {g.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p data-reveal-item className="mt-5 text-xs text-slate">
                Last updated <time dateTime={legalUpdated.iso}>{legalUpdated.label}</time>
              </p>
            </Reveal>
          </div>

          <figure className="relative lg:col-span-5">
            <ImageReveal
              className="aspect-[4/3] w-full rounded-md sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[30rem]"
              mode="zoom"
              drift={8}
            >
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder="blur"
                className="object-cover object-[50%_35%]"
              />
            </ImageReveal>
          </figure>
        </Container>
      </section>

      {/* 2 + 3 — Index, identity and provisions */}
      <section data-tone="light" className="bg-white pb-16 md:pb-20 lg:py-20">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <aside className="lg:col-span-3">
              <ImpressumNav items={toc} uid={site.registry.uid} email={site.email} />
            </aside>

            <div className="pt-10 lg:col-span-9 lg:pt-0">
              {/* Corporate identity */}
              <section id="identity" aria-labelledby="identity-title" className={sectionOffset}>
                <Reveal>
                  <div className="overflow-hidden rounded-md border border-line-strong">
                    <div className="flex flex-col gap-5 bg-porcelain px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                      <div className="flex items-center gap-5">
                        <Image
                          src="/media/branding/mark.png"
                          alt=""
                          width={160}
                          height={160}
                          unoptimized
                          className="size-14 shrink-0"
                        />
                        <div>
                          <h2
                            id="identity-title"
                            className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-tight font-semibold tracking-[-0.03em] text-ink"
                          >
                            {company}
                          </h2>
                          {form ? <p className="mt-0.5 text-[0.9375rem] text-slate">{form}</p> : null}
                        </div>
                      </div>
                      <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-imperial uppercase">
                        Corporate identity
                      </p>
                    </div>

                    <p className="border-t border-line-strong bg-white px-5 py-5 font-display text-[1.0625rem] leading-relaxed text-ink sm:px-7 md:text-[1.125rem]">
                      {companyPositioning}
                    </p>
                    <div className="border-t border-line-strong">
                      <p className={`${eyebrow} px-5 pt-5 text-imperial sm:px-7`}>
                        <span aria-hidden className="h-px w-6 bg-imperial" />
                        {section("operator").title}
                      </p>
                      <dl className="mt-4 grid gap-px border-t border-line bg-line sm:grid-cols-2">
                        {operatorRows.map((r) => (
                          <FactTile key={r.label} row={r} wide={r.label === "Email"} />
                        ))}
                      </dl>
                    </div>

                    <div className="border-t border-line-strong">
                      <p className={`${eyebrow} px-5 pt-5 text-imperial sm:px-7`}>
                        <span aria-hidden className="h-px w-6 bg-imperial" />
                        {section("register").title}
                      </p>
                      <dl className="mt-4 grid gap-px border-t border-line bg-line sm:grid-cols-2">
                        {register.map((r) => (
                          <FactTile key={r.label} row={r} />
                        ))}
                      </dl>
                    </div>

                    <div className="border-t border-line-strong bg-porcelain px-5 py-5 sm:px-7">
                      {parasOf("register").map((p) => (
                        <p key={p.text} className="text-[0.9375rem] leading-relaxed text-slate">
                          {p.text}
                        </p>
                      ))}
                      <ul className="mt-4 grid gap-2 sm:grid-cols-3 sm:gap-3">
                        {externalRefs.map((r) => (
                          <li key={r.href}>
                            <a
                              href={r.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/x flex min-h-12 items-center justify-between gap-3 rounded-sm border border-line bg-white px-4 py-2.5 transition-colors duration-300 hover:border-imperial/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial"
                            >
                              <span>
                                <span className="block text-sm font-semibold text-ink">{r.label}</span>
                                <span className="block text-xs text-slate">{r.note}</span>
                              </span>
                              <ExtArrow className="size-3.5 shrink-0 text-slate transition-[color,transform] duration-500 ease-expo group-hover/x:translate-x-0.5 group-hover/x:-translate-y-0.5 group-hover/x:text-imperial" />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Provisions — approved wording, editorial rows */}
              <div className="mt-14 md:mt-16">
                {provisions.map((s, i) => (
                  <section
                    key={s.id}
                    id={s.id}
                    aria-labelledby={`${s.id}-title`}
                    className={`group/p grid gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-8 md:py-10 ${sectionOffset}`}
                  >
                    <div className="md:col-span-4">
                      <span aria-hidden className="font-display text-sm font-medium text-imperial tabular-nums">
                        {pad(i + 1)}
                      </span>
                      <h2
                        id={`${s.id}-title`}
                        className="mt-2 font-display text-[1.375rem] leading-snug font-semibold tracking-[-0.02em] text-balance text-ink md:text-[1.5rem]"
                      >
                        {s.title}
                      </h2>
                      <span
                        aria-hidden
                        className="mt-4 block h-0.5 w-8 bg-imperial transition-[width] duration-700 ease-expo group-hover/p:w-16 motion-reduce:transition-none"
                      />
                    </div>
                    <div className="max-w-[40rem] space-y-4 text-[1rem] leading-[1.75] text-slate md:col-span-8 md:text-[1.0625rem]">
                      {s.blocks.map((b, bi) => (
                        <Block key={bi} block={b} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4 — Registered office */}
      <section
        id="location"
        data-tone="dark"
        aria-labelledby="location-title"
        className={`relative isolate overflow-hidden bg-obsidian text-white ${sectionOffset}`}
      >
        <figure className="relative h-[22rem] sm:h-[26rem] lg:h-[30rem]">
          <ImageReveal className="absolute inset-0" mode="zoom" drift={10}>
            <Image
              src={place.src}
              alt={place.alt}
              fill
              sizes="100vw"
              placeholder="blur"
              className="object-cover object-[50%_45%]"
            />
          </ImageReveal>
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-obsidian)_0%,rgb(16_19_32/0.35)_45%,transparent_75%)]"
          />
        </figure>
        <Container className="relative -mt-28 pb-14 sm:-mt-32 md:pb-16">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className={`${eyebrow} text-imperial-300`}>
                <span aria-hidden className="h-px w-6 bg-imperial-300" />
                Registered office
              </p>
              <h2
                id="location-title"
                className="mt-4 font-display text-[clamp(3rem,2rem+4vw,6rem)] leading-[0.9] font-medium tracking-[-0.055em]"
              >
                Samedan
              </h2>
              <p className="mt-4 text-[0.8125rem] font-medium tracking-[0.22em] text-platinum uppercase">
                Upper Engadin · Graubünden · Switzerland
              </p>
            </div>
            <address className="border-l border-white/15 pl-6 text-[0.9375rem] leading-relaxed text-platinum not-italic lg:col-span-4 lg:col-start-9">
              <span className="block font-display text-lg font-semibold text-white">{site.name}</span>
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.locality}
              <br />
              {site.address.country}
            </address>
          </Reveal>
        </Container>
      </section>

      {/* 5 — Further information */}
      <section data-tone="light" aria-labelledby="related-title" className="bg-white">
        <Container className="py-12 md:py-14">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2
              id="related-title"
              className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink lg:col-span-3"
            >
              Further information
            </h2>
            <ul className="grid border-t border-line-strong sm:grid-cols-3 lg:col-span-9">
              {[
                { href: "/contact", title: "Contact Blubeard", text: "Write to us or find our address" },
                { href: "/privacy", title: "Privacy Policy", text: "How personal data is processed" },
                { href: "/terms", title: "Terms of Use", text: "Conditions and important information" },
              ].map((l) => (
                <li key={l.href} className="border-b border-line sm:border-b-0 sm:[&+li]:border-l">
                  <Link
                    href={l.href}
                    className="group/r relative flex h-full items-end justify-between gap-6 py-6 outline-none focus-visible:bg-porcelain sm:px-6"
                  >
                    <span
                      aria-hidden
                      className="absolute -top-px left-0 h-0.5 w-0 bg-imperial transition-[width] duration-700 ease-expo group-hover/r:w-full group-focus-visible/r:w-full motion-reduce:transition-none"
                    />
                    <span>
                      <span className="block font-display text-[1.25rem] font-semibold tracking-[-0.02em] text-ink transition-colors duration-300 group-hover/r:text-imperial">
                        {l.title}
                      </span>
                      <span className="mt-1 block text-sm text-slate">{l.text}</span>
                    </span>
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      className="mb-1 size-4 shrink-0 text-slate transition-[color,transform] duration-500 ease-expo group-hover/r:translate-x-1 group-hover/r:text-imperial"
                    >
                      <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
}
