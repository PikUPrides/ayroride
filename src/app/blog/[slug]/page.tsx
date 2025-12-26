import { getApiPostBySlug } from "@/lib/posts";
//import ShareButton from "@/app/blog/components/ShareButton";
import RelatedPosts from "@/app/blog/components/RelatedPosts";

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
          url: "https://pikup.us/assets/OG.png",
          width: 1200,
          height: 630,
          alt: "pikup.us",
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

  return (
    <div className="!pt-24 md:pt-40 max-w-[1140px] w-full px-5 xl:px-0 !ml-auto !mr-auto justify-center">
      <article>
        <div className="max-w-[1024px] w-full mx-auto flex flex-col gap-y-3 items-center ">
          <h1 className="text-center pt-10 text-3xl md:text-5xl font-bold text-[#346BFF]">
            {post.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 ml-auto mr-auto items-center text-center">
            <a
              href={`/blog/author/${post.author
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "")}`}
              className="font-geist text-base font-normal text-[#000000] hover:text-[#346BFF] transition-colors"
            >
              {post.author}
            </a>
            <span className="">|</span>
            <p className="font-geist text-base font-normal text-[#000000]">
              {post.date}
            </p>
            {post.readTime && (
              <>
                <span className="text-gray-400">|</span>
                <p className="font-geist text-base font-normal text-[#000000]">
                  {post.readTime}
                </p>
              </>
            )}
            <div className="ml-2">
              {/* 
                <ShareButton
                url={`https://pikup.us/blog/${post.slug}`}
                title={post.title}
              /> */}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {post.tags.map((tag) => (
              <a
                key={tag}
                href={`/blog/tags/${tag}`}
                className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>

        <div
          className="blog-content w-full"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Posts */}
        <RelatedPosts currentSlug={post.slug} tags={post.tags} />
      </article>
    </div>
  );
}
