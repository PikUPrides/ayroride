import { getApiPostsByTag } from "@/lib/posts";
import Image from "next/image";

export default async function TagPage({
    params,
}: {
    params: Promise<{ tag: string }>;
}) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    const posts = await getApiPostsByTag(decodedTag);

    return (
        <div className="pt-20 md:pt-40 pb-10 md:pb-25 px-4 md:px-0">
            {/* Tag page title */}
            <h1
                className="text-center font-semibold mb-8 md:mb-16"
                style={{
                    fontFamily: '"Inter", Sans-serif',
                    fontSize: 'clamp(30px, 6vw, 60px)',
                    fontWeight: 600,
                    color: '#000000',
                }}
            >
                Posts tagged <span className="text-[#346BFF]">"{decodedTag}"</span>
            </h1>

            {/* 3x3 Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 w-[90%] md:w-[1140px] ml-auto mr-auto">
                {posts.length > 0 ? (
                    posts
                        .sort(
                            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                        )
                        .map((post) => (
                            <div key={post.slug}>
                                <article className="text-center">
                                    <a href={`/blog/${post.slug}`}>
                                        {post.featuredImage && (
                                            <Image
                                                src={post.featuredImage}
                                                alt={post.title}
                                                width={360}
                                                height={237}
                                                className="rounded-xl mb-4 md:mb-6 w-full object-cover"
                                                style={{ height: 'auto', aspectRatio: '360/237' }}
                                            />
                                        )}
                                        <div className="flex flex-wrap justify-center gap-2 mb-3 px-2">
                                            {post.categories.slice(0, 3).map((c) => (
                                                <span
                                                    key={c}
                                                    className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600"
                                                >
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                        <h2
                                            className="font-semibold mx-auto max-w-[300px] px-2"
                                            style={{
                                                color: '#346BFF',
                                                fontFamily: '"Inter", Sans-serif',
                                                fontSize: 'clamp(20px, 4vw, 24px)',
                                                fontWeight: 600,
                                                lineHeight: '1.3'
                                            }}
                                        >
                                            {post.title}
                                        </h2>
                                    </a>
                                </article>
                            </div>
                        ))
                ) : (
                    <div className="col-span-3 text-center text-gray-500 text-xl">
                        No posts found for this tag.
                    </div>
                )}
            </div>
        </div>
    );
}
