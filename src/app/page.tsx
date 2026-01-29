"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import ReferAndEarn from "@/components/ReferAndEarn";
import FAQAccordion from "@/components/FAQAccordion";

const phrases = [
  "better pay for drivers",
  "lower fares for riders",
  "greater safety for everyone.",
];

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = phrases[index];

      if (!isDeleting) {
        // Typing
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setSpeed(80); // Typing speed

        if (displayText === fullText) {
          // Pause at the end before deleting
          setSpeed(3000);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setSpeed(40); // Deleting speed

        if (displayText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
          setSpeed(500); // Pause before next word
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, speed, phrases]);

  return (
    <main className={styles.main}>
      {/* Typing Animation Section */}
      <section className={styles.promoSection}>
        <div className={styles.promoContainer}>
          <div className={styles.promoText}>
            <h1>
              <span className={styles.mainHead}>AYRO </span>
              <span className={styles.sharingText}>RIDE SHARING MEANS</span>
              <span className={styles.blueText}>{displayText}</span>
            </h1>
            <p>Join our waitlist. Refer your friends. Win valuable prizes.</p>
            <Link href="/join-our-waitlist">
              <button className={styles.waitlistBtn}>Join Our Waitlist</button>
            </Link>
          </div>
          <div className={styles.promoImageContainer}>
            <img
              src="/images/promo-bg.png"
              alt="AYRO ridesharing"
              className={styles.promoImage}
            />
          </div>
        </div>
      </section>

      <div className={styles.sectionDivider}>
        <div className={styles.dividerContainer}>
          <div className={styles.dividerTeal}></div>
          <div className={styles.dividerBlue}></div>
        </div>
      </div>

      <section className={styles.fixingSection}>
        <div className={styles.fixingContainer}>
          <div className={styles.fixingImageSide}>
            <img
              src="/images/fixing-ridesharing.png"
              alt="People in a car"
              className={styles.fixingImage}
            />
          </div>
          <div className={styles.fixingTextSide}>
            <h2>
              AYRO IS FIXING <br className={styles.mobileBreak} />
              EVERYTHING{" "}
              <span>
                you hate <br className={styles.mobileBreak} /> about
                ridesharing.
              </span>
            </h2>
            <p className={styles.subHeading}>
              Sick of surge pricing? Tired of feeling unsafe?
            </p>
            <p className={styles.highlightText}>We're changing all that.</p>
            <p className={styles.description}>
              Imagine predictable, affordable fares and increased security.
            </p>
            <p className={styles.boldDescription}>
              It's ridesharing reinvented.
            </p>
            <Link href="/join-our-waitlist">
              <button className={styles.waitlistBtn}>Join Our Waitlist</button>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          {/* Card 1: For Passengers */}
          <div className={styles.featureCard}>
            <img
              src="/images/passengers-icon.svg"
              alt="Passengers"
              className={styles.featureIcon}
            />
            <h4>For Passengers</h4>
            <ul className={styles.featureList}>
              <li className={styles.featureListItem}>
                <span className={styles.featureCircle}></span>
                Lowest fares in the market
              </li>
              <li className={styles.featureListItem}>
                <span className={styles.featureCircle}></span>
                No more surprises on surges
              </li>
              <li className={styles.featureListItem}>
                <span className={styles.featureCircle}></span>
                Predictable consistent fares
              </li>
            </ul>
          </div>

          {/* Card 2: For Drivers */}
          <div className={styles.featureCard}>
            <img
              src="/images/drivers-icon.svg"
              alt="Drivers"
              className={styles.featureIcon}
            />
            <h4>For Drivers</h4>
            <ul className={styles.featureList}>
              <li className={styles.featureListItem}>
                <span className={styles.featureCircle}></span>
                Guaranteed Earnings
              </li>
              <li className={styles.featureListItem}>
                <span className={styles.featureCircle}></span>
                Consistent Earnings
              </li>
              <li className={styles.featureListItem}>
                <span className={styles.featureCircle}></span>
                Reliable Earnings
              </li>
            </ul>
          </div>

          {/* Card 3: For Both */}
          <div className={styles.featureCard}>
            <img
              src="/images/both-icon.svg"
              alt="Both"
              className={styles.featureIcon}
            />
            <h4>For Both</h4>
            <ul className={styles.featureList}>
              <li className={styles.featureListItem}>
                <span className={styles.featureCircle}></span>
                Safety first rideshare
              </li>
              <li className={styles.featureListItem}>
                <span className={styles.featureCircle}></span>
                Dashcam equipped rides
              </li>
              <li className={styles.featureListItem}>
                <span className={styles.featureCircle}></span>
                Finger print logins
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.differentSection}>
        <div className={styles.differentContainer}>
          <h3 className={styles.differentTitle}>
            How is <span>AYRO different?</span>
          </h3>

          <div className={styles.differentGrid}>
            <div className={styles.differentItem}>
              <img
                src="/images/no-surge-icon.svg"
                alt="No Surge"
                className={styles.differentIcon}
              />
              <h4>We don't do surge pricing</h4>
              <p>
                Save with predictable fares that are up to 50% lower than any
                national provider.
              </p>
            </div>

            <div className={styles.differentItem}>
              <img
                src="/images/safety-icon.svg"
                alt="Safety"
                className={styles.differentIcon}
              />
              <h4>We're serious about safety</h4>
              <p>Feel more secure with our rigorous safety protocols.</p>
            </div>

            <div className={styles.differentItem}>
              <img
                src="/images/fair-drivers-icon.svg"
                alt="Fair Drivers"
                className={styles.differentIcon}
              />
              <h4>We treat our drivers fairly</h4>
              <p>
                Get better service from happier drivers who earn twice the pay.
              </p>
            </div>
          </div>

          <Link href="/join-our-waitlist">
            <button className={`${styles.waitlistBtn} ${styles.differentBtn}`}>
              Join Our Waitlist
            </button>
          </Link>
        </div>
      </section>

      <section className={styles.rewardSection}>
        <div className={styles.rewardContainer}>
          <div className={styles.rewardTextSide}>
            <h2>
              <span className={styles.topLine}>Get rewarded for joining</span>
              <span className={styles.blueSpan}>
                <span style={{ color: "#1D0652" }}>the</span> Rideshare{" "}
                <br className={styles.mobileBreak} /> Revolution
              </span>
            </h2>
            <p className={styles.rewardDescription}>
              Join the AYRO waitlist now, and you'll unlock your unique referral
              link and to get updates about our launch in early 2026.
            </p>
            <p
              className={`${styles.rewardDescription} ${styles.rewardShareLine}`}
            >
              Then, share that link with friends to win prizes:
            </p>
            <span className={styles.rewardHighlight}>
              $1,000 cash, ride credits, or a MacBook Pro.
            </span>
            <Link href="/join-our-waitlist">
              <button className={styles.waitlistBtn}>Join Our Waitlist</button>
            </Link>
          </div>
          <div className={styles.rewardImageSide}>
            <img
              src="/images/reward-bg.png"
              alt="Rewards"
              className={styles.rewardImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.futureSection}>
        <div className={styles.futureContainer}>
          <h3 className={styles.futureTitle}>
            Be Part of <span>Transportation's Future</span>
          </h3>
          <p className={styles.futureSubTitle}>
            Join our movement to disrupt the ride-
            <br className={styles.mobileBreak} />
            share industry and create fair, affordable{" "}
            <br className={styles.mobileBreak} />
            transportation for all.
          </p>

          <div className={styles.futureGrid}>
            <div className={styles.futureItem}>
              <img
                src="/images/adopter-icon.svg"
                alt="Adopter"
                className={styles.futureIcon}
              />
              <h4>Become an early adopter</h4>
              <p>
                Become an early adopter and help shape <br /> the future of
                ride-sharing.
              </p>
            </div>

            <div className={styles.futureItem}>
              <img
                src="/images/rewards-icon.svg"
                alt="Rewards"
                className={styles.futureIcon}
              />
              <h4>earn Rewards</h4>
              <p>
                Earn up to $1,000 in cash and ride credits <br /> while helping
                eliminate surge pricing.
              </p>
            </div>

            <div className={styles.futureItem}>
              <img
                src="/images/impact-icon.svg"
                alt="Impact"
                className={styles.futureIcon}
              />
              <h4>make an impact</h4>
              <p>
                Support a system where riders pay less <br /> and drivers earn
                fair, consistent wages.
              </p>
            </div>
          </div>

          <div className={styles.futureBtnContainer}>
            <Link href="/join-our-waitlist">
              <button
                className={`${styles.waitlistBtn} ${styles.differentBtn}`}
              >
                Join Our Waitlist
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Slider Section */}
      <TestimonialsSlider />

      {/* Refer and Earn Section */}
      {/* <ReferAndEarn /> */}

      {/* FAQ Section */}
      <FAQAccordion />
    </main>
  );
}
