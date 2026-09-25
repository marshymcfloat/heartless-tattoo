"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./service-explorer.module.css";

type PreviewImage = { src: string; alt: string; width: number; height: number };

const services = [
  { name: "Blackwork", imageIndex: 0 },
  { name: "Realism", imageIndex: 3 },
  { name: "B&G Portrait", imageIndex: 1 },
  { name: "Minimal", imageIndex: 4 },
  { name: "Custom tattoos", imageIndex: 2 },
] as const;

export default function ServiceExplorer({ works, onPreviewSelect }: { works: readonly PreviewImage[]; onPreviewSelect: (index: number) => void }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.services} id="services" role="group" aria-labelledby="services-title">
      <div className={styles.heading}>
        <h3 id="services-title">Styles & services</h3>
        <p>Your idea. Your way of wearing it.</p>
      </div>

      <div className={styles.layout}>
        <figure className={styles.preview} id="service-preview">
          <button
            type="button"
            className={styles.previewFrame}
            aria-label={`View ${services[selected].name} artwork larger`}
            onClick={() => onPreviewSelect(services[selected].imageIndex)}
          >
            {services.map((service, index) => {
              const work = works[service.imageIndex];
              return (
                <div
                  key={service.name}
                  className={styles.previewLayer}
                  data-active={selected === index}
                  aria-hidden={selected !== index}
                >
                  <Image
                    src={work.src}
                    alt={work.alt}
                    width={work.width}
                    height={work.height}
                    sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 35vw, 360px"
                  />
                </div>
              );
            })}
            <span className={styles.previewIndex} aria-hidden="true">{String(selected + 1).padStart(2, "0")} / 05</span>
          </button>
          <figcaption className={styles.previewCaption} aria-live="polite" aria-atomic="true">
            <span>{services[selected].name}</span>
            <span>Studio selection</span>
          </figcaption>
        </figure>

        <div className={styles.menu}>
          <p className={styles.instructions}><span className={styles.hoverHint}>Hover to explore</span><span className={styles.tapHint}>Tap to explore</span></p>
          <ul className={styles.list} role="list">
            {services.map((service, index) => (
              <li key={service.name}>
                <button
                  type="button"
                  className={styles.service}
                  aria-pressed={selected === index}
                  aria-controls="service-preview"
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse" || event.pointerType === "pen") setSelected(index);
                  }}
                  onFocus={() => setSelected(index)}
                  onClick={() => setSelected(index)}
                >
                  <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.name}>{service.name}</span>
                  <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
