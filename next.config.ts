import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  images: {
    domains: [
      'www.notion.so',
      'bobo.muzli.cloud',
      'miro.medium.com',
      'i.ytimg.com',
      'encrypted-tbn0.gstatic.com',
      'bs-uploads.toptal.io',
      'images.unsplash.com',
      'jvers-cms.onrender.com',
    ],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'www.notion.so',
  //       port: '',
  //       pathname: '/**',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'bobo.muzli.cloud',
  //       port: '',
  //       pathname: '/**',
  //     },
  //   ],
  // },
};

export default nextConfig;
