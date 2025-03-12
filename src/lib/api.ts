// src/lib/api.ts
import { IPost } from '@/types';

const DB_API_ENDPOINT =
  process.env.DB_API_ENDPOINT || 'https://blog-express-jf74.onrender.com/api';

export const fetchPosts = async (): Promise<IPost[]> => {
  try {
    const response = await fetch(`${DB_API_ENDPOINT}/posts`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonError) {
      console.log('🚀 ~ fetchPosts ~ jsonError:', jsonError);
      console.error('Invalid JSON response:', text);
      throw new Error('API returned invalid JSON');
    }

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

export const fetchPostById = async (slug: string): Promise<IPost> => {
  console.log('🚀 ~ fetchPostById ~ slug:', slug);
  try {
    const response = await fetch(`${DB_API_ENDPOINT}/posts/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonError) {
      console.log('🚀 ~ fetchPostById ~ jsonError:', jsonError);
      console.error('Invalid JSON response:', text);
      throw new Error('API returned invalid JSON');
    }

    if (data && typeof data === 'object') {
      return data;
    } else {
      console.error(
        'API did not return a post:',
        JSON.stringify(data, null, 2),
      );
      throw new Error('Failed to fetch post: Invalid data format');
    }
  } catch (error) {
    console.error(
      'Error fetching post by ID:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    throw error instanceof Error
      ? error
      : new Error('Unknown error fetching post');
  }
};

export const searchPosts = async (query: string) => {
  const res = await fetch(
    `${DB_API_ENDPOINT}/search?query=${encodeURIComponent(query)}`,
    {
      cache: 'no-store',
    },
  );
  if (!res.ok) throw new Error('Failed to search posts');
  const data = await res.json();
  return data.posts;
};
