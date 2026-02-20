'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReferralHeroWidget from '@/components/referral-modal/ReferralHeroWidget';
import './referral-hero-custom.css';

function LogoutLink() {
    const handleLogout = () => {
        const widgetId = 'MF2f0c6063df';
        const cookieName = `__maitre-session-${widgetId}`;
        const expiry = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';

        // Clear session cookie on all possible domain/path combinations
        document.cookie = `${cookieName}=;${expiry};path=/;`;
        document.cookie = `${cookieName}=;${expiry};path=/;domain=${window.location.hostname}`;
        document.cookie = `${cookieName}=;${expiry};path=/;domain=.${window.location.hostname}`;

        // Also clear any ReferralHero subscriber cookies
        const allCookies = document.cookie.split(';');
        for (const cookie of allCookies) {
            const name = cookie.split('=')[0].trim();
            if (name.includes('maitre') || name.includes('referralhero') || name.includes('mtr')) {
                document.cookie = `${name}=;${expiry};path=/;`;
                document.cookie = `${name}=;${expiry};path=/;domain=${window.location.hostname}`;
                document.cookie = `${name}=;${expiry};path=/;domain=.${window.location.hostname}`;
            }
        }

        // Redirect to login page
        window.location.href = '/referral-login';
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
                onClick={handleLogout}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#423DF9',
                    fontSize: '14px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    padding: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
                Switch Account
            </button>
        </div>
    );
}

function ReferralContent() {
    const router = useRouter();
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    useEffect(() => {
        // Check if session cookie exists
        const widgetId = 'MF2f0c6063df';
        const cookieName = `__maitre-session-${widgetId}`;

        const cookies = document.cookie.split(';');
        const sessionCookie = cookies.find(cookie =>
            cookie.trim().startsWith(`${cookieName}=`)
        );

        if (!sessionCookie) {
            // No session cookie at all, redirect to login
            console.log('❌ No session cookie, redirecting to login');
            router.push('/referral-login');
        } else {
            // Cookie exists, let ReferralHero widget handle it
            console.log('✅ Session cookie found, showing widget');
            setIsCheckingSession(false);
        }
    }, [router]);

    // Show loading while checking session
    if (isCheckingSession) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center" style={{ paddingTop: '95px' }}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#423DF9]"></div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white" style={{ paddingTop: '110px' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 48px 24px' }}>
                <div className="text-center" style={{ marginBottom: '24px' }}>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Refer & Earn Rewards
                    </h1>
                    <p className="text-gray-600 text-lg" style={{ marginBottom: '0' }}>
                        Share your referral link and earn rewards when your friends join AYRO.
                    </p>
                </div>

                <div className="w-full">
                    <ReferralHeroWidget
                        widgetId="MF2f0c6063df"
                        userEmail={null}
                        subscriberId={null}
                    />
                    <LogoutLink />
                </div>
            </div>
        </main>
    );
}

export default function ReferralPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#423DF9]"></div>
            </div>
        }>
            <ReferralContent />
        </Suspense>
    );
}
