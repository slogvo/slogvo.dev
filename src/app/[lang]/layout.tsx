import { Header } from '@/components/common/Header';
import { i18n, type Locale } from '@/configs/i18n.config';
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
    <html lang={params.lang}>
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="mt-20 flex-grow max-w-4xl mx-auto p-5">
            {children}
          </main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
