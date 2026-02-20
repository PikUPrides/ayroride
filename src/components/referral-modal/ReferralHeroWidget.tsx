'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ReferralHeroWidgetProps {
    widgetId: string;
    userEmail?: string | null;
    subscriberId?: string | null;
}

const HIDE_STYLE_ID = 'ayro-hide-rh-verification';

const ReferralHeroWidget: React.FC<ReferralHeroWidgetProps> = ({ widgetId }) => {
    const [widgetState, setWidgetState] = useState<'loading' | 'dashboard' | 'verification'>('loading');
    const [resendStatus, setResendStatus] = useState<'idle' | 'sent' | 'cooldown'>('idle');
    const [cooldownSeconds, setCooldownSeconds] = useState(0);
    const verificationDetectedRef = useRef(false);

    // Cooldown countdown timer
    useEffect(() => {
        if (cooldownSeconds <= 0) {
            if (resendStatus === 'cooldown') setResendStatus('idle');
            return;
        }
        const timer = setTimeout(() => setCooldownSeconds(s => s - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldownSeconds, resendStatus]);

    // Poll widget to detect state: signup form / verification / dashboard
    useEffect(() => {
        const containerId = `referralhero-dashboard-${widgetId}`;

        // Clean up on mount
        document.getElementById(HIDE_STYLE_ID)?.remove();
        verificationDetectedRef.current = false;

        // Hide widget by default until we know what screen it's showing
        const hideStyle = document.createElement('style');
        hideStyle.id = HIDE_STYLE_ID;
        hideStyle.textContent = `#${containerId} { height: 0 !important; min-height: 0 !important; overflow: hidden !important; visibility: hidden !important; position: absolute !important; }`;
        document.head.appendChild(hideStyle);

        const poll = setInterval(() => {
            const container = document.getElementById(containerId);
            if (!container || container.children.length === 0) return;

            const hasCodeInput = container.querySelector('input[type="number"]');
            const hasEmailInput = container.querySelector('input[type="email"]');

            if (hasCodeInput) {
                // Verification screen - keep widget hidden, show our message
                if (!verificationDetectedRef.current) {
                    verificationDetectedRef.current = true;
                    setWidgetState('verification');
                }
            } else if (!hasEmailInput && !hasCodeInput) {
                // No email input and no code input = dashboard
                // Remove the hide CSS to reveal the dashboard
                document.getElementById(HIDE_STYLE_ID)?.remove();
                setWidgetState('dashboard');
                clearInterval(poll);
            }
            // If hasEmailInput → signup form still loading, keep hidden
        }, 200);

        // Fallback: reveal after 5 seconds no matter what
        const fallback = setTimeout(() => {
            if (!verificationDetectedRef.current) {
                document.getElementById(HIDE_STYLE_ID)?.remove();
                setWidgetState('dashboard');
            }
        }, 5000);

        return () => {
            clearInterval(poll);
            clearTimeout(fallback);
            document.getElementById(HIDE_STYLE_ID)?.remove();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widgetId]);

    return (
        <div style={{ position: 'relative', minHeight: widgetState === 'verification' ? 'auto' : '400px', width: '100%' }}>
            {/* Loading spinner */}
            {widgetState === 'loading' && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    minHeight: '400px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    zIndex: 9999
                }}>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#423DF9]"></div>
                </div>
            )}
            {/* Custom verification message */}
            {widgetState === 'verification' && (
                <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '40px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#423DF9"/>
                        </svg>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path d="M17 1.01L7 1C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1.01 17 1.01ZM17 19H7V5H17V19ZM12 17.5C12.83 17.5 13.5 16.83 13.5 16C13.5 15.17 12.83 14.5 12 14.5C11.17 14.5 10.5 15.17 10.5 16C10.5 16.83 11.17 17.5 12 17.5Z" fill="#423DF9"/>
                        </svg>
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>
                        Verify Your Account
                    </h3>
                    <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.6, marginBottom: '24px' }}>
                        We&apos;ve sent verification links to your <strong>email</strong> and <strong>phone (SMS)</strong>.
                        Please check your inbox and messages, and click the links to verify your account.
                    </p>
                    <p style={{ fontSize: '13px', color: '#999', marginBottom: 0 }}>
                        Once verified, refresh this page to access your referral dashboard.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ marginTop: '16px', padding: '12px 32px', background: '#423DF9', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}
                    >
                        I&apos;ve Verified &mdash; Refresh
                    </button>
                    <div style={{ marginTop: '16px' }}>
                        {resendStatus === 'sent' && (
                            <p style={{ fontSize: '14px', color: '#155724', background: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '8px', padding: '10px 16px', marginBottom: '12px' }}>
                                Verification link sent successfully! Check your email and SMS.
                            </p>
                        )}
                        <button
                            disabled={resendStatus === 'cooldown'}
                            onClick={() => {
                                const container = document.getElementById(`referralhero-dashboard-${widgetId}`);
                                const resendBtn = container && Array.from(container.querySelectorAll('button')).find(
                                    btn => btn.textContent?.toLowerCase().includes('resend')
                                );
                                if (resendBtn) {
                                    resendBtn.click();
                                    setResendStatus('sent');
                                    setCooldownSeconds(120);
                                    // Hide success message after 5 seconds, switch to cooldown
                                    setTimeout(() => setResendStatus('cooldown'), 5000);
                                }
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: resendStatus === 'cooldown' ? '#999' : '#423DF9',
                                fontSize: '14px',
                                cursor: resendStatus === 'cooldown' ? 'not-allowed' : 'pointer',
                                padding: 0
                            }}
                            onMouseEnter={(e) => { if (resendStatus !== 'cooldown') e.currentTarget.style.textDecoration = 'underline'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
                        >
                            {resendStatus === 'cooldown'
                                ? `Resend available in ${Math.floor(cooldownSeconds / 60)}:${(cooldownSeconds % 60).toString().padStart(2, '0')}`
                                : 'Send verification link again'}
                        </button>
                    </div>
                </div>
            )}
            {/* ReferralHero widget container */}
            <div
                id={`referralhero-dashboard-${widgetId}`}
                style={{
                    minHeight: widgetState === 'dashboard' ? '400px' : '0',
                    width: '100%',
                    position: 'relative',
                    zIndex: 1
                }}
            />
        </div>
    );
};

export default ReferralHeroWidget;
