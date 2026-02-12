'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ReferralHeroWidget from '@/components/referral-modal/ReferralHeroWidget';

function ReferralContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <span className="text-[#423DF9] font-bold tracking-wider text-sm uppercase mb-4 block">
                        Grow the Movement
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-6">
                        Refer & Earn Rewards
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Verify your account and start sharing your referral link.
                        You'll earn rewards when your friends complete their first trips.
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10">
                    <ReferralHeroWidget widgetId="MF2f0c6063df" userEmail={email} />
                </div>
            </div>
        </main>
    );
}

export default function ReferralPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ReferralContent />
        </Suspense>
    );
}
