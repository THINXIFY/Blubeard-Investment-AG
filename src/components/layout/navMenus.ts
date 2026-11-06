import { industryCategories, sectors } from "@/content/investments";
import { serviceEntries } from "@/content/services";
import type { ImageKey } from "@/content/images";

/** Mega-menu content, derived from the shared content model so links never drift from the pages. */

export type MenuLink = { label: string; href: string; note?: string };

export const investmentsMenu = {
  id: "investments" as const,
  href: "/investments",
  eyebrow: "Investments",
  title: "Investing Across Industries.",
  text: "Twelve sectors across four categories — from essential infrastructure to emerging technologies.",
  cta: { label: "Explore All Investments", href: "/investments" },
  groups: industryCategories.map((c) => ({
    label: c.label,
    links: sectors
      .filter((s) => s.category === c.id)
      .map<MenuLink>((s) => ({ label: s.title, href: `/investments/${s.id}` })),
  })),
};

export const servicesMenu = {
  id: "services" as const,
  href: "/services",
  eyebrow: "Services",
  title: "Strategic Expertise. Meaningful Solutions.",
  text: "Eight areas of expertise connected by one disciplined perspective.",
  cta: { label: "Explore All Services", href: "/services" },
  image: "realEstate" as ImageKey,
  links: serviceEntries.map<MenuLink>((s) => ({
    label: s.title,
    href: s.href ?? `/services#service-${s.slug}`,
    note: s.facets[0],
  })),
};

export type MenuId = typeof investmentsMenu.id | typeof servicesMenu.id;

export const menuFor = (href: string): MenuId | null =>
  href === investmentsMenu.href ? "investments" : href === servicesMenu.href ? "services" : null;
