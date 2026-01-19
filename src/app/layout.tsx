import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "Ayro – Earn Rewards for Referrals",
  description: "Join the Ayro affiliate waitlist, refer friends & earn exciting rewards. Download app and get a chance to win exclusive prizes!",
  metadataBase: new URL("https://ayrorides.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayrorides.com",
    siteName: "Ayro",
    title: "Ayro",
    description: "Ridesharing means better pay and safety.",
    images: [
      {
        url: "/assets/OG.png",
        width: 1200,
        height: 630,
        alt: "Ayro - Ridesharing Reinvented",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayro",
    description: "Ridesharing means better pay and safety.",
    images: ["/assets/OG.png"],
    creator: "@pikup26698",
  },
  robots: {
    index: false,
    follow: false,
    noindex: true,
    nofollow: true,
    googleBot: {
      index: false,
      follow: false,
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
        <Script id="zohodeskasap" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            var d=document;
            s=d.createElement("script");
            s.type="text/javascript";
            s.id="zohodeskasapscript";
            s.defer=true;
            s.src="https://desk.zoho.com/portal/api/web/asapApp/1197915000000522199?orgId=902597656";
            t=d.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(s,t);
            window.ZohoDeskAsapReady=function(s){
                var e=window.ZohoDeskAsap__asyncalls=window.ZohoDeskAsap__asyncalls||[];
                window.ZohoDeskAsapReadyStatus?(s&&e.push(s),e.forEach(s=>s&&s()),window.ZohoDeskAsap__asyncalls=null):s&&e.push(s)
            };
          `
        }} />
      </body>
    </html>
  );
}
