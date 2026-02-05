import React from 'react';
import { jobs } from '../../../data/jobs';
import { notFound } from 'next/navigation';
import styles from './job-details.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {
    IoCalendarOutline
} from "react-icons/io5";

export default async function JobDetailsPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const job = jobs.find(j => j.slug === params.slug);

    if (!job) {
        notFound();
    }

    // Default descriptions if not present in data (fallback)
    const renderList = (items?: string[]) => {
        if (!items) return null;
        return (
            <ul className={styles.list}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={styles.listItem}
                        dangerouslySetInnerHTML={{
                            __html: item.replace(/(\$30\+\s*per\s*Active\s*Hour)/gi, '<span class="' + styles.earningsHighlight + '">$1</span>')
                        }}
                    />
                ))}
            </ul>
        );
    };

    // Helper to split title for styling
    // Assuming format "Location - Driver Jobs"
    const titleParts = job.title.split(' - ');
    const mainTitle = titleParts[0];
    const highlightTitle = titleParts[1] || "";

    return (
        <div style={{ background: '#fff' }}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        {mainTitle} {highlightTitle && <span className={styles.heroTitleHighlight}>- {highlightTitle}</span>}
                    </h1>
                    <p className={styles.heroSubtitle}>
                        {job.description}
                    </p>
                    <Link href="/join-our-waitlist" className={styles.heroApplyBtn}>
                        Apply Today
                    </Link>
                </div>
            </section>

            <main className={styles.container}>
                {/* Sidebar with Job Details */}
                <aside className={styles.sidebar}>
                    <div className={styles.detailsCard}>
                        <h3 className={styles.detailsTitle}>Job Details</h3>

                        <div className={styles.detailItem}>
                            <div className={styles.detailIconWrapper}>
                                <Image src="/assets/icons/location-icon.svg" alt="Location" width={20} height={20} />
                            </div>
                            <div className={styles.detailText}>
                                <span className={styles.detailLabel}>Location:</span>
                                <span className={styles.detailValue}>{job.location}</span>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.detailIconWrapper}>
                                <Image src="/CurrencyCircleDollar.svg" alt="Salary" width={16} height={16} />
                            </div>
                            <div className={styles.detailText}>
                                <span className={styles.detailLabel}>Salary:</span>
                                <span className={styles.detailValue}>{job.salary}</span>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.detailIconWrapper}>
                                <Image src="/assets/icons/time-icon.svg" alt="Job Type" width={20} height={20} />
                            </div>
                            <div className={styles.detailText}>
                                <span className={styles.detailLabel}>Job Type:</span>
                                <span className={styles.detailValue}>{job.type}</span>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.detailIconWrapper}>
                                <Image src="/assets/icons/experience-icon.svg" alt="Experience" width={20} height={20} />
                            </div>
                            <div className={styles.detailText}>
                                <span className={styles.detailLabel}>Experience:</span>
                                <span className={styles.detailValue}>{job.experience}</span>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <div className={styles.detailIconWrapper}>
                                <IoCalendarOutline style={{ fontSize: '20px', color: '#423DF9' }} />
                            </div>
                            <div className={styles.detailText}>
                                <span className={styles.detailLabel}>Posted On:</span>
                                <span className={styles.detailValue}>{job.postedOn}</span>
                            </div>
                        </div>

                        <div className={styles.separator}></div>

                        <Link href="/join-our-waitlist" className={styles.sidebarApplyBtn}>
                            Apply Now
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <section className={styles.mainContent}>
                    <div className={styles.section}>
                        <h1 className={styles.sectionTitle}>About AYRO Rides</h1>
                        <p className={styles.sectionText}>{job.about}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Job Description</h2>
                        <p className={styles.sectionText} dangerouslySetInnerHTML={{ __html: (job.longDescription || job.description).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>What that looks like day to day:</h2>
                        {renderList(job.dayToDay)}
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Job Benefits</h2>
                        {job.benefits && job.benefits.length > 1 && renderList(job.benefits.slice(0, -1))}
                        {job.benefits && job.benefits.length > 0 && (
                            <p className={styles.sectionText} style={{ marginTop: '16px' }}>
                                {job.benefits[job.benefits.length - 1]}
                            </p>
                        )}
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Job Requirements: <span style={{ fontWeight: 400, fontSize: '0.9em' }}>Driving with AYRO may be a great fit if you:</span></h2>
                        {renderList(job.requirements)}
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Earnings Information</h2>
                        <p className={styles.sectionText} dangerouslySetInnerHTML={{ __html: job.earningsInfo?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Work Environment & Culture</h2>
                        <p className={styles.sectionText}>{job.environment}</p>
                    </div>


                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Ready to Get Started?</h2>
                        <p className={styles.sectionText}>Apply today and join the waitlist. Start earning with AYRO on your schedule.</p>
                    </div>


                </section>
            </main>


        </div>
    );
}
