import { NextResponse } from "next/server";
import { getAllAuthors } from "@/lib/posts";

export const revalidate = 0; // Disable cache for now

export async function GET(request: Request) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayrorides.com';

    const authors = await getAllAuthors();

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${authors
            .map((author) => {
                const slugifiedAuthor = author
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)+/g, "");
                return `
        <url>
          <loc>${siteUrl}/blog/author/${slugifiedAuthor}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.6</priority>
        </url>
      `;
            })
            .join("")}
    </urlset>`;

    return new NextResponse(sitemapXml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
