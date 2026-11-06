import Link from "next/link";
import { legalNav, mainNav, partnersNav, site, type NavItem } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { BackToTop, CopyEmail } from "./FooterActions";
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
  "group/l inline-flex items-center gap-2 py-1 text-[0.9375rem] text-platinum transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none";

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
 * Depth comes from a faint light falloff, a hairline horizon with an Imperial highlight and
 * three architectural column rules in the upper band — static, so nothing distracts.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const { address } = site;
  const [local, domain] = site.email.split("@");

  return (
    <footer id="site-footer" data-tone="dark" className="relative isolate overflow-hidden bg-obsidian text-white">
      {/* Depth: soft light from the upper left and a lit hairline horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_12%_0%,rgb(18_72_216/0.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10">
        <span className="absolute inset-y-0 left-[8%] w-[28%] bg-[linear-gradient(90deg,transparent,rgb(138_166_239/0.7),transparent)]" />
      </div>

      <Container className="relative">
        {/* Architectural column rules, fading downward */}
        <div aria-hidden className="pointer-events-none absolute inset-x-12 inset-y-0 hidden lg:block">
          <span className="absolute inset-y-0 left-[50%] w-px bg-[linear-gradient(to_bottom,rgb(255_255_255/0.07),transparent_70%)]" />
          <span className="absolute inset-y-0 left-[66.666%] w-px bg-[linear-gradient(to_bottom,rgb(255_255_255/0.04),transparent_55%)]" />
          <span className="absolute inset-y-0 left-[83.333%] w-px bg-[linear-gradient(to_bottom,rgb(255_255_255/0.04),transparent_45%)]" />
        </div>

        {/* 1 — Statement & correspondence */}
        <div className="grid gap-12 pt-16 pb-14 md:pt-20 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pt-24 lg:pb-16">
          <Reveal className="lg:col-span-7">
            <p className={`${label} flex items-center gap-3 text-platinum`}>
              <span aria-hidden className="h-px w-8 bg-imperial-300" />
              {site.name}
            </p>
            <p className="mt-6 font-display text-[clamp(2.25rem,1.35rem+3vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.042em] text-balance">
              A Perspective <span className="text-platinum">Beyond Today.</span>
            </p>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
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
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pl-10" delay={0.12}>
            <div className="border-t border-white/12 pt-6 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-8">
              <p className={label}>Correspondence</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 font-display text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] leading-tight font-medium tracking-[-0.025em] break-words text-white transition-[background-size] duration-700 ease-expo hover:bg-[length:100%_1px] focus-visible:bg-[length:100%_1px] focus-visible:outline-none"
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
                  className="group/w inline-flex h-9 items-center gap-2 px-1 text-xs font-medium tracking-[0.04em] text-platinum transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none"
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
          </Reveal>
        </div>

        {/* 2 — Headquarters & link groups */}
        <Reveal
          stagger={0.07}
          className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 py-12 sm:grid-cols-3 lg:grid-cols-12 lg:gap-8 lg:py-14"
        >
          <div data-reveal-item className="col-span-2 sm:col-span-3 lg:col-span-6">
            <p className={label}>Headquarters</p>
            <address className="mt-4 not-italic">
              <span className="block font-display text-lg font-semibold tracking-[-0.015em] text-white">
                {site.name}
              </span>
              <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-platinum">
                {address.street}, {address.postalCode} {address.locality}
                <br />
                {address.region}, {address.country}
              </span>
            </address>
          </div>
          {groups.map((g, i) => (
            <nav
              key={g.title}
              data-reveal-item
              aria-label={g.title === "Legal" ? "Legal" : `Footer — ${g.title}`}
              className={i === 0 ? "lg:col-span-2 lg:col-start-7" : "lg:col-span-2"}
            >
              <p className={label}>{g.title}</p>
              <ul className="mt-3">
                {g.links.map((item) => (
                  <li key={item.href}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </Reveal>

        {/* 3 — Signature base */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Logo tone="dark" imageClassName="xl:h-9" />
            <p className="text-sm text-mist">
              <span className="text-platinum">{site.name}</span>
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
