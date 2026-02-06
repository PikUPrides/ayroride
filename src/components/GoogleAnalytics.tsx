import Script from "next/script";

export default function GoogleAnalytics() {
    return (
        <>
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-D85JG8ZSQ1"
            />
            <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D85JG8ZSQ1');
          `
            }} />
        </>
    );
}
