import type { ServicePageData } from "./types";
import { realEstateManagement } from "./real-estate-management";
import { wealthManagement } from "./wealth-management";
import { assetAndPortfolioManagement } from "./asset-and-portfolio-management";
import { ventureCapitalAndGrowthInvestments } from "./venture-capital-and-growth-investments";
import { corporateAndStrategicConsulting } from "./corporate-and-strategic-consulting";
import { mergersAndAcquisitions } from "./mergers-and-acquisitions";
import { privateEquityAndCapitalAdvisory } from "./private-equity-and-capital-advisory";
import { investmentResearchAndRiskAdvisory } from "./investment-research-and-risk-advisory";

export type { ServicePageData } from "./types";

const pages: readonly ServicePageData[] = [
  realEstateManagement,
  wealthManagement,
  assetAndPortfolioManagement,
  ventureCapitalAndGrowthInvestments,
  corporateAndStrategicConsulting,
  mergersAndAcquisitions,
  privateEquityAndCapitalAdvisory,
  investmentResearchAndRiskAdvisory,
];

/**
 * Registry of published service detail pages. Adding a page = one data file + one entry here;
 * the route, Services-page link and sitemap entry follow automatically.
 */
export const servicePages: Record<string, ServicePageData> = Object.fromEntries(pages.map((p) => [p.slug, p]));

export const publishedServiceSlugs = Object.keys(servicePages);

export const isServicePublished = (slug: string) => slug in servicePages;
