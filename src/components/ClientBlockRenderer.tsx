'use client';

import { blockMapper } from 'react-notion-blocks';

export default function ClientBlockRenderer({ blocks }: { blocks: any[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <div key={index}>{blockMapper(block)}</div>
      ))}
    </>
  );
}
