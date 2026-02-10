import WaitlistForm from '@/components/WaitlistForm';
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


                <div className="bg-white rounded-2xl p-6 md:p-10">
                    <WaitlistForm />
                </div>
            </div>
        </main>
    );
}
