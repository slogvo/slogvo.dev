'use client';

import { type getDictionary } from '@/lib/utils/get-dictionary';
import { useState } from 'react';

export default function Counter({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const [count, setCount] = useState(0);
  return (
    <p>
      This component is rendered on client:
      <button onClick={() => setCount((n) => n - 1)}>
        {dictionary.decrement}
      </button>
      {count}
      <button onClick={() => setCount((n) => n + 1)}>
        {dictionary.increment}
      </button>
    </p>
  );
}
