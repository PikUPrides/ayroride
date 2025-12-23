"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
            src="https://pikup.us/wp-content/uploads/2025/11/purple_svg.svg"
            alt="PikUP"
            className={styles.logo}
          />
          <div className={styles.brandDivider}></div>
          <span className={styles.slogan}>Save Max. Earn Max.</span>
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
            <li className={styles.navItem}>
              <Link href="/blog" className={pathname === '/blog' ? styles.active : ''}>Blog</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact-us" className={pathname === '/contact-us' ? styles.active : ''}>Contact Us</Link>
            </li>
          </ul>
          <Link href="/join-our-waitlist" className={styles.waitlistBtn}>Join our waitlist</Link>
        </nav>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={toggleMenu} aria-label="Toggle menu">
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileOpen ? styles.open : ''}`}>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}><Link href="/" onClick={toggleMenu}>Home</Link></li>
          <li className={styles.navItem}><Link href="/about-us" onClick={toggleMenu}>About Us</Link></li>
          <li className={styles.navItem}><Link href="/services" onClick={toggleMenu}>Services</Link></li>
          <li className={styles.navItem}><Link href="/blog" onClick={toggleMenu}>Blog</Link></li>
          <li className={styles.navItem}><Link href="/contact-us" onClick={toggleMenu}>Contact Us</Link></li>
        </ul>
        <Link href="/join-our-waitlist" className={styles.waitlistBtn} onClick={toggleMenu}>Join our waitlist</Link>
      </div>
    </header>
  );
}
