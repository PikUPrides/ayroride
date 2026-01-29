import ReferralHeroWidget from '@/components/referral-modal/ReferralHeroWidget';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: "Refer & Earn - AYRO",
    description: "Join the movement. Refer drivers and riders to earn rewards.",
};

export default function ReferralPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <span className="text-[#423DF9] font-bold tracking-wider text-sm uppercase mb-4 block">
                        Grow the Movement
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-6">
                        Refer & Earn Rewards
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Invite friends to join AYRO as drivers or riders.
                        You'll both earn rewards when they complete their first trips.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
                    <ReferralHeroWidget widgetId="MF2f0c6063df" />
                </div>
            </div>
        </main>
    );
}
