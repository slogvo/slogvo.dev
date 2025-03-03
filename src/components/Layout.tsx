// app/layout.tsx
import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
// import Header from '../src/components/Header';
// import Footer from '../src/components/Footer';
import '../app/globals.css'; // Import global styles

export const metadata = {
  title: 'Notion Blog',
  description: 'A blog powered by Notion and Next.js',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <NextSeo
          title={metadata.title}
          description={metadata.description}
          openGraph={{
            title: metadata.title,
            description: metadata.description,
            type: 'website',
          }}
        />
        <div className="flex flex-col min-h-screen">
          {/* <Header /> */}
          <main className="flex-grow max-w-4xl mx-auto p-5">{children}</main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
