import { NextResponse } from "next/server";
import { readdirSync, statSync, existsSync } from "fs";
import { join } from "path";
import { jobs } from "@/data/jobs";

export const revalidate = 0; // Disable cache for now

// Directories and files to exclude from sitemap
const EXCLUDED = [
    "api",
    "sitemap-pages.xml",
    "sitemap-posts.xml",
    "sitemap-categories.xml",
    "sitemap-authors.xml",
    "sitemap.xml",
    "robots.ts",
    "globals.css",
    "layout.tsx",
    "not-found.tsx",
    "error.tsx",
    "loading.tsx",
    "icon.png",
    "icon.svg",
    "favicon.ico",
];

// Directories with dynamic routes that we handle separately
const DYNAMIC_ROUTE_DIRS = ["blog", "careers"];

// Priority configuration for different page types
const PRIORITY_CONFIG = {
    home: 1.0,
    mainPages: ["/services", "/about-us"],
    mainPriority: 0.9,
    blogPage: "/blog",
    blogPriority: 0.8,
    careersPage: "/careers",
    careersPriority: 0.75,
    jobDetailPriority: 0.7,
    lowPriorityPages: ["/contact-us", "/privacy-policy", "/terms-of-service"],
    lowPriority: 0.4,
    defaultPriority: 0.5,
};

/**
 * Recursively discovers all static pages from the app directory
 */
function discoverStaticPages(dir: string, basePath: string = ""): string[] {
    const pages: string[] = [];

    if (!existsSync(dir)) {
        return pages;
    }

    const items = readdirSync(dir);

    for (const item of items) {
        // Skip excluded files and directories
        if (EXCLUDED.includes(item)) continue;

        // Skip hidden files and module CSS files
        if (item.startsWith(".") || item.endsWith(".module.css")) continue;

        const fullPath = join(dir, item);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            // Skip dynamic route directories (handled separately)
            if (item.startsWith("[") && item.endsWith("]")) continue;

            // Check if this directory has a page.tsx file (it's a route)
            const pagePath = join(fullPath, "page.tsx");
            if (existsSync(pagePath)) {
                const route = basePath ? `${basePath}/${item}` : `/${item}`;

                // Skip directories we handle dynamically (but add the index page)
                if (!DYNAMIC_ROUTE_DIRS.includes(item)) {
                    pages.push(route);
                } else {
                    // For dynamic route dirs, just add the index page
                    pages.push(route);
                }
            }

            // Recursively scan subdirectories (except dynamic route dirs)
            if (!DYNAMIC_ROUTE_DIRS.includes(item)) {
                const subPath = basePath ? `${basePath}/${item}` : `/${item}`;
                pages.push(...discoverStaticPages(fullPath, subPath));
            }
        }
    }

    return pages;
}

/**
 * Gets all career/job detail page URLs from the jobs data
 */
function getCareerPages(): string[] {
    return jobs.map((job) => `/careers/${job.slug}`);
}

/**
 * Determines priority for a given route
 */
function getPriority(route: string): number {
    if (route === "/") return PRIORITY_CONFIG.home;
    if (PRIORITY_CONFIG.mainPages.includes(route)) return PRIORITY_CONFIG.mainPriority;
    if (route === PRIORITY_CONFIG.blogPage) return PRIORITY_CONFIG.blogPriority;
    if (route === PRIORITY_CONFIG.careersPage) return PRIORITY_CONFIG.careersPriority;
    if (route.startsWith("/careers/")) return PRIORITY_CONFIG.jobDetailPriority;
    if (PRIORITY_CONFIG.lowPriorityPages.includes(route)) return PRIORITY_CONFIG.lowPriority;
    return PRIORITY_CONFIG.defaultPriority;
}

export async function GET() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayrorides.com";

    // Get the app directory path
    const appDir = join(process.cwd(), "src", "app");

    // Discover static pages from the filesystem
    const staticPages = discoverStaticPages(appDir);

    // Add homepage
    const allPages = ["/", ...staticPages];

    // Add dynamic career pages from jobs data
    const careerPages = getCareerPages();
    allPages.push(...careerPages);

    // Remove duplicates
    const uniquePages = [...new Set(allPages)];

    // Build route objects with metadata
    const routes = uniquePages.map((route) => ({
        url: `${siteUrl}${route === "/" ? "" : route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: getPriority(route),
    }));

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
