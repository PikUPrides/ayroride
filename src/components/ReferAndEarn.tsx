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
                        <span className={styles.statLabel}>Referral Rewards</span>
                    </div>
                <div className={styles.statItem}>
                    <span className={styles.statNumber}>10k+</span>
                    <span className={styles.statLabel}>Potential Savings</span>
                </div>
            </div>
        </div>
        </section >
    );
}
