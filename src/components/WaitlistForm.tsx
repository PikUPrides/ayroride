"use client";

import React, { useState, useEffect } from 'react';

// Using inline styles to match the 'improved' version and avoid Turbopack css module issues
const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '20px',
        width: '100%',
        maxWidth: '600px',
        background: 'white',
        padding: '2.5rem',
        borderRadius: '20px',
        boxShadow: 'none',
        border: '1.5px solid #423DF9',
        margin: '0 auto',
    },
    inputGroup: {
        width: '100%',
    },
    inputField: {
        width: '100%',
        height: '48px',
        padding: '0 16px',
        backgroundColor: '#F4F4F9',
        border: 'none',
        borderRadius: '12px',
        fontFamily: 'inherit',
        fontSize: '14px',
        color: '#5C5C5C',
        outline: 'none',
        boxSizing: 'border-box' as const,
    },
    rowContainer: {
        display: 'flex',
        gap: '16px',
        width: '100%',
    },
    phoneWrapper: {
        flex: 2,
        height: '48px',
        backgroundColor: '#F4F4F9',
        borderRadius: '12px',
        padding: '0 16px',
        boxSizing: 'border-box' as const,
        display: 'flex',
        alignItems: 'center',
    },
    zipWrapper: {
        flex: 1,
        minWidth: '120px',
    },
    phoneInput: {
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        fontFamily: 'inherit',
        fontSize: '14px',
        color: '#5C5C5C',
        padding: 0,
    },
    userTypeSection: {
        width: '100%',
        textAlign: 'left' as const,
    },
    userTypeLabel: {
        fontSize: '16px',
        fontWeight: 400,
        color: '#111111',
        marginBottom: '12px',
        display: 'block',
    },
    radioGroup: {
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
    },
    radioLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#111111',
    },
    radioInput: {
        width: '20px',
        height: '20px',
        cursor: 'pointer',
        accentColor: '#423DF9',
    },
    submitBtn: {
        width: '100%',
        height: '45px',
        backgroundColor: '#423DF9',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 700,
        fontFamily: 'inherit',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '10px',
    },
    disclaimer: {
        fontFamily: 'inherit',
        fontSize: '13px',
        lineHeight: '15.6px',
        color: '#1111117f',
        textAlign: 'center' as const,
        margin: 0,
        marginTop: '10px',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center' as const,
        marginTop: '10px',
    }
};

export default function WaitlistForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        zipCode: '',
        userType: 'Driver' // Default to Driver or based on preference
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Auto-hide success or error message after 5 seconds
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

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong. Please try again.');
            }

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', zipCode: '', userType: 'Driver' });
        } catch (error: any) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Failed to join waitlist.');
        }
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
        if (formatted.length <= 14) {
            setFormData({ ...formData, phone: formatted });
        }
    };

    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
                <input
                    type="text"
                    placeholder="Full Name"
                    style={styles.inputField}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>

            <div style={styles.inputGroup}>
                <input
                    type="email"
                    placeholder="Email Address"
                    style={styles.inputField}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
            </div>

            <div style={styles.rowContainer}>
                <div style={styles.phoneWrapper}>
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        style={styles.phoneInput}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        required
                    />
                </div>
                <div style={styles.zipWrapper}>
                    <input
                        type="text"
                        placeholder="Zip Code"
                        style={styles.inputField}
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        required
                    />
                </div>
            </div>

            <div style={styles.userTypeSection}>
                <label style={styles.userTypeLabel}>Are you interested in signing up as?</label>
                <div style={styles.radioGroup}>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="userType"
                            value="Driver"
                            checked={formData.userType === "Driver"}
                            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                            style={styles.radioInput}
                        />
                        <span>Driver</span>
                    </label>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="userType"
                            value="Rider"
                            checked={formData.userType === "Rider"}
                            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                            style={styles.radioInput}
                        />
                        <span>Rider</span>
                    </label>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="userType"
                            value="Both"
                            checked={formData.userType === "Both"}
                            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                            style={styles.radioInput}
                        />
                        <span>Both</span>
                    </label>
                </div>
            </div>

            {status === 'error' && <p style={styles.errorMessage}>{errorMessage}</p>}

            {status === 'success' && (
                <p style={{ color: '#00C853', textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
                    You're on the list! Thank you for joining.
                </p>
            )}

            <button type="submit" style={styles.submitBtn} disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting...' : 'Submit'}
            </button>

            <p style={styles.disclaimer}>
                By joining, you agree to receive updates about the referral program
            </p>
        </form>
    );
}
