import CareersContent from "./CareersContent";

export const metadata = {
    title: "Careers - AYRO",
    description: "Join the AYRO team.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function CareerPage() {
    return <CareersContent />;
}
// Force rebuild
