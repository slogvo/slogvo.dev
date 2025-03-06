import { Header } from '@/components/common/Header';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import CanvasCursor from '@/components/features/CanvasCursor';
import { i18n, type Locale } from '@/configs/i18n.config';
import { inter } from '@/lib/fonts';
import '@/styles/index.css';

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
      <body>
        <div className="flex flex-col min-h-screen">
          <CanvasCursor />
          <Header />
          <main>{children}</main>
          {/* <Footer /> */}
          <ScrollToTopButton />
        </div>
      </body>
    </html>
  );
}
