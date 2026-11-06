import Image from "next/image";
import { partners, partnersPage, type Partner } from "@/content/partners";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LogoMarquee } from "./LogoMarquee";

/**
 * Optical sizing: every logo gets roughly the same visual weight, whatever its proportions. Width is
 * √(area × aspect), limited so very wide wordmarks stay legible and near-square marks don't tower.
 * Values are in rem at desktop size; CSS scales them down on smaller screens (.pm-logo).
 */
const AREA = 34;
const MAX_W = 12.5;
const MAX_H = 3.75;
function logoSize({ width, height }: Pick<Partner, "width" | "height">) {
  const ratio = width / height;
  let w = Math.min(Math.sqrt(AREA * ratio), MAX_W);
  let h = w / ratio;
  if (h > MAX_H) {
    h = MAX_H;
    w = h * ratio;
  }
  return { w: +w.toFixed(2), h: +h.toFixed(2) };
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const { w, h } = logoSize(partner);
  const logo = (
    <Image
      src={partner.logo}
      alt={`${partner.name} logo`}
      width={partner.width}
      height={partner.height}
      // Served as supplied: no re-encoding, so transparency and edge quality are untouched.
      unoptimized
      loading="eager"
      className="pm-logo"
      style={{ "--pm-w": `${w}rem`, "--pm-h": `${h}rem` } as React.CSSProperties}
    />
  );
  return partner.website ? (
    <a
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-imperial"
    >
      {logo}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    logo
  );
}

/**
 * Partner logos. Renders only the entries in content/partners.ts and is omitted while that list is empty.
 */
export function PartnersLogos() {
  const { logos } = partnersPage;
  if (partners.length === 0) return null;

  const items = partners.map((p) => ({ key: p.name, node: <PartnerLogo partner={p} /> }));

  const staticList = (
    <ul
      aria-label="Partners"
      className="mx-auto grid max-w-5xl grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 px-5 md:grid-cols-3 lg:grid-cols-4"
    >
      {items.map((item) => (
        <li key={item.key}>{item.node}</li>
      ))}
    </ul>
  );

  return (
    <section
      id="partner-logos"
      data-tone="light"
      aria-labelledby="partners-logos-title"
      className="overflow-hidden bg-white py-16 md:py-20 lg:py-24"
    >
      <Container className="text-center">
        <Reveal>
          <Eyebrow>{logos.eyebrow}</Eyebrow>
        </Reveal>
        <MaskedHeading
          id="partners-logos-title"
          lines={[logos.heading]}
          className="mt-5 font-display text-[clamp(1.875rem,1.4rem+1.4vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.04em] text-ink"
        />
      </Container>
      <Reveal delay={0.15} className="mt-10 lg:mt-14">
        <LogoMarquee items={items} label="Partner logos" staticList={staticList} />
      </Reveal>
    </section>
  );
}
