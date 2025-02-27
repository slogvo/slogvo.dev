// app/[lang]/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-container">
      <h2>Đã xảy ra lỗi</h2>
    </div>
  );
}
