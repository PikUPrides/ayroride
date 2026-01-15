import { getPaginatedPosts } from "@/lib/posts";
import BlogList from "@/app/blog/components/BlogList";
import { fetchMorePosts } from "../blog/actions";
import styles from "./page.module.css";

export const metadata = {
  title: "Insights and Updates from Ayro",
  description: "Stay informed with the latest news, trends, and expert advice from our team. Our blog covers a wide range of topics to help your business thrive.",
  openGraph: {
    title: "Insights and Updates from Ayro",
    description: "Stay informed with the latest news, trends, and expert advice from our team. Our blog covers a wide range of topics to help your business thrive.",
    url: "https://ayrorides.com/blog/",
    images: [
      {
        url: "/assets/OG.png",
        width: 1200,
        height: 630,
        alt: "PikUP Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights and Updates from PikUP",
    description: "Latest news, trends, and expert advice from our team.",
  },
};


export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 6;
  const { posts, totalPages } = await getPaginatedPosts(page, limit);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.blogHero}>
        <h1 className={styles.heroTitle}>
          Our <span>Blogs</span>
        </h1>
      </section>

      {/* Two-Tone Divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerContainer}>
          <div className={styles.dividerTeal}></div>
          <div className={styles.dividerBlue}></div>
        </div>
      </div>

      {/* Blog Intro Section */}
      <section className={styles.blogIntro}>
        <div className={styles.blogIntroContainer}>
          <div className={styles.blogBadge}>OUR BLOGS</div>
          <h2 className={styles.blogIntroTitle}>
            Insights and Updates from <span>PikUP</span>
          </h2>
          <p className={styles.blogIntroSubtitle}>
            Stay informed with the latest news, trends, and expert advice from our team. Our blog covers a wide range of topics to help your business thrive.
          </p>
        </div>
      </section>

      {/* Blog Content Section */}
      <div className={styles.blogContent}>
        <BlogList
          initialPosts={posts}
          initialTotalPages={totalPages}
          basePath="/blog"
          loadMoreAction={fetchMorePosts}
        />
      </div>
    </>
  );
}
