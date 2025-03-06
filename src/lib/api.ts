// src/lib/api.ts
import { Post } from '@/types';

const NEXT_PUBLIC_API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

// src/lib/api.ts
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_ENDPOINT}/posts`, {
      next: { revalidate: 60 },
    });
    const data = await response.json();
    if (Array.isArray(data)) {
      return data;
    } else if (data && typeof data === 'object' && Array.isArray(data.posts)) {
      return data.posts;
    } else {
      console.error(
        'API did not return an array:',
        JSON.stringify(data, null, 2),
      );
      return [];
    }
  } catch (error) {
    console.error(
      'Error fetching posts:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return [];
  }
};

export const fetchPostById = async (slug: string): Promise<Post> => {
  console.log('🚀 ~ fetchPostById ~ slug:', slug);
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_ENDPOINT}/posts/${slug}`, {
      next: { revalidate: 60 },
    });
    const data = await response.json();
    if (data && typeof data === 'object') {
      return data;
    } else {
      console.error(
        'API did not return a post:',
        JSON.stringify(data, null, 2),
      );
      throw new Error('Failed to fetch post');
    }
  } catch (error) {
    console.error(
      'Error fetching post by ID:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    throw error;
  }
};
