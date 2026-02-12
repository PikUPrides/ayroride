import { NextResponse } from "next/server";
import { getPaginatedPosts } from "@/lib/posts";

export const revalidate = 3600; // Revalidate every hour

export async function GET(request: Request) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayrorides.com';
    let allPosts: any[] = [];
    let page = 1;
    let hasMore = true;

    // Fetch all posts by paginating through the API
    while (hasMore) {
        const { posts, totalPages } = await getPaginatedPosts(page, 100);
        if (posts.length > 0) {
            allPosts = [...allPosts, ...posts];
            if (page >= totalPages) {
                hasMore = false;
            } else {
                page++;
            }
        } else {
            hasMore = false;
        }
    }

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPosts
            .map(
                (post) => `
  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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
