import styles from "./page.module.css";
import TestimonialCarousel from "./components/TestimonialCarousel";

export const metadata = {
    title: "Services – Ayro – Referral Program",
    description: "Join the rebellion against surge pricing and unfair practices while earning significant rewards through our gamified referral system.",
    openGraph: {
        title: "Services – Ayro – Referral Program",
        description: "Join the rebellion against surge pricing and unfair practices while earning significant rewards through our gamified referral system.",
        url: "https://ayrorides.com/services",
        images: [
            {
                url: "/assets/OG.png",
                width: 1200,
                height: 630,
                alt: "Ayro Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Services – Ayro – Referral Program",
        description: "Join the rebellion against surge pricing. Earn rewards through our gamified referral system.",
    },
};

const features = [
    {
        iconDefault: "/assets/Group-1-16.svg",
        iconHover: "/assets/Group-7-4.svg",
        title: "Cash Rewards",
        text: "Earn up to $1,000 in cash prizes by simply referring friends to join our movement against exploitative ride-sharing."
    },
    {
        iconDefault: "/assets/Group-2-9.svg",
        iconHover: "/assets/Group-8-4.svg",
        title: "Ride Credits",
        text: "Unlock exclusive ride credits as you climb our referral tiers, ensuring more affordable transportation for yourself and peers."
    },
    {
        iconDefault: "/assets/Group-3-5.svg",
        iconHover: "/assets/Group-9-3.svg",
        title: "MacBook Giveaway",
        text: "Every referral increases your chances to win a brand-new MacBook Pro in our exclusive giveaway for early adopters."
    },
    {
        iconDefault: "/assets/Group-4-5.svg",
        iconHover: "/assets/Group-10-3.svg",
        title: "Early Adopter Status",
        text: "Gain recognition as a founding member of the movement that's reshaping the future of ethical ride-sharing."
    },
    {
        iconDefault: "/assets/Group-5-3.svg",
        iconHover: "/assets/Group-11-3.svg",
        title: "Viral Dashboard",
        text: "Access your personalized dashboard to track referrals, monitor rewards, and optimize your sharing strategy."
    },
    {
        iconDefault: "/assets/Group-6-3.svg",
        iconHover: "/assets/Group-12-3.svg",
        title: "Predictable Pricing",
        text: "Help create a future where riders enjoy consistent, fair fares without the frustration of unexpected surge pricing."
    }
];







export default function Services() {
    return (
        <main>
            {/* Hero Section */}
            <section className={styles.servicesHero}>
                <h1 className={styles.heroTitle}>
                    Our <span>Services</span>
                </h1>
            </section>

            {/* Two Color Divider */}
            <div className={styles.sectionDivider}>
                <div className={styles.dividerContainer}>
                    <div className={styles.dividerTeal}></div>
                    <div className={styles.dividerBlue}></div>
                </div>
            </div>

            {/* Revolution Section */}
            <section className={styles.revolutionSection}>
                <div className={styles.revolutionContainer}>
                    <span className={styles.revolutionBadge}>ALL IN SOLUTION</span>
                    <h2 className={styles.revolutionTitle}>
                        The Ride-Share Revolution <span>Begins Here</span>
                    </h2>
                    <p className={styles.revolutionIntro}>
                        Join the revolt against surge pricing and unfair practices - and earn valuable rewards.
                    </p>
                </div>

                {/* Features Grid */}
                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.iconWrapper}>
                                <img
                                    src={feature.iconDefault}
                                    alt={feature.title}
                                    className={`${styles.featureIcon} ${styles.iconDefault}`}
                                />
                                <img
                                    src={feature.iconHover}
                                    alt={feature.title}
                                    className={`${styles.featureIcon} ${styles.iconHover}`}
                                />
                            </div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureText}>{feature.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className={styles.futureSection}>
                <div className={styles.futureContainer}>
                    <div className={styles.futureBadge}>WHY CHOOSE US</div>
                    <h2 className={styles.futureTitle}>
                        Be Part of <br className={styles.mobileBreak} /> <span>Transportation's Future</span>
                    </h2>
                    <p className={styles.futureSubtitle}>
                        Join our movement to disrupt the ride-<br className={styles.mobileBreak} />
                        share industry and create fair, affordable<br className={styles.mobileBreak} />
                        transportation for all.
                    </p>

                    <div className={styles.chooseUsGrid}>
                        <div className={styles.chooseUsCard}>
                            <div className={styles.chooseUsIcon}>
                                <img src="/assets/Group-6-2.svg" alt="Become an early adopter" width={65} height={67} />
                            </div>
                            <h3 className={styles.chooseUsTitle}>Become an early adopter</h3>
                            <p className={styles.chooseUsText}>
                                Become an early adopter and help shape<br />
                                the future of ride-sharing.
                            </p>
                        </div>

                        <div className={styles.chooseUsCard}>
                            <div className={styles.chooseUsIcon}>
                                <img src="/assets/Group-4-3.svg" alt="earn Rewards" width={65} height={67} />
                            </div>
                            <h3 className={styles.chooseUsTitle}>earn Rewards</h3>
                            <p className={styles.chooseUsText}>
                                Earn up to $1,000 in cash and ride credits<br />
                                while helping eliminate surge pricing.
                            </p>
                        </div>

                        <div className={styles.chooseUsCard}>
                            <div className={styles.chooseUsIcon}>
                                <img src="/assets/Group-5-1.svg" alt="make an impact" width={65} height={67} />
                            </div>
                            <h3 className={styles.chooseUsTitle}>make an impact</h3>
                            <p className={styles.chooseUsText}>
                                Support a system where riders pay less<br />
                                and drivers earn fair, consistent wages.
                            </p>
                        </div>
                    </div>

                </div>

            </section>

            {/* Testimonials Section */}
            <section className={styles.testimonialSection}>
                <div className={styles.testimonialContainer}>
                    <h2 className={styles.testimonialTitle}>
                        What Our <span>Rebels Say</span>
                    </h2>
                    <p className={styles.testimonialSubtitle}>Real stories from our movement</p>

                    <TestimonialCarousel />

                </div>
            </section>
        </main>


    );
}
