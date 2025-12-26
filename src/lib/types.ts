export interface PostMeta {
  title: string;
  date: string;
  description?: string;
  slug: string;
  featuredImage?: string;
  tags: string[];
  content: string;
  author: string;
  categories: string[];
  readTime?: string;
}

export interface Post extends PostMeta {
  content: string;
}
