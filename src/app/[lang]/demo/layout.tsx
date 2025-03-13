import { Header } from '@/components/common/Header';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import { i18n, type Locale } from '@/configs/i18n.config';
import { inter } from '@/lib/fonts';
import './style.css';

export const metadata = {
  title: 'LogdevStorires',
  description: 'How to do i18n in Next.js 15 within app router',
  icons: {
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
  },
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;

  const { children } = props;

  return (
    <html lang={params.lang} className={inter.className}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                    (function() {
                      const theme = localStorage.getItem('theme');
                      if (theme === 'dark') {
                        document.documentElement.classList.add('dark');
                      } else {
                        document.documentElement.classList.remove('dark');
                      }
                    })();
                  `,
          }}
        />
      </head>
      <body>
        <div className="custom-cursor flex flex-col min-h-screen bg-white text-gray-900 dark:tex-white dark:bg-slate-950">
          <Header />
          <main>{children}</main>
          {/* <Footer /> */}
          <ScrollToTopButton />
        </div>
      </body>
    </html>
  );
}
