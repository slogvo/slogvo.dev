'use client';
import { useLike } from '@/contexts/LikeContext';
import { Icon } from '@iconify/react';

export default function LikeButton({ slug }: { slug: string }) {
  const { likedPosts, toggleLike } = useLike();
  const isLiked = likedPosts[slug] || false;

  return (
    <p className="flex gap-2 items-center">
      <Icon
        icon="mdi:heart"
        className={`text-xl cursor-pointer transition-all ${
          isLiked ? 'text-primary-600' : 'text-zinc-300 dark:text-zinc-400'
        }`}
        onClick={() => toggleLike(slug)}
      />
    </p>
  );
}
