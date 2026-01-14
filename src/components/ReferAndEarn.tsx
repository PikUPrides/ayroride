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

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    phone: `${formData.countryCode}${formData.phone}`,
                    name: formData.name
                })
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setFormData({ name: "", email: "", phone: "", countryCode: "+1" });
            } else {
                console.error("Submission failed:", data);
                setStatus('error');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
        }
    };

    return (
        <section className={styles.referSection}>
            <div className={styles.referContent}>
                <div className={styles.referText}>
                    <h2>Refer and Earn</h2>
                    <p>Refer your friends to become a driver and earn $500. $20 for every rider you refer.</p>
                </div>
                <div className={styles.referFormWrapper}>
                    {status === 'success' ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#423DF9', background: 'white', borderRadius: '37px' }}>
                            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>You're on the list! 🚀</h3>
                            <p>Thanks for joining. We'll be in touch soon.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                style={{ marginTop: '20px', padding: '10px 20px', background: '#423DF9', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}
                            >
                                Refer Another Friend
                            </button>
                        </div>
                    ) : (
                        <form className={styles.referForm} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className={styles.referInput}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className={styles.referInput}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <div className={styles.phoneRow}>
                                <select
                                    name="countryCode"
                                    className={styles.countrySelect}
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                >
                                    <option value="+1">+1 (US)</option>
                                    <option value="+44">+44 (UK)</option>
                                    <option value="+91">+91 (IN)</option>
                                    <option value="+86">+86 (CN)</option>
                                    <option value="+63">+63 (PH)</option>
                                    <option value="+84">+84 (VN)</option>
                                    {/* Add more codes as needed */}
                                </select>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className={styles.phoneInput}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.referSubmitBtn} disabled={status === 'loading'}>
                                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                            </button>
                            {status === 'error' && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
                            <p className={styles.referDisclaimer}>
                                By clicking, you agree to our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
