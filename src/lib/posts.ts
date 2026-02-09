import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { Post, PostMeta } from "./types";

// ------------------------------------------
// Helper: Get Rank Math Head
// ------------------------------------------
export async function getRankMathHead(postUrl: string) {
  const res = await fetch(
    `https://blog.ayrorides.com/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(postUrl)}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error("Failed to fetch Rank Math head");
  const data = await res.json();

  // Parse the HTML string to extract meta values
  const html = data.head || "";

  // Extract title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? titleMatch[1] : "";

  // Extract description
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  const description = descMatch ? descMatch[1] : "";

  // Extract robots
  const robotsMatch = html.match(/<meta name="robots" content="([^"]*)"/);
  const robots = robotsMatch ? robotsMatch[1] : "";

  // Extract canonical
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]*)"/);
  const canonical = canonicalMatch ? canonicalMatch[1] : postUrl;

  // Extract OpenGraph
  const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]*)"/);
  const ogDescMatch = html.match(/<meta property="og:description" content="([^"]*)"/);
  const ogImageMatch = html.match(/<meta property="og:image" content="([^"]*)"/);
  const ogImageWidthMatch = html.match(/<meta property="og:image:width" content="([^"]*)"/);
  const ogImageHeightMatch = html.match(/<meta property="og:image:height" content="([^"]*)"/);

  // Extract Twitter
  const twTitleMatch = html.match(/<meta name="twitter:title" content="([^"]*)"/);
  const twDescMatch = html.match(/<meta name="twitter:description" content="([^"]*)"/);
  const twImageMatch = html.match(/<meta name="twitter:image" content="([^"]*)"/);

  return {
    title,
    description,
    robots,
    canonical,
    openGraph: {
      title: ogTitleMatch ? ogTitleMatch[1] : title,
      description: ogDescMatch ? ogDescMatch[1] : description,
      images: ogImageMatch ? [{
        url: ogImageMatch[1],
        width: ogImageWidthMatch ? parseInt(ogImageWidthMatch[1]) : undefined,
        height: ogImageHeightMatch ? parseInt(ogImageHeightMatch[1]) : undefined,
        alt: title,
      }] : [],
    },
    twitter: {
      title: twTitleMatch ? twTitleMatch[1] : title,
      description: twDescMatch ? twDescMatch[1] : description,
      images: twImageMatch ? [twImageMatch[1]] : [],
    },
  };
}

const postsDir = path.join(process.cwd(), "src/app/blog/content/posts");

// ------------------------------------------
// Helper: Calculate Read Time
// ------------------------------------------
function calculateReadTime(content: string): string {
  const wordsPerMinute = 275;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// ------------------------------------------
// Helper: Clean Excerpt
// ------------------------------------------
function cleanExcerpt(htmlContent: string): string {
  return htmlContent
    // Remove inner spans first (labels and time) to avoid regex nesting issues
    .replace(/<span[^>]*class="[^"]*rt-label[^"]*"[^>]*>[\s\S]*?<\/span>/gi, "")
    .replace(/<span[^>]*class="[^"]*rt-time[^"]*"[^>]*>[\s\S]*?<\/span>/gi, "")
    // Remove the wrapper span (now safe to match as inner spans are gone)
    .replace(/<span[^>]*class="[^"]*span-reading-time[^"]*"[^>]*>[\s\S]*?<\/span>/gi, "")
    // Remove all remaining HTML tags
    .replace(/<[^>]+>/g, "")
    .trim();
}

// ------------------------------------------
// Helper: Replace Domain
// ------------------------------------------
function replaceDomain(text: string): string {
  if (!text) return text;
  return text.replace(/https?:\/\/pikup\.us/g, "https://ayrorides.com");
}

// ------------------------------------------
// Get all posts (DEPRECATED/REMOVED)
// ------------------------------------------
export function getAllPosts(): PostMeta[] {
  return [];
}

// ------------------------------------------
// Get single post by slug (API ONLY)
// ------------------------------------------
export async function getApiPostBySlug(slug: string): Promise<Post> {
  try {
    const res = await fetch(
      `https://blog.ayrorides.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );
    const posts = await res.json();

    if (posts.length > 0) {
      const post = posts[0];
      return {
        slug: post.slug,
        title: post.title.rendered,
        date: new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        description: cleanExcerpt(post.excerpt.rendered),
        featuredImage:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        tags: [], // Tags handling could be added if needed
        author: post._embedded?.["author"]?.[0]?.name || "AYRO Team",
        categories:
          post._embedded?.["wp:term"]?.[0]?.map((term: any) => term.name) || [],
        readTime: calculateReadTime(post.content.rendered),
        content: post.content.rendered,
        meta: {
          frontend_indexing: post.meta?.frontend_indexing || "index",
        },
      };
    }
  } catch (error) {
    console.error("Error fetching from WordPress:", error);
  }

  throw new Error(`Post not found: ${slug}`);
}

// ------------------------------------------
// Get single post by slug (for blog/[slug])
// ------------------------------------------
export async function getPostBySlug(slug: string): Promise<Post> {
  // 1. Try fetching from local file system first
  const fullPath = path.join(postsDir, `${slug}.md`);
  if (fs.existsSync(fullPath)) {
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContent);
    const htmlContent = await marked(content); // Convert markdown to HTML

    return {
      slug: slug,
      title: data.title,
      date: data.date,
      description: data.description,
      featuredImage: data.featuredImage || null,
      tags: data.tags || [],
      author: data.author || "AYRO Team",
      categories: data.categories || [],
      readTime: calculateReadTime(content),
      content: htmlContent,
    };
  }

  // 2. Fallback to WordPress API
  try {
    const res = await fetch(
      `https://blog.ayrorides.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );
    const posts = await res.json();

    if (posts.length > 0) {
      const post = posts[0];
      return {
        slug: post.slug,
        title: post.title.rendered,
        date: new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        description: cleanExcerpt(post.excerpt.rendered),
        featuredImage:
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        tags: [], // Tags handling could be added if needed
        author: post._embedded?.["author"]?.[0]?.name || "AYRO Team",
        categories:
          post._embedded?.["wp:term"]?.[0]?.map((term: any) => term.name) || [],
        readTime: calculateReadTime(post.content.rendered),
        content: post.content.rendered,
      };
    }
  } catch (error) {
    console.error("Error fetching from WordPress:", error);
  }

  throw new Error(`Post not found: ${slug}`);
}

// ------------------------------------------
// Get posts by tag
// ------------------------------------------
export function getPostsByTag(tag: string): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

// ------------------------------------------
// Get all unique tags
// ------------------------------------------
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
}

// ------------------------------------------
// Get paginated posts (API)
// ------------------------------------------
export async function getPaginatedPosts(
  page: number,
  limit: number
): Promise<{ posts: PostMeta[]; totalPages: number; totalPosts: number }> {
  try {
    const res = await fetch(
      `https://blog.ayrorides.com/wp-json/wp/v2/posts?_embed&per_page=${limit}&page=${page}`
    );
    const totalPages = Number(res.headers.get("X-WP-TotalPages")) || 1;
    const totalPosts = Number(res.headers.get("X-WP-Total")) || 0;
    const data = await res.json();

    const posts: PostMeta[] = data.map((post: any) => ({
      slug: post.slug,
      title: post.title.rendered,
      date: new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      description: cleanExcerpt(post.excerpt.rendered),
      featuredImage:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      tags: [], // Tags handling could be added if needed
      author: post._embedded?.["author"]?.[0]?.name || "AYRO Team",
      categories:
        post._embedded?.["wp:term"]?.[0]?.map((term: any) => term.name) || [],
      readTime: calculateReadTime(post.content.rendered),
    }));

    return {
      posts,
      totalPages,
      totalPosts,
    };
  } catch (error) {
    console.error("Error fetching paginated posts from WordPress:", error);
    return { posts: [], totalPages: 0, totalPosts: 0 };
  }
}

// ------------------------------------------
// Get paginated posts (Local)
// ------------------------------------------
export async function getLocalPaginatedPosts(
  page: number,
  limit: number
): Promise<{ posts: PostMeta[]; totalPages: number; totalPosts: number }> {
  const allPosts = getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPages,
    totalPosts,
  };
}

// ------------------------------------------
// Get related posts (API)
// ------------------------------------------
export async function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): Promise<PostMeta[]> {
  // Fetch recent posts from API (limit to 50 to find related ones)
  const { posts: allPosts } = await getPaginatedPosts(1, 50);

  // Filter out current post
  const otherPosts = allPosts.filter((post) => post.slug !== currentSlug);

  // Calculate score for each post
  const scoredPosts = otherPosts.map((post) => {
    const matchingTags = post.tags.filter((tag) => tags.includes(tag)).length;
    // Also check categories for relation if tags are empty
    const matchingCategories = post.categories.filter((cat) =>
      otherPosts.find((p) => p.slug === currentSlug)?.categories.includes(cat)
    ).length;

    return { ...post, score: matchingTags + matchingCategories };
  });

  // Sort by score (descending) then date (descending)
  scoredPosts.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Return top 'limit' posts, removing the score property
  return scoredPosts.slice(0, limit).map(({ score, ...post }) => post);
}

// ------------------------------------------
// Get posts by author
// ------------------------------------------
export async function getPostsByAuthor(
  authorSlug: string
): Promise<PostMeta[]> {
  const allLocalPosts = getAllPosts();

  // Fetch API posts (limit to 100 for now to cover recent posts)
  const { posts: apiPosts } = await getPaginatedPosts(1, 100);

  const allPosts = [...allLocalPosts, ...apiPosts];

  return allPosts.filter((post) => {
    const slugifiedAuthor = (post.author || "Ayro Team")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    return slugifiedAuthor === authorSlug;
  });
}

// ------------------------------------------
// Get posts by category
// ------------------------------------------
export async function getPostsByCategory(
  category: string
): Promise<PostMeta[]> {
  const allLocalPosts = getAllPosts();

  // Fetch API posts (limit to 100 for now)
  const { posts: apiPosts } = await getPaginatedPosts(1, 100);

  const allPosts = [...allLocalPosts, ...apiPosts];

  return allPosts.filter((post) =>
    post.categories.map((c) => c.toLowerCase()).includes(category.toLowerCase())
  );
}

// ------------------------------------------
// Get all unique categories
// ------------------------------------------
export async function getAllCategories(): Promise<string[]> {
  const allLocalPosts = getAllPosts();
  const { posts: apiPosts } = await getPaginatedPosts(1, 100);
  const allPosts = [...allLocalPosts, ...apiPosts];

  const categories = new Set<string>();
  allPosts.forEach((post) => {
    post.categories.forEach((category) => categories.add(category));
  });
  return Array.from(categories);
}

// ------------------------------------------
// Get all unique authors
// ------------------------------------------
export async function getAllAuthors(): Promise<string[]> {
  const allLocalPosts = getAllPosts();
  const { posts: apiPosts } = await getPaginatedPosts(1, 100);
  const allPosts = [...allLocalPosts, ...apiPosts];

  const authors = new Set<string>();
  allPosts.forEach((post) => {
    if (post.author) {
      authors.add(post.author);
    }
  });
  return Array.from(authors);
}

// ------------------------------------------
// Get posts by author (API ONLY)
// ------------------------------------------
export async function getApiPostsByAuthor(
  authorSlug: string
): Promise<PostMeta[]> {
  // Fetch API posts (limit to 100 for now)
  const { posts: apiPosts } = await getPaginatedPosts(1, 100);

  return apiPosts.filter((post) => {
    const slugifiedAuthor = (post.author || "AYRO Team")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    return slugifiedAuthor === authorSlug;
  });
}

// ------------------------------------------
// Get posts by category (API ONLY)
// ------------------------------------------
export async function getApiPostsByCategory(
  category: string
): Promise<PostMeta[]> {
  // Fetch API posts (limit to 100 for now)
  const { posts: apiPosts } = await getPaginatedPosts(1, 100);

  return apiPosts.filter((post) =>
    post.categories.map((c) => c.toLowerCase()).includes(category.toLowerCase())
  );
}

// ------------------------------------------
// Get posts by tag (API ONLY)
// ------------------------------------------
export async function getApiPostsByTag(tag: string): Promise<PostMeta[]> {
  // Fetch API posts (limit to 100 for now)
  const { posts: apiPosts } = await getPaginatedPosts(1, 100);

  return apiPosts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}
