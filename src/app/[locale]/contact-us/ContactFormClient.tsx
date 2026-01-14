"use client";

import { useState } from "react";
import styles from "./contact-us.module.css";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage("");

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                // Show all error details for debugging
                let errorMsg = data.error || 'Something went wrong';
                if (data.details) errorMsg += ` | Details: ${data.details}`;
                if (data.code) errorMsg += ` | Code: ${data.code}`;
                if (data.sqlMessage) errorMsg += ` | SQL: ${data.sqlMessage}`;
                throw new Error(errorMsg);
            }

            setStatus('success');
            setFormData({
                name: "",
                company: "",
                phone: "",
                email: "",
                subject: "",
                message: ""
            });
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message);
        }
    };

    return (
        <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className={styles.inputField}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Company Name</label>
                    <input
                        type="text"
                        placeholder="Company Name"
                        className={styles.inputField}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className={styles.inputField}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className={styles.inputField}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label>Subject</label>
                <input
                    type="text"
                    placeholder="Subject"
                    className={styles.inputField}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Message</label>
                <textarea
                    placeholder="Enter your message..."
                    className={styles.textareaField}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                ></textarea>
            </div>

            {status === 'error' && <p className={styles.errorMsg} style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>}
            {status === 'success' && <p className={styles.successMsg} style={{ color: 'green', marginBottom: '10px' }}>Message sent successfully!</p>}

            <button type="submit" className={styles.submitButton} disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
};

export default ContactForm;
