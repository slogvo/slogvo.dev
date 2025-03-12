'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import {
  Button,
  Command,
  Dialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/';
import { searchPosts } from '@/lib/api';
import { SearchInput } from './SearchInput';
import { ActionContact } from './Contact';

export const HeaderAction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function tìm kiếm với debounce (300ms)
  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query.trim()) {
          setSearchResults([]);
          return;
        }
        setLoading(true);
        try {
          const results = await searchPosts(query);
          setSearchResults(results || []);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
          console.log('🚀 ~ debounce ~ setSearchResults:', searchResults);
        } finally {
          setLoading(false);
        }
      }, 300),
    [],
  );

  // Xử lý khi nhập từ khóa
  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  // Lắng nghe sự kiện Ctrl + K để mở hộp thoại tìm kiếm
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
          <DialogContent className="mx-auto w-[calc(100%-24px)] sm:max-w-[425px] p-0 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Command className="rounded-lg shadow-md p-2 text-zinc-500 dark:text-zinc-400">
              <CommandInput
                placeholder="Type to search posts..."
                value={searchQuery}
                onValueChange={handleSearch}
                className="border-none focus:ring-0 p-3"
              />
              <CommandList>
                {searchResults.length > 0 ? (
                  <CommandGroup heading="Posts">
                    {searchResults.map((post) => (
                      <CommandItem key={post.id} asChild>
                        <Link
                          href={`/post/${post.slug}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="py-3 text-zinc-500 dark:text-zinc-200">
                            {post.title}
                          </div>
                        </Link>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty>No results found</CommandEmpty>
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
