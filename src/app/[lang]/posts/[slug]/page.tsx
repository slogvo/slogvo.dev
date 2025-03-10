// app/[lang]/posts/[slug]/page.tsx
import ClientBlockRenderPost from '@/components/features/ClientOnly/RenderPost';
import { fetchPostById, fetchPosts } from '@/lib/api';
import { Post } from '@/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 60;

interface PostPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.slice(0, 10).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  try {
    const postDetail = await fetchPostById(slug);
    if (!postDetail || !postDetail.id) return { title: 'Post Not Found' };
    return {
      title: postDetail.title,
      description: `Blog post: ${postDetail.title}`,
    };
  } catch (error) {
    console.log('🚀 ~ generateMetadata ~ error:', error);
    return { title: 'Post Not Found' };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  let postDetail: Post;
  try {
    postDetail = await fetchPostById(slug);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('Rate limit exceeded')
    ) {
      return (
        <div className="w-full mt-16 text-white">
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8">Rate Limit Exceeded</h1>
            <p>Please try again later.</p>
          </div>
        </div>
      );
    }
    notFound();
  }

  if (!postDetail || !postDetail.slug) {
    notFound();
  }

  return (
    <div className="w-full mt-16">
      <div className="relative w-full">
        <Image
          alt={postDetail.title}
          src={postDetail.cover as string}
          height={400}
          width={400}
          className="object-cover w-full h-40 sm:h-60"
        />
      </div>
      <div className="w-full max-w-4xl mx-auto mt-4 sm:mt-10 p-4">
        <h1 className="">{postDetail.title}</h1>
        <div className="mt-4">
          <ClientBlockRenderPost blocks={postDetail.content ?? []} />
        </div>
      </div>
    </div>
  );
}
