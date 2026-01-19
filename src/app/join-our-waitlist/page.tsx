"use client";

import { useState } from "react";
import styles from "./waitlist.module.css";

export default function JoinOurWaitlist() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        userType: "Rider"
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
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    userType: formData.userType
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to join waitlist');
            }

            setStatus('success');
            setFormData({ name: "", email: "", phone: "", userType: "Rider" });
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
                            <div className={styles.phoneWrapper}>
                                <span className={styles.phonePrefix}>+1</span>
                                <input
                                    type="tel"
                                    placeholder="Your Phone Number*"
                                    className={styles.phoneInputWithPrefix}
                                    value={formData.phone}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        const numbers = input.replace(/\D/g, '');
                                        let formatted = numbers;
                                        if (numbers.length > 0) {
                                            if (numbers.length <= 3) {
                                                formatted = numbers;
                                            } else if (numbers.length <= 6) {
                                                formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
                                            } else {
                                                formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
                                            }
                                        }
                                        setFormData({ ...formData, phone: formatted });
                                    }}
                                    maxLength={14}
                                    required
                                />
                            </div>

                            {/* Radio Buttons for User Type */}
                            <div className={styles.userTypeSection}>
                                <label className={styles.userTypeLabel}>Are you interested in signing up as?</label>
                                <div className={styles.radioGroup}>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="Rider"
                                            checked={formData.userType === "Rider"}
                                            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                                            className={styles.radioInput}
                                        />
                                        <span>Rider</span>
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="Driver"
                                            checked={formData.userType === "Driver"}
                                            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                                            className={styles.radioInput}
                                        />
                                        <span>Driver</span>
                                    </label>
                                    <label className={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="Rider & Driver"
                                            checked={formData.userType === "Rider & Driver"}
                                            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                                            className={styles.radioInput}
                                        />
                                        <span>Rider & Driver</span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'Joining...' : 'Join The Waitlist'}
                            </button>

                            {status === 'success' && (
                                <p style={{ color: '#08D9C4', textAlign: 'center', fontWeight: '600', marginTop: '10px' }}>
                                    ✓ Thank you for joining!
                                </p>
                            )}
                            {status === 'error' && (
                                <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
                            )}

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
