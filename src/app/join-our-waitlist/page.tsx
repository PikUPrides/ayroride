"use client";

import { useState } from "react";
import styles from "./waitlist.module.css";
import Image from "next/image";

export default function JoinOurWaitlist() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        countryCode: "+1",
        phone: "",
        role: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Waitlist submission:", formData);
        // Handle form submission logic
    };

    return (
        <main>
            {/* Header Section */}
            <section className={styles.headerSection}>
                <h1 className={styles.headerTitle}>
                    Join Our <span className={styles.blueText}>Waitlist</span>
                </h1>
            </section>

            {/* Section Divider */}
            <div className={styles.sectionDivider}>
                <div className={styles.dividerContainer}>
                    <div className={styles.dividerTeal}></div>
                    <div className={styles.dividerBlue}></div>
                </div>
            </div>

            {/* Form Section */}
            <section className={styles.formSection}>
                <div className={styles.formContainer}>
                    <div className={styles.formWrapper}>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Full Name*"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={styles.inputField}
                                style={{ marginBottom: '16px' }}
                            />

                            <input
                                type="email"
                                placeholder="Email Address*"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={styles.inputField}
                                style={{ marginBottom: '16px' }}
                            />

                            <div className={styles.phoneRow} style={{ marginBottom: '16px' }}>
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

                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>Are you interested in signing up as?</label>
                                <div className={styles.radioOptionsContainer}>
                                    <label className={styles.radioOption}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="Rider"
                                            checked={formData.role === "Rider"}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className={styles.radioInput}
                                            required
                                        />
                                        Rider
                                    </label>
                                    <label className={styles.radioOption}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="Driver"
                                            checked={formData.role === "Driver"}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className={styles.radioInput}
                                            required
                                        />
                                        Driver
                                    </label>
                                    <label className={styles.radioOption}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="Rider & Driver"
                                            checked={formData.role === "Rider & Driver"}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className={styles.radioInput}
                                            required
                                        />
                                        Rider & Driver
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className={styles.submitBtn} style={{ marginBottom: '16px' }}>
                                Join The Waitlist
                            </button>

                            <p className={styles.disclaimer}>
                                By joining, you agree to receive updates about the referral program
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
