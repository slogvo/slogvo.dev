import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'vi'], // List of supported languages
    defaultLocale: 'vi', // Language Default
    localeDetection: false, // Disable automatic language detection
  },
};

export default nextConfig;
