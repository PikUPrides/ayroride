import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service – User Agreement & Site Policies",
    description: "Our Terms of Service explain website usage, responsibilities, disclaimers, and policies designed to ensure a safe and transparent user experience.",
    openGraph: {
        title: "Terms of Service – User Agreement & Site Policies",
        description: "Our Terms of Service explain website usage, responsibilities, disclaimers, and policies designed to ensure a safe and transparent user experience.",
        url: "https://ayrorides.com/terms-of-service/",
        images: [
            {
                url: "/assets/OG.png",
                width: 1200,
                height: 630,
                alt: "Ayro Terms of Service",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Terms of Service – User Agreement & Site Policies",
        description: "Read our Terms of Service for website usage and policies.",
    },
};

export default function TermsOfServiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
