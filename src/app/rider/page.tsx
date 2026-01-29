import Image from "next/image";
import Link from "next/link";
import styles from "./rider.module.css";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import ReferAndEarn from "@/components/referral-modal/ReferAndEarn";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata = {
    title: "Rider - AYRO",
    description: "Ride-sharing without surge pricing or security worries. Pay fairly, every ride.",
    openGraph: {
        title: "Rider - AYRO",
        description: "Ride-sharing without surge pricing or security worries. Pay fairly, every ride.",
        url: "https://ayrorides.com/rider/",
        images: [
            {
                url: "/assets/OG.png",
                width: 1200,
                height: 630,
                alt: "AYRO Rider",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Rider - AYRO",
        description: "Pay fairly, every ride. No surge pricing surprises.",
    },
};

export default function Rider() {
    return (
        <main>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <span className={styles.topTag}>RIDE WITH AYRO</span>
                        <h1 className={styles.heroTitle}>
                            <span className={styles.highlightText}>Ride-sharing</span> without surge <br />
                            pricing or security worries.
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Ready for lower fares and safer rides?
                        </p>
                        <Link href="/join-our-waitlist">
                            <button className={styles.ctaButton}>
                                Join Our Waitlist
                            </button>
                        </Link>
                    </div>
                    <div className={styles.heroImageContainer}>
                        <Image
                            src="/images/girl-banner.png"
                            alt="Ride with AYRO"
                            width={1000}
                            height={500}
                            priority
                            className={styles.bannerImage}
                        />
                    </div>
                </div>
            </section>

            {/* Why Riders Choose AYRO Section */}
            <section className={styles.whySection}>
                <div className={styles.whyContent}>
                    <div className={styles.contentWrapper}>
                        <h2 className={styles.whyTitle}>
                            Why Riders Are <br />
                            Choosing AYRO
                        </h2>
                        <p className={styles.whySubtitle}>
                            Ride-sharing shouldn't feel stressful <br />
                            <b>AYRO keeps it simple, safe, and affordable.</b>
                        </p>

                        <h3 className={styles.featuresTitle}>What Makes AYRO Different</h3>

                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}>
                                <span className={styles.featureHeading}>Upfront Pricing</span>
                                <p className={styles.featureDesc}>
                                    See your fare before booking. No surge spikes. No
                                    surprises at the end of the ride.
                                </p>
                            </li>
                            <li className={styles.featureItem}>
                                <span className={styles.featureHeading}>Reliable Rides</span>
                                <p className={styles.featureDesc}>
                                    Enjoy consistent availability and security.
                                </p>
                            </li>
                            <li className={styles.featureItem}>
                                <span className={styles.featureHeading}>Fair for Everyone</span>
                                <p className={styles.featureDesc}>
                                    Drivers earn fairly, which leads to better service and
                                    better rides for you.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.whyImageSide}>
                    <Image
                        src="/images/why-riders.png"
                        alt="Rider enjoying a ride"
                        fill
                        className={styles.whyImage}
                    />
                </div>
            </section>

            {/* How It Works Section */}
            <section className={styles.howItWorksSection}>
                <div className={styles.worksHeader}>
                    <h2 className={styles.worksTitle}>
                        How Riding with <span className={styles.highlightText}>AYRO Works</span>
                    </h2>
                    <p className={styles.worksSubtitle}>
                        Simple. Transparent. Stress-free.
                    </p>
                </div>

                <div className={styles.worksImageContainer}>
                    <Image
                        src="/images/rider/rider-timeline-new.png"
                        alt="How riding with AYRO works diagram"
                        width={1000}
                        height={800}
                        className={styles.worksImage}
                    />
                </div>

                <div className={styles.mobileWorksContainer}>
                    <div className={styles.mobileStepCard}>
                        <span className={styles.mobileStepNumber}>STEP 01</span>
                        <h3 className={styles.mobileStepTitle}>Join the Waitlist</h3>
                        <p className={styles.mobileStepDesc}>
                            Sign up to get early access to AYRO and be among the first riders on the platform.
                        </p>
                    </div>
                    <div className={styles.mobileStepCard}>
                        <span className={styles.mobileStepNumber}>STEP 02</span>
                        <h3 className={styles.mobileStepTitle}>Know What You'll Pay</h3>
                        <p className={styles.mobileStepDesc}>
                            View your total fare before you book. No surge pricing. No hidden fees.
                        </p>
                    </div>
                    <div className={styles.mobileStepCard}>
                        <span className={styles.mobileStepNumber}>STEP 03</span>
                        <h3 className={styles.mobileStepTitle}>Book and Ride</h3>
                        <p className={styles.mobileStepDesc}>
                            Confirm your ride and get picked up by a verified driver.
                        </p>
                    </div>
                    <div className={styles.mobileStepCard}>
                        <span className={styles.mobileStepNumber}>STEP 04</span>
                        <h3 className={styles.mobileStepTitle}>Tell Your Friends</h3>
                        <p className={styles.mobileStepDesc}>
                            Invite them to experience safer, more affordable ride-sharing with AYRO.
                        </p>
                    </div>
                </div>
            </section>

            {/* Rewards Section */}
            <section className={styles.rewardsSection}>
                <div className={styles.rewardsContainer}>
                    <div className={styles.rewardsContentSide}>
                        <div className={styles.rewardsContentWrapper}>
                            <h2 className={styles.rewardsTitle}>Earn Rewards by Growing the Movement</h2>
                            <span className={styles.rewardsTag}>Driver Referral Rewards</span>
                            <p className={styles.rewardsDesc}>
                                Invite riders and drivers to join AYRO and earn real rewards.
                            </p>
                            <ul className={styles.rewardsList}>
                                <li className={styles.rewardsItem}>Cash rewards</li>
                                <li className={styles.rewardsItem}>Ride credits</li>
                                <li className={styles.rewardsItem}>Early adopter status</li>
                                <li className={styles.rewardsItem}>Referral dashboard to track earnings</li>
                            </ul>
                            <button className={styles.rewardsButton}>
                                Help grow AYRO. Share in the rewards.
                            </button>
                        </div>
                    </div>
                    <div className={styles.rewardsImageSide}>
                        <Image
                            src="/images/referral-rewards.png"
                            alt="Rider working in car"
                            fill
                            className={styles.rewardsImage}
                        />
                    </div>
                </div>
            </section>

            {/* Built to Make Your Life Better Section */}
            <section className={styles.lifeBetterSection}>
                <div className={styles.lifeBetterHeader}>
                    <h2 className={styles.lifeBetterTitle}>
                        Built to make <span className={styles.lifeBetterHighlight}>your life better</span>
                    </h2>
                    <p className={styles.lifeBetterSubtitle}>Not to make investors richer</p>
                </div>

                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <Image
                                src="/images/rider/Frame 1410121245.png"
                                alt="Lower Prices"
                                width={48}
                                height={48}
                                className={styles.featureIcon}
                            />
                        </div>
                        <h3 className={styles.featureCardTitle}>Lower Prices</h3>
                        <p className={styles.featureCardDesc}>
                            AYRO's rates are up to 50% lower <br /> than other big ride-sharing services.
                        </p>
                        <div className={styles.featureCardLine}></div>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <Image
                                src="/images/rider/Frame 1410121245 (1).png"
                                alt="Predictable Fares"
                                width={48}
                                height={48}
                                className={styles.featureIcon}
                            />
                        </div>
                        <h3 className={styles.featureCardTitle}>Predictable Fares</h3>
                        <p className={styles.featureCardDesc}>
                            Our fares stay consistent, even <br /> during peak hours. No surge pricing <br /> or waiting for prices to drop.
                        </p>
                        <div className={styles.featureCardLine}></div>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <Image
                                src="/images/rider/Frame 1410121245 (2).png"
                                alt="Stress-free Rides"
                                width={48}
                                height={48}
                                className={styles.featureIcon}
                            />
                        </div>
                        <h3 className={styles.featureCardTitle}>Stress-free Rides</h3>
                        <p className={styles.featureCardDesc}>
                            From booking to drop-off, our goal is <br /> to make your trip convenient and <br /> worry-free.
                        </p>
                        <div className={styles.featureCardLine}></div>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <Image
                                src="/images/rider/Frame 1410121245 (3).png"
                                alt="Fair Driver Treatment"
                                width={48}
                                height={48}
                                className={styles.featureIcon}
                            />
                        </div>
                        <h3 className={styles.featureCardTitle}>Fair Driver Treatment</h3>
                        <p className={styles.featureCardDesc}>
                            Drivers are paid fairly, which leads to <br /> better service and a more respectful <br /> ride experience.
                        </p>
                        <div className={styles.featureCardLine}></div>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <Image
                                src="/images/rider/Frame 1410121245 (4).png"
                                alt="Trip Tracking"
                                width={48}
                                height={48}
                                className={styles.featureIcon}
                            />
                        </div>
                        <h3 className={styles.featureCardTitle}>Trip Tracking</h3>
                        <p className={styles.featureCardDesc}>
                            Every ride is tracked, so your journey <br /> is monitored from pickup to drop- <br /> off.
                        </p>
                        <div className={styles.featureCardLine}></div>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <Image
                                src="/images/rider/Frame 1410121245 (5).png"
                                alt="Same-Gender Driver Option"
                                width={48}
                                height={48}
                                className={styles.featureIcon}
                            />
                        </div>
                        <h3 className={styles.featureCardTitle}>Same-Gender Driver Option</h3>
                        <p className={styles.featureCardDesc}>
                            Choose a same-gender driver when <br /> available, for added comfort and <br /> peace of mind.
                        </p>
                        <div className={styles.featureCardLine}></div>
                    </div>
                </div>

                <Link href="/join-our-waitlist">
                    <button className={styles.lifeBetterCta}>Join Our Waitlist</button>
                </Link>
            </section>

            {/* Built to Make Your Life Better Section */}
            <section className={styles.safetySection}>
                <div className={styles.safetyContainer}>
                    <h2 className={styles.safetyTitle}>
                        Rider <span>Safety and Trust</span>
                    </h2>

                    <div className={styles.safetyGrid}>
                        <div className={styles.safetyItem}>
                            <Image
                                src="/images/rider/Frame 1410121245 (6).png"
                                alt="Verified Drivers"
                                width={80}
                                height={80}
                                className={styles.safetyIcon}
                            />
                            <h3>Verified Drivers</h3>
                            <p>
                                Every driver is verified before joining the platform.
                            </p>
                        </div>
                        <div className={styles.safetyItem}>
                            <Image
                                src="/images/rider/Frame 1410121246.png"
                                alt="In-App Safety Features"
                                width={80}
                                height={80}
                                className={styles.safetyIcon}
                            />
                            <h3>In-App Safety Features</h3>
                            <p>
                                Emergency support and trip sharing are built directly into the AYRO app.
                            </p>
                        </div>
                        <div className={styles.safetyItem}>
                            <Image
                                src="/images/rider/Frame 1410121247.png"
                                alt="Trip Tracking"
                                width={80}
                                height={80}
                                className={styles.safetyIcon}
                            />
                            <h3>Trip Tracking</h3>
                            <p>
                                We monitor your ride from pickup to drop-off with clear trip records and accountability.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Built to Make Your Life Better Section */}

            {/* Testimonials Section */}
            <TestimonialsSlider />

            {/* Refer and Earn Section */}
            {/* <ReferAndEarn /> */}

            {/* FAQ Section */}
            <FAQAccordion />
        </main >
    );
}
