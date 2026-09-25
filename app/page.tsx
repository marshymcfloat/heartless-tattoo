import Image, { getImageProps } from "next/image";
import About from "./about";
import Booking from "./booking";
import Footer from "./footer";
import Navbar from "./navbar";
import { contact } from "./contact-info";
import SelectedWork from "./selected-work";
import styles from "./page.module.css";

const tattooWork = [
  { src: "/tattoo-images/services-marquee/gallery-1.jpg", width: 1170, height: 1560, title: "Gallery 01", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-2.jpg", width: 1170, height: 1560, title: "Gallery 02", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-3.jpg", width: 1170, height: 1559, title: "Gallery 03", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-4.jpg", width: 1170, height: 1560, title: "Gallery 04", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-5.jpg", width: 1209, height: 1611, title: "Gallery 05", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-6.jpg", width: 1170, height: 1560, title: "Gallery 06", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-7.jpg", width: 1170, height: 1560, title: "Gallery 07", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-8.jpg", width: 1170, height: 1560, title: "Gallery 08", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-9.jpg", width: 1170, height: 1560, title: "Gallery 09", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-10.jpg", width: 1170, height: 1463, title: "Gallery 10", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-11.jpg", width: 1170, height: 1170, title: "Gallery 11", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-12.jpg", width: 820, height: 1073, title: "Gallery 12", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-13.jpg", width: 1170, height: 1560, title: "Gallery 13", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-14.jpg", width: 1170, height: 1560, title: "Gallery 14", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-15.jpg", width: 1170, height: 1170, title: "Gallery 15", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-16.jpg", width: 1170, height: 1170, title: "Gallery 16", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-17.jpg", width: 1170, height: 1170, title: "Gallery 17", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-18.jpg", width: 1170, height: 1170, title: "Gallery 18", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-19.jpg", width: 1170, height: 1170, title: "Gallery 19", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
  { src: "/tattoo-images/services-marquee/gallery-20.jpg", width: 1170, height: 1560, title: "Gallery 20", alt: "Tattoo artwork from the Heartless Tattoo gallery" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={styles.arrow}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path d={diagonal ? "M4 14 14 4M6 4h8v8" : "M3 9h12M10 4l5 5-5 5"} />
    </svg>
  );
}

function Marquee() {
  const text = "HEARTLESS TATTOO — ";

  return (
    <div className={styles.marquee} aria-label="Heartless Tattoo">
      <div className={styles.marqueeTrack} aria-hidden="true">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

function WorkMarquee() {
  return (
    <span className={styles.workViewport} aria-hidden="true">
      <span className={styles.workTrack}>
        {[0, 1].map((group) => (
          <span className={styles.workGroup} key={group}>
            {tattooWork.slice(0, 6).map((image) => (
              <Image
                className={styles.workPhoto}
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                sizes="(max-width: 700px) 96px, 116px"
                key={image.src}
              />
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Home() {
  const { props: desktopHero } = getImageProps({
    src: "/tattoo-images/hero-models-reference-v3.png",
    alt: "Tattoo portrait showcasing blackwork arm artwork",
    width: 1536,
    height: 1024,
    sizes: "(max-width: 1100px) 96vw, 1040px",
    loading: "eager",
    fetchPriority: "high",
  });
  const { props: mobileHero } = getImageProps({
    src: "/tattoo-images/hero-mobile.png",
    alt: desktopHero.alt,
    width: 1024,
    height: 1536,
    sizes: "100vw",
  });

  return (
    <main className={styles.hero} id="home">
      <Navbar />

      <section className={styles.heroContent} aria-labelledby="hero-title">
        <h1 id="hero-title" className={styles.srOnly}>
          Heartless Tattoo
        </h1>

        <div className={styles.socials}>
          <a href="https://www.instagram.com/hrtlss.tattss/">Instagram</a>
          <a href={contact.phoneHref}>{contact.phone}</a>
        </div>

        <p className={styles.statement}>
          Every line I create carries a piece of who I am. Tattooing is not what
          I do for a living—it&apos;s what I live for.
        </p>

        <Marquee />

        <picture>
          <source
            media="(max-width: 700px)"
            srcSet={mobileHero.srcSet}
            sizes={mobileHero.sizes}
            width={1024}
            height={1536}
          />
          {/* getImageProps supplies Next.js-optimized responsive sources. */}
          <img {...desktopHero} alt={desktopHero.alt} className={styles.heroModels} />
        </picture>

        <p className={styles.location}>Based in East York, Ontario</p>

        <a className={styles.workCard} href="#work" aria-label="See selected work">
          <span className={styles.workCardLabel}>
            <span>See work</span>
            <span className={styles.workCardMeta}>
              {String(tattooWork.length).padStart(2, "0")}
              <Arrow diagonal />
            </span>
          </span>
          <WorkMarquee />
        </a>
      </section>
      <div className={styles.contentPanel}>
        <SelectedWork works={tattooWork} />
        <About />
        <Booking />
        <Footer />
      </div>
    </main>
  );
}
