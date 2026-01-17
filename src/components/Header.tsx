"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMobileOpen(!isMobileOpen);
    setIsCompanyOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Brand */}
        <Link href="/" className={styles.brand}>
          <img src="/Ayro_Secondary_1.png" alt="Ayro" className={styles.logo} />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <Link href="/" className={pathname === "/" ? styles.active : ""}>
                Home
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link
                href="/about-us"
                className={pathname === "/about-us" ? styles.active : ""}
              >
                Rider
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link
                href="/services"
                className={pathname === "/services" ? styles.active : ""}
              >
                Driver
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link
                href="/blog"
                className={pathname === "/blog" ? styles.active : ""}
              >
                Blog
              </Link>
            </li>

            {/* Company Dropdown */}
            <li
              className={`${styles.navItem} ${styles.dropdown}`}
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <span className={styles.dropdownToggle}>Company</span>

              {isCompanyOpen && (
                <ul className={styles.dropdownMenu}>
                  <li>
                    <Link href="/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link href="/careers">Careers</Link>
                  </li>
                  <li>
                    <Link href="/contact-us">Contact</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <Link href="/join-our-waitlist" className={styles.waitlistBtn}>
            Join Our Waitlist
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`${styles.mobileToggle} ${
            isMobileOpen ? styles.open : ""
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${isMobileOpen ? styles.open : ""}`}
      >
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <Link href="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link href="/about-us" onClick={toggleMenu}>
              About Us
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link href="/services" onClick={toggleMenu}>
              Services
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link href="/blog" onClick={toggleMenu}>
              Blog
            </Link>
          </li>

          {/* Mobile Company Dropdown */}
          <li className={styles.navItem}>
            <button
              className={styles.mobileDropdownToggle}
              onClick={() => setIsCompanyOpen(!isCompanyOpen)}
            >
              Company
            </button>

            {isCompanyOpen && (
              <ul className={styles.mobileSubMenu}>
                <li>
                  <Link href="/about-us" onClick={toggleMenu}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" onClick={toggleMenu}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" onClick={toggleMenu}>
                    Contact
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        <Link
          href="/join-our-waitlist"
          className={styles.waitlistBtn}
          onClick={toggleMenu}
        >
          Join Our Waitlist
        </Link>
      </div>
    </header>
  );
}
