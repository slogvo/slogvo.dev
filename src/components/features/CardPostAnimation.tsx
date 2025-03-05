'use client';
import { useEffect, useRef } from 'react';
import { CardPost } from './CardPost';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gsap: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ScrollTrigger: any;
  }
}

interface CardPostAnimationProps {
  posts: {
    id: string;
    cover: string;
    publishDate: string;
    slug: string;
    title: string;
    excerpt: string;
  }[];
}

export default function CardPostAnimation({ posts }: CardPostAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      gsap.registerPlugin(window.ScrollTrigger);

      const cards = containerRef.current?.querySelectorAll('.card-post');

      if (cards) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'bottom 50%',
                scrub: 0.5,
                toggleActions: 'play reverse play reverse',
              },
            },
          );
        });
      }

      // Cleanup khi component unmount
      return () => {
        window.ScrollTrigger.getAll().forEach((trigger: { kill: () => void }) =>
          trigger.kill(),
        );
      };
    }
  }, [posts]);

  return (
    <div ref={containerRef} className="grid gap-10 md:grid-cols-2 lg:gap-10">
      {posts.map((post) => (
        <div key={post.slug} className="card-post">
          <CardPost
            id={post.id}
            cover={post.cover}
            publishDate={post.publishDate}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
          />
        </div>
      ))}
    </div>
  );
}
