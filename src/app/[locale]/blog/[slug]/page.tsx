import { getApiPostBySlug, getRelatedPosts } from "@/lib/posts";
import RelatedPosts from "@/app/blog/components/RelatedPosts";
import Image from "next/image";
import styles from "../page.module.css";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await getApiPostBySlug(slug);

  return {
    title: post.title,
    description: post.description || "Default description",
    openGraph: {
      title: post.title,
      description: post.description || "Default description",
      url: `https://pikup.us/blog/${slug}`,
      siteName: "pikup.us",
      images: [
        {
          url: post.featuredImage || "https://pikup.us/assets/OG.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
  };
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
                    href={`/blog/author/${(post.author || "pickUP Team")
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")}`}
                    className="text-gray-600 hover:text-[#346BFF]"
                  >
                    {post.author || "draftss"}
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
