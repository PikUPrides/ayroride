import Image from "next/image";
import { PostMeta } from "@/lib/types";

const extractReadingTime = (html = "") => {
  const match = html.match(/<span class="rt-time">\s*(\d+)\s*<\/span>/);
  return match ? `${match[1]} min read` : null;
};

const cleanDescription = (html = "") =>
  html.replace(/<span class="span-reading-time[\s\S]*?<\/span>/, "").trim();

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function PostCard({
  post,
  basePath = "/blog",
}: {
  post: PostMeta;
  basePath?: string;
}) {
  return (
    <div className="w-[30%]" key={post.slug}>
      <article className="text-[#1D0652] text-[20px] ">
        <a href={`${basePath}/${post.slug}`}>
          {post.featuredImage && (
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={360}
              height={237}
              className="rounded-xl mb-4 md:mb-6 w-full object-cover"
              style={{ height: "auto", aspectRatio: "360/237" }}
            />
          )}
          <h2 className="font-semibold mx-auto px-2">{post.title}</h2>

          {post.description && (
            <p className="text-[15px] leading-relaxed text-[#4B3F72] px-2 line-clamp-3">
              {post.description}
            </p>
          )}

          {/* Date*/}
          <div className="flex items-center gap-3 text-sm text-[#6B5FA7] mb-2">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </a>
      </article>
    </div>
  );
}
