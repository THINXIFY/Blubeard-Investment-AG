import { cn } from "@/lib/cn";

/** Team member's email address: real mailto link with a small arrow; underline draws on hover/focus. */
export function TeamEmail({ email, name, className }: { email: string; name: string; className?: string }) {
  return (
    <a
      href={`mailto:${email}`}
      aria-label={`Email ${name}: ${email}`}
      className={cn(
        "group/mail inline-flex min-h-11 max-w-full items-center gap-1.5 rounded-xs text-[0.8125rem] leading-snug text-imperial sm:text-[0.875rem]",
        "outline-none focus-visible:ring-2 focus-visible:ring-imperial focus-visible:ring-offset-2",
        className,
      )}
    >
      <span className="min-w-0 bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 [overflow-wrap:anywhere] transition-[background-size] duration-500 ease-expo group-hover/mail:bg-[length:100%_1px] group-focus-visible/mail:bg-[length:100%_1px] motion-reduce:transition-none">
        {email}
      </span>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="size-3 shrink-0 transition-transform duration-500 ease-expo group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5 group-focus-visible/mail:translate-x-0.5 group-focus-visible/mail:-translate-y-0.5 motion-reduce:transition-none"
      >
        <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </a>
  );
}
