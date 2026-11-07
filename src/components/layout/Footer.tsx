import Link from "next/link";
import { legalNav, mainNav, partnersNav, site, type NavItem } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { BackToTop, CopyEmail } from "./FooterActions";
import { FooterLaser } from "./FooterLaser";
import { Logo } from "./Logo";

const byHref = (href: string) => mainNav.find((i) => i.href === href) as NavItem;

/** The main routes, Our Partners and the legal pages, grouped editorially. */
const groups: { title: string; links: NavItem[] }[] = [
  {
    title: "Company",
    links: [byHref("/about"), byHref("/approach"), byHref("/team"), partnersNav, byHref("/contact")],
  },
  { title: "Explore", links: ["/", "/investments", "/services"].map(byHref) },
  { title: "Legal", links: [...legalNav] },
];

const linkClass =
  "group/l inline-flex items-center gap-2 py-2.5 text-[0.9375rem] sm:py-1 text-platinum transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial-300";

function FooterLink({ item }: { item: NavItem }) {
  return (
    <Link href={item.href} className={linkClass}>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-expo group-hover/l:bg-[length:100%_1px] group-focus-visible/l:bg-[length:100%_1px]">
        {item.label}
      </span>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="size-3 -translate-x-1 text-imperial-300 opacity-0 transition-[opacity,transform] duration-500 ease-expo group-hover/l:translate-x-0 group-hover/l:opacity-100 group-focus-visible/l:translate-x-0 group-focus-visible/l:opacity-100"
      >
        <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </Link>
  );
}

const label = "text-[0.6875rem] font-medium tracking-[0.22em] text-mist uppercase";

/**
 * Shared footer — three bands on Obsidian:
 * 1. Statement and correspondence (headline + CTA left; email, copy and write action right).
 * 2. Headquarters beside three compact link groups: Company, Explore, Legal.
 * 3. Signature base: monogram and name, copyright, Back to top.
 * Rendered entirely on the server with no scroll animation. The footer stays mounted across page changes, so
 * scroll triggers created here would keep positions from the first page and could leave it hidden on shorter pages.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const { address } = site;
  const [local, domain] = site.email.split("@");

  return (
    <footer id="site-footer" data-tone="dark" className="relative isolate overflow-hidden bg-obsidian text-white">
      <FooterLaser />
      {/* Depth: soft light from the upper left and a lit hairline horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_12%_0%,rgb(18_72_216/0.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10">
        <span className="absolute inset-y-0 left-[8%] w-[28%] bg-[linear-gradient(90deg,transparent,rgb(138_166_239/0.7),transparent)]" />
      </div>

      <Container className="relative">
        {/* 1 — Statement & correspondence */}
        <div className="grid gap-9 pt-12 pb-10 md:pt-14 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pt-16 lg:pb-12">
          <div className="lg:col-span-7">
            <p className={`${label} flex items-center gap-3 text-platinum`}>
              <span aria-hidden className="h-px w-8 bg-imperial-300" />
              {site.name}
            </p>
            <p className="mt-5 font-display text-[clamp(2rem,1.45rem+2vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.042em] text-balance">
              A Perspective <span className="text-platinum">Beyond Today.</span>
            </p>
            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
              <Link
                href="/contact"
                className="group/c relative isolate inline-flex h-[3.25rem] items-center gap-4 self-start overflow-hidden rounded-full bg-white pr-1.5 pl-6 text-[0.9375rem] font-medium text-obsidian transition-colors duration-500 outline-none before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-imperial before:transition-transform before:duration-700 before:ease-expo hover:text-white hover:before:scale-x-100 focus-visible:ring-2 focus-visible:ring-imperial-300 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian sm:self-auto"
              >
                Connect With Blubeard
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-full bg-obsidian text-white transition-colors duration-500 group-hover/c:bg-white group-hover/c:text-imperial"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3.5 transition-transform duration-500 ease-expo group-hover/c:translate-x-0.5"
                  >
                    <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </Link>
              <p className="max-w-[28ch] text-[0.9375rem] leading-relaxed text-platinum">
                Meaningful opportunities begin with a conversation.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="border-t border-white/12 pt-6 lg:border-t-0 lg:pt-0">
              <p className={label}>Correspondence</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 inline-block bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat py-3 pb-1 font-display text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] leading-tight font-medium tracking-[-0.025em] break-words text-white transition-[background-size] duration-700 ease-expo hover:bg-[length:100%_1px] focus-visible:bg-[length:100%_1px] focus-visible:outline-none sm:mt-3 sm:py-0"
              >
                {local}
                <span className="text-imperial-300">@</span>
                <wbr />
                {domain}
              </a>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <CopyEmail email={site.email} />
                <a
                  href={`mailto:${site.email}`}
                  className="group/w inline-flex h-11 items-center gap-2 px-1 text-xs font-medium tracking-[0.04em] text-platinum transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none sm:h-9"
                >
                  Write to us
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-expo group-hover/w:translate-x-0.5 group-hover/w:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2 — Headquarters & link groups */}
        <div className="grid gap-8 border-t border-white/10 py-9 lg:grid-cols-12 lg:gap-8 lg:py-10">
          <div className="lg:col-span-7">
            <p className={label}>Headquarters</p>
            <address className="mt-3 not-italic">
              <span className="block font-display text-lg font-semibold tracking-[-0.015em] text-white">
                {site.name}
              </span>
              <span className="mt-1 block text-[0.9375rem] leading-relaxed text-platinum">
                {address.street}, {address.postalCode} {address.locality}
                <br />
                {address.region}, {address.country}
              </span>
            </address>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:col-span-5 lg:col-start-8">
            {groups.map((g) => (
              <nav
                key={g.title}
                aria-label={g.title === "Legal" ? "Legal" : `Footer — ${g.title}`}
                className={g.title === "Legal" ? "col-span-2 sm:col-span-1" : undefined}
              >
                <p className={label}>{g.title}</p>
                <ul className={g.title === "Legal" ? "mt-2.5 grid grid-cols-2 gap-x-6 sm:grid-cols-1" : "mt-2.5"}>
                  {g.links.map((item) => (
                    <li key={item.href}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* 3 — Signature base */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Logo tone="dark" imageClassName="xl:h-9" className="py-1 sm:py-0" />
            <p className="text-sm text-white">
              <span>{site.name}</span>
              <span aria-hidden className="mx-2.5 text-white/20">
                |
              </span>
              © {year} All rights reserved.
            </p>
          </div>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
