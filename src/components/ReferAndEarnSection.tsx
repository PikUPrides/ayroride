"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../app/page.module.css';
import formStyles from './WaitlistForm.module.css'; // Using existing styles

export default function ReferAndEarnSection() {
    const router = useRouter();

    // Form state from WaitlistForm.tsx
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        zipCode: '',
        userType: 'Both'
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'info'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({
        email: false,
        phone: false,
        zipCode: false
    });
    const [editMode, setEditMode] = useState<{ active: boolean; subscriberId?: string }>({ active: false });

    useEffect(() => {
        if (status === 'success' || status === 'error') {
            const timer = setTimeout(() => {
                setStatus('idle');
                setErrorMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const validationError = validateForm();
        if (validationError) {
            setStatus('error');
            setErrorMessage(validationError);
            return;
        }

        try {
            // If in edit mode, use PUT to update
            if (editMode.active && editMode.subscriberId) {
                const res = await fetch('/api/waitlist', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        subscriberId: editMode.subscriberId,
                        ...formData
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Failed to update information.');
                }

                setStatus('success');
                setEditMode({ active: false });
                setFormData({ name: '', email: '', phone: '', zipCode: '', userType: 'Driver' });

                // Redirect to referral page with email parameter
                setTimeout(() => {
                    router.push(`/referral?email=${encodeURIComponent(formData.email)}`);
                }, 1500);
            } else {
                // Normal POST for new submissions
                const res = await fetch('/api/waitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await res.json();

                if (!res.ok) {
                    if (res.status === 409 && data.error === 'already_exists') {
                        // User already exists - allow editing
                        setStatus('info');
                        setErrorMessage('You\'re already on the waitlist! You can update your information below.');
                        setEditMode({ active: true, subscriberId: data.subscriber.id });
                        // Pre-fill form with existing data
                        setFormData({
                            name: data.subscriber.name || '',
                            email: data.subscriber.email || '',
                            phone: data.subscriber.phone || '',
                            zipCode: data.subscriber.zipCode || '',
                            userType: data.subscriber.userType || 'Driver'
                        });
                        return;
                    }
                    throw new Error(data.error || 'Something went wrong. Please try again.');
                }

                setStatus('success');
                setFormData({ name: '', email: '', phone: '', zipCode: '', userType: 'Driver' });

                // Redirect to referral page with email parameter
                setTimeout(() => {
                    router.push(`/referral?email=${encodeURIComponent(formData.email)}`);
                }, 1500);
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Failed to join waitlist.');
        }
    };

    const validateForm = () => {
        // Phone validation (10 digits)
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length !== 10) {
            return "Phone number must be exactly 10 digits.";
        }

        // Zip Code validation (Texas: 75xxx - 79xxx)
        const zipRegex = /^7[5-9]\d{3}$/;
        if (!zipRegex.test(formData.zipCode)) {
            return "Must be a valid Texas Zip Code (75000-79999).";
        }

        return null;
    };

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length === 0) return '';
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
        return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        if (formatted.replace(/\D/g, '').length <= 10) {
            setFormData({ ...formData, phone: formatted });
        }
    };

    const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numbers = e.target.value.replace(/\D/g, '');
        if (numbers.length <= 5) {
            setFormData({ ...formData, zipCode: numbers });
        }
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

    return (
        <section className={styles.referSection}>
            <div className={styles.referContent}>
                {/* Header from ReferAndEarn.tsx */}
                <div className={styles.referText}>
                    <h2>
                        Refer and <span style={{ color: "#423DF9" }}>Earn</span>
                    </h2>
                    <p>Join the waitlist now and get your unique referral link</p>
                </div>

                {/* Form Wrapper */}
                <div className={styles.referFormWrapper}>
                    {/* Form Logic from WaitlistForm.tsx */}
                    <form className={formStyles.form} onSubmit={handleSubmit}>
                        <div className={formStyles.inputGroup}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className={formStyles.inputField}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                maxLength={100}
                                required
                            />
                        </div>

                        <div className={formStyles.inputGroup}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className={`${formStyles.inputField} ${errors.email ? formStyles.error : ''}`}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onBlur={() => handleBlur('email')}
                                title="Please enter a valid email address"
                                required
                            />
                        </div>

                        <div className={formStyles.rowContainer}>
                            <div className={formStyles.phoneWrapper}>
                                <input
                                    type="tel"
                                    placeholder="Mobile"
                                    className={`${formStyles.phoneInput} ${errors.phone ? formStyles.error : ''} ${editMode.active && formData.phone ? formStyles.prefilled : ''}`}
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    onBlur={() => handleBlur('phone')}
                                    maxLength={14}
                                    pattern="\(\d{3}\) \d{3}-\d{4}"
                                    title="Please enter a valid 10-digit US phone number"
                                    required
                                />
                            </div>
                            <div className={formStyles.zipWrapper}>
                                <input
                                    type="text"
                                    placeholder="Zip Code"
                                    className={`${formStyles.inputField} ${errors.zipCode ? formStyles.error : ''} ${editMode.active && formData.zipCode ? formStyles.prefilled : ''}`}
                                    value={formData.zipCode}
                                    onChange={handleZipChange}
                                    onBlur={() => handleBlur('zipCode')}
                                    maxLength={5}
                                    pattern="\d{5}"
                                    title="Please enter a valid 5-digit US zip code"
                                    required
                                />
                            </div>
                        </div>

                        <div className={formStyles.userTypeSection}>
                            <label className={formStyles.userTypeLabel}>Are you interested in signing up as?</label>
                            <div className={formStyles.radioGroup}>
                                <label className={formStyles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="Driver"
                                        checked={formData.userType === "Driver"}
                                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                                        className={formStyles.radioInput}
                                    />
                                    <span>Driver</span>
                                </label>
                                <label className={formStyles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="Rider"
                                        checked={formData.userType === "Rider"}
                                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                                        className={formStyles.radioInput}
                                    />
                                    <span>Rider</span>
                                </label>
                                <label className={formStyles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="Both"
                                        checked={formData.userType === "Both"}
                                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                                        className={formStyles.radioInput}
                                    />
                                    <span>Both</span>
                                </label>
                            </div>
                        </div>

                        {status === 'error' && <p className={formStyles.errorMessage}>{errorMessage}</p>}

                        {status === 'info' && <p className={formStyles.infoMessage}>{errorMessage}</p>}

                        {status === 'success' && (
                            <p className={formStyles.successMessage}>
                                {editMode.active ? 'Successfully updated your information!' : 'You\'re on the list! Thank you for joining.'}
                            </p>
                        )}

                        <button type="submit" className={formStyles.submitBtn} disabled={status === 'loading'}>
                            {status === 'loading'
                                ? (editMode.active ? 'Updating...' : 'Submitting...')
                                : (editMode.active ? 'Update Information' : 'Submit')}
                        </button>

                        <p className={formStyles.disclaimer}>
                            By joining, you agree to receive updates about the referral program
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
