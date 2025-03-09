'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/posts', label: 'Bài viết' },
  { href: '/about', label: 'Giới thiệu' },
];

// Variants cho animation của Link
const linkVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
  },
};

export const HeaderNav = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('/');

  const getActiveLink = (path: string) => {
    const pathSegments = path.split('/').filter(Boolean);
    if (pathSegments.length === 0 || pathSegments.length === 1) return '/';
    const mainRoute = `/${pathSegments[1] || ''}`;
    return navItems.find((item) => item.href === mainRoute)?.href || '/';
  };

  useEffect(() => {
    const initialActive = getActiveLink(pathname);
    setActiveLink(initialActive);
  }, [pathname]);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
  };

  return (
    <nav className="hidden flex-1 justify-center gap-4 font-medium md:flex text-zinc-700 dark:text-white">
      {navItems.map((item) => {
        const isActive = activeLink === item.href;

        return (
          <motion.div
            key={item.href}
            whileHover="hover"
            whileTap="tap"
            variants={linkVariants}
            className="relative"
          >
            <Link
              href={item.href}
              onClick={() => handleLinkClick(item.href)}
              className={cn(
                'block px-3 py-2',
                isActive
                  ? 'text-primary'
                  : 'hover:text-primary transition-colors duration-200',
              )}
            >
              {item.label}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
};
