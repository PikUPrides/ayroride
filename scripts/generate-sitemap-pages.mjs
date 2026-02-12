/**
 * Build-time script to discover all pages in src/app and generate a JSON file.
 * This runs BEFORE `next build` so the sitemap route can import the result.
 * 
 * Usage: node scripts/generate-sitemap-pages.mjs
 */

import { readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Files/dirs to exclude
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

// Dynamic route dirs handled by other sitemaps (blog posts, categories, authors)
const SKIP_DYNAMIC_CONTENT_DIRS = ["blog"];

// Priority rules
function getPriority(route) {
    const mainPages = ["/services", "/about-us", "/rider", "/driver", "/contact-us", "/careers"];
    const lowPriorityPages = ["/privacy-policy", "/terms-of-service"];

    if (route === "/") return 1.0;
    if (mainPages.includes(route)) return 1.0;
    if (route === "/blog") return 0.9;
    if (route === "/careers") return 1.0;
    if (route.startsWith("/careers/")) return 0.8;
    if (lowPriorityPages.includes(route)) return 0.5;
    return 0.8;
}

/**
 * Recursively discover pages from the app directory
 */
function discoverPages(dir, basePath = "") {
    const pages = [];

    if (!existsSync(dir)) return pages;

    const items = readdirSync(dir);

    for (const item of items) {
        if (EXCLUDED.includes(item)) continue;
        if (item.startsWith(".") || item.endsWith(".module.css")) continue;

        const fullPath = join(dir, item);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            // Skip dynamic route segments like [slug]
            if (item.startsWith("[") && item.endsWith("]")) continue;

            const route = basePath ? `${basePath}/${item}` : `/${item}`;

            // Check if this directory has a page.tsx or page.ts
            const hasPage =
                existsSync(join(fullPath, "page.tsx")) ||
                existsSync(join(fullPath, "page.ts"));

            if (hasPage) {
                pages.push({ route, priority: getPriority(route) });
            }

            // Recursively scan subdirectories (skip blog — handled by sitemap-posts)
            if (!SKIP_DYNAMIC_CONTENT_DIRS.includes(item)) {
                pages.push(...discoverPages(fullPath, route));
            }
        }
    }

    return pages;
}

// Run discovery
const appDir = join(projectRoot, "src", "app");
const pages = [
    { route: "/", priority: 1.0 }, // Homepage (no page.tsx in app root to discover)
    ...discoverPages(appDir),
];

// Write output
const outputDir = join(projectRoot, "src", "data");
if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
}

const outputPath = join(outputDir, "generated-pages.json");
writeFileSync(outputPath, JSON.stringify(pages, null, 2));

console.log(`✅ Generated sitemap pages: ${pages.length} pages found`);
pages.forEach((p) => console.log(`   ${p.route} (priority: ${p.priority})`));
