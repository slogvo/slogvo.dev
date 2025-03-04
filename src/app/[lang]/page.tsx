// app/page.tsx
import { CardPost } from '@/components/ui/CardPost';
import { fetchPosts } from '@/lib/api';

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-sky-500">
        Articles and Tutorials
      </h2>
      <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
        {posts?.map((post) => (
          <CardPost
            key={post.slug}
            id={post.id}
            cover={post.cover}
            publishDate={post.publishDate}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </div>
  );
}
