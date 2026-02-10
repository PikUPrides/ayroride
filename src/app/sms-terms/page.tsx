import React from "react";
import styles from "./sms.module.css";

export const metadata = {
    title: "SMS Messaging Terms - AYRO",
    description: "Terms and conditions regarding SMS messaging from AYRO Inc.",
    alternates: {
        canonical: 'https://ayrorides.com/sms-terms/',
    },
};

export default function SmsMessagingTerms() {
    return (
        <main>
            {/* Header Section */}
            <section className={styles.headerSection}>
                <h1 className={styles.headerTitle}>
                    SMS Messaging <span className={styles.blueText}>Terms</span>
                </h1>
            </section>

            {/* Section Divider */}
            <div className={styles.sectionDivider}>
                <div className={styles.dividerContainer}>
                    <div className={styles.dividerTeal}></div>
                    <div className={styles.dividerBlue}></div>
                </div>
            </div>

            {/* Content Section */}
            <section className={styles.contentSection}>
                <div className={styles.contentContainer}>
                    <p>
                        By opting in to receive SMS messages from AYRO Inc., you agree to the following terms regarding mobile text communications:
                    </p>

                    <h3>1. Consent & Opt-In</h3>
                    <p>
                        By providing your mobile phone number and opting in, you consent to receiving SMS messages related to your account, ride status, authentication (OTP), and service notifications.
                    </p>

                    <h3>2. Message Frequency & Rates</h3>
                    <p>
                        Message frequency varies. Standard message and data rates may apply based on your carrier plan.
                    </p>

                    <h3>3. Opt-Out</h3>
                    <p>
                        You may opt out at any time by replying “STOP” to any SMS message received. After opting out, you will no longer receive SMS messages from us.
                    </p>

                    <h3>4. Help</h3>
                    <p>
                        For help regarding SMS messages, reply “HELP” or email hello@ayrorides.com.
                    </p>

                    <h3>5. Privacy</h3>
                    <p>
                        Your phone number and messaging consent are used only for the purposes described herein. We do not share or sell your personal information to third parties for marketing purposes.
                    </p>

                    <h3>6. Carrier Disclaimer</h3>
                    <p>
                        Carriers are not liable for delayed or undelivered messages.
                    </p>
                </div>
            </section>
        </main>
    );
}
