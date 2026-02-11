import HomeClient from "@/components/HomeClient";

// Metadata export
export const metadata = {
  title: "Fair, Surge-Free Rides Start with AYRO",
  description: "Tired of surge pricing? AYRO Rides offers predictable fares, safety-first rides & fair driver pay. Join waitlist & unlock early referral rewards.",
  alternates: {
    canonical: 'https://ayrorides.com/',
  },
};

export default function Home() {
  return <HomeClient />;
}
