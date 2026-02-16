/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
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
    return [
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

