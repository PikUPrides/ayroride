"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";
import ReferAndEarn from "./referral-modal/ReferAndEarn";
import DisruptCTA from "./DisruptCTA";

export default function Footer() {
  const pathname = usePathname();

  // Logic for showing the Refer/Earn Form (Original logic)
  const showReferralForm =
    pathname !== "/join-our-waitlist" &&
    pathname !== "/privacy-policy" &&
    pathname !== "/terms-of-service" &&
    pathname !== "/contact-us" &&
    pathname !== "/referral" &&
    !pathname.startsWith("/careers") &&
    !pathname.startsWith("/blog") &&
    pathname !== "/sms-terms";

  const showDisruptCTA = pathname !== "/join-our-waitlist";

  const isInnerCareerPage = pathname.startsWith("/careers/") && pathname !== "/careers";

  const disruptProps = isInnerCareerPage ? {
    title: "Ready to Get Started?",
    subtitle: "Apply today and start earning with AYRO on your schedule.",
    buttonText: "Apply Now",
    buttonLink: pathname
  } : {};

  return (
    <div className={styles.footerWrapper}>
      {/* Referral/Form Section */}
      {showReferralForm && <ReferAndEarn />}

      {/* Disrupt CTA Section */}
      {showDisruptCTA && <DisruptCTA {...disruptProps} />}

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
                <a href="https://www.facebook.com/AYRORides" target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/facebook-icon.png" alt="Facebook" width={32} height={32} />
                </a>
                <a href="https://x.com/ayrorides" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/x-icon.jpg" alt="X" width={32} height={32} />
                </a>
                <a href="https://www.instagram.com/ayrorides" target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/instagram-icon.png" alt="Instagram" width={32} height={32} />
                </a>
                <a href="https://www.linkedin.com/company/ayrorides" target="_blank" rel="noopener noreferrer">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://www.youtube.com/@AYROrides" target="_blank" rel="noopener noreferrer" className={styles.youtubeIcon}>
                  <Image src="/images/youtube-logo.png" alt="YouTube" width={32} height={32} />
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
              <span className={styles.legalDivider}>|</span>
              <Link href="/sms-terms">SMS Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
