import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Data Protection & User Privacy",
    description: "Ayro (\"we,\" \"our,\" or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your",
    openGraph: {
        title: "Privacy Policy | Data Protection & User Privacy",
        description: "Ayro is committed to protecting your privacy. Learn how we collect, use, disclose, and safeguard your personal information.",
        url: "https://ayrorides.com/privacy-policy/",
        images: [
            {
                url: "/assets/OG.png",
                width: 1200,
                height: 630,
                alt: "Ayro Privacy Policy",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy Policy | Data Protection & User Privacy",
        description: "Learn how Ayro protects your privacy and personal information.",
    },
};

export default function PrivacyPolicyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
