"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { isActivePath, mainNav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { menuFor, type MenuId } from "./navMenus";

/** Contact is reached through the Contact Us button, so it is not repeated in the navigation pill. */
const navItems = mainNav.filter((item) => item.href !== "/contact");

const SCROLLED_AT = 12;
const HIDE_AFTER = 360;
const OPEN_DELAY = 90;
const CLOSE_DELAY = 220;
/** Switching between open menus waits briefly so a diagonal pass over another trigger does not switch. */
const SWITCH_DELAY = 170;

type Indicator = { left: number; width: number; visible: boolean };

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className={cn(
        "size-3 transition-transform duration-500 ease-expo motion-reduce:transition-none",
        open && "rotate-180",
      )}
    >
      <path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Floating glass capsule header.
 * - Translucent porcelain with a platinum edge and inner highlight; denser over dark photography,
 *   lighter over light sections (reads the section beneath on scroll). Tightens once scrolled,
 *   hides on scroll down, returns on scroll up; every new page starts with it in view.
 * - Desktop: brand · centred navigation pill (Obsidian active pill gliding between items) · Contact Us.
 *   Investments and Services keep their links and gain a chevron toggle for a glass mega menu
 *   (hover intent, click/tap, Escape, outside click and navigation all handled).
 * - Below lg: Menu pill opening the Obsidian panel with expandable Investments/Services groups.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [darkBelow, setDarkBelow] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<{ id: MenuId; path: string } | null>(null);
  const [megaContent, setMegaContent] = useState<MenuId | null>(null);
  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0, visible: false });
  const [ready, setReady] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const triggers = useRef<Partial<Record<MenuId, HTMLButtonElement | null>>>({});

  // A mega menu belongs to the page it was opened on — navigating closes it without an effect.
  const megaOpen = mega && mega.path === pathname ? mega.id : null;

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  const showMega = useCallback(
    (id: MenuId | null, delay = 0) => {
      clearTimeout(timer.current);
      const apply = () => {
        setMega(id ? { id, path: pathname } : null);
        if (id) setMegaContent(id);
      };
      if (delay) timer.current = setTimeout(apply, delay);
      else apply();
    },
    [pathname],
  );
  const cancelPending = () => clearTimeout(timer.current);

  // Scroll state + tone of the section beneath the capsule (rAF-throttled).
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    let first = true;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > SCROLLED_AT);
      const probe = document
        .elementsFromPoint(window.innerWidth / 2, 40)
        .find((el) => !el.closest("header"))
        ?.closest<HTMLElement>("[data-tone]");
      setDarkBelow(probe?.dataset.tone === "dark");
      if (first) {
        first = false;
        setHidden(false);
        lastY = y;
        return;
      }
      setHidden(y > HIDE_AFTER && y > lastY + 4 ? true : y < lastY - 4 ? false : (prev) => prev);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Active pill: measure the current item; re-measure on resize and when fonts settle.
  useLayoutEffect(() => {
    const list = navRef.current;
    if (!list) return;
    const measure = () => {
      const item = list.querySelector<HTMLElement>("li[data-active]");
      if (!item) {
        setIndicator((prev) => ({ ...prev, visible: false }));
        return;
      }
      setIndicator({ left: item.offsetLeft, width: item.offsetWidth, visible: true });
    };
    const first = requestAnimationFrame(measure);
    const ro = new ResizeObserver(() => measure());
    ro.observe(list);
    document.fonts?.ready.then(measure).catch(() => undefined);
    const id = requestAnimationFrame(() => setReady(true));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(first);
      cancelAnimationFrame(id);
    };
  }, [pathname]);

  // Mega menu: close on outside pointer and Escape (focus back to its trigger).
  useEffect(() => {
    if (!megaOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!shellRef.current?.parentElement?.contains(e.target as Node)) showMega(null);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      triggers.current[megaOpen]?.focus();
      showMega(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen, showMega]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Mobile menu: lock scroll, make page content inert, trap focus, close on Escape / desktop resize.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const outside = [document.getElementById("main"), document.getElementById("site-footer")];
    root.style.overflow = "hidden";
    outside.forEach((el) => el?.setAttribute("inert", ""));

    const focusables = () =>
      [
        toggleRef.current,
        ...(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
      ].filter((el): el is HTMLElement => Boolean(el) && !el?.closest("[inert]"));

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = (e: MediaQueryListEvent) => e.matches && close();

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = "";
      outside.forEach((el) => el?.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open, close]);

  /** Keyboard inside the mega sheet: Tab past the last link returns to the nav after its trigger. */
  const onMegaKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !megaOpen) return;
    const links = [...(megaRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [])];
    const trigger = triggers.current[megaOpen];
    if (!e.shiftKey && document.activeElement === links[links.length - 1]) {
      e.preventDefault();
      const navLinks = [...(navRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])];
      const next = trigger ? navLinks[navLinks.indexOf(trigger) + 1] : undefined;
      showMega(null);
      (next ?? trigger)?.focus();
    } else if (e.shiftKey && document.activeElement === links[0]) {
      e.preventDefault();
      trigger?.focus();
    }
  };

  const toggleMega = (id: MenuId, viaKeyboard: boolean) => {
    if (megaOpen === id) {
      showMega(null);
      return;
    }
    showMega(id);
    // Wait for the sheet to leave its inert state before moving focus into it.
    if (viaKeyboard) setTimeout(() => megaRef.current?.querySelector<HTMLElement>("a[href]")?.focus(), 60);
  };

  const raised = scrolled || open || megaOpen !== null;
  const dense = darkBelow && !open;
  const contactActive = isActivePath(pathname, "/contact");

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-expo motion-reduce:transition-none",
          hidden && !open && !megaOpen ? "-translate-y-[120%]" : "translate-y-0",
        )}
      >
        <div className="relative mx-auto w-full max-w-site px-3 pt-2.5 sm:px-5 lg:px-8 lg:pt-3">
          <div
            ref={shellRef}
            onPointerLeave={() => megaOpen && showMega(null, CLOSE_DELAY)}
            onPointerEnter={cancelPending}
            className={cn(
              "pointer-events-auto relative grid grid-cols-[1fr_auto] items-center gap-2 rounded-full border pr-1.5 pl-4 sm:pl-5 lg:grid-cols-[1fr_auto_1fr] lg:pr-2 xl:gap-4",
              "backdrop-blur-2xl backdrop-saturate-[1.6] transition-[height,background-color,border-color,box-shadow] duration-700 ease-expo motion-reduce:transition-none",
              raised ? "h-14 lg:h-[3.75rem]" : "h-[3.25rem] lg:h-16",
              dense
                ? "border-white/60 bg-[rgb(247_248_251/0.86)] shadow-[0_24px_60px_-28px_rgb(0_0_0/0.65),inset_0_1px_0_rgb(255_255_255/0.95),inset_0_-1px_0_rgb(197_203_214/0.35)]"
                : "border-platinum/70 bg-[rgb(247_248_251/0.72)] shadow-[0_18px_44px_-26px_rgb(16_19_32/0.35),0_1px_3px_rgb(16_19_32/0.05),inset_0_1px_0_rgb(255_255_255/0.95)]",
            )}
          >
            <Logo priority onClick={() => close()} className="shrink-0 justify-self-start" />

            {/* Centred navigation pill */}
            <nav aria-label="Main" className="hidden lg:block">
              <ul
                ref={navRef}
                className="relative flex items-center rounded-full border border-platinum/60 bg-white/55 p-1 shadow-[inset_0_1px_2px_rgb(16_19_32/0.06)]"
              >
                <li
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute top-1 bottom-1 rounded-full bg-obsidian shadow-[0_8px_18px_-8px_rgb(16_19_32/0.6),inset_0_1px_0_rgb(255_255_255/0.14)]",
                    ready && "transition-[left,width,opacity] duration-700 ease-expo motion-reduce:transition-none",
                    indicator.visible ? "opacity-100" : "opacity-0",
                  )}
                  style={{ left: indicator.left, width: indicator.width }}
                >
                  <span className="absolute top-1/2 left-2 size-1 -translate-y-1/2 rounded-full bg-imperial-300 min-[1180px]:left-3 xl:left-[0.875rem]" />
                </li>
                {navItems.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  const menu = menuFor(item.href);
                  const expanded = menu !== null && megaOpen === menu;
                  return (
                    <li
                      key={item.href}
                      data-active={active || undefined}
                      className="relative flex items-center"
                      onPointerEnter={(e) => {
                        if (e.pointerType !== "mouse") return;
                        if (menu) showMega(menu, megaOpen ? (megaOpen === menu ? 0 : SWITCH_DELAY) : OPEN_DELAY);
                        else if (megaOpen) showMega(null, CLOSE_DELAY);
                        else cancelPending();
                      }}
                      onPointerLeave={(e) => {
                        // Leaving a trigger before its intent delay elapses cancels the pending open/switch.
                        if (e.pointerType === "mouse" && menu && megaOpen !== menu) cancelPending();
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => showMega(null)}
                        className={cn(
                          "relative block rounded-full py-2 text-[0.8125rem] font-medium tracking-[-0.005em] whitespace-nowrap outline-none xl:text-[0.875rem]",
                          "transition-[color,transform] duration-500 ease-expo motion-reduce:transition-none",
                          "focus-visible:ring-2 focus-visible:ring-imperial focus-visible:ring-offset-2 focus-visible:ring-offset-porcelain",
                          menu
                            ? "pr-1 pl-2.5 min-[1180px]:pr-1.5 min-[1180px]:pl-4 xl:pl-5"
                            : "px-2.5 min-[1180px]:px-4 xl:px-5",
                          active && "pl-[1.375rem] min-[1180px]:pl-[1.625rem] xl:pl-[1.875rem]",
                          active
                            ? "text-white"
                            : expanded
                              ? "text-ink"
                              : "text-slate hover:-translate-y-px hover:text-ink",
                        )}
                      >
                        {item.short ?? item.label}
                      </Link>
                      {menu ? (
                        <button
                          ref={(b) => {
                            triggers.current[menu] = b;
                          }}
                          type="button"
                          aria-expanded={expanded}
                          aria-controls="mega-menu"
                          onClick={(e) => toggleMega(menu, e.detail === 0)}
                          className={cn(
                            "relative mr-1 grid size-6 place-items-center rounded-full transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-imperial",
                            active
                              ? "text-white/80 hover:bg-white/15 hover:text-white"
                              : expanded
                                ? "bg-white text-imperial shadow-[0_2px_6px_-2px_rgb(16_19_32/0.3)]"
                                : "text-slate hover:bg-white hover:text-ink",
                          )}
                        >
                          <span className="sr-only">{`${expanded ? "Hide" : "Show"} ${item.short ?? item.label} menu`}</span>
                          <Chevron open={expanded} />
                        </button>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3 justify-self-end">
              <span aria-hidden className="hidden h-6 w-px bg-platinum xl:block" />
              <Link
                href="/contact"
                aria-current={contactActive ? "page" : undefined}
                onPointerEnter={() => megaOpen && showMega(null, CLOSE_DELAY)}
                className={cn(
                  "group/cta relative isolate hidden h-11 items-center gap-2.5 overflow-hidden rounded-full pr-1.5 pl-5 text-[0.875rem] font-medium whitespace-nowrap text-white outline-none lg:inline-flex",
                  "bg-imperial shadow-[0_10px_24px_-12px_rgb(18_72_216/0.8),inset_0_1px_0_rgb(255_255_255/0.2)] transition-[transform,box-shadow] duration-500 ease-expo hover:-translate-y-px hover:shadow-[0_14px_30px_-12px_rgb(18_72_216/0.85)]",
                  "focus-visible:ring-2 focus-visible:ring-imperial focus-visible:ring-offset-2",
                  "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-obsidian before:transition-transform before:duration-700 before:ease-expo hover:before:scale-x-100 focus-visible:before:scale-x-100",
                )}
              >
                Contact Us
                <span
                  aria-hidden
                  className="grid size-8 place-items-center overflow-hidden rounded-full bg-white/15 transition-colors duration-500 group-hover/cta:bg-white group-hover/cta:text-obsidian"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3.5 transition-transform duration-500 ease-expo group-hover/cta:translate-x-0.5"
                  >
                    <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </Link>

              {/* Mobile / tablet menu pill */}
              <button
                ref={toggleRef}
                type="button"
                className={cn(
                  "group/menu inline-flex h-10 items-center gap-3 rounded-full pr-3.5 pl-4 text-[0.8125rem] font-medium transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-imperial focus-visible:ring-offset-2 lg:hidden",
                  open
                    ? "bg-obsidian text-white"
                    : "bg-white/80 text-ink ring-1 ring-platinum/70 hover:bg-obsidian hover:text-white",
                )}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <span aria-hidden>{open ? "Close" : "Menu"}</span>
                <span aria-hidden className="relative block h-2.5 w-4">
                  <span
                    className={cn(
                      "absolute left-0 h-px w-4 bg-current transition-transform duration-700 ease-expo",
                      open ? "top-[0.3rem] rotate-45" : "top-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute right-0 h-px bg-current transition-all duration-700 ease-expo",
                      open ? "top-[0.3rem] w-4 -rotate-45" : "top-2.5 w-2.5 group-hover/menu:w-4",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>

          <MegaMenu
            ref={megaRef}
            open={megaOpen}
            content={megaContent}
            onNavigate={() => showMega(null)}
            onPointerEnter={cancelPending}
            onPointerLeave={() => showMega(null, CLOSE_DELAY)}
            onKeyDown={onMegaKey}
          />
        </div>
      </header>

      {/* Sibling, not child: the header's transform would otherwise clip a fixed overlay. */}
      <MobileMenu ref={menuRef} open={open} pathname={pathname} onNavigate={() => close()} address={site.address} />
    </>
  );
}
