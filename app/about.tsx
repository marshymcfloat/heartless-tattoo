import Image from "next/image";
import styles from "./about.module.css";

export default function About() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <div className={styles.topline}>
        <span>03 / The artist</span>
        <span>Heartless Tattoo — Joefrey Zabalo</span>
      </div>

      <div className={styles.layout}>
        <div className={styles.storyIntro}>
          <p className={styles.eyebrow}>Behind the work</p>
          <h2 id="about-title">
            Every mark<br />
            <span>carries a story.</span>
          </h2>
          <p className={styles.lead}>
            Joefrey Zabalo is a tattoo artist from Puerto Princesa City,
            Palawan, Philippines. Today, he lives with his wife in East York,
            Ontario, where she works.
          </p>
        </div>

        <figure className={styles.artwork}>
          <div className={styles.imageFrame}>
            <Image
              src="/tattoo-images/joefrey-zabalo-street-original.png"
              alt="Black-and-white portrait of tattoo artist Joefrey Zabalo"
              width={570}
              height={860}
              sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 30vw, 380px"
            />
          </div>
          <figcaption><span>Joefrey Zabalo</span><span>The artist</span></figcaption>
        </figure>

        <div className={styles.storyOutro}>
          <p className={styles.reflection}>
            Home is part of what he carries into his craft. Every piece begins
            with listening, then becomes something considered and personal —
            made to mean more with time, not less.
          </p>
          <p className={styles.signature}>Joefrey Zabalo <span>/ Tattoo artist</span></p>
        </div>
      </div>

      <div className={styles.journey} aria-label="From Puerto Princesa City, Palawan, to East York, Ontario">
        <div className={styles.place}>
          <span className={styles.placeLabel}>Where it began / PH</span>
          <strong>Puerto Princesa City<span>Palawan, Philippines</span></strong>
        </div>
        <div className={styles.path} aria-hidden="true"><span /></div>
        <div className={`${styles.place} ${styles.currentPlace}`}>
          <span className={styles.placeLabel}>Where he is now / CA</span>
          <strong>East York<span>Ontario, Canada</span></strong>
        </div>
      </div>
    </section>
  );
}
