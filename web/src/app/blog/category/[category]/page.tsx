import styles from "../../page.module.css";
import BlogList from "@/app/blog/components/BlogList";
import { getApiPostsByCategory } from "@/lib/posts";

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const posts = await getApiPostsByCategory(decodedCategory);

    return (
        <>
            <section className={styles.blogHero}>
                <h1 className={styles.heroTitle}>
                    Posts in <span>{decodedCategory}</span>
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
                        No posts found for this category.
                    </p>
                )}
            </div>
        </>
    );
}


