// hooks/useTheme.ts

'use client';

import { useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () =>
      (typeof window !== 'undefined'
        ? localStorage.getItem('theme')
        : 'dark') as 'light' | 'dark',
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return { theme, toggleTheme };
};
