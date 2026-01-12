"use client";

import Script from "next/script";
import styles from "./waitlist.module.css";

export default function JoinOurWaitlist() {
    return (
        <main>
            {/* Header Section */}
            <section className={styles.headerSection}>
                <h1 className={styles.headerTitle}>
                    Join Our <span className={styles.blueText}>Waitlist</span>
                </h1>
            </section>

            {/* Section Divider */}
            <div className={styles.sectionDivider}>
                <div className={styles.dividerContainer}>
                    <div className={styles.dividerTeal}></div>
                    <div className={styles.dividerBlue}></div>
                </div>
            </div>

            {/* ReferralHero Embed Section */}
            <section className={styles.formSection}>
                <div className={styles.formContainer}>
                    <div id='referralhero-dashboard-MF2f0c6063df'></div>
                </div>
            </section>

            {/* ReferralHero Script */}
            <Script
                id="referralhero-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            !function(m,a,i,t,r,e){if(m.RH)return;r=m.RH={},r.uuid=t,r.loaded=0,r.d=m.document,r.u="https://referralhero.com/assets/widgets/referralhero.js",r.l=function(){var a,t;return m.document.getElementById("referralhero-js")?void 0:(a=m.document.createElement("script"),a.type="text/javascript",a.id="referralhero-js",a.async=!0,a.src=r.u,t=m.document.getElementsByTagName("script")[0],void t.parentNode.insertBefore(a,t))},r.l(),m.addEventListener("load",function(){r.loaded=1})}(window,document,"script","MF2f0c6063df");
          `,
                }}
            />
        </main>
    );
}
