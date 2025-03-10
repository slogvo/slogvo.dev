'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Comment {
  id: number;
  name: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');

  // 🔹 Load bình luận từ localStorage khi component mount
  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // 🔹 Lưu bình luận vào localStorage mỗi khi comments thay đổi
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem('comments', JSON.stringify(comments));
    }
  }, [comments]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      name: name,
      content: newComment,
      timestamp: new Date().toLocaleString('vi-VN'),
      likes: 0,
      isLiked: false,
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLike = (commentId: number) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        : comment,
    );

    setComments(updatedComments);
  };

  return (
    <div className="mt-20 w-full mx-auto rounded-xl mb-20">
      <div className="flex items-center gap-2 mb-8">
        <h3 className="text-gray-800 mb-0">
          Bình luận
          <span className="text-xl ml-2">({comments.length})</span>
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên của bạn"
            className="text-sm flex-1 px-4 py-3 bg-zinc-100/80 text-zinc-700 dark:text-white/80 dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
            required
          />
        </div>
        <div className="relative mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Chia sẻ suy nghĩ của bạn..."
            className="text-sm w-full px-5 py-4 bg-zinc-100/80 text-gray-700 dark:bg-gray-900 dark:text-white/80 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all min-h-[120px]"
            required
          />
          <button
            type="submit"
            className="absolute bottom-5 right-4 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Comments List */}
      <p className="h-[1px] my-6 w-full bg-zinc-200 dark:bg-zinc-400/50"></p>

      <div className="space-y-6">
        {comments.map((comment) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={comment.id}
            className="rounded-xl"
          >
            <div className="flex justify-between items-start">
              <div className="left flex items-center gap-3">
                <div className="relative h-10 w-10 flex-shrink-0">
                  <Image
                    alt="Nezha"
                    loading="lazy"
                    decoding="async"
                    className="rounded-full object-cover absolute w-full h-full inset-0 bg-transparent border-primary dark:border-primary-400 p-1 border-[3px]"
                    sizes="60px"
                    src="https://res.cloudinary.com/dgbocu1qv/image/upload/v1741602993/Nezha.jpg"
                    fill
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-400">
                    {comment.name}
                  </span>
                  <p className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-400"></p>
                  <span className="text-sm text-gray-500">
                    {comment.timestamp}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleLike(comment.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                  comment.isLiked
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-zinc-100 dark:bg-gray-700 text-zinc-700 dark:text-zinc-200 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`}
                />
                <span className="text-sm">{comment.likes}</span>
              </button>
            </div>
            <p className="ml-14 text-sm text-gray-700 dark:text-zinc-400 leading-relaxed">
              {comment.content}
            </p>
          </motion.div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <p>Hãy là người đầu tiên bình luận!</p>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
