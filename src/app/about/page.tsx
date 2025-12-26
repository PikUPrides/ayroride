import styles from "./page.module.css";
import RiderVoicesSlider from "@/components/RiderVoicesSlider";

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className={styles.aboutHero}>
        <h1 className={styles.heroTitle}>
          About <span>Us</span>
        </h1>
      </section>

      {/* Two Color Divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerContainer}>
          <div className={styles.dividerTeal}></div>
          <div className={styles.dividerBlue}></div>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className={styles.whoWeAreSection}>
        <div className={styles.whoWeAreContainer}>
          <div className={styles.whoWeAreImageSide}>
            <img
              src="/images/who-we-are.png"
              alt="PikUP app in car"
              className={styles.whoWeAreImage}
            />
          </div>
          <div className={styles.whoWeAreTextSide}>
            <span className={styles.sectionBadge}>WHO WE ARE</span>
            <h2 className={styles.whoWeAreTitle}>
              PikUP Began with a Simple Question: <span>What is PikUP?</span>
            </h2>
            <div className={styles.whoWeAreContent}>
              <p>
                While driving for a well-known rideshare company (more than <strong>30,000 rides!</strong>), our founder saw:
              </p>
              <ul>
                <li>Riders pay unpredictable fares (like the night his wife paid $25 to go out, and $195 to get home!)</li>
                <li>Hard-working drivers (like himself) earn unfair, unlivable wages</li>
              </ul>
              <p>
                That's when he decided to create a different kind of rideshare company. One that would…
              </p>
              <p className={styles.highlightText}>
                Offer riders predictable, affordable pricing, and give drivers fair, reliable pay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.missionContainer}>
          <div className={styles.missionContent}>
            <span className={styles.missionBadge}>OUR MISSION</span>
            <h2 className={styles.missionTitle}>
              PikUP Is What <span className={styles.missionTitleSpan}>Ride-Sharing Ought to Be</span>
            </h2>
            <p className={styles.missionIntro}>
              Here's how we're different than the big-name companies…
            </p>

            <div className={styles.benefitsStack}>
              <div className={styles.benefitBlock}>
                <h4 className={styles.benefitTitle}>For Riders</h4>
                <ul className={styles.benefitList}>
                  <li>Fairer fares (up to 50% lower!)</li>
                  <li>No surge pricing — ever</li>
                  <li>Greater safety in every ride</li>
                </ul>
              </div>
              <div className={styles.benefitBlock}>
                <h4 className={styles.benefitTitle}>For Drivers</h4>
                <ul className={styles.benefitList}>
                  <li>Almost double the pay per hour</li>
                  <li>Guaranteed earnings (no guessing games)</li>
                  <li>Greater dignity and respect</li>
                </ul>
              </div>
            </div>

            <h3 className={styles.revolutionTitle}>
              <span className={styles.mobileLine}>More Than an App <span className={styles.revolutionTitleSpan}>Ride — PiKUP is</span></span> <span className={styles.mobileLine}><span className={styles.revolutionTitleSpan}>a revolution.</span></span>
            </h3>

            <div className={styles.revolutionContent}>
              <p>
                <span className={styles.mobileLine}>By riding with PikUP, you save money, and you <strong>join</strong></span> <span className={styles.mobileLine}><strong>a movement of fairness.</strong></span>
              </p>
              <p>
                <span className={styles.mobileLine}>By encouraging others to join, you make life better</span> <span className={styles.mobileLine}>for them – and earn rewards in the process.</span>
              </p>
              <p>
                <span className={styles.mobileLine}><strong>At PikUP, we believe ridesharing should be safe</strong></span> <span className={styles.mobileLine}><strong>and affordable, honest and human.</strong></span>
              </p>
              <p>
                <span className={styles.mobileLine}>With your help, that's the kind of movement we're</span> <span className={styles.mobileLine}>building – one ride at a time.</span>
              </p>
            </div>
          </div>
          <div className={styles.missionImageSide}>
            <img
              src="/images/mission-image.png"
              alt="PikUP driver with rider"
              className={styles.missionImage}
            />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesContainer}>
          <span className={styles.valuesBadge}>Our Values</span>
          <h3 className={styles.valuesTitle}>
            What Drives Us <span className={styles.valuesTitleSpan}>While We Drive You?</span>
          </h3>
          <p className={styles.valuesIntro}>
            PikUP wasn't created in a boardroom. It sprang from real life – thousands of rides and countless conversations with riders and drivers. Out of those experiences, our company values were formed.
          </p>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <img
                src="/images/icon-community.svg"
                alt="Community icon"
                className={styles.valueIcon}
              />
              <h4 className={styles.valueCardTitle}>Community</h4>
              <p className={styles.valueCardText}>
                We're a growing movement of people who believe ride-sharing should be safe, fair, and affordable.
              </p>
            </div>

            <div className={styles.valueCard}>
              <img
                src="/images/icon-fairness.svg"
                alt="Fairness icon"
                className={styles.valueIcon}
              />
              <h4 className={styles.valueCardTitle}>Fairness</h4>
              <p className={styles.valueCardText}>
                Unpredictable surge pricing punishes riders. Low pay crushes drivers. We stand against these unfair practices.
              </p>
            </div>

            <div className={styles.valueCard}>
              <img
                src="/images/icon-transparency.svg"
                alt="Transparency icon"
                className={styles.valueIcon}
              />
              <h4 className={styles.valueCardTitle}>Transparency</h4>
              <p className={styles.valueCardText}>
                We keep things simple and honest – predictable pricing and clear pay guarantees. No surprises. Ever.
              </p>
            </div>

            <div className={styles.valueCard}>
              <img
                src="/images/icon-empowerment.svg"
                alt="Empowerment icon"
                className={styles.valueIcon}
              />
              <h4 className={styles.valueCardTitle}>Empowerment</h4>
              <p className={styles.valueCardText}>
                Drivers deserve dignity. Riders deserve peace of mind. We use technology to help everyone feel safe and respected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>1,000+</h3>
            <p className={styles.statLabel}>Early Adopters</p>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>10+</h3>
            <p className={styles.statLabel}>Referral Rewards</p>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>10k+</h3>
            <p className={styles.statLabel}>Potential Savings</p>
          </div>
        </div>
      </section>

      {/* Rider Voices Slider */}
      <RiderVoicesSlider />
    </main >
  );
}
