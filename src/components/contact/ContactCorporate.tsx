import { contactPage } from "@/content/contact";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DocumentsPanel } from "@/components/documents/DocumentsPanel";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Corporate information — an institutional register panel: label/value pairs between fine rules,
 * set in two columns on desktop. Hover marks a row with a drawn Imperial rule.
 */
export function ContactCorporate() {
  const { corporate } = contactPage;
  const half = Math.ceil(corporate.rows.length / 2);
  const columns = [corporate.rows.slice(0, half), corporate.rows.slice(half)];

  return (
    <section data-tone="light" aria-labelledby="contact-corporate-title" className="bg-white py-14 md:py-16 lg:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{corporate.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="contact-corporate-title"
              lines={[corporate.heading]}
              className="mt-6 font-display text-[clamp(2.125rem,1.3rem+2.4vw,3.5rem)] leading-[1.04] font-medium tracking-[-0.042em] text-ink"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-lg leading-relaxed text-slate">{corporate.lead}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative mt-8 rounded-md border border-line-strong bg-porcelain lg:mt-10">
          <span aria-hidden className="absolute top-0 left-8 h-0.5 w-16 bg-imperial" />
          <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-line-strong">
            {columns.map((col, c) => (
              <dl key={c} className={cn("px-6 md:px-10", c === 1 && "border-t border-line-strong lg:border-t-0")}>
                {col.map((row) => (
                  <div
                    key={row.label}
                    className="group/row relative grid gap-1 border-b border-line py-5 last:border-b-0 sm:grid-cols-[13rem_1fr] sm:items-baseline sm:gap-6"
                  >
                    <span
                      aria-hidden
                      className="absolute bottom-[-1px] left-0 h-px w-0 bg-imperial transition-[width] duration-700 ease-expo group-hover/row:w-full"
                    />
                    <dt className="text-[0.6875rem] font-medium tracking-[0.18em] text-slate uppercase">{row.label}</dt>
                    <dd
                      className={cn(
                        "font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink",
                        "mono" in row && row.mono && "tabular-nums",
                      )}
                    >
                      {"dateTime" in row && row.dateTime ? <time dateTime={row.dateTime}>{row.value}</time> : row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 flex justify-end">
          <a
            href={corporate.profile.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/mh inline-flex shrink-0 items-center gap-2 text-sm font-medium text-imperial transition-colors duration-300 hover:text-ink"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-700 ease-expo group-hover/mh:bg-[length:100%_1px]">
              {corporate.profile.label}
            </span>
            <span
              aria-hidden
              className="transition-transform duration-500 ease-expo group-hover/mh:translate-x-0.5 group-hover/mh:-translate-y-0.5"
            >
              ↗
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <DocumentsPanel className="mt-10 lg:mt-12" />
      </Container>
    </section>
  );
}
