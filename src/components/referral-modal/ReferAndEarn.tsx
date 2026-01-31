"use client";

import styles from "../../app/page.module.css";
import WaitlistForm from "../WaitlistForm";

export default function ReferAndEarn() {
  return (
    <section className={styles.referSection}>
      <div className={styles.referContent}>
        <div className={styles.referText}>
          <h2>
            Refer and <span style={{ color: "#423DF9" }}>Earn</span>
          </h2>
          <p>Join the waitlist now and get your unique referral link</p>
        </div>
        <div className={styles.referFormWrapper}>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
