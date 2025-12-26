import { getRelatedPosts } from "@/lib/posts";
import PostCard from "./PostCard";

export default async function RelatedPosts({
    currentSlug,
    tags,
}: {
    currentSlug: string;
    tags: string[];
}) {
    const relatedPosts = await getRelatedPosts(currentSlug, tags);

    if (relatedPosts.length === 0) {
        return null;
    }

    return (
        <div className="mt-16 pt-10 border-t border-gray-200 w-full max-w-[1140px] mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center font-inter">
                Related Posts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {relatedPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
