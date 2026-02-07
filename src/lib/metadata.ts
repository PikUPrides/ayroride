import { Metadata } from "next";
import { Post } from "./types";

export function generatePostMetadata(post: Post): Metadata {
    // 1. Title
    const title = post.rank_math_title || post.title;

    // 2. Description
    const description = post.rank_math_description || post.description || "";

    // 3. Canonical URL
    const canonicalUrl = post.rank_math_canonical || `https://ayrorides.com/blog/${post.slug}`;

    // 4. Open Graph (Facebook/Social)
    const ogTitle = post.rank_math_facebook_title || post.rank_math_title || post.title;
    const ogDescription =
        post.rank_math_facebook_description ||
        post.rank_math_description ||
        post.description ||
        "";
    const ogImage =
        post.rank_math_facebook_image ||
        post.featuredImage ||
        "https://ayrorides.com/assets/OG.png";

    // 5. Twitter
    const twitterTitle =
        post.rank_math_twitter_title || post.rank_math_title || post.title;
    const twitterDescription =
        post.rank_math_twitter_description ||
        post.rank_math_description ||
        post.description ||
        "";
    const twitterImage =
        post.rank_math_twitter_image ||
        post.rank_math_facebook_image ||
        post.featuredImage ||
        "https://ayrorides.com/assets/OG.png";

    // 6. Robots
    const rawRobots =
        post._rank_math_robots ||
        post.rank_math_robots ||
        "";

    const rmRobots = typeof rawRobots === "string"
        ? rawRobots.split(",").map((r: string) => r.trim())
        : [];

    const isNoIndex = rmRobots.includes("noindex");
    const isNoFollow = rmRobots.includes("nofollow");

    const robots = {
        index: !isNoIndex,
        follow: !isNoFollow,
        googleBot: {
            index: !isNoIndex,
            follow: !isNoFollow,
            "max-video-preview": -1,
            "max-image-preview": "large" as const,
            "max-snippet": -1,
        },
    };

    return {
        title: title,
        description: description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            url: canonicalUrl,
            siteName: "AYRO",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: ogTitle,
                },
            ],
            locale: "en_US",
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: twitterTitle,
            description: twitterDescription,
            images: [twitterImage],
        },
        robots: robots,
    };
}
