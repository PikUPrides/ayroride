import { NextResponse } from "next/server";

export const revalidate = 0; // Disable cache for now

export async function GET(request: Request) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayrorides.com';

    const sitemaps = [
        `${siteUrl}/sitemap-pages.xml`,
        `${siteUrl}/sitemap-posts.xml`,
        `${siteUrl}/sitemap-categories.xml`,
        `${siteUrl}/sitemap-authors.xml`,
    ];

    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps
            .map(
                (url) => `
        <sitemap>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
      `
            )
            .join("")}
    </sitemapindex>`;

    return new NextResponse(sitemapIndex, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
