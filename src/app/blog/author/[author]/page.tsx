import { getApiPostsByAuthor } from "@/lib/posts";
import BlogList from "@/app/blog/components/BlogList";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ author: string }>;
}): Promise<Metadata> {
  const { author } = await params;
  return {
    title: `Posts by ${author} - ayrorides.com`,
    description: `Read all posts by ${author} on ayrorides.com`,
    openGraph: {
      title: `Posts by ${author} - ayrorides.com`,
      description: `Read all posts by ${author} on ayrorides.com`,
      url: `https://ayrorides.com/blog/author/${author}`,
      siteName: "ayrorides.com",
      images: [
        {
          url: "https://ayrorides.com/assets/OG.png",
          width: 1200,
          height: 630,
          alt: "ayrorides.com",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

import styles from "../../page.module.css";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ author: string }>;
}) {
  const { author } = await params;
  const posts = await getApiPostsByAuthor(author);
  const authorName =
    posts.length > 0 ? posts[0].author : author.replace(/-/g, " ");

  return (
    <>
      <section className={styles.blogHero}>
        <h1 className={styles.heroTitle}>
          Posts by <span>{authorName}</span>
        </h1>
      </section>

      <div className={styles.sectionDivider}>
        <div className={styles.dividerContainer}>
          <div className={styles.dividerTeal}></div>
          <div className={styles.dividerBlue}></div>
        </div>
      </div>

      <div className={styles.blogContent}>
        {posts.length > 0 ? (
          <BlogList initialPosts={posts} initialTotalPages={1} />
        ) : (
          <p className="text-center text-gray-500 w-full py-10">
            No posts found for this author.
          </p>
        )}
      </div>
    </>
  );
}
