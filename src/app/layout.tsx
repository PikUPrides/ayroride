import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import ReferralModal from "@/components/referral-modal/ReferralModal";
import { ModalProvider } from "@/context/ModalContext";

import PromoPopup from "@/components/PromoPopup";
import LanguageDropdown from "@/components/LanguageDropdown";

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
    //verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* LCP preload — hero image */}
        <link rel="preload" as="image" href="/images/promo-bg.webp" fetchPriority="high" />

        {/* Preconnect — critical analytics origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />


        {/* DNS prefetch — non-critical third-party origins */}
        <link rel="dns-prefetch" href="https://translate.google.com" />
        <link rel="dns-prefetch" href="https://d7zve4d3u0dfm.cloudfront.net" />
        <link rel="dns-prefetch" href="https://cdn.pagesense.io" />
        <link rel="dns-prefetch" href="https://desk.zoho.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <body className={`${openSans.variable} ${openSans.className}`} suppressHydrationWarning>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5FKKXTJ8"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>

        {/* Google Translate Setup */}
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement(
                  {
                    pageLanguage: 'en',
                    autoDisplay: false
                  },
                  'google_translate_element'
                );
              }
            `
          }}
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <div id="google_translate_element" style={{ display: 'none' }} />

        <Script id="google-tag-manager" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5FKKXTJ8');`
        }} />
        <ModalProvider>
          <Header />
          {children}
          <Footer />
          <ReferralModal />
          <LanguageDropdown />
        </ModalProvider>
        <Script id="referralhero-global" strategy="lazyOnload" dangerouslySetInnerHTML={{
          __html: `!function(m,a,i,t,r,e){if(m.RH)return;r=m.RH={},r.uuid=t,r.loaded=0,r.base_url=i,r.queue=[],m.rht=function(){r.queue.push(arguments)};e=a.getElementsByTagName('script')[0],c=a.createElement('script');c.async=!0,c.src='https://d7zve4d3u0dfm.cloudfront.net/'+'production'+'/'+t+'.js',e.parentNode.insertBefore(c,e)}(window,document,'https://app.referralhero.com','RH0d3a5b93dd');`
        }} />
        <Script id="zoho-pagesense" strategy="lazyOnload" dangerouslySetInnerHTML={{
          __html: `(function(w,s){var e=document.createElement("script");e.type="text/javascript";e.async=true;e.src="https://cdn.pagesense.io/js/pikupinc/8d7816e424414c6aa3dc73e841dac36b.js";var x=document.getElementsByTagName("script")[0];x.parentNode.insertBefore(e,x);})(window,"script");`
        }} />
        <Script id="zohodeskasap" strategy="lazyOnload" dangerouslySetInnerHTML={{
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
              window.ZohoDeskAsapReadyStatus?
                (s&&e.push(s),e.forEach(s=>s&&s()),window.ZohoDeskAsap__asyncalls=null)
                : s&&e.push(s)
            };
          `
        }} />

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="lazyOnload" dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ui8hxy360h");
          `
        }} />


        <PromoPopup />
      </body>
    </html>
  );
}
