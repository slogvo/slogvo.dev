'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Button,
  Command,
  Dialog,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/';
import { Input } from '@/components/ui/input';
import { searchPosts } from '@/lib/api';
import { ActionContact } from './Contact';
import { SearchInput } from './SearchInput';
import { IPost } from '@/types';

// Popular search suggestions
const POPULAR_SEARCHES = [
  { id: 'api', label: 'API', icon: 'carbon:api' },
  { id: 'react', label: 'React', icon: 'logos:react' },
  { id: 'nextjs', label: 'Next.js', icon: 'logos:nextjs-icon' },
  { id: 'typescript', label: 'TypeScript', icon: 'logos:typescript-icon' },
  { id: 'tailwind', label: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
];

export const HeaderAction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  // const [characterState, setCharacterState] = useState('idle');

  // Debounce search function (300ms)
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      // setCharacterState('searching');
      try {
        const results = await searchPosts(query);
        console.log('✅ API response:', results);
        setSearchResults(results || []);
        // setCharacterState(results?.length > 0 ? 'found' : 'notFound');
      } catch (error) {
        console.error('❌ Search error:', error);
        setSearchResults([]);
        // setCharacterState('notFound');
      } finally {
        setLoading(false);
      }
    }, 300),
    [],
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Listen for Ctrl + K to open search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Character animations based on state
  // const characterAnimations = {
  //   idle: {
  //     y: [0, -3, 0],
  //     transition: { repeat: Infinity, duration: 2 },
  //   },
  //   searching: {
  //     rotate: [-5, 5, -5],
  //     transition: { repeat: Infinity, duration: 0.5 },
  //   },
  //   found: {
  //     scale: [1, 1.1, 1],
  //     transition: { duration: 0.5 },
  //   },
  //   notFound: {
  //     y: [0, -5, 0],
  //     transition: { duration: 0.5 },
  //   },
  // };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    debouncedSearch(suggestion);
  };

  return (
    <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
      <div className="w-full flex-1 md:w-auto md:flex-none">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-zinc-400 dark:border-white/30 hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-10 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64">
              <span className="md:hidden">
                <Icon icon="iconamoon:search-light" className="text-xl" />
              </span>
              <span className="hidden md:inline-flex">
                <SearchInput />
              </span>
            </Button>
          </DialogTrigger>

          <DialogContent className="mx-auto w-[calc(100%-24px)] sm:max-w-[500px] p-0 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg">
            <DialogHeader className="hidden">
              <DialogTitle>Search posts</DialogTitle>
            </DialogHeader>

            <div
              className={`p-2 h-14 border-b-[1px] dark:border-zinc-100/20 relative ${inputFocused ? 'border-blue-500' : ''}`}
            >
              <div className="flex items-center">
                <Icon
                  icon={
                    loading ? 'eos-icons:loading' : 'iconamoon:search-light'
                  }
                  className={`text-xl mr-2 ${loading ? 'animate-spin text-blue-500' : 'text-zinc-500 dark:text-zinc-400'}`}
                />
                <Input
                  type="text"
                  placeholder="Tìm kiếm bài viết"
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  autoFocus
                  className="text-zinc-800 dark:text-white !outline-none !border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                />
              </div>
            </div>

            <Command className="rounded-lg p-2 text-zinc-500 dark:text-zinc-400">
              <CommandList>
                {loading && (
                  <CommandEmpty>
                    <div className="flex flex-col items-center justify-center py-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: 'linear',
                        }}
                        className="mb-2"
                      >
                        <Icon
                          icon="eos-icons:loading"
                          className="text-3xl text-blue-500"
                        />
                      </motion.div>
                      <p>Đang tìm kiếm...</p>
                    </div>
                  </CommandEmpty>
                )}

                {!loading && searchQuery && searchResults.length === 0 && (
                  <CommandEmpty>
                    <div className="flex flex-col items-center justify-center py-6">
                      <Icon
                        icon="solar:sad-circle-linear"
                        className="text-3xl mb-2 text-zinc-400 dark:text-zinc-500"
                      />
                      <p>Không tìm thấy bài viết.</p>
                      <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
                        Hãy thử từ khóa khác
                      </p>
                    </div>
                  </CommandEmpty>
                )}

                {/* Show suggestions when no search query */}
                {!searchQuery && (
                  <>
                    <CommandGroup heading="Tìm kiếm phổ biến">
                      <div className="flex flex-wrap gap-2 p-2">
                        {POPULAR_SEARCHES.map((item) => (
                          <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                            onClick={() => handleSuggestionClick(item.label)}
                          >
                            <Icon icon={item.icon} className="text-sm" />
                            {item.label}
                          </motion.button>
                        ))}
                      </div>
                    </CommandGroup>
                  </>
                )}

                {!loading && searchResults.length > 0 && (
                  <CommandGroup heading="Bài viết">
                    <AnimatePresence>
                      {searchResults.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <CommandItem
                            asChild
                            className="dark:bg-zinc-800/40 bg-zinc-200/10 hover:bg-primary-200/20 dark:hover:bg-primary-300/15 rounded-md p-2 py-3 my-2 mb-3 text-zinc-600 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition-all group"
                          >
                            <Link
                              href={`/posts/${post.slug}`}
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex justify-between items-center">
                                <div>{post.title}</div>
                                <motion.div
                                  initial={{ x: -5, opacity: 0 }}
                                  whileHover={{ x: 0, opacity: 1 }}
                                  className="text-blue-500 hidden group-hover:block"
                                >
                                  <Icon icon="ph:arrow-right-light" />
                                </motion.div>
                              </div>
                            </Link>
                          </CommandItem>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
      </div>
      <ActionContact />
    </div>
  );
};
