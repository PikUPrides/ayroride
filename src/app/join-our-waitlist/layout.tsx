import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Join Our Waitlist | Be the First to Get Access",
    description: "Join our waitlist to get early access, exclusive updates, and first notifications when we launch. Secure your spot today.",
    openGraph: {
        title: "Join Our Waitlist | Be the First to Get Access",
        description: "Join our waitlist to get early access, exclusive updates, and first notifications when we launch. Secure your spot today.",
        url: "https://ayrorides.com/join-our-waitlist/",
        images: [
            {
                url: "/assets/OG.png",
                width: 1200,
                height: 630,
                alt: "Join Ayro Waitlist",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Join Our Waitlist | Be the First to Get Access",
        description: "Get early access and exclusive updates. Secure your spot today.",
    },
};

export default function JoinWaitlistLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
