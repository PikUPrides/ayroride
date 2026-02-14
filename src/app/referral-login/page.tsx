'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ReferralLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
    const [isCheckingCookie, setIsCheckingCookie] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage(null);
        setIsSubmitting(true);

        try {
            // Validate email format
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
            if (!emailRegex.test(email)) {
                setError('Please enter a valid email address');
                setIsSubmitting(false);
                return;
            }

            // Check if subscriber exists in ReferralHero
            const response = await fetch('/api/referral-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && data.subscriberId) {
                // Set session cookie for future visits
                const widgetId = 'MF2f0c6063df';
                const cookieName = `__maitre-session-${widgetId}`;
                const expirationDays = 30;
                const date = new Date();
                date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
                const expires = `expires=${date.toUTCString()}`;

                // Add Secure flag for HTTPS (production)
                const isHttps = window.location.protocol === 'https:';
                const secureFlag = isHttps ? ';Secure' : '';
                document.cookie = `${cookieName}=${data.subscriberId};${expires};path=/;SameSite=Lax${secureFlag}`;
                console.log('✅ Session cookie set for:', data.subscriberId, '| HTTPS:', isHttps);

                // Redirect to referral page (widget will show dashboard if verified, verification screen if not)
                setMessage({
                    type: 'success',
                    text: data.verified
                        ? 'Success! Redirecting to your dashboard...'
                        : 'Found your account! Redirecting to verification page...'
                });

                setTimeout(() => {
                    // Use full page reload for both verified and unverified users
                    // This ensures ReferralHero widget initializes properly
                    window.location.href = '/referral';
                }, 1500);
            } else {
                setError(data.error || 'Email not found. Please join the waitlist first.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading while checking for cookie
    if (isCheckingCookie) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center" style={{ paddingTop: '95px' }}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#423DF9]"></div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white" style={{ paddingTop: '95px' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="text-center" style={{ marginBottom: '32px' }}>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Access Your Referral Dashboard
                    </h1>
                    <p className="text-gray-600 text-lg" style={{ marginBottom: '0' }}>
                        Enter your email to view your referral stats and rewards.
                    </p>
                </div>

                <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address*"
                            required
                            style={{
                                width: '100%',
                                height: '48px',
                                padding: '7px 12px',
                                backgroundColor: '#F4F4F9',
                                border: '2px solid transparent',
                                borderRadius: '12px',
                                fontFamily: 'inherit',
                                fontSize: '14px',
                                lineHeight: '21px',
                                color: '#5C5C5C',
                                boxSizing: 'border-box'
                            }}
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                width: '100%',
                                height: '45px',
                                backgroundColor: '#423DF9',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '5px',
                                fontSize: '16px',
                                fontWeight: '700',
                                fontFamily: 'inherit',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                opacity: isSubmitting ? 0.7 : 1,
                                transition: 'background-color 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                if (!isSubmitting) {
                                    e.currentTarget.style.backgroundColor = '#3530d4';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#423DF9';
                            }}
                        >
                            {isSubmitting ? 'Loading...' : 'Access Dashboard'}
                        </button>

                        {message && (
                            <div style={{
                                padding: '12px',
                                backgroundColor: message.type === 'info' ? '#d1ecf1' : message.type === 'success' ? '#d4edda' : '#f8d7da',
                                color: message.type === 'info' ? '#0c5460' : message.type === 'success' ? '#155724' : '#721c24',
                                border: `1px solid ${message.type === 'info' ? '#bee5eb' : message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontSize: '14px'
                            }}>
                                {message.text}
                            </div>
                        )}

                        {error && !message && (
                            <div style={{
                                padding: '12px',
                                backgroundColor: '#f8d7da',
                                color: '#721c24',
                                border: '1px solid #f5c6cb',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontSize: '14px'
                            }}>
                                {error}
                            </div>
                        )}

                        <div style={{ textAlign: 'center', marginTop: '8px' }}>
                            <a
                                href="/join-our-waitlist"
                                style={{
                                    color: '#423DF9',
                                    fontSize: '14px',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                            >
                                Don't have an account? Join the waitlist
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
