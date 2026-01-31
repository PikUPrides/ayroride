"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";
import ReferAndEarn from "./referral-modal/ReferAndEarn";

export default function Footer() {
  const pathname = usePathname();
  // Hide form on waitlist page, privacy policy, terms of service, and all blog pages
  const showReferralForm =
    pathname !== "/join-our-waitlist" &&
    pathname !== "/privacy-policy" &&
    pathname !== "/terms-of-service" &&
    pathname !== "/contact-us" &&
    !pathname.startsWith("/blog");

  return (
    <div className={styles.footerWrapper}>
      {/* Referral/Form Section */}
      {showReferralForm && <ReferAndEarn />}

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
                  <Image src="/assets/facebook-icon.png" alt="Facebook" width={32} height={32} />
                </a>
                <a href="https://x.com/ayro_inc" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/x.png" alt="X" width={32} height={32} />
                </a>
                <a href="https://www.instagram.com/ayro.rideshare/" target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/instagram-icon.png" alt="Instagram" width={32} height={32} />
                </a>
                <a href="https://www.youtube.com/@AYRO_Inc" target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/youtube-icon.png" alt="YouTube" width={32} height={32} />
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
