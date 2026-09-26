"use client";

import { useState, type FormEvent } from "react";
import { contact } from "./contact-info";
import TattooStyleSelect from "./tattoo-style-select";
import styles from "./booking.module.css";

export default function Booking() {
  const [emailDraft, setEmailDraft] = useState<string | null>(null);

  function prepareInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const subject = `Tattoo inquiry — ${value("name")}`;
    const body = [
      "Hi Joeffrey,",
      "I'd like to discuss a tattoo idea.",
      "",
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Style: ${value("style")}`,
      `Placement: ${value("placement")}`,
      `Approximate size: ${value("size") || "To discuss"}`,
      `Budget (CAD): ${value("budget") || "To discuss"}`,
      "",
      "My idea:",
      value("idea"),
      "",
      `Reference link: ${value("reference") || "I'll attach images to this email."}`,
    ].join("\r\n");
    const draft = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setEmailDraft(draft);
    window.location.href = draft;
  }

  return (
    <section className={styles.section} id="consultation" aria-labelledby="booking-title">
      <div className={styles.topline}>
        <span>04 / Your next piece</span>
        <span>Let&apos;s start a conversation</span>
      </div>

      <div className={styles.layout}>
        <div className={styles.intro}>
          <h2 id="booking-title"><span className={styles.desktopLead}>Your idea.<br /></span><span>Let&apos;s make<br className={styles.desktopBreak} /> <span className={styles.permanent}>it permanent.</span></span></h2>
          <p>Something small. Something meaningful. Something entirely yours. Tell me what you have in mind, and we&apos;ll take it from there.</p>
        </div>

        <form className={styles.form} action={`mailto:${contact.email}`} method="post" encType="text/plain" onSubmit={prepareInquiry} onChange={() => setEmailDraft(null)}>
          <div className={styles.formHeading}>
            <h3>Book a consultation</h3>
            <span>* Required</span>
          </div>
          <div className={styles.fields}>
            <label className={styles.field}>
              <span>Your name *</span>
              <input name="name" autoComplete="name" placeholder="Full name" required maxLength={80} pattern=".*\S.*" />
            </label>
            <label className={styles.field}>
              <span>Email address *</span>
              <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={120} />
            </label>
            <div className={styles.field}>
              <span id="tattoo-style-label">Tattoo style *</span>
              <TattooStyleSelect labelledBy="tattoo-style-label" onChange={() => setEmailDraft(null)} />
            </div>
            <label className={styles.field}>
              <span>Placement *</span>
              <input name="placement" placeholder="e.g. Inner forearm" required maxLength={80} pattern=".*\S.*" />
            </label>
            <label className={styles.field}>
              <span>Approximate size <small>/ optional</small></span>
              <input name="size" placeholder="e.g. 10 × 15 cm" maxLength={60} />
            </label>
            <label className={styles.field}>
              <span>Budget in CAD <small>/ optional</small></span>
              <input name="budget" placeholder="Your comfortable range" maxLength={60} />
            </label>
            <label className={`${styles.field} ${styles.wide}`}>
              <span>Tell me about your idea *</span>
              <textarea name="idea" placeholder="The story, the subject, the details. A rough idea is a good place to start." rows={4} required minLength={10} maxLength={1000} />
            </label>
            <label className={`${styles.field} ${styles.wide}`}>
              <span>Reference link <small>/ optional</small></span>
              <input name="reference" type="url" placeholder="https://" maxLength={300} aria-describedby="reference-note" />
              <small id="reference-note" className={styles.help}>Or attach your reference images when your email opens.</small>
            </label>
          </div>
          <div className={styles.submitRow}>
          <p id="booking-note"><span className={styles.desktopNote}>Opens your email app with your inquiry ready to send. Your appointment is confirmed directly with Joeffrey.</span><span className={styles.mobileNote}>Opens your email app. Send the draft to complete your request.</span></p>
            <button type="submit" aria-describedby="booking-note">
              Continue to email
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
          </div>
          <div className={styles.status} role="status" aria-live="polite">
            {emailDraft && <p>Your inquiry is ready. Send it from your email app to complete your request. Didn&apos;t open? <a href={emailDraft}>Open the email draft again</a> or email <a href={`mailto:${contact.email}`}>{contact.email}</a>. Nothing has been sent by this website.</p>}
          </div>
          <noscript><p>Email <a href={`mailto:${contact.email}`}>{contact.email}</a> directly to discuss your tattoo.</p></noscript>
        </form>

        <div className={styles.contact}>
          <span>Prefer to reach out directly?</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.phoneHref}>{contact.phone}</a>
          <p className={styles.location}>Toronto</p>
        </div>
      </div>
    </section>
  );
}
