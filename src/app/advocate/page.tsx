import WaitlistForm from '@/components/WaitlistForm';

export const metadata = {
    title: "Advocate Dashboard - AYRO",
    description: "Track your referrals and rewards.",
    alternates: {
        canonical: 'https://ayrorides.com/advocate/',
    },
};

export default function AdvocateDashboardPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 py-20">


                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
                    <WaitlistForm />
                </div>
            </div>
        </main>
    );
}