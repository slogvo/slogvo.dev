// app/page.tsx
import { CardPost } from '@/components/ui/CardPost';
import { fetchPosts } from '@/lib/api';

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Notion Blog</h1>
      <div className="grid gap-10 md:grid-cols-2 lg:gap-10"></div>
      <div className="space-y-6">
        {posts?.map((post) => (
          <CardPost
            key={post.slug}
            id={post.id}
            cover={post.cover}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </div>
  );
}
