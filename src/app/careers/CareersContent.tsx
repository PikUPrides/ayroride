"use client";

import React, { useState } from 'react';
import styles from "./careers.module.css";
import Link from "next/link";
import Image from "next/image";
import { IoSearchOutline, IoChevronDownOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { jobs } from "../../data/jobs";

const JOBS_PER_PAGE = 6;

export default function CareersContent() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    const endIndex = startIndex + JOBS_PER_PAGE;
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Scroll to top of job grid
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`${styles.pageNumber} ${currentPage === i ? styles.pageNumberActive : ''}`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <main>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Drive With AYRO
                    </h1>
                    <h2 className={styles.heroSubtitle}>
                        Earn $30+/Hour
                    </h2>
                </div>
            </section>

            {/* Two Color Divider */}
            <div className={styles.sectionDivider}>
                <div className={styles.dividerContainer}>
                    <div className={styles.dividerTeal}></div>
                    <div className={styles.dividerBlue}></div>
                </div>
            </div>

            <div className={styles.openingSection}>
                {/* Header Content */}
                <div className={styles.headerContent}>
                    <h2 className={styles.openingTitle}>
                        <span style={{ color: "#000000" }}>Current</span> Openings
                    </h2>
                    <h3 className={styles.openingDescription}>
                        At AYRO Rides, we're redefining urban mobility with sustainable solutions. Our <br /> team seeks talented professionals who share our vision. Join us for growth <br /> opportunities.
                    </h3>
                </div>

                {/* Search & Controls */}
                <div className={styles.controlsContainer}>
                    <div className={styles.searchBar}>
                        <IoSearchOutline className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search job..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className={styles.filterGroup}>
                        <button className={styles.sortByBtn}>
                            Sort By <IoChevronDownOutline />
                        </button>
                    </div>
                </div>

                {/* Job Cards */}
                <div className={styles.jobGrid}>
                    {currentJobs.map((job) => (
                        <div key={job.id} className={styles.jobCard}>
                            <h3 className={styles.jobTitle}>{job.title}</h3>
                            <p className={styles.jobDesc}>{job.description}</p>
                            <div className={styles.jobMeta}>
                                <div className={styles.metaRow}>
                                    <div className={styles.metaItem}>
                                        <Image src="/assets/icons/location-icon.svg" alt="Location" width={16} height={16} />
                                        <span>{job.location}</span>
                                    </div>
                                    <span className={styles.metaSeparator}></span>
                                    <div className={styles.metaItem}>
                                        <Image src="/LadderSimple.svg" alt="Experience" width={16} height={16} />
                                        <span>{job.experience}</span>
                                    </div>
                                </div>
                                <div className={styles.metaItem}>
                                    <Image src="/ClockCountdown.svg" alt="Job Type" width={16} height={16} />
                                    <span>{job.type}</span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className={styles.jobFooter}>
                                <div className={styles.jobSalary}>
                                    <Image src="/CurrencyCircleDollar.svg" alt="Salary" width={16} height={16} />
                                    <span>{job.salary}</span>
                                </div>
                                <Link href="/join-our-waitlist" className={styles.applyBtn}>
                                    Apply Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={styles.pageArrow}
                            aria-label="Previous page"
                        >
                            <IoChevronBackOutline />
                        </button>

                        <div className={styles.pageNumbers}>
                            {renderPageNumbers()}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={styles.pageArrow}
                            aria-label="Next page"
                        >
                            <IoChevronForwardOutline />
                        </button>
                    </div>
                )}

                {/* Disrupt CTA Section */}
                <section className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>
                        Ready To Disrupt Ride-Sharing Status Quo?
                    </h2>
                    <p className={styles.ctaSubtitle}>
                        Be an early adopter and earn rewards while helping to make ride-sharing more fairer for everyone.
                    </p>
                    <Link href="/join-our-waitlist" className={styles.ctaBtn}>
                        Join Our Waitlist
                    </Link>
                </section>
            </div>
        </main>
    );
}
