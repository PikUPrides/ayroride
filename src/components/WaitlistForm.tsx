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
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
    const [errors, setErrors] = useState({
        email: false,
        phone: false,
        zipCode: false
    });
    const [editMode, setEditMode] = useState<{ active: boolean; subscriberId?: string }>({ active: false });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        // Format phone number to ensure it has US country code for consistency
        let formattedPhone = formData.phone.replace(/\D/g, '');
        if (formattedPhone && !formattedPhone.startsWith('1')) {
            formattedPhone = '1' + formattedPhone;
        }
        if (formattedPhone) {
            formattedPhone = '+' + formattedPhone;
        }

        try {
            // If in edit mode, use PUT to update
            if (editMode.active && editMode.subscriberId) {
                const response = await fetch('/api/waitlist', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subscriberId: editMode.subscriberId,
                        ...formData,
                        phone: formattedPhone
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage({ type: 'success', text: 'Successfully updated your information!' });
                    setEditMode({ active: false });
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        zipCode: '',
                        userType: 'Rider'
                    });
                } else {
                    setMessage({ type: 'error', text: data.error || 'Failed to update information.' });
                }
            } else {
                // Normal POST for new submissions
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
                } else if (response.status === 409 && data.error === 'already_exists') {
                    // User already exists - switch to edit mode
                    setMessage({ type: 'info', text: 'You\'re already on the waitlist! You can update your information below.' });
                    setEditMode({ active: true, subscriberId: data.subscriber.id });
                    // Pre-fill form with existing data
                    setFormData({
                        name: data.subscriber.name || '',
                        email: data.subscriber.email || '',
                        phone: '',
                        zipCode: data.subscriber.zipCode || '',
                        userType: data.subscriber.userType || 'Rider'
                    });
                } else {
                    setMessage({ type: 'error', text: data.error || 'Failed to join waitlist.' });
                }
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
        if (numbers.length <= 3) return `(${numbers}`;
        if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
        return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string) => {
        const numbers = phone.replace(/\D/g, '');
        return numbers.length === 10;
    };

    const validateZipCode = (zipCode: string) => {
        return /^\d{5}$/.test(zipCode);
    };

    const handleBlur = (field: 'email' | 'phone' | 'zipCode') => {
        if (field === 'email' && formData.email) {
            setErrors(prev => ({ ...prev, email: !validateEmail(formData.email) }));
        } else if (field === 'phone' && formData.phone) {
            setErrors(prev => ({ ...prev, phone: !validatePhone(formData.phone) }));
        } else if (field === 'zipCode' && formData.zipCode) {
            setErrors(prev => ({ ...prev, zipCode: !validateZipCode(formData.zipCode) }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const formatted = formatPhoneNumber(value);
            if (formatted.replace(/\D/g, '').length <= 10) {
                setFormData(prev => ({ ...prev, phone: formatted }));
            }
            return;
        }

        if (name === 'zipCode') {
            const numbers = value.replace(/\D/g, '');
            if (numbers.length <= 5) {
                setFormData(prev => ({ ...prev, zipCode: numbers }));
            }
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
                onBlur={() => handleBlur('email')}
                placeholder="Email address*"
                className={`${styles.inputField} ${errors.email ? styles.error : ''}`}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address"
                required
            />

            <div className={styles.phoneRow}>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur('phone')}
                    placeholder="Mobile*"
                    className={`${styles.inputField} ${errors.phone ? styles.error : ''}`}
                    style={{ flex: 1 }}
                    maxLength={14}
                    pattern="\(\d{3}\) \d{3}-\d{4}"
                    title="Please enter a valid 10-digit US phone number"
                    required
                />
                <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    onBlur={() => handleBlur('zipCode')}
                    placeholder="Zip code*"
                    className={`${styles.inputField} ${errors.zipCode ? styles.error : ''}`}
                    style={{ flex: 1 }}
                    maxLength={5}
                    pattern="\d{5}"
                    title="Please enter a valid 5-digit US zip code"
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
                {isSubmitting
                    ? (editMode.active ? 'Updating...' : 'Joining...')
                    : (editMode.active ? 'Update Information' : 'Join the AYRO waitlist now...')}
            </button>

            {message && (
                <div className={
                    message.type === 'success' ? styles.successMessage :
                    message.type === 'info' ? styles.infoMessage :
                    styles.errorMessage
                }>
                    {message.text}
                </div>
            )}
        </form>
    );
}
