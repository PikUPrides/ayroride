"use client";

import { useState, useTransition } from "react";
import { PostMeta } from "@/lib/types";
import PostCard from "./PostCard";
import { fetchMorePosts } from "../actions";

interface BlogListProps {
  initialPosts: PostMeta[];
  initialTotalPages: number;
  basePath?: string;
  loadMoreAction?: (
    page: number,
    limit: number
  ) => Promise<{ posts: PostMeta[]; totalPages: number }>;
}

export default function BlogList({
  initialPosts,
  initialTotalPages,
  basePath = "/blog",
  loadMoreAction = fetchMorePosts,
}: BlogListProps) {
  const [posts, setPosts] = useState<PostMeta[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(page < initialTotalPages);
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    const nextPage = page + 1;
    startTransition(async () => {
      const { posts: newPosts, totalPages } = await loadMoreAction(
        nextPage,
        6
      );
      setPosts((prev) => [...prev, ...newPosts]);
      setPage(nextPage);
      setHasMore(nextPage < totalPages);
    });
  };

  return (
    <div className="flex flex-col w-full items-center">
      {/* 3x3 Grid Layout */}
      <div className="flex max-w-[1240px] w-full flex-wrap gap-x-5 gap-y-10 mx-auto justify-center md:justify-start">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} basePath={basePath} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center w-full mb-20" style={{ marginTop: '60px' }}>
          <button
            onClick={loadMore}
            disabled={isPending}
            className="bg-[#423DF9] text-white border border-[#423DF9] hover:bg-transparent hover:text-[#423DF9] font-bold text-[16px] leading-[20px] transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              fontFamily: '"Open Sans", sans-serif',
              padding: '13px 36px',
              borderRadius: '8px',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            {isPending ? "Loading..." : "View More"}
          </button>
        </div>
      )}
    </div>
  );
}
