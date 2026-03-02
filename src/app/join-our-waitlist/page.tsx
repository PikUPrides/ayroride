import WaitlistForm from "@/components/WaitlistForm";
import WaitlistFaq from "@/components/WaitlistFaq";
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
                        Join Our Waitlist, Refer Friends & Earn Rewards
                    </h2>
                    <p className={styles.formSubtitle}>
                        Join the waitlist and share your referral link. The more friends you refer, the bigger your rewards — including cash, ride credits, and a chance to win a MacBook Pro!
                    </p>

                    {/* Referral Rewards Section */}
                    <div className={styles.rewardsSection}>
                        <div className={styles.rewardsTableWrapper}>
                            <table className={styles.rewardsTable}>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Winners</th>
                                        <th>Reward</th>
                                        <th>Referrals Needed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={styles.tierGold}>
                                        <td><span className={styles.rankBadge}>&#127942; 1st</span></td>
                                        <td>1</td>
                                        <td><strong>$1,000 cash</strong> + $1,200 ride credit + MacBook Pro giveaway entry</td>
                                        <td><span className={styles.referralCount}>50+</span></td>
                                    </tr>
                                    <tr className={styles.tierSilver}>
                                        <td><span className={styles.rankBadge}>2nd - 10th</span></td>
                                        <td>9</td>
                                        <td><strong>$500 cash</strong> + $600 ride credit + MacBook Pro giveaway entry</td>
                                        <td><span className={styles.referralCount}>25+</span></td>
                                    </tr>
                                    <tr className={styles.tierBronze}>
                                        <td><span className={styles.rankBadge}>11th - 60th</span></td>
                                        <td>49</td>
                                        <td><strong>$100 cash</strong> + $100 ride credit + MacBook Pro giveaway entry</td>
                                        <td><span className={styles.referralCount}>10+</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className={styles.rankBadge}>61st - 200th</span></td>
                                        <td>140</td>
                                        <td><strong>$50 cash</strong> + $50 ride credit + MacBook Pro giveaway entry</td>
                                        <td><span className={styles.referralCount}>5+</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className={styles.rankBadge}>201st - 500th</span></td>
                                        <td>300</td>
                                        <td><strong>$10 ride credit</strong></td>
                                        <td><span className={styles.referralCount}>3+</span></td>
                                    </tr>
                                    <tr className={styles.tierMacbook}>
                                        <td colSpan={3} className={styles.macbookRow}>
                                            All referrers are automatically entered into the <strong>MacBook Pro giveaway!</strong>
                                        </td>
                                        <td><span className={styles.referralCount}>1+</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h3 className={styles.formHeading}>
                        Join Now & Start Referring
                    </h3>

                    <div className={styles.formWrapper}>
                        <WaitlistForm />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <WaitlistFaq />
        </main>
    );
}
