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
  rank_math_title?: string;
  rank_math_description?: string;
  rank_math_facebook_title?: string;
  rank_math_facebook_description?: string;
  rank_math_facebook_image?: string;
  rank_math_twitter_title?: string;
  rank_math_twitter_description?: string;
  rank_math_twitter_image?: string;
  rank_math_canonical?: string;
  rank_math_robots?: string[];
}

export interface Post extends PostMeta {
  content: string;
}
