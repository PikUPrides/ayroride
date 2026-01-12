import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "PikUP – Earn Rewards for Referrals",
  description: "Join the PikUP affiliate waitlist, refer friends & earn exciting rewards. Download app and get a chance to win exclusive prizes!",
  metadataBase: new URL("https://pikup.us"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pikup.us",
    siteName: "PikUP",
    title: "PikUP",
    description: "Ridesharing means better pay and safety.",
    images: [
      {
        url: "/assets/OG.png",
        width: 1200,
        height: 630,
        alt: "PikUP - Ridesharing Reinvented",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PikUP",
    description: "Ridesharing means better pay and safety.",
    images: ["/assets/OG.png"],
    creator: "@pikup26698",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${openSans.className}`} suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
