import { documentsRequest } from "@/content/documents";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RequestDocumentsButton } from "./RequestDocumentsButton";

/** Obsidian call-to-action panel introducing the Request Private Documents flow. */
export function DocumentsPanel({ className }: { className?: string }) {
  const { panel } = documentsRequest;
  return (
    <Reveal className={className}>
      <div
        data-tone="dark"
        className="relative isolate overflow-hidden rounded-md bg-obsidian px-6 py-9 text-white sm:px-10 sm:py-11 lg:px-12"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_90%_at_100%_50%,rgb(18_72_216/0.32),transparent_70%)]"
        />
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow tone="dark">{panel.eyebrow}</Eyebrow>
            <h3 className="mt-5 font-display text-[clamp(1.625rem,1.3rem+1.1vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.035em]">
              {panel.heading}
            </h3>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-white/80">{panel.description}</p>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end lg:text-right">
            <RequestDocumentsButton tone="dark" className="w-full px-5 sm:w-auto sm:px-7" />
            <p className="mt-3 text-[0.6875rem] font-medium tracking-[0.16em] text-platinum uppercase">{panel.note}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
