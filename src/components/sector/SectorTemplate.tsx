import type { SectorPageData } from "@/content/sectors";
import { SectorHero } from "./SectorHero";
import { SectorScrollHero } from "./SectorScrollHero";
import { SectorPerspective } from "./SectorPerspective";
import { SectorFocus } from "./SectorFocus";
import { SectorConsiderations } from "./SectorConsiderations";
import { SectorLongTerm } from "./SectorLongTerm";
import { SectorRelated } from "./SectorRelated";
import { SectorClosing } from "./SectorClosing";

/** Shared layout for every investment-sector page. All content comes from the sector data file. */
export function SectorTemplate({ data }: { data: SectorPageData }) {
  return (
    <>
      {data.hero.video ? <SectorScrollHero data={data} /> : <SectorHero data={data} />}
      <SectorPerspective data={data} />
      {/* With a video hero the focus areas are presented inside the hero itself. */}
      {data.hero.video ? null : <SectorFocus data={data} />}
      <SectorConsiderations data={data} />
      <SectorLongTerm data={data} />
      <SectorRelated data={data} />
      <SectorClosing data={data} />
    </>
  );
}
