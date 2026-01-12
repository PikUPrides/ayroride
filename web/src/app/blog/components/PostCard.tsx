import Image from "next/image";
import { PostMeta } from "@/lib/types";

const extractReadingTime = (html = "") => {
  const match = html.match(/<span class="rt-time">\s*(\d+)\s*<\/span>/);
  return match ? `${match[1]} min read` : null;
};

const cleanDescription = (html = "") =>
  html
    .replace(/&#8230;/g, "...")
    .replace(/&hellip;/g, "...")
    .replace(/<[^>]*>/g, "") // Remove remaining HTML tags
    .trim();

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
  const readingTime = post.readTime || extractReadingTime(post.content);

  return (
    <div className="w-[390px] h-[440px]" key={post.slug}>
      <article className="h-full flex flex-col rounded-2xl border border-gray-200 overflow-hidden bg-white">
        <a href={`${basePath}/${post.slug}`} className="flex flex-col h-full">
          {post.featuredImage && (
            <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%', borderRadius: '10px 10px 0 0' }}>
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover absolute top-0 left-0"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}


          <div className="flex flex-col flex-grow gap-[6px]" style={{ padding: '24px' }}>
            <h2 className="font-bold text-[20px] text-[#1d0652] leading-[28px] line-clamp-2" style={{ fontFamily: 'Open Sans' }}>
              {post.title}
            </h2>

            {post.description && (
              <p className="text-[15px] leading-[26px] text-[#111] font-light line-clamp-3 flex-grow">
                {cleanDescription(post.description)}
              </p>
            )}

            {/* Date and Read Time */}
            <div className="flex items-center justify-between text-sm mt-auto">
              <time dateTime={post.date} className="text-[#111111bf] font-light leading-[28px]" style={{ fontFamily: 'Open Sans' }}>
                {formatDate(post.date)}
              </time>
              {readingTime && (
                <span className="text-[#423DF9] font-medium leading-[28px]" style={{ fontFamily: 'Open Sans' }}>{readingTime}</span>
              )}
            </div>
          </div>
        </a>
      </article>
    </div>
  );
}
