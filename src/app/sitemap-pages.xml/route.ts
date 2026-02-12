import { NextResponse } from "next/server";
import { jobs } from "@/data/jobs";
import generatedPages from "@/data/generated-pages.json";

export const revalidate = 0;

export async function GET(request: Request) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayrorides.com";

    // Pages auto-discovered at build time by scripts/generate-sitemap-pages.mjs
    const routes = generatedPages.map((page: { route: string; priority: number }) => ({
        url: `${siteUrl}${page.route === "/" ? "" : page.route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: page.priority,
    }));

    // Add dynamic career/job detail pages from jobs data
    const careerRoutes = jobs.map((job) => ({
        url: `${siteUrl}/careers/${job.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));
    routes.push(...careerRoutes);

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
  </url>`
            )
            .join("")}
</urlset>`.trim();

    return new NextResponse(sitemapXml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
    });
}
