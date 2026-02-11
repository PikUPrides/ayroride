'use client';

import { useState, FormEvent } from 'react';
import styles from './WaitlistForm.module.css';

export default function WaitlistForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        zipCode: '',
        userType: 'Rider' as 'Driver' | 'Rider' | 'Both'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        // Validation Logic
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length !== 10) {
            setMessage({ type: 'error', text: "Phone number must be exactly 10 digits." });
            setIsSubmitting(false);
            return;
        }

        const zipRegex = /^7[5-9]\d{3}$/;
        if (!zipRegex.test(formData.zipCode)) {
            setMessage({ type: 'error', text: "Must be a valid Texas Zip Code (75000-79999)." });
            setIsSubmitting(false);
            return;
        }

        // Format phone number to ensure it has US country code for consistency
        let formattedPhone = formData.phone.replace(/\D/g, '');
        if (formattedPhone && !formattedPhone.startsWith('1')) {
            formattedPhone = '1' + formattedPhone;
        }
        if (formattedPhone) {
            formattedPhone = '+' + formattedPhone;
        }

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    phone: formattedPhone
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Successfully joined the waitlist!' });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    zipCode: '',
                    userType: 'Rider'
                });
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to join waitlist.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length === 0) return '';
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
        return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const formatted = formatPhoneNumber(value);
            if (formatted.length <= 14) {
                setFormData(prev => ({ ...prev, [name]: formatted }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.customForm}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name*"
                className={styles.inputField}
                required
            />

            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address*"
                className={styles.inputField}
                required
            />

            <div className={styles.phoneRow}>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Number*"
                    className={styles.inputField}
                    style={{ flex: 1 }}
                    required
                />
                <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Zip code*"
                    className={styles.inputField}
                    style={{ flex: 1 }}
                    required
                />
            </div>

            <div className={styles.userTypeSection}>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="userType"
                            value="Driver"
                            checked={formData.userType === 'Driver'}
                            onChange={handleChange}
                            className={styles.radioInput}
                        />
                        <span>Driver</span>
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="userType"
                            value="Rider"
                            checked={formData.userType === 'Rider'}
                            onChange={handleChange}
                            className={styles.radioInput}
                        />
                        <span>Rider</span>
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="userType"
                            value="Both"
                            checked={formData.userType === 'Both'}
                            onChange={handleChange}
                            className={styles.radioInput}
                        />
                        <span>Both</span>
                    </label>
                </div>
            </div>

            <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Joining...' : 'Join the AYRO waitlist now...'}
            </button>

            {message && (
                <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                    {message.text}
                </div>
            )}
        </form>
    );
}
