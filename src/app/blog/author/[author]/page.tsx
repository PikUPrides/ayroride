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
    title: `Posts by ${author} - pikup.us`,
    description: `Read all posts by ${author} on pikup.us`,
    openGraph: {
      title: `Posts by ${author} - pikup.us`,
      description: `Read all posts by ${author} on pikup.us`,
      url: `https://pikup.us/blog/author/${author}`,
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
      type: "website",
    },
  };
}

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
    <div className="pt-20 md:pt-40 pb-10 md:pb-25 px-4 md:px-0">
      <h1
        className="text-center font-semibold mb-8 md:mb-16"
        style={{
          fontFamily: '"Inter", Sans-serif',
          fontSize: "clamp(30px, 6vw, 50px)",
          fontWeight: 600,
          color: "#000000",
        }}
      >
        Posts by {authorName}
      </h1>

      {posts.length > 0 ? (
        <BlogList initialPosts={posts} initialTotalPages={1} />
      ) : (
        <p className="text-center text-gray-500">
          No posts found for this author.
        </p>
      )}
    </div>
  );
}
