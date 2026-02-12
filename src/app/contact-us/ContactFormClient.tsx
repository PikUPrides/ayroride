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
        message: "",
        zip: ""
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        phone: false
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string) => {
        const numbers = phone.replace(/\D/g, '');
        return numbers.length === 10;
    };

    const handleBlur = (field: 'email' | 'phone') => {
        if (field === 'email' && formData.email) {
            setErrors(prev => ({ ...prev, email: !validateEmail(formData.email) }));
        } else if (field === 'phone' && formData.phone) {
            setErrors(prev => ({ ...prev, phone: !validatePhone(formData.phone) }));
        }
    };

    const validateForm = () => {
        // US Phone Validation: (XXX) XXX-XXXX
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            return "Please enter a valid US phone number: (XXX) XXX-XXXX";
        }

        // Texas Zip Code Validation: Starts with 75-79 and is 5 digits
        // encompass the range 75000 to 79999
        const zipRegex = /^7[5-9]\d{3}$/;
        if (formData.zip && !zipRegex.test(formData.zip)) {
            return "Please enter a valid Texas Zip Code (starts with 75-79).";
        }

        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setStatus('error');
            setErrorMessage(validationError);
            return;
        }

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
                message: "",
                zip: ""
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
                        maxLength={100}
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
                    <label>Mobile</label>
                    <input
                        type="tel"
                        placeholder="Mobile"
                        className={`${styles.inputField} ${errors.phone ? styles.error : ''}`}
                        value={formData.phone}
                        onChange={(e) => {
                            const input = e.target.value;
                            const numbers = input.replace(/\D/g, '');
                            let formatted = numbers;
                            if (numbers.length > 0) {
                                if (numbers.length <= 3) {
                                    formatted = `(${numbers}`;
                                } else if (numbers.length <= 6) {
                                    formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
                                } else {
                                    formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
                                }
                            }
                            if (numbers.length <= 10) {
                                setFormData({ ...formData, phone: formatted });
                            }
                        }}
                        onBlur={() => handleBlur('phone')}
                        maxLength={14}
                        pattern="\(\d{3}\) \d{3}-\d{4}"
                        title="Please enter a valid 10-digit US phone number"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Zip Code</label>
                    <input
                        type="text"
                        placeholder="Zip Code (TX)"
                        className={styles.inputField}
                        value={formData.zip}
                        onChange={(e) => {
                            // Only allow numbers and max 5 chars
                            const val = e.target.value.replace(/\D/g, '').slice(0, 5);
                            setFormData({ ...formData, zip: val });
                        }}
                        maxLength={5}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className={`${styles.inputField} ${errors.email ? styles.error : ''}`}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onBlur={() => handleBlur('email')}
                        title="Please enter a valid email address"
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
