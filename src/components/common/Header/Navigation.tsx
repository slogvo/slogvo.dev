import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/docs', label: 'Documentation' },
];

export const HeaderNav = () => {
  return (
    <nav className="hidden flex-1 justify-center gap-4 md:flex text-white">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-3 py-2 hover:underline"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
