// app/[lang]/posts/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { fetchPostById, fetchPosts } from '@/lib/api';
import { IPost } from '@/types';
import Image from 'next/image';
import CommentSection from '@/components/features/CommentSection';
import LikeButton from '@/components/features/ClientOnly/LikeButton';
import ClientBlockRenderPost from '@/components/features/ClientOnly/RenderPost';

// import dayjs function
import 'dayjs/locale/vi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const revalidate = 60;

interface PostPageProps {
  params: Promise<{ slug: string; lang: string }>;
}

// Tạo static params cho 10 bài đầu tiên
export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.slice(0, 10).map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the post
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

// Main Server Component
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  dayjs.extend(relativeTime);
  dayjs.locale('vi');

  let postDetail: IPost;
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
      <div className="w-full max-w-4xl relative z-20 mt-10 mx-auto p-4">
        <div className="text-8xl absolute z-20 -top-28 left-0">
          {postDetail?.icon?.emoji}
        </div>
        <h1 className="mt-4 text-primary dark:text-primary-400">
          {postDetail.title}
        </h1>
        <div className="flex items-center justify-between text-sm">
          <div className="left flex gap-3">
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                alt="Mario Sanchez"
                loading="lazy"
                decoding="async"
                className="rounded-full object-cover absolute w-full h-full inset-0 bg-transparent border-primary dark:border-primary-400 p-1 border-[3px]"
                sizes="60px"
                src="https://bobo.muzli.cloud/1722778983526-sticky-site-hero.png?format=600:450"
                fill
              />
            </div>
            <div>
              <p className="text-zinc-600 dark:text-zinc-300">
                <strong>Tác giả:</strong> {postDetail?.author}
              </p>
              <p className="text-zinc-600 dark:text-zinc-300 mt-2">
                <strong>Cập nhật lần cuối:</strong>{' '}
                {postDetail?.publishDate
                  ? dayjs(postDetail.publishDate).format('DD/MM/YYYY')
                  : 'Chưa có thông tin'}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {/* <p className="text-zinc-600 dark:text-zinc-300">
              {postDetail?.viewCount ?? 0} lượt xem
            </p> */}
            <div className="flex gap-2 items-center">
              <LikeButton slug={slug} />{' '}
            </div>
          </div>
        </div>
        <p className="h-[1px] my-6 w-full bg-zinc-200 dark:bg-zinc-400/50"></p>
        <div className="mt-8 sm:mt-10">
          <ClientBlockRenderPost blocks={postDetail.content ?? []} />
          <CommentSection />
        </div>
      </div>
    </div>
  );
}
