// app/page.tsx
import { fetchPosts } from '@/lib/api';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Notion Blog</h1>
      <div className="space-y-6">
        {posts?.map((post) => (
          <div key={post.id} className="border-b pb-4">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:underline">
                {post.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
