'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ReferralHeroWidget from '@/components/referral-modal/ReferralHeroWidget';

function ReferralContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    return (
        <main className="min-h-screen bg-white" style={{ paddingTop: '95px' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Refer & Earn Rewards
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Share your referral link and earn rewards when your friends join AYRO.
                    </p>
                </div>

                <div className="w-full">
                    <ReferralHeroWidget widgetId="MF2f0c6063df" userEmail={email} />
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
