"use server";

import { getPaginatedPosts, getLocalPaginatedPosts } from "@/lib/posts";

export async function fetchMorePosts(page: number, limit: number) {
    const { posts, totalPages } = await getPaginatedPosts(page, limit);
    return { posts, totalPages };
}

export async function fetchMoreLocalPosts(page: number, limit: number) {
    const { posts, totalPages } = await getLocalPaginatedPosts(page, limit);
    return { posts, totalPages };
}
