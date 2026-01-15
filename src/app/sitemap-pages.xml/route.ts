import { NextResponse } from "next/server";

// Static list of pages - update this manually when adding new pages
const staticPages = [
    "/",
    "/about-us",
    "/services",
    "/blog",
    "/contact-us",
    "/join-our-waitlist",
    "/privacy-policy",
    "/terms-of-service",
];

export const revalidate = 0; // Disable cache for now

export async function GET() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayrorides.com";
    const dynamicRoutes: string[] = staticPages;

    // Define main pages (higher priority)
    const mainPages = ["/services", "/about-us"];

    // Define blog page (medium-high priority)
    const blogPage = "/blog";

    // Define legal and other low priority pages
    const lowPriorityPages = [
        "/contact-us",
        "/privacy-policy",
        "/terms-of-service",
    ];

    const routes = dynamicRoutes.map((route) => {
        let priority = 0.5; // Default priority for other pages

        if (route === "/") {
            priority = 1.0; // Homepage
        } else if (mainPages.includes(route)) {
            priority = 0.9; // Main pages
        } else if (route === blogPage) {
            priority = 0.8; // Blog page
        } else if (lowPriorityPages.includes(route)) {
            priority = 0.4; // Legal/Misc pages
        }

        return {
            url: `${siteUrl}${route === "/" ? "" : route}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority,
        };
    });

    // Sort by priority (highest first)
    const sortedRoutes = routes.sort((a, b) => b.priority - a.priority);

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sortedRoutes
            .map(
                (route) => `
        <url>
          <loc>${route.url}</loc>
          <lastmod>${route.lastModified}</lastmod>
          <changefreq>${route.changeFrequency}</changefreq>
          <priority>${route.priority}</priority>
        </url>
      `
            )
            .join("")}
    </urlset>`;

    return new NextResponse(sitemapXml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
