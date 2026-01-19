"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Brand */}
        <Link href="/" className={styles.brand}>
          <img
            src="/Ayro_Secondary_1.png"
            alt="Ayro"
            className={styles.logo}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about-us" className={pathname === '/about-us' ? styles.active : ''}>About Us</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/services" className={pathname === '/services' ? styles.active : ''}>Services</Link>
            </li>

            {/* Resources Dropdown */}
            <li
              className={`${styles.navItem} ${styles.dropdown}`}
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <span className={styles.dropdownToggle}>Resources</span>
              {isResourcesOpen && (
                <ul className={styles.dropdownMenu}>
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                </ul>
              )}
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
                    <Link href="/contact-us">Contact</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <Link href="/join-our-waitlist" className={styles.waitlistBtn}>Join Our Waitlist</Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`${styles.mobileToggle} ${isMobileOpen ? styles.open : ""
            }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileOpen ? styles.open : ''}`}>
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

          {/* Mobile Resources Dropdown */}
          <li className={styles.navItem}>
            <button
              className={styles.mobileDropdownToggle}
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              Resources
            </button>
            {isResourcesOpen && (
              <ul className={styles.mobileSubMenu}>
                <li>
                  <Link href="/blog" onClick={toggleMenu}>
                    Blog
                  </Link>
                </li>
              </ul>
            )}
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
                  <Link href="/contact-us" onClick={toggleMenu}>
                    Contact
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
        <Link href="/join-our-waitlist" className={styles.waitlistBtn} onClick={toggleMenu}>Join Our Waitlist</Link>
      </div>
    </header>
  );
}
