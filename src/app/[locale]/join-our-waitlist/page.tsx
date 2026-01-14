"use client";

import { useState } from "react";
import styles from "./waitlist.module.css";

export default function JoinOurWaitlist() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage("");

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to join waitlist');
            }

            setStatus('success');
            setFormData({ name: "", email: "", phone: "" });
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message);
        }
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

            {/* Custom Waitlist Form Section */}
            <section className={styles.formSection}>
                <div className={styles.formContainer}>
                    <h2 className={styles.formTitle}>
                        Get Early <span>Access</span>
                    </h2>
                    <p className={styles.formSubtitle}>
                        Be the first to experience the future of ridesharing.
                        Sign up now to get exclusive updates and priority access.
                    </p>

                    <div className={styles.formWrapper}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Full Name*"
                                    className={styles.inputField}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address*"
                                    className={styles.inputField}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.phoneRow}>
                                <select className={styles.countrySelect}>
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
                                    className={styles.phoneInput}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>

                            {status === 'error' && (
                                <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
                            )}
                            {status === 'success' && (
                                <p style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>
                                    You have successfully joined the waitlist! check your email.
                                </p>
                            )}

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'Joining...' : 'Join The Waitlist'}
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
