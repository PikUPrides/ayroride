import ReferralHeroDashboard from '@/components/referral-modal/ReferralHeroDashboard';

export const metadata = {
    title: "Advocate Dashboard - AYRO",
    description: "Track your referrals and rewards.",
};

export default function AdvocateDashboardPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <span className="text-[#423DF9] font-bold tracking-wider text-sm uppercase mb-4 block">
                        Your Impact
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-6">
                        Advocate Dashboard
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Track your referrals, view your rewards, and share your unique link to grow the movement.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
                    <ReferralHeroDashboard />
                </div>
            </div>
        </main>
    );
}
