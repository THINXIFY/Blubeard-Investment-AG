import { cn } from "@/lib/cn";

/**
 * Discreet note on a photograph, for images that could otherwise imply ownership, affiliation or
 * company data. Text comes from the image registry (`note`); renders nothing when the image has none.
 * The parent must be positioned.
 */
export function PhotoNote({ image, className }: { image: { note?: string }; className?: string }) {
  if (!image.note) return null;
  return (
    <span
      className={cn(
        "pointer-events-none absolute right-3 bottom-2 z-10 text-right text-[0.625rem] leading-tight tracking-[0.04em] text-white/80 [text-shadow:0_1px_3px_rgb(16_19_32/0.9)]",
        className,
      )}
    >
      {image.note}
    </span>
  );
}
