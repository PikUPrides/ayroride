'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './WaitlistForm.module.css';

export default function WaitlistForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        zipCode: '',
        userType: 'Both' as 'Driver' | 'Rider' | 'Both'
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
                    console.log('🔍 Waitlist PUT response data:', data);
                    console.log('🔍 Subscriber ID from response:', data.subscriberId);

                    setMessage({ type: 'success', text: 'Successfully updated your information!' });
                    setEditMode({ active: false });
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        zipCode: '',
                        userType: 'Both'
                    });

                    // Set session cookie for ReferralHero widget
                    if (data.subscriberId) {
                        const widgetId = 'MF2f0c6063df';
                        const cookieName = `__maitre-session-${widgetId}`;
                        const expirationDays = 30;
                        const date = new Date();
                        date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
                        const expires = `expires=${date.toUTCString()}`;
                        // Add Secure flag for HTTPS (production) and explicit domain
                        const isHttps = window.location.protocol === 'https:';
                        const secureFlag = isHttps ? ';Secure' : '';
                        const domain = window.location.hostname.includes('localhost') ? '' : `;domain=.${window.location.hostname}`;
                        document.cookie = `${cookieName}=${data.subscriberId};${expires};path=/;SameSite=Lax${secureFlag}${domain}`;
                        console.log('✅ Session cookie set for:', data.subscriberId, '| HTTPS:', isHttps, '| Domain:', domain);
                        console.log('✅ Cookie string:', document.cookie);
                    } else {
                        console.error('❌ No subscriberId in response! Cannot set session cookie.');
                    }

                    // Redirect to referral page with full reload to ensure widget initializes properly
                    setTimeout(() => {
                        console.log('🔄 Redirecting to /referral in 1.5s...');
                        window.location.href = '/referral';
                    }, 1500);
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
                    console.log('🔍 Waitlist POST response data:', data);
                    console.log('🔍 Subscriber ID from response:', data.subscriberId);

                    setMessage({ type: 'success', text: 'Successfully joined the waitlist!' });
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        zipCode: '',
                        userType: 'Both'
                    });

                    // Set session cookie for ReferralHero widget
                    if (data.subscriberId) {
                        const widgetId = 'MF2f0c6063df';
                        const cookieName = `__maitre-session-${widgetId}`;
                        const expirationDays = 30;
                        const date = new Date();
                        date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
                        const expires = `expires=${date.toUTCString()}`;
                        // Add Secure flag for HTTPS (production) and explicit domain
                        const isHttps = window.location.protocol === 'https:';
                        const secureFlag = isHttps ? ';Secure' : '';
                        const domain = window.location.hostname.includes('localhost') ? '' : `;domain=.${window.location.hostname}`;
                        document.cookie = `${cookieName}=${data.subscriberId};${expires};path=/;SameSite=Lax${secureFlag}${domain}`;
                        console.log('✅ Session cookie set for:', data.subscriberId, '| HTTPS:', isHttps, '| Domain:', domain);
                        console.log('✅ Cookie string:', document.cookie);
                    } else {
                        console.error('❌ No subscriberId in response! Cannot set session cookie.');
                    }

                    // Redirect to referral page with full reload to ensure widget initializes properly
                    setTimeout(() => {
                        console.log('🔄 Redirecting to /referral in 1.5s...');
                        window.location.href = '/referral';
                    }, 1500);
                } else if (response.status === 409 && data.error === 'already_exists') {
                    // User already exists - allow editing
                    setMessage({ type: 'info', text: 'You\'re already on the waitlist! You can update your information below.' });
                    setEditMode({ active: true, subscriberId: data.subscriber.id });
                    // Pre-fill form with existing data
                    setFormData({
                        name: data.subscriber.name || '',
                        email: data.subscriber.email || '',
                        phone: data.subscriber.phone || '',
                        zipCode: data.subscriber.zipCode || '',
                        userType: data.subscriber.userType || 'Rider'
                    });
                } else {
                    // Show specific error details if available, otherwise fallback to generic error
                    const errorMessage = data.details || data.error || 'Failed to join waitlist.';
                    setMessage({ type: 'error', text: errorMessage });
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
                maxLength={100}
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
                    className={`${styles.inputField} ${errors.phone ? styles.error : ''} ${editMode.active && formData.phone ? styles.prefilled : ''}`}
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
                    className={`${styles.inputField} ${errors.zipCode ? styles.error : ''} ${editMode.active && formData.zipCode ? styles.prefilled : ''}`}
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

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <a
                    href="/referral-login"
                    style={{
                        color: '#423DF9',
                        fontSize: '14px',
                        textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                    Already joined waitlist? Go to referral dashboard
                </a>
            </div>
        </form>
    );
}
