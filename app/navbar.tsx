"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./navbar.module.css";

gsap.registerPlugin(useGSAP);

const links = [
  { label: "Home", id: "home" },
  { label: "Work", id: "work" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
];

export default function Navbar() {
  const rootRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const sheetHeaderRef = useRef<HTMLDivElement>(null);
  const sheetLinksRef = useRef<HTMLDivElement>(null);
  const sheetFooterRef = useRef<HTMLDivElement>(null);
  const sheetTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useGSAP(() => {
    if (!mounted || !menuOpen || !sheetRef.current || !sheetLinksRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sheet = sheetRef.current;
    const items = [sheetHeaderRef.current, ...sheetLinksRef.current.querySelectorAll("p, a"), sheetFooterRef.current].filter(Boolean);
    const timeline = gsap.timeline({ onReverseComplete: () => {
      setMenuOpen(false);
      toggleRef.current?.focus();
    } });
    timeline
      .fromTo(sheet, { xPercent: 100 }, { xPercent: 0, duration: 0.7, ease: "power3.inOut" }, 0)
      .fromTo(items, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.045, ease: "power2.out" }, 0.24);
    sheetTimelineRef.current = timeline;
    return () => {
      sheetTimelineRef.current = null;
    };
  }, { dependencies: [mounted, menuOpen], scope: sheetRef, revertOnUpdate: true });

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 901px)",
      mobile: "(max-width: 900px)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { desktop, reduced } = context.conditions!;
      const transition = gsap.timeline({ paused: true, defaults: { duration: 0.65, ease: "power3.inOut" } });
      transition
        .fromTo(surfaceRef.current, { autoAlpha: 0, scaleX: 1.04, scaleY: 1.14 }, { autoAlpha: 1, scaleX: 1, scaleY: 1 }, 0)
        .fromTo(barRef.current, { y: desktop ? 12 : 4 }, { y: 0 }, 0)
        .fromTo(brandRef.current, { x: desktop ? -16 : 0, scale: desktop ? 1.06 : 1 }, { x: 0, scale: 1 }, 0)
        .fromTo(actionsRef.current, { x: desktop ? 16 : 0 }, { x: 0 }, 0)
        .fromTo(fillRef.current, { opacity: 0 }, { opacity: 1 }, 0);

      let scrolled = window.scrollY > 48;
      let frame = 0;
      const sections = [...links, { id: "consultation" }].map((link) => ({ id: link.id, element: document.getElementById(link.id) }));

      function update() {
        frame = 0;
        const nextScrolled = window.scrollY > (scrolled ? 24 : 48);
        let section = "home";
        for (const item of sections) {
          if (item.element && item.element.getBoundingClientRect().top <= 160) section = item.id;
        }
        setActive((current) => current === section ? current : section);
        if (nextScrolled !== scrolled) {
          scrolled = nextScrolled;
          if (rootRef.current) rootRef.current.dataset.scrolled = String(scrolled);
          if (reduced) transition.progress(scrolled ? 1 : 0).pause();
          else if (scrolled) transition.play();
          else transition.reverse();
        }
      }

      function scheduleUpdate() {
        if (!frame) frame = requestAnimationFrame(update);
      }

      if (rootRef.current) rootRef.current.dataset.scrolled = String(scrolled);
      transition.progress(scrolled ? 1 : 0).pause();
      scheduleUpdate();
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", scheduleUpdate);
        window.removeEventListener("resize", scheduleUpdate);
      };
    });
    return () => media.revert();
  }, { scope: rootRef });

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusable = sheetRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    const desktop = window.matchMedia("(min-width: 901px)");
    function closeOnDesktop() {
      if (desktop.matches) {
        sheetTimelineRef.current?.pause(0);
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  function closeMenu() {
    if (!menuOpen) return;
    if (!sheetTimelineRef.current || sheetTimelineRef.current.progress() === 0) {
      setMenuOpen(false);
      toggleRef.current?.focus();
      return;
    }
    sheetTimelineRef.current.reverse();
  }

  function openMenu() {
    setMenuOpen(true);
  }

  return (
    <header ref={rootRef} className={styles.header} data-menu-open={menuOpen}>
      <div ref={barRef} className={styles.bar}>
        <div ref={surfaceRef} className={styles.surface} aria-hidden="true" />
        <a ref={brandRef} className={styles.brand} href="#home" aria-label="Heartless Tattoo home" onClick={closeMenu}>
          <Image src="/brand/heartless-tattoo-wordmark.png" alt="" width={1200} height={346} sizes="(max-width: 600px) 140px, 180px" preload />
        </a>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {links.map((link) => <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "location" : undefined}>{link.label}<span className={styles.marker} aria-hidden="true" /></a>)}
        </nav>

        <div ref={actionsRef} className={styles.actions}>
          <a className={styles.booking} href="#consultation" onClick={closeMenu} aria-label="Book a consultation">
            <span ref={fillRef} className={styles.bookingFill} aria-hidden="true" />
            <span className={styles.bookingLabel}><span className={styles.fullLabel}>Book a consultation</span><span className={styles.shortLabel}>Book</span></span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10" stroke="currentColor" strokeWidth="1.4" /></svg>
          </a>
          <button ref={toggleRef} type="button" className={styles.toggle} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => menuOpen ? closeMenu() : openMenu()}>
            <span /><span />
          </button>
        </div>
      </div>

      {mounted && createPortal(<nav ref={sheetRef} id="mobile-navigation" className={styles.mobileNav} data-open={menuOpen} aria-label="Mobile navigation" aria-hidden={!menuOpen} inert={!menuOpen} data-lenis-prevent>
        <div ref={sheetHeaderRef} className={styles.mobileSheetHeader}>
          <a className={styles.mobileSheetBrand} href="#home" aria-label="Heartless Tattoo home" onClick={closeMenu}>
            <Image src="/brand/heartless-tattoo-wordmark.png" alt="" width={1200} height={346} sizes="140px" />
          </a>
          <button type="button" className={styles.mobileClose} aria-label="Close navigation" onClick={closeMenu}><span /><span /></button>
        </div>
        <div ref={sheetLinksRef} className={styles.mobileNavLinks}>
          <p>Explore Heartless Tattoo</p>
        {links.map((link, index) => <a key={link.id} href={`#${link.id}`} onClick={closeMenu} aria-current={active === link.id ? "location" : undefined}><span className={styles.number}>0{index + 1}</span>{link.label}<svg className={styles.mobileArrow} viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4.5 15.5 15.5 4.5M6 4.5h9.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a>)}
        </div>
        <div ref={sheetFooterRef} className={styles.mobileSheetFooter}><div className={styles.mobileNote}>East York, Ontario / Canada</div></div>
      </nav>, document.body)}
    </header>
  );
}
