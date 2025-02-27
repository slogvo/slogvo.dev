import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Header */}
      <header
        style={{
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e9ecef',
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
                href="/login"
                style={{ textDecoration: 'none', color: '#0070f3' }}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                style={{ textDecoration: 'none', color: '#0070f3' }}
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, padding: '2rem', textAlign: 'center' }}>
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #e9ecef',
          textAlign: 'center',
        }}
      >
        <p>© 2025 Authentication App</p>
      </footer>
    </div>
  );
}
