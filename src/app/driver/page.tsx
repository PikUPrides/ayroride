import Image from "next/image";
import Link from "next/link";
import styles from "./driver.module.css";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata = {
    title: "Driver - AYRO",
    description: "Ridesharing without surge pricing or security worries. Pay fairly, every ride.",
    openGraph: {
        title: "Driver - AYRO",
        description: "Ridesharing without surge pricing or security worries. Pay fairly, every ride.",
        url: "https://ayrorides.com/driver/",
        images: [
            {
                url: "/assets/OG.png",
                width: 1200,
                height: 630,
                alt: "AYRO Driver",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Driver - AYRO",
        description: "Pay fairly, every ride. No surge pricing surprises.",
    },
    alternates: {
        canonical: 'https://ayrorides.com/driver/',
    },
};

export default function Rider() {
    return (
        <main>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <span className={styles.topTag}>DRIVE WITH AYRO</span>
                        <h1 className={styles.heroTitle}>
                            <span className={styles.highlightText}>AYRO</span> Treats Its Drivers <br />
                            Like Partners
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Guaranteed $30+ per Active Hour. Tips are extra. <br />
                            <span style={{ fontSize: '0.9em', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px', color: 'black' }}>
                                <span>Apply easily</span>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#08D9C4', display: 'inline-block' }}></span>
                                <span>Get treated fairly</span>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#08D9C4', display: 'inline-block' }}></span>
                                <span>Earn, what you deserve</span>
                            </span>
                        </p>
                        <Link href="/join-our-waitlist">
                            <button className={styles.ctaButton}>
                                Apply to Drive
                            </button>
                        </Link>
                    </div>
                    <div className={styles.heroImageContainer}>
                        <Image
                            src="/images/driver/driver-hero-new.png"
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
                            Why are Drivers <br />
                            Choosing AYRO?
                        </h2>
                        <p className={styles.whySubtitle}>
                            Ridesharing is broken for drivers. <br /><br />
                            <b>AYRO is fixing it.</b>
                        </p>

                        <h3 className={styles.featuresTitle}>What Makes AYRO Different?</h3>

                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}>
                                <span className={styles.featureHeading}>$30+/ Active Hour Guaranteed Earnings</span>
                                <p className={styles.featureDesc}>
                                    Know what you'll earn before the ride starts. Every time.
                                </p>
                            </li>
                            <li className={styles.featureItem}>
                                <span className={styles.featureHeading}>Driver-First Platform</span>
                                <p className={styles.featureDesc}>
                                    Built with driver feedback, not investor pressure.
                                </p>
                            </li>
                            <li className={styles.featureItem}>
                                <span className={styles.featureHeading}>Better Security for Drivers</span>
                                <p className={styles.featureDesc}>
                                    Drivers earn fairly, which leads to better service and better rides for you.
                                </p>
                            </li>
                            <li className={styles.featureItem}>
                                <span className={styles.featureHeading}>AYRO treats its drivers right.</span>
                                <p className={styles.featureDesc}>
                                    Steady, reliable income, flexible schedule. Start driving with dignity.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.whyImageSide}>
                    <Image
                        src="/images/driver/why-drivers-new.png"
                        alt="Driver in car"
                        fill
                        className={styles.whyImage}
                    />
                </div>
            </section>

            {/* How It Works Section */}
            <section className={styles.howItWorksSection}>
                <div className={styles.worksHeader}>
                    <h2 className={styles.worksTitle}>
                        How Driving with <span className={styles.highlightText}>AYRO Works?</span>
                    </h2>
                    <p className={styles.worksSubtitle}>
                        Simple. Honest. Driver-first.
                    </p>
                </div>

                <div className={styles.timelineContainer}>
                    <div className={styles.timelineLineWrapper}>
                        <img
                            src="/images/driver/timeline-center-line.png"
                            alt="Timeline Line"
                            className={styles.timelineLineImage}
                        />
                    </div>

                    {/* Step 1 */}
                    <div className={styles.timelineStep}>
                        <div className={styles.stepLeft}>
                            <div className={styles.stepCard}>
                                <span className={styles.stepNumber}>STEP 01</span>
                                <h3 className={styles.stepTitle}>Apply and get verified</h3>
                                <p className={styles.stepDesc}>
                                    Sign up as a driver to get early access.
                                </p>
                            </div>
                        </div>
                        <div className={styles.stepRight}></div>
                    </div>

                    {/* Step 2 */}
                    <div className={styles.timelineStep}>
                        <div className={styles.stepLeft}></div>
                        <div className={styles.stepRight}>
                            <div className={styles.stepCard}>
                                <span className={styles.stepNumber}>STEP 02</span>
                                <h3 className={styles.stepTitle}>Activate your account</h3>
                                <p className={styles.stepDesc}>
                                    Unlock early access rewards and priority onboarding.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className={styles.timelineStep}>
                        <div className={styles.stepLeft}>
                            <div className={styles.stepCard}>
                                <span className={styles.stepNumber}>STEP 03</span>
                                <h3 className={styles.stepTitle}>Drive and earn fairly</h3>
                                <p className={styles.stepDesc}>
                                    Earn consistent income without surge manipulation.
                                </p>
                            </div>
                        </div>
                        <div className={styles.stepRight}></div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className={styles.mobileWorksContainer}>
                    <div className={styles.mobileStepCard}>
                        <div className={styles.mobileStepHeader}>
                            <span className={styles.mobileStepNumber}>STEP 01</span>
                        </div>
                        <h3 className={styles.mobileStepTitle}>Apply and get verified</h3>
                        <p className={styles.mobileStepDesc}>
                            Sign up as a driver to get early access.
                        </p>
                    </div>
                    <div className={styles.mobileStepCard}>
                        <div className={styles.mobileStepHeader}>
                            <span className={styles.mobileStepNumber}>STEP 02</span>
                        </div>
                        <h3 className={styles.mobileStepTitle}>Activate your account</h3>
                        <p className={styles.mobileStepDesc}>
                            Unlock early access rewards and priority onboarding.
                        </p>
                    </div>
                    <div className={styles.mobileStepCard}>
                        <div className={styles.mobileStepHeader}>
                            <span className={styles.mobileStepNumber}>STEP 03</span>
                        </div>
                        <h3 className={styles.mobileStepTitle}>Drive and earn fairly</h3>
                        <p className={styles.mobileStepDesc}>
                            Earn consistent income without surge manipulation.
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
                            <Link href="/join-our-waitlist">
                                <button className={styles.rewardsButton}>
                                    Join Our Waitlist
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.rewardsImageSide}>
                        <Image
                            src="/images/driver/driver-rewards-new.png"
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
                        Built for <span className={styles.lifeBetterHighlight}>Drivers,</span> Not Corporate Shareholders
                    </h2>
                    <p className={styles.lifeBetterSubtitle}>At AYRO, you're not a gig worker. You're a partner.</p>
                </div>

                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <Image
                                src="/images/driver/icon-transparent-earnings.png"
                                alt="Transparent Earnings"
                                width={48}
                                height={48}
                                className={styles.featureIcon}
                            />
                        </div>
                        <h3 className={styles.featureCardTitle}>Transparent Earnings</h3>
                        <p className={styles.featureCardDesc}>
                            See exactly what you'll earn before <br /> accepting a ride. No hidden <br /> deductions. No last-minute changes.
                        </p>
                        <div className={styles.featureCardLine}></div>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <Image
                                src="/images/driver/Frame 1410121245 (1).png"
                                alt="Predictable Fares"
                                width={48}
                                height={48}
                                className={styles.featureIcon}
                            />
                        </div>
                        <h3 className={styles.featureCardTitle}>Predictable Pay</h3>
                        <p className={styles.featureCardDesc}>
                            No surge manipulation or sudden <br /> drops. Just consistent, reliable <br /> earnings you can count on.
                        </p>
                        <div className={styles.featureCardLine}></div>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <Image
                                src="/images/driver/icon-driver-control.png"
                                alt="Driver Control"
                                width={48}
                                height={48}
                                className={styles.featureIcon}
                            />
                        </div>
                        <h3 className={styles.featureCardTitle}>Driver Control</h3>
                        <p className={styles.featureCardDesc}>
                            You choose when to go online, which <br /> rides to accept, and how you drive. <br /> You stay in control.
                        </p>
                        <div className={styles.featureCardLine}></div>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <Image
                                src="/images/driver/icon-fair-treatment.png"
                                alt="Fair Treatment"
                                width={48}
                                height={48}
                                className={styles.featureIcon}
                            />
                        </div>
                        <h3 className={styles.featureCardTitle}>Fair Treatment</h3>
                        <p className={styles.featureCardDesc}>
                            AYRO is built on values like respect, <br /> fairness, and long-term trust.
                        </p>
                        <div className={styles.featureCardLine}></div>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <Image
                                src="/images/driver/icon-real-support.png"
                                alt="Real Human Support"
                                width={48}
                                height={48}
                                className={styles.featureIcon}
                            />
                        </div>
                        <h3 className={styles.featureCardTitle}>Real Human Support</h3>
                        <p className={styles.featureCardDesc}>
                            Get help from real people when you <br /> need it. No endless loops. No <br /> automated runarounds.
                        </p>
                        <div className={styles.featureCardLine}></div>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIconWrapper}>
                            <Image
                                src="/images/driver/icon-same-gender.png"
                                alt="Same-Gender Ride Preferences"
                                width={48}
                                height={48}
                                className={styles.featureIcon}
                            />
                        </div>
                        <h3 className={styles.featureCardTitle}>Same-Gender Ride Preferences</h3>
                        <p className={styles.featureCardDesc}>
                            Some riders may choose a same- <br /> gender driver preference. When <br /> available, these requests are clearly <br /> shown before you accept a ride, so <br /> you stay informed and in control.
                        </p>
                        <div className={styles.featureCardLine}></div>
                    </div>
                </div>

                <Link href="/join-our-waitlist">
                    <button className={styles.lifeBetterCta}>Apply to Drive</button>
                </Link>
            </section>

            {/* Built to Make Your Life Better Section */}
            <section className={styles.safetySection}>
                <div className={styles.safetyContainer}>
                    <h2 className={styles.safetyTitle}>
                        Driver <span>Safety and Trust</span>
                    </h2>
                    <p className={styles.safetySubtitle} style={{ textAlign: 'center', maxWidth: '700px', margin: '1rem auto', color: '#fff', opacity: 0.9 }}>
                        Join our movement to disrupt the rideshare industry and create fair, <br />
                        wallet-friendly transportation for all.
                    </p>

                    <div className={styles.safetyGrid}>
                        <div className={styles.safetyItem}>
                            <Image
                                src="/images/driver/Frame 1410121245 (6).png"
                                alt="Verified Drivers"
                                width={80}
                                height={80}
                                className={styles.safetyIcon}
                            />
                            <h3>Verified Riders</h3>
                            <p>
                                Every rider is verified before they ride, <br /> reducing fake accounts and unsafe <br /> situations.
                            </p>
                        </div>
                        <div className={styles.safetyItem}>
                            <Image
                                src="/images/driver/Frame 1410121246.png"
                                alt="In-App Safety Features"
                                width={80}
                                height={80}
                                className={styles.safetyIcon}
                            />
                            <h3>In-App Emergency Support</h3>
                            <p>
                                Quick access to emergency help during <br /> active trips, directly inside the AYRO app.
                            </p>
                        </div>
                        <div className={styles.safetyItem}>
                            <Image
                                src="/images/driver/Frame 1410121247.png"
                                alt="Trip Tracking"
                                width={80}
                                height={80}
                                className={styles.safetyIcon}
                            />
                            <h3>Transparent Trip Records</h3>
                            <p>
                                Every trip is logged clearly, creating accountability and trust for both drivers and riders.
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
