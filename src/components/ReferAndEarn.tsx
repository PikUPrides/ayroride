"use client";

import { useState } from "react";
import styles from "../app/page.module.css";

export default function ReferAndEarn() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        countryCode: "+1",
        phone: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Handle form submission
    };

    return (
        <section className={styles.referSection}>
            <div className={styles.referContainer}>
                <h3 className={styles.referTitle}>
                    Refer and <span>Earn</span>
                </h3>
                <p className={styles.referSubtitle}>
                    Join the waitlist now and get your unique referral link
                </p>

                <div className={styles.referFormWrapper}>
                    <form onSubmit={handleSubmit} className={styles.referForm}>
                        <input
                            type="text"
                            placeholder="Full Name*"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={styles.referInput}
                        />

                        <input
                            type="email"
                            placeholder="Email Address*"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={styles.referInput}
                        />

                        <div className={styles.phoneRow}>
                            <select
                                value={formData.countryCode}
                                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                className={styles.countrySelect}
                            >
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+91">+91</option>
                                <option value="+61">+61</option>
                                <option value="+86">+86</option>
                                <option value="+81">+81</option>
                                <option value="+49">+49</option>
                                <option value="+33">+33</option>
                                <option value="+55">+55</option>
                                <option value="+52">+52</option>
                            </select>

                            <input
                                type="tel"
                                placeholder="Your Phone Number*"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={styles.phoneInput}
                            />
                        </div>

                        <button type="submit" className={styles.referSubmitBtn}>
                            Join The Waitlist
                        </button>

                        <p className={styles.referDisclaimer}>
                            By joining, you agree to receive updates about the referral program
                        </p>
                    </form>
                </div>

                {/* Stats Section */}
                <div className={styles.referStats}>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>1,000+</span>
                        <span className={styles.statLabel}>Early Adopters</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>10+</span>
                        <span className={styles.statLabel}>Referral Rewards</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>10k+</span>
                        <span className={styles.statLabel}>Potential Savings</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
