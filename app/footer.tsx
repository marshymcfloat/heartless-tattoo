import Image from "next/image";
import { contact } from "./contact-info";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.main}>
        <a className={styles.brand} href="#home" aria-label="Heartless Tattoo home">
          <Image src="/brand/heartless-tattoo-wordmark.png" alt="Heartless Tattoo" width={1200} height={346} sizes="(max-width: 600px) 280px, 240px" />
        </a>
        <p className={styles.location}>Toronto<span>Made personal. Worn forever.</span></p>
        <div className={styles.contact}>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.phoneHref}>{contact.phone}</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Heartless Tattoo</span>
      </div>
    </footer>
  );
}
