'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import debounce from 'lodash/debounce';
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

export const HeaderAction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce search function (300ms)
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const results = await searchPosts(query);
        console.log('✅ API response:', results);
        setSearchResults(results || []);
      } catch (error) {
        console.error('❌ Search error:', error);
        setSearchResults([]);
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

            <div className="p-2 border-b-[1px] dark:border-zinc-100/20">
              <Input
                type="text"
                placeholder="Tìm kiếm bài viết"
                value={searchQuery}
                onChange={handleSearch}
                className="text-zinc-800 dark:text-white !outline-none !border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
              />
            </div>

            <Command className="rounded-lg shadow-md p-2 text-zinc-500 dark:text-zinc-400">
              <CommandList>
                {loading && <CommandEmpty>Đang tìm kiếm...</CommandEmpty>}
                {!loading && searchQuery && searchResults.length === 0 && (
                  <CommandEmpty>Không tìm thấy bài viết.</CommandEmpty>
                )}
                {!loading && searchResults.length > 0 && (
                  <CommandGroup heading="Bài viết">
                    {searchResults.map((post) => (
                      <CommandItem
                        key={post.id}
                        asChild
                        className="dark:bg-zinc-800/40 bg-zinc-200/10 hover:bg-primary-200/20 dark:hover:bg-primary-300/15 rounded-md p-2 py-3 my-2 mb-3 text-zinc-600 dark:text-zinc-200 hover:text-primary dark:hover:text-primary transition-all"
                      >
                        <Link
                          href={`/posts/${post.slug}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div>{post.title}</div>
                        </Link>
                      </CommandItem>
                    ))}
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
