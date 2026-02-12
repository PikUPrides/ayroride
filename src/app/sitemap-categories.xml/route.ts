import { NextResponse } from "next/server";
import { getAllCategories } from "@/lib/posts";

export const revalidate = 3600; // Revalidate every hour

export async function GET(request: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayrorides.com';

  const categories = await getAllCategories();

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categories
      .map(
        (category) => `
  <url>
    <loc>${siteUrl}/blog/category/${category.toLowerCase().replace(/ /g, "-")}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
      )
      .join("")}
</urlset>`.trim();

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      "CDN-Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex",
      "Vary": "Accept-Encoding",
    },
  });
}
