"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ensureGsap, gsap, isMainRoute, MOTION_OK, ScrollTrigger, setLenis } from "@/lib/motion";

ensureGsap();

/**
 * Smooth wheel scrolling on every page (Lenis), and magnetic buttons on the six main pages.
 * Touch scrolling stays native, and reduced motion gets neither.
 */
export function MainMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches) return;
    const root = document.documentElement;

    const lenis = new Lenis({
      // Lower is a longer glide; under 1 is less distance per wheel notch.
      lerp: 0.075,
      wheelMultiplier: 0.85,
      anchors: true,
      // Dialogs and anything marked keep their own native scrolling.
      prevent: (node) => Boolean(node.closest("dialog, [data-lenis-prevent]")),
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // The mobile menu and documents dialog lock the page by setting overflow on <html>: wheel input must respect that.
    const syncLock = () => (root.style.overflow === "hidden" ? lenis.stop() : lenis.start());
    const lock = new MutationObserver(syncLock);
    lock.observe(root, { attributes: true, attributeFilter: ["style"] });

    return () => {
      lock.disconnect();
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      setLenis(null);
      lenis.destroy();
    };
  }, [pathname]);

  useEffect(() => {
    if (!isMainRoute(pathname)) return;
    if (!window.matchMedia(`${MOTION_OK} and (hover: hover) and (pointer: fine)`).matches) return;

    const PULL = 0.28;
    let active: HTMLElement | null = null;
    const release = (el: HTMLElement) =>
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.45)", overwrite: "auto" });

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("main [data-magnetic], footer [data-magnetic]");
      if (active && active !== el) release(active);
      active = el ?? null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Measured without the current offset, so the pull does not feed back into itself.
      const x = Number(gsap.getProperty(el, "x")) || 0;
      const y = Number(gsap.getProperty(el, "y")) || 0;
      gsap.to(el, {
        x: (e.clientX - (r.left - x + r.width / 2)) * PULL,
        y: (e.clientY - (r.top - y + r.height / 2)) * PULL,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (active) gsap.set(active, { clearProps: "x,y" });
    };
  }, [pathname]);

  return null;
}
