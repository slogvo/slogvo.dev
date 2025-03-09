'use client';

import { useEffect, useState } from 'react';
import { SearchInput } from './SearchInput';
import { ActionContact } from './Contact';
import { Icon } from '@iconify/react';
import {
  Button,
  Command,
  Dialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/';

export const HeaderAction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const suggestions = ['Home', 'About', 'Blog', 'Documentation'];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
      <div className="w-full flex-1 md:w-auto md:flex-none">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-zinc-400 dark:border-white/30 hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-10 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64">
              <span className="md:hidden">
                <Icon icon="iconamoon:search-light" className="text-xl" />
              </span>
              <span className="hidden md:inline-flex">
                <SearchInput />
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-auto w-[calc(100%-24px)] sm:max-w-[425px] p-0 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg">
            <Command className="rounded-lg shadow-md p-2 text-zinc-500 dark:text-zinc-400 ">
              <CommandInput
                placeholder="Type to search..."
                className="border-none focus:ring-0 p-3"
              />
              <CommandList>
                <CommandEmpty className="">No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {suggestions.map((item) => (
                    <CommandItem
                      key={item}
                      className="py-3 text-zinc-500 dark:text-zinc-200 "
                    >
                      {item}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
      </div>
      <ActionContact />
    </div>
  );
};
