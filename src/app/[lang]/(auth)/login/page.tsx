'use client';
import Link from 'next/link';

export default function LoginPage() {
  interface FormFields {
    email: { value: string };
    password: { value: string };
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & FormFields;
    const email = target.email.value;
    const password = target.password.value;
    console.log('Login attempt:', { email, password });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h1
        style={{
          fontSize: '2rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="email"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            htmlFor="password"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Don’t have an account?{' '}
        <Link
          href="/register"
          style={{ color: '#0070f3', textDecoration: 'none' }}
        >
          Register
        </Link>
      </p>
    </div>
  );
}
