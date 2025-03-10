'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface LikeContextProps {
  likedPosts: Record<string, boolean>;
  toggleLike: (slug: string) => void;
}

const LikeContext = createContext<LikeContextProps | undefined>(undefined);

export function LikeProvider({ children }: { children: React.ReactNode }) {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const storedLikes = localStorage.getItem('likedPosts');
    if (storedLikes) {
      setLikedPosts(JSON.parse(storedLikes));
    }
  }, []);

  const toggleLike = (slug: string) => {
    setLikedPosts((prev) => {
      const updatedLikes = { ...prev, [slug]: !prev[slug] };
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  return (
    <LikeContext.Provider value={{ likedPosts, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
}

export function useLike() {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLike must be used within a LikeProvider');
  }
  return context;
}
