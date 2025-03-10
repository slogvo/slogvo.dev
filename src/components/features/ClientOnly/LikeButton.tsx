'use client';
import { useLike } from '@/contexts/LikeContext';
import { Icon } from '@iconify/react';

export default function LikeButton({ slug }: { slug: string }) {
  const { likedPosts, toggleLike } = useLike();
  const isLiked = likedPosts[slug] || false;

  return (
    <button
      className="flex gap-2 items-center"
      onClick={() => toggleLike(slug)}
    >
      <Icon
        icon="mdi:heart"
        className={`text-xl transition-all ${
          isLiked ? 'text-primary-600' : 'text-zinc-300 dark:text-zinc-400'
        }`}
      />
      <span className="text-zinc-600 dark:text-zinc-300">Thích</span>
    </button>
  );
}
