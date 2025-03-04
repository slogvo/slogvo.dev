// app/[lang]/posts/[slug]/page.tsx
import ClientBlockRenderPost from '@/components/features/ClientOnly/RenderPost';
import { fetchPostById, fetchPosts } from '@/lib/api';
import { Post } from '@/types';
import { notFound } from 'next/navigation';

export const revalidate = 60;

interface PostPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const posts = await fetchPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  const postDetail = await fetchPostById(post.id);
  return {
    title: postDetail.title,
    description: `Blog post: ${postDetail.title}`,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const posts = await fetchPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  let postDetail: Post;
  try {
    postDetail = await fetchPostById(post.id);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('Rate limit exceeded')
    ) {
      return (
        <div>
          <h1 className="text-4xl font-bold mb-8">Rate Limit Exceeded</h1>
          <p>Please try again later.</p>
        </div>
      );
    }
    throw error;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">{postDetail.title}</h1>
      <h1 className="text-4xl font-bold mb-8">{postDetail.cover}</h1>
      {/* <p className="mb-8">{JSON.stringify(postDetail.content)}</p> */}
      <div className="prose max-w-none">
        <ClientBlockRenderPost blocks={postDetail.content} />
      </div>
    </div>
  );
}
