"use client";

import React from 'react';
import Link from 'next/link';
import styles from './DisruptCTA.module.css';

interface DisruptCTAProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
}

export default function DisruptCTA({ title, subtitle, buttonText, buttonLink }: DisruptCTAProps) {
    return (
        <section className={styles.disruptSection}>
            <h2 className={styles.disruptTitle}>
                {title || "Ready To Disrupt Ride-Sharing Status Quo?"}
            </h2>
            <p className={styles.disruptSubtitle}>
                {subtitle || "Be an early adopter and earn rewards while helping to make ride-sharing more fairer for everyone."}
            </p>
            <Link href={buttonLink || "/join-our-waitlist"} className={styles.disruptBtn}>
                {buttonText || "Join Our Waitlist"}
            </Link>
        </section>
    );
}
