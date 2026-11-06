"use client";

import Link from "next/link";
import { useState, type Ref } from "react";
import { cn } from "@/lib/cn";
import { isActivePath, mainNav, site } from "@/lib/site";
import { investmentsMenu, menuFor, servicesMenu, type MenuId } from "./navMenus";

type MobileMenuProps = {
  ref?: Ref<HTMLDivElement>;
  open: boolean;
  pathname: string;
  onNavigate: () => void;
  address: typeof site.address;
};

const subLink =
  "block rounded-lg py-2 pr-2 pl-3 text-[0.9375rem] text-white/75 transition-colors duration-300 hover:bg-white/[0.05] hover:text-white focus-visible:bg-white/[0.06] focus-visible:text-white focus-visible:outline-none aria-[current=page]:text-white";

/** Expandable sub-navigation for Investments (grouped) and Services. */
function SubMenu({ id, pathname, onNavigate }: { id: MenuId; pathname: string; onNavigate: () => void }) {
  const cta = id === "investments" ? investmentsMenu.cta : servicesMenu.cta;
  return (
    <div className="pb-5 pl-6">
      {id === "investments" ? (
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-8">
          {investmentsMenu.groups.map((g) => (
            <div key={g.label}>
              <p className="pl-3 text-[0.6875rem] font-semibold tracking-[0.18em] text-imperial-300 uppercase">
                {g.label}
              </p>
              <ul className="mt-1.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onNavigate}
                      aria-current={pathname === l.href ? "page" : undefined}
                      className={subLink}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="grid sm:grid-cols-2 sm:gap-x-8">
          {servicesMenu.links.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={onNavigate}
                aria-current={pathname === l.href ? "page" : undefined}
                className={cn(subLink, "flex gap-3")}
              >
                <span aria-hidden className="w-5 pt-0.5 text-xs text-imperial-300 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link
        href={cta.href}
        onClick={onNavigate}
        className="mt-4 ml-3 inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial-300"
      >
        {cta.label}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

/**
 * Full-screen Obsidian navigation panel for < lg viewports, opening beneath the floating capsule.
 * Investments and Services expand in place to list every sector and service (single-open accordion).
 * Closed state uses `inert` + visibility so links are neither focusable nor announced.
 */
export function MobileMenu({ ref, open, pathname, onNavigate, address }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<MenuId | null>(null);

  return (
    <div
      ref={ref}
      id="mobile-menu"
      inert={!open}
      className={cn(
        "fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-obsidian pt-[calc(var(--header-h)+1rem)] text-white lg:hidden",
        "transition-[opacity,visibility,clip-path] duration-700 ease-expo motion-reduce:transition-none",
        open
          ? "visible opacity-100 [clip-path:inset(0_0_0_0_round_0)]"
          : "invisible opacity-0 [clip-path:inset(0_0_100%_0_round_0)]",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_85%_0%,rgb(18_72_216/0.28),transparent_70%)]"
      />

      <nav aria-label="Main" className="relative flex-1 px-5 pt-4 pb-8 sm:px-8 sm:pt-8">
        <p className="text-[0.6875rem] font-medium tracking-[0.22em] text-mist uppercase">Navigation</p>
        <ul className="mt-4 border-t border-white/10">
          {mainNav
            .filter((item) => item.href !== "/contact")
            .map((item, i) => {
              const active = isActivePath(pathname, item.href);
              const menu = menuFor(item.href);
              const isOpen = menu !== null && expanded === menu;
              return (
                <li
                  key={item.href}
                  className={cn(
                    "border-b border-white/10 transition-[opacity,transform] duration-700 ease-expo motion-reduce:transition-none",
                    open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className="group/item flex flex-1 items-center gap-4 py-3.5 outline-none focus-visible:bg-white/[0.04] sm:py-4"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "size-1.5 rounded-full transition-colors duration-500",
                          active ? "bg-imperial-300" : "bg-white/15 group-hover/item:bg-white/40",
                        )}
                      />
                      <span
                        className={cn(
                          "font-display text-[1.75rem] leading-tight font-medium tracking-[-0.03em] transition-[color,transform] duration-500 ease-expo group-hover/item:translate-x-1 sm:text-[2.25rem]",
                          active ? "text-white" : "text-white/70 group-hover/item:text-white",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                    {menu ? (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`mobile-sub-${menu}`}
                        onClick={() => setExpanded(isOpen ? null : menu)}
                        className={cn(
                          "grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-imperial-300",
                          isOpen
                            ? "border-white bg-white text-obsidian"
                            : "border-white/20 text-white hover:border-white/50",
                        )}
                      >
                        <span className="sr-only">{`${isOpen ? "Hide" : "Show"} ${item.label}`}</span>
                        <span aria-hidden className="relative block size-3">
                          <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-current" />
                          <span
                            className={cn(
                              "absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-500 ease-expo",
                              isOpen && "scale-y-0",
                            )}
                          />
                        </span>
                      </button>
                    ) : (
                      <span aria-hidden className="pr-1 text-xs text-mist tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>
                  {menu ? (
                    <div
                      id={`mobile-sub-${menu}`}
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-500 ease-expo motion-reduce:transition-none",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden" inert={!isOpen}>
                        <SubMenu id={menu} pathname={pathname} onNavigate={onNavigate} />
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
        </ul>
      </nav>

      <div
        className={cn(
          "relative border-t border-white/10 px-5 py-7 transition-opacity duration-700 ease-expo sm:px-8",
          open ? "opacity-100 delay-500" : "opacity-0",
        )}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-sm leading-relaxed text-platinum">
            <a href={`mailto:${site.email}`} className="block text-white underline-offset-4 hover:underline">
              {site.email}
            </a>
            <address className="mt-1 not-italic">
              {address.street}, {address.postalCode} {address.locality} · {address.country}
            </address>
          </div>
          <Link
            href="/contact"
            onClick={onNavigate}
            className="inline-flex h-12 items-center justify-center gap-3 self-start rounded-full bg-white pr-2 pl-6 text-[0.9375rem] font-medium text-obsidian outline-none focus-visible:ring-2 focus-visible:ring-imperial-300 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian sm:self-auto"
          >
            Contact Us
            <span aria-hidden className="grid size-8 place-items-center rounded-full bg-imperial text-white">
              <svg viewBox="0 0 16 16" className="size-3.5">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
