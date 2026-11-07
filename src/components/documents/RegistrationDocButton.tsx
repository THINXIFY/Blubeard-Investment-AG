import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden focusable={false} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.4} className={className}>
      <path d="M5 2.75h6.5L15.25 6.5v10.75H5z" strokeLinejoin="round" />
      <path d="M11.25 2.75V6.75h4" strokeLinejoin="round" />
      <path d="M7.5 10.25h5M7.5 13h5" />
    </svg>
  );
}

/**
 * Opens the company registration summary (PDF) in a new tab, where the browser shows it in its PDF viewer.
 * A bordered tile for light surfaces: document icon, title and format note, with a corner arrow.
 */
export function RegistrationDocButton({ className }: { className?: string }) {
  return (
    <a
      href={site.registry.document}
      target="_blank"
      rel="noopener"
      type="application/pdf"
      className={cn(
        "group/doc relative isolate flex min-h-14 items-center gap-3 sm:gap-4 overflow-hidden rounded-sm border border-line-strong bg-white py-3 pr-4 pl-3",
        "transition-[border-color,color] duration-500 ease-expo hover:border-imperial focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-imperial",
        "before:absolute before:inset-y-0 before:left-0 before:-z-10 before:w-0.5 before:bg-imperial before:transition-[width] before:duration-700 before:ease-expo hover:before:w-1",
        className,
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-imperial/8 text-imperial transition-colors duration-500 group-hover/doc:bg-imperial group-hover/doc:text-white">
        <DocumentIcon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[0.9375rem] leading-snug font-semibold tracking-[-0.01em] text-ink transition-colors duration-300 group-hover/doc:text-imperial">
          Company Registration Document
        </span>
        <span className="mt-0.5 block text-xs text-slate">Register summary · PDF</span>
      </span>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="size-3.5 shrink-0 text-slate transition-[color,transform] duration-500 ease-expo group-hover/doc:translate-x-0.5 group-hover/doc:-translate-y-0.5 group-hover/doc:text-imperial"
      >
        <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="sr-only">(PDF, opens in a new tab)</span>
    </a>
  );
}
