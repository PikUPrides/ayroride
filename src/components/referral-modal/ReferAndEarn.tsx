"use client";

import { usePathname } from "next/navigation";
import styles from "../../app/page.module.css";
import WaitlistForm from "@/components/WaitlistForm";

export default function ReferAndEarn() {
  const pathname = usePathname();

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
