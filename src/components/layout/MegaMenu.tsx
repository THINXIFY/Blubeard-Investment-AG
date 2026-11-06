"use client";

import Image from "next/image";
import Link from "next/link";
import type { KeyboardEvent, Ref } from "react";
import { cn } from "@/lib/cn";
import { images } from "@/content/images";
import { investmentsMenu, servicesMenu, type MenuId } from "./navMenus";

type MegaMenuProps = {
  ref?: Ref<HTMLDivElement>;
  /** Menu currently open (null = closed). */
  open: MenuId | null;
  /** Menu whose content is shown — kept during the closing fade. */
  content: MenuId | null;
  onNavigate: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
};

function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={cn("size-3.5", className)}>
      <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Editorial intro column shared by both menus. */
function Intro({ menu, onNavigate }: { menu: typeof investmentsMenu | typeof servicesMenu; onNavigate: () => void }) {
  return (
    <div className="flex flex-col">
      <p className="flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.22em] text-imperial uppercase">
        <span aria-hidden className="size-1 rounded-full bg-imperial" />
        {menu.eyebrow}
      </p>
      <p className="mt-4 font-display text-[1.5rem] leading-[1.12] font-medium tracking-[-0.03em] text-ink">
        {menu.title}
      </p>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">{menu.text}</p>
      <Link
        href={menu.cta.href}
        onClick={onNavigate}
        className="group/all mt-6 inline-flex items-center gap-2.5 self-start rounded-full border border-obsidian/15 bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-[0_6px_16px_-10px_rgb(16_19_32/0.35)] transition-colors duration-500 hover:border-obsidian hover:bg-obsidian hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial"
      >
        {menu.cta.label}
        <Arrow className="transition-transform duration-500 ease-expo group-hover/all:translate-x-0.5" />
      </Link>
    </div>
  );
}

const linkClass =
  "group/ml -mx-3 flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-[0.9375rem] text-ink transition-[background-color,color] duration-300 hover:bg-white hover:text-imperial focus-visible:bg-white focus-visible:text-imperial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-imperial/60";

/**
 * Desktop mega menu — a frosted porcelain sheet aligned to the floating capsule.
 * Investments: four category columns of sectors. Services: two columns of eight areas beside a
 * small editorial panel. Opens on hover intent or the chevron toggle; Escape/outside click close.
 */
export function MegaMenu({ ref, open, content, onNavigate, onPointerEnter, onPointerLeave, onKeyDown }: MegaMenuProps) {
  const visible = open !== null;
  const svcImg = images[servicesMenu.image];

  return (
    <div
      ref={ref}
      id="mega-menu"
      role="region"
      aria-label={content === "services" ? "Services menu" : "Investments menu"}
      inert={!visible}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onKeyDown={onKeyDown}
      className={cn(
        "pointer-events-auto absolute inset-x-8 top-full hidden pt-2.5 lg:block",
        // Invisible bridge above the sheet keeps hover alive across the gap.
        "before:absolute before:inset-x-0 before:top-0 before:h-2.5",
        "transition-[opacity,transform,visibility] duration-500 ease-expo motion-reduce:transition-none",
        visible ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1.5 opacity-0",
      )}
    >
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-[rgb(247_248_251/0.9)] shadow-[0_40px_80px_-40px_rgb(16_19_32/0.5),0_2px_8px_-4px_rgb(16_19_32/0.1),inset_0_1px_0_rgb(255_255_255/0.9)] ring-1 ring-platinum/50 backdrop-blur-2xl backdrop-saturate-150">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(18_72_216/0.45),transparent)]"
        />

        {content === "investments" ? (
          <div
            key="inv"
            className="grid grid-cols-12 gap-8 p-8 motion-safe:animate-[fade-up_0.5s_var(--ease-expo)_both] xl:p-10"
          >
            <div className="col-span-3 border-r border-line pr-8">
              <Intro menu={investmentsMenu} onNavigate={onNavigate} />
            </div>
            <div className="col-span-9 grid grid-cols-4 gap-6 xl:gap-8">
              {investmentsMenu.groups.map((g) => (
                <div key={g.label}>
                  <p className="border-b border-line pb-3 text-[0.6875rem] font-semibold tracking-[0.16em] text-slate uppercase">
                    {g.label}
                  </p>
                  <ul className="mt-3 space-y-0.5">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} onClick={onNavigate} className={linkClass}>
                          <span className="leading-snug">{l.label}</span>
                          <Arrow className="shrink-0 -translate-x-1 opacity-0 transition-[opacity,transform] duration-500 ease-expo group-hover/ml:translate-x-0 group-hover/ml:opacity-100 group-focus-visible/ml:translate-x-0 group-focus-visible/ml:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : content === "services" ? (
          <div
            key="svc"
            className="grid grid-cols-12 gap-8 p-8 motion-safe:animate-[fade-up_0.5s_var(--ease-expo)_both] xl:p-10"
          >
            <div className="col-span-4 flex gap-6 border-r border-line pr-8">
              <div className="relative hidden w-32 shrink-0 overflow-hidden rounded-2xl xl:block">
                <Image src={svcImg.src} alt="" fill sizes="440px" className="object-cover" />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgb(16_19_32/0.35),transparent)]"
                />
              </div>
              <Intro menu={servicesMenu} onNavigate={onNavigate} />
            </div>
            <ul className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-0.5">
              {servicesMenu.links.map((l, i) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={onNavigate} className={cn(linkClass, "items-start py-2.5")}>
                    <span className="flex gap-3">
                      <span aria-hidden className="w-5 pt-0.5 text-xs font-medium text-imperial tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block leading-snug">{l.label}</span>
                        {l.note ? <span className="mt-0.5 block text-xs text-slate">{l.note}</span> : null}
                      </span>
                    </span>
                    <Arrow className="mt-1 shrink-0 -translate-x-1 opacity-0 transition-[opacity,transform] duration-500 ease-expo group-hover/ml:translate-x-0 group-hover/ml:opacity-100 group-focus-visible/ml:translate-x-0 group-focus-visible/ml:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
