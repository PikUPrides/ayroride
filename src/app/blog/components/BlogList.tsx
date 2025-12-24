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
        12
      );
      setPosts((prev) => [...prev, ...newPosts]);
      setPage(nextPage);
      setHasMore(nextPage < totalPages);
    });
  };

  return (
    <>
      {/* 3x3 Grid Layout */}
      <div className="flex w-[1240px] flex-wrap gap-x-10 gap-y-10 !ml-auto !mr-auto ">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} basePath={basePath} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12 md:mt-20">
          <button
            onClick={loadMore}
            disabled={isPending}
            className="blue-cta disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
