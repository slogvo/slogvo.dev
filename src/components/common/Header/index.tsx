import { HeaderAppLogo } from './Logo';
import { HeaderAction } from './Action';
import { HeaderNav } from './Navigation';

export const Header = () => {
  return (
    <nav className="dark:bg-[#2e2e2e32] bg-[#fcfcfc91] fixed left-0 top-0 z-50 w-full backdrop-blur-lg shadow-[0_8px_24px_rgba(149,157,165,0.1)] dark:shadow-[0_8px_24px_rgba(45,47, 84,0.2)] transition-[box-shadow] duration-200">
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
