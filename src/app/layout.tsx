import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import ReferralModal from "@/components/referral-modal/ReferralModal";
import { ModalProvider } from "@/context/ModalContext";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "AYRO – Earn Rewards for Referrals",
  description: "Join the AYRO affiliate waitlist, refer friends & earn exciting rewards. Download app and get a chance to win exclusive prizes!",
  metadataBase: new URL("https://ayrorides.com"),
  icons: {
    icon: '/images/favicon.svg',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayrorides.com",
    siteName: "AYRO",
    title: "AYRO",
    description: "Ridesharing means better pay and safety.",
    images: [
      {
        url: "/assets/OG.png",
        width: 1200,
        height: 630,
        alt: "AYRO - Ridesharing Reinvented",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AYRO",
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
        <ModalProvider>
          <Header />
          {children}
          <Footer />
          <ReferralModal />
        </ModalProvider>
        <Script id="referralhero-global" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `!function(m,a,i,t,r,e){if(m.RH)return;r=m.RH={},r.uuid=t,r.loaded=0,r.base_url=i,r.queue=[],m.rht=function(){r.queue.push(arguments)};e=a.getElementsByTagName('script')[0],c=a.createElement('script');c.async=!0,c.src='https://referralhero-global-code.s3.amazonaws.com/production/'+t+'.js',e.parentNode.insertBefore(c,e)}(window,document,'https://app.referralhero.com','RH0d3a5b93dd');`
        }} />
        <Script id="zoho-pagesense" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `(function(w,s){var e=document.createElement("script");e.type="text/javascript";e.async=true;e.src="https://cdn.pagesense.io/js/pikupinc/8d7816e424414c6aa3dc73e841dac36b.js";var x=document.getElementsByTagName("script")[0];x.parentNode.insertBefore(e,x);})(window,"script");`
        }} />
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
