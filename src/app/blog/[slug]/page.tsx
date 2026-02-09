import { getApiPostBySlug, getRelatedPosts, getRankMathHead } from "@/lib/posts";
import RelatedPosts from "@/app/blog/components/RelatedPosts";
import Image from "next/image";
import styles from "../page.module.css";
import { Metadata } from "next";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

// ... previous imports

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const postUrl = `https://blog.ayrorides.com/${slug}/`;

  try {
    // Fetch post data including meta.frontend_indexing
    const post = await getApiPostBySlug(slug);
    const seo = await getRankMathHead(postUrl);

    // Use frontend_indexing from post meta to control indexing
    const shouldIndex = post.meta?.frontend_indexing !== "noindex";

    return {
      title: seo.title,
      description: seo.description,
      alternates: {
        canonical: `https://ayrorides.com/blog/${slug}/`,
      },
      robots: {
        index: shouldIndex,
        follow: shouldIndex,
      },
      openGraph: {
        title: seo.openGraph?.title,
        description: seo.openGraph?.description,
        url: `https://ayrorides.com/blog/${slug}/`,
        images: seo.openGraph?.images?.map((img: any) => ({
          url: img.url,
          width: img.width,
          height: img.height,
          alt: img.alt,
        })),
        siteName: "AYRO",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: seo.twitter?.title,
        description: seo.twitter?.description,
        images: seo.twitter?.images,
      },
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    // Fallback to basic metadata or return empty if fetching fails
    return {
      title: "Ayro Blog",
    };
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getApiPostBySlug(slug);
  const relatedPosts = await getRelatedPosts(slug, post.tags, 6);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.blogHero}>
        <section className={styles.blogHero}>
          <h2 className={styles.heroTitle}>
            Our <span>Blogs</span>
          </h2>
        </section>
      </section>

      {/* Two-Tone Divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerContainer}>
          <div className={styles.dividerTeal}></div>
          <div className={styles.dividerBlue}></div>
        </div>
      </div>


      <div className="w-full flex justify-center pt-16 pb-20">
        <div className="w-full max-w-[1240px] px-5 xl:px-0">
          <article className="w-full flex flex-col items-center">
            {/* Title */}
            <h1
              className="text-center mb-8 px-5 md:px-10 max-w-[390px] md:max-w-[900px] mx-auto"
              style={{
                fontFamily: 'Open Sans, Sans-serif',
                fontWeight: 700,
                textTransform: 'none',
                fontStyle: 'normal',
                color: '#1D0652',
                fontSize: 'clamp(24px, 5vw, 35px)',
                lineHeight: 'clamp(32px, 6vw, 45px)',
                paddingTop: 'clamp(30px, 8vw, 80px)',
                paddingBottom: 'clamp(15px, 4vw, 35px)'
              }}
            >
              {post.title}
            </h1>

            {/* Featured Image */}
            {post.featuredImage && (
              <div
                className="mb-6 mx-auto max-w-[390px] md:max-w-[1240px]"
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
              >
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={1240}
                  height={647}
                  className="w-full h-auto object-cover"
                  style={{
                    display: 'block',
                    borderRadius: '10px'
                  }}
                  priority
                />
              </div>
            )}

            {/* Metadata */}
            <div className="w-full max-w-[390px] md:max-w-[1240px] px-5 md:px-0 mx-auto" style={{ marginBottom: '0px' }}>
              <div className="flex justify-between items-center text-sm text-gray-600" style={{ marginBottom: '32px' }}>
                <div className="flex items-center gap-1">
                  <span>By</span>
                  <a
                    href={`/blog/author/${(post.author || "AYRO Team")
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")}`}
                    className="text-gray-600 hover:text-[#346BFF]"
                  >
                    {post.author || "AYRO Team"}
                  </a>
                </div>
                <time dateTime={post.date} className="text-gray-600">
                  {post.date}
                </time>
              </div>
              {post.readTime && (
                <div className="text-[#111]" style={{ fontSize: '18px', lineHeight: '28px' }}>
                  Reading Time: {post.readTime}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="w-full max-w-[390px] md:max-w-[1240px] px-5 md:px-0 mx-auto">
              <div
                className="blog-content text-lg text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            <div className="w-full max-w-[1240px] mt-10 pt-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/blog/tags/${tag}`}
                    className="text-xs font-semibold px-4 py-1.5 rounded-full bg-[#f0f2f5] text-gray-600 hover:bg-[#346BFF] hover:text-white transition-all duration-200"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            <div className="w-full mt-16 mb-20">
              <RelatedPosts relatedPosts={relatedPosts} />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
