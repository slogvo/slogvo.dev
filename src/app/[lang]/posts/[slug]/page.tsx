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
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const posts = await fetchPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post || !post.id) return { title: 'Post Not Found' };

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

  if (!post || !post.slug) {
    notFound();
  }

  console.log('🚀 ~ PostPage ~ post.slug:', post.slug);
  let postDetail: Post;
  try {
    postDetail = await fetchPostById(post.slug);
    console.log('🚀 ~ PostPage ~ postDetail:', postDetail);
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
    <div className="w-full max-w-7xl mx-auto grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="w-full">
          <h1 className="text-4xl font-bold mb-8">{postDetail.title}</h1>
          <div className="relative w-full aspect-video">
            <Image
              alt={postDetail.title}
              src={postDetail.cover as string}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="mt-4">
            <ClientBlockRenderPost blocks={postDetail.content ?? []} />
          </div>
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ipsa odit
        voluptas saepe quia quisquam, adipisci magnam iusto dolor corrupti ipsum
        deleniti! Alias vero quam ab commodi, unde ipsam nam.
      </div>
    </div>
  );
}
