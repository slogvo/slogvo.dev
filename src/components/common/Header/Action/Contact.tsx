'use client';

import { useTheme } from '@/hooks/useTheme';

export const ActionContact = () => {
  const openNewTab = (url: string | URL | undefined) => {
    window.open(url, '_blank');
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="ml-3 flex items-center gap-2 text-gray-900 dark:text-white">
      {/* Behance Button */}
      <button
        className="p-2 dark:border dark:border-white/30 rounded-full"
        onClick={() => openNewTab('https://www.behance.net/volong5')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M10.187 11.362a3.24 3.24 0 0 0 1.343-1.108a3.15 3.15 0 0 0 .451-1.751a3.8 3.8 0 0 0-.304-1.64a2.63 2.63 0 0 0-.86-1.109c-.4-.29-.855-.487-1.333-.576A7.5 7.5 0 0 0 7.764 5H1.8a.3.3 0 0 0-.3.3v13.341a.3.3 0 0 0 .3.3h6.1c.584 0 1.166-.078 1.73-.233a4.7 4.7 0 0 0 1.501-.72a3.4 3.4 0 0 0 1.05-1.263a3.96 3.96 0 0 0 .388-1.829a4 4 0 0 0-.599-2.216a3.15 3.15 0 0 0-1.836-1.32zM4.55 7.25a.2.2 0 0 0-.2.2v3.1c0 .11.09.2.2.2h2.8a1.75 1.75 0 0 0 0-3.5zm-.2 5.45c0-.11.09-.2.2-.2h2.925a2.125 2.125 0 0 1 0 4.25H4.55a.2.2 0 0 1-.2-.2z"
            clipRule="evenodd"
          />
          <path
            fill="currentColor"
            d="M15.439 5.71h4.723a.3.3 0 0 1 .3.296l.013.962a.3.3 0 0 1-.3.304h-4.736a.3.3 0 0 1-.3-.3V6.01a.3.3 0 0 1 .3-.3"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M17.972 16.87a2.25 2.25 0 0 0 1.363-.41c.26-.173.467-.42.598-.712a.22.22 0 0 1 .194-.13h1.921c.13 0 .226.122.187.246a4.66 4.66 0 0 1-1.64 2.358a4.8 4.8 0 0 1-2.77.775a5.2 5.2 0 0 1-2.036-.376a4.2 4.2 0 0 1-1.531-1.109a5 5 0 0 1-.924-1.695a6.4 6.4 0 0 1-.335-2.15a6.3 6.3 0 0 1 .346-2.117a4.9 4.9 0 0 1 .996-1.684a4.7 4.7 0 0 1 1.543-1.109a4.9 4.9 0 0 1 1.993-.41a4.4 4.4 0 0 1 2.099.5a4.45 4.45 0 0 1 1.49 1.34c.391.578.676 1.228.839 1.917a7.6 7.6 0 0 1 .178 2.217h-6.945a2.85 2.85 0 0 0 .65 1.95c.242.224.526.393.833.496s.63.138.95.103M15.6 12.399a.1.1 0 0 0 .101.101h4.048a.1.1 0 0 0 .101-.101a2.024 2.024 0 0 0-2.024-2.024h-.202a2.024 2.024 0 0 0-2.024 2.024"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* GitHub Button */}
      <button
        className="p-2 dark:border dark:border-white/30 rounded-full"
        onClick={() => openNewTab('https://github.com/slogvo')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
          />
        </svg>
      </button>

      {/* Dark Mode Toggle */}
      <button
        className="p-2 bg-white/20 dark:border  dark:border-white/30 rounded-full"
        onClick={toggleTheme}
      >
        {theme === 'light' ? '🌙' : '🌞'}
      </button>
    </nav>
  );
};
