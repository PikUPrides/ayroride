import ReferralHeroWidget from '@/components/referral-modal/ReferralHeroWidget';

export const metadata = {
    title: "Advocate Dashboard - AYRO",
    description: "Track your referrals and rewards.",
};

export default function AdvocateDashboardPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 py-20">


                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
                    <ReferralHeroWidget widgetId="MF2f0c6063df" />
                </div>
            </div>
        </main>
    );
}