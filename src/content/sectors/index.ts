import { realEstate } from "./real-estate";
import { biotechnology } from "./biotechnology";
import { technology } from "./technology";
import { artificialIntelligence } from "./artificial-intelligence";
import { petroleumOil } from "./petroleum-oil";
import { energySolar } from "./energy-solar";
import { industrialManufacturing } from "./industrial-manufacturing";
import { logisticsInfrastructure } from "./logistics-infrastructure";
import { healthcareMedtech } from "./healthcare-medtech";
import { privateEquity } from "./private-equity";
import { aerospaceDefense } from "./aerospace-defense";
import { agricultureFoodtech } from "./agriculture-foodtech";
import type { SectorPageData } from "./types";

/**
 * Published sector pages. Only slugs registered here are statically generated, linked from the
 * Investments directory and related-sector previews, and listed in the sitemap.
 * To publish another sector: add its data file and register it below.
 */
const all: SectorPageData[] = [
  realEstate,
  biotechnology,
  technology,
  artificialIntelligence,
  petroleumOil,
  energySolar,
  industrialManufacturing,
  logisticsInfrastructure,
  healthcareMedtech,
  privateEquity,
  aerospaceDefense,
  agricultureFoodtech,
];

export const sectorPages: Record<string, SectorPageData> = Object.fromEntries(all.map((s) => [s.slug, s]));

export const isSectorPublished = (slug: string) => slug in sectorPages;

export const publishedSectorSlugs = Object.keys(sectorPages);

export type { SectorPageData } from "./types";
