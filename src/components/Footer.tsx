"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";

export default function Footer() {
  const pathname = usePathname();
  const isWaitlistPage = pathname === "/join-our-waitlist";

  return (
    <div className={styles.footerWrapper}>
      {/* CTA Section */}
      {!isWaitlistPage && (
        <section className={styles.ctaContainer}>
          <div className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Ready To Disrupt the Ride-Sharing Status Quo?
              </h2>
              <p className={styles.ctaSubtitle}>
                Be an early adopter and earn rewards while helping to make
                ride-sharing fairer for everyone.
              </p>
              <Link href="/join-our-waitlist">
                <button className={styles.ctaBtn}>Join Our Waitlist</button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Two Color Divider */}
      <div className={styles.footerDividerTop}>
        <div className={styles.dividerContainer}>
          <div className={styles.dividerTeal}></div>
          <div className={styles.dividerBlue}></div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className={styles.mainFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerTop}>
            <Link href="/" className={styles.footerBrand}>
              <img
                src="/Ayro_Secondary_1.png"
                alt="AYRO"
                className={styles.footerLogo}
              />
            </Link>

            <div className={styles.footerNav}>
              <ul className={styles.navLinks}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/contact-us">Contact Us</Link>
                </li>
              </ul>
              <div className={styles.socialIcons}>
                <a href="https://www.facebook.com/profile.php?id=61583870717780" target="_blank" rel="noopener noreferrer">
                  <IoLogoFacebook size={32} color="#08D9C4" />
                </a>

                <a href="https://www.instagram.com/ayro.rideshare/" target="_blank" rel="noopener noreferrer">
                  <IoLogoInstagram size={32} color="#08D9C4" />
                </a>

                <a href="https://x.com/pikup26698" target="_blank" rel="noopener noreferrer">
                  <IoLogoTwitter size={32} color="#08D9C4" />
                </a>

                <a href="https://www.youtube.com/@AYRO_Inc" target="_blank" rel="noopener noreferrer">
                  <IoLogoYoutube size={32} color="#08D9C4" />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footerDivider}></div>

          <div className={styles.footerBottom}>
            <p className={styles.copyrightText}>
              Copyright AYRO 2026. All Rights Reserved.
            </p>
            <div className={styles.legalLinks}>
              <Link href="/terms-of-service">Terms of Service</Link>
              <span className={styles.legalDivider}>|</span>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
