import LocaleSwitcher from '@/components/locale-switcher';
import { type Locale } from '@/configs/i18n.config';
import Link from 'next/link';

const translations = {
  en: {
    welcome: 'Welcome to my app!',
  },
  vi: {
    welcome: 'Chào mừng đến với ứng dụng của tôi!',
  },
  fr: {
    welcome: 'Bienvenue sur mon application!',
  },
} as const;

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;

  const t = translations[lang] || translations.en;
  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Header */}
      <header
        style={{
          padding: '1rem',
          borderBottom: '1px solid #e9ecef',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <nav>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '1.5rem',
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <Link
                href={`/${lang}`}
                style={{ textDecoration: 'none', color: '#0070f3' }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/about`}
                style={{ textDecoration: 'none', color: '#0070f3' }}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
        <LocaleSwitcher />
      </header>

      <main
        style={{
          flex: 1,
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t.welcome}</h1>
        <p>
          Current locale: <strong>{lang}</strong>
        </p>
      </main>

      <footer
        style={{
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <p>© 2025 My App</p>
      </footer>
    </div>
  );
}
