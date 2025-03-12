// app/posts/pages.tsx
import { fetchPosts, searchPosts } from '@/lib/api';
import { CardPost } from '@/components/features/CardPost';
import { IPost } from '@/types';

export const revalidate = 60;

export default async function Post({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const query = params.query;
  const posts: IPost[] = query ? await searchPosts(query) : await fetchPosts();

  return (
    <div className="mt-20 w-full text-white">
      <div className="pb-20 flex-grow mx-auto p-5 max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 text-sky-500">
          Danh sách bài viết
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
