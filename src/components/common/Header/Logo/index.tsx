import Link from 'next/link';
import { LogoIcon } from './Icon';

export const HeaderAppLogo = () => {
  return (
    <div className="flex justify-start">
      <Link className="block hover:no-underline active:no-underline" href="/">
        <span className="text-primary flex items-center font-semibold leading-none">
          <span className="ml-3">
            <LogoIcon />
          </span>
        </span>
      </Link>
    </div>
  );
};
