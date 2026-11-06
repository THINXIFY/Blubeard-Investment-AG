"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode, type SyntheticEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { documentsRequest } from "@/content/documents";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { AlertIcon, CheckIcon, ClockIcon, CloseIcon, LockIcon, Spinner } from "./icons";
import { OtpCodeInput } from "./OtpCodeInput";

type View = "email" | "sending" | "otp" | "verifying" | "success" | "failure" | "retrying" | "unavailable";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const stepOf = (view: View) => {
  if (view === "email" || view === "sending" || view === "unavailable") return 0;
  return view === "otp" || view === "verifying" ? 1 : 2;
};

const BUSY_LABEL: Partial<Record<View, string>> = {
  sending: "Sending code…",
  verifying: "Verifying…",
  retrying: "Retrying…",
};

async function post(path: "start" | "verify" | "resend", body: Record<string, unknown>) {
  const res = await fetch(`/api/request-documents/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { ok: res.ok, status: res.status, data };
}

const companyMail = (
  <a
    href={`mailto:${site.email}`}
    className="font-medium [overflow-wrap:anywhere] text-imperial underline decoration-imperial/40 underline-offset-4"
  >
    {site.email}
  </a>
);

const Busy = ({ label }: { label: string }) => (
  <span className="inline-flex items-center gap-2.5">
    <Spinner className="size-4 animate-spin motion-reduce:animate-none" />
    {label}
  </span>
);

const ErrorNote = ({ id, children }: { id?: string; children: ReactNode }) => (
  <p
    id={id}
    role="alert"
    className="mt-3 flex gap-2.5 rounded-md border border-[#f3c9c5] bg-[#fdf4f3] px-3.5 py-2.5 text-sm leading-snug font-medium text-[#b42318]"
  >
    <AlertIcon className="mt-px size-4 shrink-0" />
    <span>{children}</span>
  </p>
);

const StateBadge = ({ children, tone = "imperial" }: { children: ReactNode; tone?: "imperial" | "alert" }) => (
  <span
    className={cn(
      "ml-1 grid size-12 place-items-center rounded-full ring-1 ring-offset-4 ring-offset-white",
      tone === "imperial"
        ? "bg-imperial-50 text-imperial ring-imperial/20"
        : "bg-[#fdf4f3] text-[#b42318] ring-[#f3c9c5]",
    )}
  >
    {children}
  </span>
);

/**
 * Request Private Documents: email → one-time code → delivery by email. A single-column native modal:
 * an Obsidian header carrying the logo and step tracker, a spacious white step area, and
 * a Porcelain footer with the privacy notice.
 */
export function RequestDocumentsDialog({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<View>("email");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot.
  const [emailError, setEmailError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const [previewCode, setPreviewCode] = useState<string | null>(null);

  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const codeField = useRef<HTMLDivElement>(null);
  const busyBar = useRef<HTMLSpanElement>(null);

  const busy = view === "sending" || view === "verifying" || view === "retrying";
  const step = stepOf(view);
  const complete = view === "success";
  const { steps, assurances, privacy, eyebrow } = documentsRequest.dialog;
  const emailLooksValid = EMAIL_PATTERN.test(email.trim());

  // Open as a true modal (focus trap, inert page, top layer), lock page scroll, restore both on close.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const opener = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const previous = { overflow: html.style.overflow, paddingRight: html.style.paddingRight };
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;
    el.showModal();

    const tween = prefersReducedMotion()
      ? null
      : gsap.fromTo(panel.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" });

    return () => {
      tween?.kill();
      el.close();
      html.style.overflow = previous.overflow;
      html.style.paddingRight = previous.paddingRight;
      opener?.focus?.();
    };
  }, []);

  // Each new step: a soft entrance, then focus the first field, or the heading so it is announced.
  useEffect(() => {
    const el = content.current;
    if (!el || view === "sending" || view === "verifying" || view === "retrying") return;
    const reduce = prefersReducedMotion();
    const tween = reduce
      ? null
      : gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" });
    const check = el.querySelector("[data-draw-check]");
    const draw =
      check && !reduce
        ? gsap.fromTo(
            check,
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.8, delay: 0.15, ease: "power2.out" },
          )
        : null;
    const target =
      el.querySelector<HTMLElement>("input:not([tabindex='-1'])") ?? el.querySelector<HTMLElement>("#rd-heading");
    target?.focus();
    return () => {
      tween?.kill();
      draw?.kill();
    };
  }, [view, expired]);

  // A slim line travels under the header while a request is running.
  useEffect(() => {
    if (!busy || !busyBar.current || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      busyBar.current,
      { xPercent: -100 },
      { xPercent: 100, duration: 1.2, ease: "power1.inOut", repeat: -1 },
    );
    return () => {
      tween.kill();
    };
  }, [busy]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // A rejected code nudges the boxes sideways.
  useEffect(() => {
    if (!codeError || !codeField.current || prefersReducedMotion()) return;
    const tween = gsap.fromTo(codeField.current, { x: -7 }, { x: 0, duration: 0.6, ease: "elastic.out(1.2, 0.3)" });
    return () => {
      tween.kill();
    };
  }, [codeError]);

  const close = useCallback(() => {
    if (!busy) onClose();
  }, [busy, onClose]);

  const onCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    close();
  };

  const restart = (message: string | null) => {
    setRequestId(null);
    setCode("");
    setCodeError(null);
    setExpired(false);
    setNotice(null);
    setPreviewCode(null);
    setCooldown(0);
    setEmailError(message);
    setView("email");
  };

  const submitEmail = async (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(value) || value.length > 254) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(null);
    setView("sending");
    try {
      const r = await post("start", { email: value, website });
      if (r.ok && typeof r.data.requestId === "string") {
        setEmail(value);
        setRequestId(r.data.requestId);
        setPreviewCode(typeof r.data.previewCode === "string" ? r.data.previewCode : null);
        setCode("");
        setCodeError(null);
        setExpired(false);
        setNotice(null);
        setCooldown(Number(r.data.cooldownSeconds) || 60);
        setView("otp");
      } else if (r.status === 503) {
        setView("unavailable");
      } else {
        setEmailError(
          r.status === 429
            ? "Too many requests. Please wait a little and try again."
            : r.data.error === "invalid_email"
              ? "Please enter a valid email address."
              : "We could not send a verification code. Please try again.",
        );
        setView("email");
      }
    } catch {
      setEmailError("We could not reach the server. Please check your connection and try again.");
      setView("email");
    }
  };

  const verify = async (value: string) => {
    if (!requestId || value.length !== 6 || busy) return;
    setCodeError(null);
    setNotice(null);
    setView("verifying");
    try {
      const r = await post("verify", { requestId, code: value });
      if (r.ok) {
        setView(r.data.status === "sent" ? "success" : "failure");
      } else if (r.status === 503) {
        setView("unavailable");
      } else if (r.data.error === "too_many_attempts") {
        restart("Too many incorrect attempts. Please request a new code.");
      } else if (r.data.error === "not_found") {
        restart("This request is no longer valid. Please request a new code.");
      } else if (r.data.error === "expired") {
        setCode("");
        setExpired(true);
        setView("otp");
      } else {
        const left = Number(r.data.attemptsLeft);
        const messages: Record<string, string> = {
          invalid_code: `That code is not correct. ${left} ${left === 1 ? "attempt" : "attempts"} remaining.`,
          rate_limited: "Too many attempts. Please wait a little and try again.",
          in_progress: "Your documents are already being sent. Please check your inbox shortly.",
        };
        setCodeError(messages[String(r.data.error)] ?? "Something went wrong. Please try again.");
        if (r.data.error === "invalid_code") setCode("");
        setView("otp");
      }
    } catch {
      setCodeError("We could not reach the server. Please try again.");
      setView("otp");
    }
  };

  const retryDelivery = async () => {
    if (!requestId) return;
    setView("retrying");
    try {
      const r = await post("verify", { requestId, code });
      setView(r.ok && r.data.status === "sent" ? "success" : "failure");
    } catch {
      setView("failure");
    }
  };

  const resend = async () => {
    if (!requestId || cooldown > 0 || resending) return;
    setResending(true);
    setNotice(null);
    setCodeError(null);
    try {
      const r = await post("resend", { requestId });
      if (r.ok) {
        setCode("");
        setExpired(false);
        setPreviewCode(typeof r.data.previewCode === "string" ? r.data.previewCode : null);
        setCooldown(Number(r.data.cooldownSeconds) || 60);
        setNotice("A new code is on its way.");
      } else if (r.status === 404) {
        restart("This request is no longer valid. Please request a new code.");
      } else {
        setCodeError(
          r.status === 429
            ? "Please wait a moment before requesting another code."
            : "We could not resend the code. Please try again shortly.",
        );
      }
    } catch {
      setCodeError("We could not reach the server. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const heading =
    "font-display text-[1.625rem] leading-[1.12] font-medium tracking-[-0.032em] text-balance text-ink outline-none sm:text-[2rem]";
  const lead = "mt-2.5 text-[0.9375rem] leading-relaxed text-slate sm:text-base";
  const stepLabel = "text-[0.6875rem] font-semibold tracking-[0.18em] text-imperial uppercase";
  const textAction =
    "min-h-11 text-sm font-medium underline-offset-4 transition-colors duration-300 hover:underline disabled:no-underline";

  return (
    <dialog
      ref={dialog}
      aria-labelledby="rd-heading"
      onCancel={onCancel}
      onClose={(e) => {
        // The close event is asynchronous: ignore a stale one if the dialog has since been reopened.
        if (!e.currentTarget.open) onClose();
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget || e.target === e.currentTarget.firstElementChild) close();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-transparent p-3 text-left text-ink backdrop:bg-obsidian/70 backdrop:backdrop-blur-sm sm:p-6 [&_button:not(:disabled)]:cursor-pointer"
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          ref={panel}
          className="relative w-full max-w-[36rem] overflow-hidden rounded-[0.875rem] bg-white shadow-[0_50px_120px_-30px_rgb(16_19_32/0.8)] ring-1 ring-white/10"
        >
          {/* Branded header with step tracker */}
          <header className="relative isolate overflow-hidden bg-obsidian px-5 pt-4 text-white sm:px-10 sm:pt-6">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(75%_150%_at_100%_0%,rgb(18_72_216/0.42),transparent_68%)]"
            />
            <div className="flex items-center justify-between gap-4">
              <Image
                src="/media/branding/logo-dark.png"
                alt={site.name}
                width={640}
                height={140}
                unoptimized
                className="h-8 w-auto max-w-none sm:h-9"
              />
              <button
                type="button"
                onClick={close}
                disabled={busy}
                aria-label="Close dialog"
                className="-mr-2 grid size-11 place-items-center rounded-full text-platinum transition-colors duration-300 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white disabled:opacity-40"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            <p className="sr-only">{complete ? "Complete" : `Step ${step + 1} of ${steps.length}`}</p>
            <ol className="mt-5 grid grid-cols-3 gap-x-2 sm:mt-7 sm:gap-x-3">
              {steps.map((s, i) => {
                const done = i < step || complete;
                const active = i === step && !complete;
                return (
                  <li key={s.title} aria-current={active ? "step" : undefined}>
                    <span
                      className={cn(
                        "flex items-center gap-2 pb-3 text-xs leading-tight font-medium transition-colors duration-500 sm:pb-3.5 sm:text-[0.8125rem]",
                        active ? "text-white" : done ? "text-imperial-300" : "text-white/65",
                      )}
                    >
                      {done ? (
                        <CheckIcon className="size-3 shrink-0" strokeWidth={2} />
                      ) : (
                        <span aria-hidden className="hidden text-[0.6875rem] tabular-nums opacity-70 sm:inline">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                      <span className="sm:hidden">{s.short}</span>
                      <span className="hidden sm:inline">{s.title}</span>
                    </span>
                    <span aria-hidden className="block h-0.5 bg-white/15">
                      <span
                        className={cn(
                          "block h-full origin-left transition-[scale,background-color] duration-700 ease-expo motion-reduce:transition-none",
                          done ? "scale-x-100 bg-imperial-300" : active ? "scale-x-100 bg-white" : "scale-x-0 bg-white",
                        )}
                      />
                    </span>
                  </li>
                );
              })}
            </ol>
          </header>

          {/* Step area */}
          <div className="relative flex flex-col justify-center px-5 pt-6 pb-6 sm:min-h-[20rem] sm:px-10 sm:pt-9 sm:pb-8">
            <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 overflow-hidden">
              {busy ? <span ref={busyBar} className="block h-full w-full bg-imperial" /> : null}
            </span>
            <p role="status" className="sr-only">
              {BUSY_LABEL[view] ?? ""}
            </p>

            <div ref={content}>
              {view === "email" || view === "sending" ? (
                <form onSubmit={submitEmail} noValidate>
                  <p className={stepLabel}>{eyebrow}</p>
                  <h2 id="rd-heading" tabIndex={-1} className={cn(heading, "mt-3")}>
                    {documentsRequest.button}
                  </h2>
                  <p className={lead}>
                    Verify your email address and we will send {site.name}’s documents directly to your inbox.
                  </p>

                  <div
                    className={cn(
                      "relative mt-6 rounded-md border bg-porcelain transition-[border-color,box-shadow,background-color] duration-300 focus-within:border-imperial focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgb(18_72_216/0.12)]",
                      emailError ? "border-[#b42318]" : "border-line-strong/80 hover:border-slate/60",
                    )}
                  >
                    <label
                      htmlFor="rd-email"
                      className="pointer-events-none absolute top-2.5 left-4 text-[0.625rem] font-semibold tracking-[0.16em] text-slate uppercase"
                    >
                      Email address
                    </label>
                    <input
                      id="rd-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="name@company.com"
                      value={email}
                      maxLength={254}
                      disabled={view === "sending"}
                      aria-invalid={emailError ? true : undefined}
                      aria-describedby={emailError ? "rd-email-error" : undefined}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(null);
                      }}
                      className="h-[4.25rem] w-full rounded-md bg-transparent pt-6 pr-11 pl-4 text-base text-ink outline-none placeholder:text-mist focus-visible:outline-none disabled:opacity-60"
                    />
                    <CheckIcon
                      strokeWidth={2}
                      className={cn(
                        "pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-imperial transition-[opacity,scale] duration-500 ease-expo motion-reduce:transition-none",
                        emailLooksValid ? "scale-100 opacity-100" : "scale-50 opacity-0",
                      )}
                    />
                  </div>
                  {emailError ? <ErrorNote id="rd-email-error">{emailError}</ErrorNote> : null}

                  {/* Honeypot: hidden from people and assistive technology. */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    arrow={view !== "sending"}
                    disabled={view === "sending"}
                    aria-busy={view === "sending"}
                    className={cn("mt-3 w-full rounded-md", view !== "sending" && "justify-between px-6")}
                  >
                    {view === "sending" ? <Busy label="Sending code…" /> : "Send verification code"}
                  </Button>

                  <ul className="mt-6 grid gap-2 border-t border-line pt-5 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line">
                    {assurances.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-[0.8125rem] leading-snug text-slate sm:px-4 sm:first:pl-0 sm:last:pr-0"
                      >
                        <CheckIcon className="mt-0.5 size-3 shrink-0 text-imperial" strokeWidth={1.8} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </form>
              ) : null}

              {(view === "otp" || view === "verifying") && !expired ? (
                <form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    void verify(code);
                  }}
                >
                  <p className={stepLabel}>Verification</p>
                  <h2 id="rd-heading" tabIndex={-1} className={cn(heading, "mt-3")}>
                    Enter your verification code
                  </h2>
                  <p className={lead}>
                    We sent a six-digit code to{" "}
                    <span className="font-semibold [overflow-wrap:anywhere] text-ink">{email}</span>
                  </p>

                  {previewCode ? (
                    <p className="mt-4 rounded-md border border-dashed border-line-strong bg-porcelain px-4 py-2.5 text-[0.8125rem] leading-relaxed text-slate">
                      Local preview, no email was sent. Your code is{" "}
                      <span className="font-semibold text-ink tabular-nums">{previewCode}</span>
                    </p>
                  ) : null}

                  <div ref={codeField} className="mt-6">
                    <OtpCodeInput
                      value={code}
                      onChange={setCode}
                      onComplete={(value) => void verify(value)}
                      disabled={view === "verifying"}
                      invalid={Boolean(codeError)}
                      describedBy={codeError ? "rd-code-error" : undefined}
                    />
                  </div>
                  {codeError ? <ErrorNote id="rd-code-error">{codeError}</ErrorNote> : null}
                  {notice && !codeError ? (
                    <p
                      role="status"
                      className="mt-3 flex items-center gap-2.5 rounded-md bg-imperial-50 px-3.5 py-2.5 text-sm font-medium text-imperial"
                    >
                      <CheckIcon className="size-4 shrink-0" strokeWidth={1.8} />
                      {notice}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    size="lg"
                    arrow={view !== "verifying"}
                    disabled={view === "verifying" || code.length !== 6}
                    aria-busy={view === "verifying"}
                    className={cn("mt-4 w-full rounded-md", view !== "verifying" && "justify-between px-6")}
                  >
                    {view === "verifying" ? <Busy label="Verifying…" /> : "Verify and send documents"}
                  </Button>

                  <div className="mt-2 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => restart(null)}
                      disabled={view === "verifying"}
                      className={cn(textAction, "text-slate hover:text-ink")}
                    >
                      Change email
                    </button>
                    <button
                      type="button"
                      onClick={() => void resend()}
                      disabled={cooldown > 0 || resending || view === "verifying"}
                      className={cn(textAction, "text-imperial tabular-nums disabled:text-slate")}
                    >
                      {cooldown > 0 ? `Resend in ${cooldown}s` : resending ? "Resending…" : "Resend code"}
                    </button>
                  </div>

                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate">
                    Not there yet? Check your inbox, then your spam or junk folder. Delivery can take a minute.
                  </p>
                </form>
              ) : null}

              {view === "otp" && expired ? (
                <div>
                  <StateBadge>
                    <ClockIcon className="size-5" />
                  </StateBadge>
                  <h2 id="rd-heading" tabIndex={-1} className={cn(heading, "mt-6")}>
                    This code has expired
                  </h2>
                  <p className={lead}>
                    For your protection, codes are valid for a short time. Request a new one for{" "}
                    <span className="font-semibold [overflow-wrap:anywhere] text-ink">{email}</span>.
                  </p>
                  {codeError ? <ErrorNote>{codeError}</ErrorNote> : null}
                  <Button
                    size="lg"
                    onClick={() => void resend()}
                    disabled={cooldown > 0 || resending}
                    aria-busy={resending}
                    className="mt-6 w-full rounded-md"
                  >
                    {resending ? (
                      <Busy label="Sending code…" />
                    ) : cooldown > 0 ? (
                      `New code available in ${cooldown}s`
                    ) : (
                      "Send a new code"
                    )}
                  </Button>
                  <button
                    type="button"
                    onClick={() => restart(null)}
                    className={cn(textAction, "mt-2 text-slate hover:text-ink")}
                  >
                    Change email
                  </button>
                </div>
              ) : null}

              {view === "success" ? (
                <div>
                  <StateBadge>
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-5">
                      <path
                        data-draw-check
                        d="m3 8.5 3.2 3.2L13 4.5"
                        stroke="currentColor"
                        strokeWidth={1.6}
                        pathLength={1}
                        strokeDasharray={1}
                      />
                    </svg>
                  </StateBadge>
                  <h2 id="rd-heading" tabIndex={-1} className={cn(heading, "mt-6")}>
                    Your documents are on their way
                  </h2>
                  {previewCode ? (
                    <p className={lead}>Local preview, no email was sent.</p>
                  ) : (
                    <dl className="mt-5 rounded-md border border-line bg-porcelain px-4 py-3">
                      <dt className="text-[0.6875rem] font-semibold tracking-[0.16em] text-slate uppercase">Sent to</dt>
                      <dd className="mt-1 font-semibold [overflow-wrap:anywhere] text-ink">{email}</dd>
                    </dl>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-slate">
                    Please check your inbox first. If you do not see the email, look in your spam, junk or promotions
                    folder.
                  </p>
                  <Button size="lg" onClick={onClose} className="mt-6 w-full rounded-md">
                    Close
                  </Button>
                </div>
              ) : null}

              {view === "failure" || view === "retrying" ? (
                <div>
                  <StateBadge tone="alert">
                    <AlertIcon className="size-5" />
                  </StateBadge>
                  <h2 id="rd-heading" tabIndex={-1} className={cn(heading, "mt-6")}>
                    We could not send the documents
                  </h2>
                  <p className={lead}>
                    Your email address was verified, but delivery did not complete. Please try again, or write to{" "}
                    {companyMail} and we will help directly.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => void retryDelivery()}
                    disabled={view === "retrying"}
                    aria-busy={view === "retrying"}
                    className="mt-6 w-full rounded-md"
                  >
                    {view === "retrying" ? <Busy label="Retrying…" /> : "Try again"}
                  </Button>
                </div>
              ) : null}

              {view === "unavailable" ? (
                <div>
                  <StateBadge tone="alert">
                    <AlertIcon className="size-5" />
                  </StateBadge>
                  <h2 id="rd-heading" tabIndex={-1} className={cn(heading, "mt-6")}>
                    Requests are temporarily unavailable
                  </h2>
                  <p className={lead}>
                    We cannot process document requests online right now. Please write to {companyMail} and we will
                    follow up personally.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Button href={`mailto:${site.email}`} size="lg" arrow className="rounded-md">
                      Email Us
                    </Button>
                    <Button variant="secondary" size="lg" onClick={onClose} className="rounded-md">
                      Close
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Privacy notice */}
          <footer className="border-t border-line bg-porcelain px-5 py-3.5 text-xs leading-relaxed text-slate sm:px-10 sm:py-4">
            <p className="flex gap-2.5">
              <LockIcon className="mt-0.5 size-3 shrink-0" />
              <span>
                {privacy}{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium whitespace-nowrap text-imperial underline decoration-imperial/40 underline-offset-2"
                >
                  Privacy Policy
                  <span className="sr-only"> (opens in a new tab)</span>
                </Link>
              </span>
            </p>
          </footer>
        </div>
      </div>
    </dialog>
  );
}
