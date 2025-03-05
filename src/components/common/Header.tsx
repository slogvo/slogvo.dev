import Link from 'next/link';
import { AppLogo } from './AppLogo';
import { SearchBox } from './Search';

export const Header = () => {
  return (
    <nav className="bg-[#4f4b4c]/30 fixed left-0 top-0 z-20 w-full backdrop-blur-lg shadow-sm transition-[box-shadow] duration-200">
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
          </div>
          <SearchBox />
        </div>
      </div>
    </nav>
  );
};
