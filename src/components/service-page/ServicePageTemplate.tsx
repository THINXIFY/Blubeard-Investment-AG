import type { ServicePageData } from "@/content/service-pages";
import { ServiceBanner } from "./ServiceBanner";
import { ServiceVideoHero } from "./ServiceVideoHero";
import { ServiceCapabilityGrid } from "./ServiceCapabilityGrid";
import { ServiceExpertise } from "./ServiceExpertise";
import { ServiceApproach } from "./ServiceApproach";
import { ServiceCta } from "./ServiceCta";

/** Shared layout for every service detail page. All copy and photography come from the data file. */
export function ServicePageTemplate({ data }: { data: ServicePageData }) {
  return (
    <>
      {data.hero.video ? <ServiceVideoHero data={data} /> : <ServiceBanner data={data} />}
      <ServiceCapabilityGrid data={data} />
      <ServiceExpertise data={data} />
      <ServiceApproach data={data} />
      <ServiceCta data={data} />
    </>
  );
}
