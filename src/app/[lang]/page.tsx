// app/page.tsx
import { CardPost } from '@/components/ui/CardPost';
import { fetchPosts } from '@/lib/api';
import Script from 'next/script';
import SmoothScrollSection from '@/components/features/ClientOnly/SmoothScrollSection';

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></Script>
      <SmoothScrollSection />
      <div className="mt-20 flex-grow mx-auto p-5 max-w-5xl">
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
    </>
  );
}
