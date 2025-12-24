import { getPaginatedPosts } from "@/lib/posts";
import BlogList from "@/app/blog/components/BlogList";
import { fetchMorePosts } from "../blog/actions";
//import SimpleForm from "@/components/SimpleForm";

export default async function DataExamplePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 12;
  const { posts, totalPages } = await getPaginatedPosts(page, limit);

  return (
    <div className="pt-32 md:pt-40 pb-10 md:pb-25 px-4 md:px-0">
      <h1
        className="text-center font-semibold mb-8 md:mb-16"
        style={{
          fontFamily: '"Inter", Sans-serif',
          fontSize: "clamp(36px, 8vw, 60px)",
          fontWeight: 600,
          color: "#000000",
        }}
      >
        Our Blogs
      </h1>

      <BlogList
        initialPosts={posts}
        initialTotalPages={totalPages}
        basePath="/blog"
        loadMoreAction={fetchMorePosts}
      />

      {/* <div className="mt-16">
                <SimpleForm />
            </div> */}
    </div>
  );
}
