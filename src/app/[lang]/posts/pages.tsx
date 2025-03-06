// app/page.tsx
import { fetchPosts } from '@/lib/api';
import { CardPost } from '@/components/features/CardPost';

export default async function Post() {
  const posts = await fetchPosts();

  return (
    <div className="bg-slate-950 w-full">
      <div className="mt-20 pb-20 flex-grow mx-auto p-5 max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 text-sky-500">
          Articles and Tutorials
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:gap-10 text-white">
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
    </div>
  );
}
