export const SearchInput = () => {
  return (
    <div className="text-zinc-700 dark:text-white">
      <span className="hidden lg:inline-flex">Tìm kiếm bài viết...</span>
      <span className="inline-flex lg:hidden">Tìm kiếm...</span>
      <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-sm">⌘</span>K
      </kbd>
    </div>
  );
};
