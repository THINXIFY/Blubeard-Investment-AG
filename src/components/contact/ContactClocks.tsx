"use client";

import { useSyncExternalStore } from "react";
import { contactPage } from "@/content/contact";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The current second, from the visitor's own clock. No network requests. The server has no time to render (it would
 * differ from the browser's), so clocks show a placeholder of the same size until the page is running.
 */
let now = 0;
function subscribe(notify: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const tick = () => {
    now = Math.floor(Date.now() / 1000);
    notify();
    // Scheduled on the second boundary, so all four clocks turn over together.
    timer = setTimeout(tick, 1000 - (Date.now() % 1000));
  };
  tick();
  return () => clearTimeout(timer);
}
const useSeconds = () =>
  useSyncExternalStore(
    subscribe,
    () => now,
    () => 0,
  );

type Formatters = { time: Intl.DateTimeFormat; date: Intl.DateTimeFormat; zone: Intl.DateTimeFormat };
const cache = new Map<string, Formatters>();
function formatters(timeZone: string) {
  let f = cache.get(timeZone);
  if (!f) {
    // Daylight saving follows from the IANA time zone: nothing here needs changing when the clocks change.
    f = {
      time: new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }),
      date: new Intl.DateTimeFormat("en-GB", {
        timeZone,
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      zone: new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName: "shortOffset" }),
    };
    cache.set(timeZone, f);
  }
  return f;
}

function Dial({ hours, minutes, seconds, dark }: { hours: number; minutes: number; seconds: number; dark: boolean }) {
  const hand = (deg: number) => ({ transform: `rotate(${deg}deg)`, transformOrigin: "24px 24px" });
  return (
    <svg aria-hidden viewBox="0 0 48 48" className="size-9 shrink-0 sm:size-12">
      <circle
        cx="24"
        cy="24"
        r="23"
        fill="none"
        stroke={dark ? "rgb(255 255 255 / 0.2)" : "var(--color-line-strong)"}
      />
      {[0, 90, 180, 270].map((d) => (
        <line
          key={d}
          x1="24"
          y1="3.5"
          x2="24"
          y2="6.5"
          stroke={dark ? "rgb(255 255 255 / 0.5)" : "var(--color-mist)"}
          style={hand(d)}
        />
      ))}
      <g stroke={dark ? "#fff" : "var(--color-ink)"} strokeLinecap="round">
        <line x1="24" y1="24" x2="24" y2="13.5" strokeWidth="1.8" style={hand((hours % 12) * 30 + minutes / 2)} />
        <line x1="24" y1="24" x2="24" y2="8.5" strokeWidth="1.3" style={hand(minutes * 6 + seconds / 10)} />
      </g>
      <line
        x1="24"
        y1="27"
        x2="24"
        y2="6.5"
        stroke={dark ? "var(--color-imperial-300)" : "var(--color-imperial)"}
        strokeWidth="0.8"
        strokeLinecap="round"
        style={hand(seconds * 6)}
      />
      <circle cx="24" cy="24" r="1.6" fill={dark ? "var(--color-imperial-300)" : "var(--color-imperial)"} />
    </svg>
  );
}

function Clock({
  city,
  country,
  timeZone,
  headquarters,
  seconds,
}: {
  city: string;
  country: string;
  timeZone: string;
  headquarters: boolean;
  seconds: number;
}) {
  const ready = seconds > 0;
  const instant = new Date(seconds * 1000);
  const f = formatters(timeZone);
  const parts = ready ? f.time.formatToParts(instant) : [];
  const part = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const zone = ready ? f.zone.formatToParts(instant).find((p) => p.type === "timeZoneName")?.value : null;

  return (
    <li
      data-clock={timeZone}
      data-reveal-item
      className={cn(
        "group/clock relative flex h-full flex-col overflow-hidden rounded-md border p-4 transition-[border-color,translate] duration-500 ease-expo hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 sm:p-5 lg:p-6",
        headquarters
          ? "border-obsidian bg-obsidian text-white"
          : "border-line-strong bg-white text-ink hover:border-imperial/40",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-0.5 origin-left bg-imperial transition-transform duration-700 ease-expo",
          headquarters ? "scale-x-100 bg-imperial-300" : "scale-x-0 group-hover/clock:scale-x-100",
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-[1.0625rem] leading-tight font-semibold tracking-[-0.02em] lg:text-lg">
            {city}
          </h3>
          <p className={cn("mt-1 text-xs", headquarters ? "text-platinum" : "text-slate")}>{country}</p>
        </div>
        {ready ? (
          <Dial hours={part("hour")} minutes={part("minute")} seconds={part("second")} dark={headquarters} />
        ) : (
          <span aria-hidden className="size-9 shrink-0 sm:size-12" />
        )}
      </div>

      <time
        dateTime={ready ? instant.toISOString() : undefined}
        className="mt-5 block font-display text-[clamp(1.375rem,1.1rem+1vw,2rem)] leading-none font-medium tracking-[-0.03em] tabular-nums"
      >
        {ready ? f.time.format(instant) : "––:––:––"}
      </time>
      <p
        className={cn(
          "mt-2.5 flex flex-wrap justify-between gap-x-3 gap-y-0.5 text-xs",
          headquarters ? "text-platinum" : "text-slate",
        )}
      >
        <span>{ready ? f.date.format(instant) : " "}</span>
        <span className="tabular-nums">{zone ?? ""}</span>
      </p>

      {headquarters ? (
        <p className="mt-4 flex items-center gap-2 border-t border-white/15 pt-3 text-[0.6875rem] font-medium tracking-[0.14em] uppercase">
          <span aria-hidden className="size-1.5 rounded-full bg-imperial-300 motion-safe:animate-pulse" />
          Official headquarters
        </p>
      ) : null}
    </li>
  );
}

/**
 * Four live clocks. Switzerland is marked as the headquarters; the note makes clear that the other cities are shown
 * for reference only and are not company locations.
 */
export function ContactClocks() {
  const { clocks } = contactPage;
  const seconds = useSeconds();

  return (
    <section data-tone="light" aria-labelledby="contact-clocks-title" className="bg-white py-14 md:py-16">
      <Container>
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{clocks.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              id="contact-clocks-title"
              lines={[clocks.heading]}
              className="mt-5 font-display text-[clamp(1.875rem,1.3rem+1.8vw,2.75rem)] leading-[1.06] font-medium tracking-[-0.038em] text-ink"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="leading-relaxed text-slate">{clocks.note}</p>
          </Reveal>
        </div>

        <Reveal
          as="ul"
          stagger={0.07}
          className="mt-8 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-4"
        >
          {clocks.cities.map((c) => (
            <Clock key={c.timeZone} {...c} seconds={seconds} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
