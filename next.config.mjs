/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compress: false, // Disable gzip/brotli to prevent proxy conflicts
  images: {
    unoptimized: true, // Disable image optimization to bypass proxy issues
  },
  async headers() {
    const sitemapHeaders = [
      { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400" },
      { key: "CDN-Cache-Control", value: "public, max-age=3600" },
      { key: "X-Robots-Tag", value: "noindex" },
      { key: "Vary", value: "Accept-Encoding" },
    ];
    const securityHeaders = [
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://*.gstatic.com https://d7zve4d3u0dfm.cloudfront.net https://cdn.pagesense.io https://desk.zoho.com https://www.clarity.ms",
          "style-src 'self' 'unsafe-inline' https://translate.googleapis.com https://*.gstatic.com",
          "img-src 'self' data: https: blob:",
          "font-src 'self' https://fonts.gstatic.com https://translate.googleapis.com https://*.gstatic.com",
          "connect-src 'self' https: wss:",
          "frame-src 'self' https://desk.zoho.com https://translate.google.com https://*.google.com",
          "object-src 'none'",
        ].join("; "),
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin-allow-popups",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
    ];
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      { source: "/sitemap.xml", headers: sitemapHeaders },
      { source: "/sitemap-pages.xml", headers: sitemapHeaders },
      { source: "/sitemap-posts.xml", headers: sitemapHeaders },
      { source: "/sitemap-categories.xml", headers: sitemapHeaders },
      { source: "/sitemap-authors.xml", headers: sitemapHeaders },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400" },
          { key: "CDN-Cache-Control", value: "public, max-age=86400" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;

