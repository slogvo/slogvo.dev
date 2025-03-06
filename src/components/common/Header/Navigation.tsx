import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/posts', label: 'Bài viết' },
  { href: '/about', label: 'Giới thiệu' },
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
