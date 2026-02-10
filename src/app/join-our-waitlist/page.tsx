import WaitlistForm from "@/components/WaitlistForm";
import styles from "./waitlist.module.css";

export const metadata = {
    title: "Join Our Waitlist - AYRO",
    description: "Join the AYRO waitlist and be the first to experience the future of ridesharing.",
    alternates: {
        canonical: 'https://ayrorides.com/join-our-waitlist/',
    },
};

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

            {/* Waitlist Form Section */}
            <section className={styles.formSection}>
                <div className={styles.formContainer}>
                    <h2 className={styles.formTitle}>
                        Join AYRO's referral program! Win ride credits and other prizes.
                    </h2>
                    <p className={styles.formSubtitle}>
                        Be the first to experience the future of ridesharing.
                        Sign up now to get exclusive updates and priority access.
                    </p>

                    <div className={styles.formWrapper}>
                        <WaitlistForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
