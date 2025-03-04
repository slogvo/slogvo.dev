import Link from 'next/link';
import { AppLogo } from './AppLogo';
import { SearchBox } from './Search';

export const Header = () => {
  return (
    <nav className="bg-background/80 fixed left-0 top-0 z-20 w-full backdrop-blur-lg shadow-sm transition-[box-shadow] duration-200">
      {/* <div
        className="bg-primary/10 text-foreground relative inset-0 bottom-auto px-8 py-3 text-center text-sm data-[state='open']:block data-[state='closed']:hidden"
        data-test="banner"
      >
        <div>
          <strong>Announcement:</strong> Lifetime subscription for indiehackers
          now available!
        </div>
        <button
          className="inline-flex items-center justify-center text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-9 rounded-full px-4 py-2 absolute right-1 top-1"
          aria-label="Hide banner"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x "
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div> */}
      <div className="container">
        <div className="flex items-center justify-stretch gap-6 py-3 px-4 md:px-16 xl:px-32 transition-all duration-200">
          <div className="flex justify-start">
            <Link
              className="block hover:no-underline active:no-underline"
              href="/"
            >
              <span className="text-primary flex items-center font-semibold leading-none">
                <span className="ml-3">
                  <AppLogo />
                </span>
              </span>
            </Link>
          </div>
          <div className="hidden flex-1 items-center justify-center md:flex">
            <Link className="block px-3 py-2" href="/">
              Home
            </Link>
            <Link className="block px-3 py-2" href="/about">
              About
            </Link>
            <Link className="block px-3 py-2" href="/blog">
              Blog
            </Link>
            <Link className="block px-3 py-2" href="/docs">
              Documentation
            </Link>
            <Link className="block px-3 py-2" href="/pricing">
              Pricing
            </Link>
          </div>
          <SearchBox />
        </div>
      </div>
    </nav>
  );
};
