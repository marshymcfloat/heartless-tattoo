"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import ServiceExplorer from "./service-explorer";
import styles from "./selected-work.module.css";

gsap.registerPlugin(useGSAP);

type Work = {
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
};

function GalleryIcon({ type }: { type: "expand" | "close" | "previous" | "next" }) {
  const paths = {
    expand: "M4 10V4h6M14 4h6v6M20 14v6h-6M10 20H4v-6",
    close: "m6 6 12 12M6 18 18 6",
    previous: "M20 12H4m7-7-7 7 7 7",
    next: "M4 12h16m-7-7 7 7-7 7",
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[type]} stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function WorkMarquee({ works, offset, total, direction, paused, reducedMotion, onSelect }: {
  works: Work[];
  offset: number;
  total: number;
  direction: 1 | -1;
  paused: boolean;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const gestureUntilRef = useRef(0);
  const count = String(total).padStart(2, "0");

  useEffect(() => {
    const rail = railRef.current;
    const group = groupRef.current;
    if (!rail || !group || paused || reducedMotion) return;

    let frame = 0;
    let previousTime = 0;
    let position = rail.scrollLeft;
    let groupWidth = group.offsetWidth;
    let visible = false;
    const resizeObserver = new ResizeObserver(() => {
      groupWidth = group.offsetWidth;
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    resizeObserver.observe(group);
    visibilityObserver.observe(rail);

    function tick(time: number) {
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 0;
      previousTime = time;
      if (rail && visible && !document.hidden && !rail.matches(":focus-within") && time > gestureUntilRef.current && groupWidth > 0) {
        if (Math.abs(rail.scrollLeft - position) > 2) position = rail.scrollLeft;
        position = ((position + elapsed * 0.032 * direction) % groupWidth + groupWidth) % groupWidth;
        rail.scrollLeft = position;
      } else if (rail) {
        position = rail.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [direction, paused, reducedMotion, works.length]);

  return (
    <div
      ref={railRef}
      className={styles.rail}
      role="group"
      aria-label={`Selected tattoo work, images ${offset + 1} to ${offset + works.length}, horizontally scrollable gallery`}
      onPointerDown={() => { gestureUntilRef.current = performance.now() + 750; }}
      onPointerMove={(event) => {
        if (event.buttons) gestureUntilRef.current = performance.now() + 750;
      }}
      onWheel={(event) => {
        if (event.deltaX) gestureUntilRef.current = performance.now() + 750;
      }}
    >
      <div className={styles.track}>
        {(reducedMotion ? [0] : [0, 1]).map((copy) => (
          <div
            ref={copy === 0 ? groupRef : undefined}
            className={styles.group}
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
          >
            {works.map((work, index) => (
              <figure className={styles.piece} key={work.src}>
                <button
                  type="button"
                  className={styles.imageButton}
                  aria-label={`View ${work.title}`}
                  aria-haspopup="dialog"
                  tabIndex={copy === 1 ? -1 : 0}
                  onClick={() => onSelect(offset + index)}
                >
                  <Image
                    src={work.src}
                    alt={copy === 0 ? work.alt : ""}
                    width={work.width}
                    height={work.height}
                    sizes="(max-width: 700px) 256px, 336px"
                    className={styles.photo}
                  />
                  <span className={styles.expand} aria-hidden="true">
                    <GalleryIcon type="expand" />
                  </span>
                </button>
                <figcaption className={styles.caption}>
                  <span className={styles.number}>{String(offset + index + 1).padStart(2, "0")}</span>
                  <span className={styles.pieceTitle}>{work.title}</span>
                  <span className={styles.captionDetail}>/ {count}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SelectedWork({ works }: { works: Work[] }) {
  const lenis = useLenis();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeAnimationRef = useRef<(() => void) | null>(null);
  const closingRef = useRef(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, prefersReducedMotion, () => true);
  const isOpen = activeIndex !== null;
  const activeWork = activeIndex === null ? null : works[activeIndex];
  const count = String(works.length).padStart(2, "0");
  const splitIndex = Math.ceil(works.length / 2);

  useGSAP(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const wasStopped = lenis?.isStopped;
    lenis?.stop();
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    closingRef.current = false;

    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const reduced = context.conditions!.reduced;
      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
      entrance
        .fromTo(dialog, { opacity: 0 }, { opacity: 1, duration: reduced ? 0 : 0.4 }, 0)
        .fromTo(contentRef.current, { opacity: 0, scale: 0.94, y: 28 }, { opacity: 1, scale: 1, y: 0, duration: reduced ? 0 : 0.65 }, 0)
        .fromTo(closeButtonRef.current, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: reduced ? 0 : 0.3 }, reduced ? 0 : 0.12);

      const exit = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
        onComplete: () => setActiveIndex(null),
      });
      exit
        .to(contentRef.current, { opacity: 0, scale: 0.97, y: 16, duration: 0.28 }, 0)
        .to(closeButtonRef.current, { opacity: 0, y: -4, duration: 0.18 }, 0)
        .to(dialog, { opacity: 0, duration: 0.28 }, 0.06);

      closeAnimationRef.current = () => {
        if (closingRef.current) return;
        closingRef.current = true;
        entrance.kill();
        if (reduced) setActiveIndex(null);
        else exit.invalidate().restart();
      };

      if (closingRef.current) {
        entrance.kill();
        if (reduced) setActiveIndex(null);
        else exit.invalidate().restart();
      }

      return () => { closeAnimationRef.current = null; };
    });

    return () => {
      media.revert();
      dialog.close();
      closeAnimationRef.current = null;
      closingRef.current = false;
      document.documentElement.style.overflow = previousOverflow;
      document.body.style.overflow = previousBodyOverflow;
      if (!wasStopped) lenis?.start();
    };
  }, { dependencies: [isOpen, lenis], scope: dialogRef, revertOnUpdate: true });

  function closeViewer() {
    closeAnimationRef.current?.();
  }

  function move(direction: number) {
    if (closingRef.current) return;
    setActiveIndex((current) =>
      current === null ? null : (current + direction + works.length) % works.length,
    );
  }

  return (
    <section className={styles.section} id="work" aria-labelledby="selected-work-title">
      <header className={styles.heading}>
        <div>
          <p className={styles.kicker}>01 / The portfolio</p>
          <h2 id="selected-work-title">Selected <span>work.</span><sup>({count})</sup></h2>
        </div>
        <p className={styles.intro}>Different stories.<br /> The same attention to every line.</p>
      </header>

      <div className={styles.marquees}>
        {[0, splitIndex].map((offset) => (
          <WorkMarquee
            key={offset}
            works={works.slice(offset, offset + splitIndex)}
            offset={offset}
            total={works.length}
            direction={offset === 0 ? 1 : -1}
            paused={isOpen}
            reducedMotion={reducedMotion}
            onSelect={setActiveIndex}
          />
        ))}
      </div>

      <div className={styles.endnote}>
        <span className={styles.hint}>Scroll to explore <span aria-hidden="true">/</span> Click to enlarge</span>
      </div>

      <ServiceExplorer works={works} onPreviewSelect={setActiveIndex} />

      <dialog
        data-lenis-prevent
        ref={dialogRef}
        className={styles.viewer}
        aria-labelledby="work-viewer-title"
        onClose={(event) => {
          if (!event.currentTarget.open) setActiveIndex(null);
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeViewer();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeViewer();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <button
          ref={closeButtonRef}
          className={styles.close}
          type="button"
          aria-label="Close image viewer"
          onClick={closeViewer}
        >
          <span>Close</span><GalleryIcon type="close" />
        </button>
        {activeWork && (
          <div ref={contentRef} className={styles.viewerContent}>
            <Image
              key={activeWork.src}
              src={activeWork.src}
              alt={activeWork.alt}
              width={activeWork.width}
              height={activeWork.height}
              sizes="(max-width: 700px) 90vw, 80vh"
              loading="eager"
              className={styles.viewerPhoto}
            />
            <div className={styles.viewerFooter}>
              <div aria-live="polite" aria-atomic="true">
                <p className={styles.viewerCount}>{String((activeIndex ?? 0) + 1).padStart(2, "0")} / {count}</p>
                <h3 id="work-viewer-title">{activeWork.title}</h3>
              </div>
              <div className={styles.controls}>
                <button type="button" aria-label="Previous piece" onClick={() => move(-1)}><GalleryIcon type="previous" /></button>
                <button type="button" aria-label="Next piece" onClick={() => move(1)}><GalleryIcon type="next" /></button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
