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
            src="/Ayro_Secondary_1.webp"
            className={styles.logo}
            alt="AYRO"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/rider" className={pathname === '/rider' ? styles.active : ''}>Rider</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/driver" className={pathname === '/driver' ? styles.active : ''}>Driver</Link>
            </li>

            {/* Resources Dropdown */}
            <li
              className={`${styles.navItem} ${styles.dropdown}`}
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <span className={styles.dropdownToggle}>
                Resources
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.dropdownArrow}>
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
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
              <span className={styles.dropdownToggle}>
                Company
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.dropdownArrow}>
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              {isCompanyOpen && (
                <ul className={styles.dropdownMenu}>
                  <li>
                    <Link href="/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link href="/services">Services</Link>
                  </li>
                  <li>
                    <Link href="/contact-us">Contact</Link>
                  </li>
                  <li>
                    <Link href="/careers">Careers</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Header Actions (Desktop + Mobile) */}
        <div className={styles.headerActions}>
          <Link href="/join-our-waitlist" className={styles.waitlistBtn}>Join Our Waitlist</Link>

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
            <Link href="/rider" onClick={toggleMenu}>
              Rider
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link href="/driver" onClick={toggleMenu}>
              Driver
            </Link>
          </li>

          {/* Mobile Resources Dropdown */}
          <li className={styles.navItem}>
            <button
              className={styles.mobileDropdownToggle}
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              Resources
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.dropdownArrow} ${isResourcesOpen ? styles.rotate : ''}`}
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.dropdownArrow} ${isCompanyOpen ? styles.rotate : ''}`}
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isCompanyOpen && (
              <ul className={styles.mobileSubMenu}>
                <li>
                  <Link href="/about-us" onClick={toggleMenu}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" onClick={toggleMenu}>
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" onClick={toggleMenu}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" onClick={toggleMenu}>
                    Careers
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
