import { HeaderAppLogo } from './Logo';
import { HeaderAction } from './Action';
import { HeaderNav } from './Navigation';

export const Header = () => {
  return (
    <nav className="bg-[#4f4b4c]/30 fixed left-0 top-0 z-20 w-full backdrop-blur-lg shadow-sm transition-[box-shadow] duration-200">
      <div className="container">
        <div className="flex items-center justify-stretch gap-6 py-3 px-4 md:px-16 xl:px-32 transition-all duration-200">
          <HeaderAppLogo />
          <HeaderNav />
          <HeaderAction />
        </div>
      </div>
    </nav>
  );
};
