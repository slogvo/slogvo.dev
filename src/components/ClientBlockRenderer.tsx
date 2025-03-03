'use client';

import { blockMapper, NotionBlock } from 'react-notion-blocks';

export default function ClientBlockRenderer({
  blocks,
}: {
  blocks: NotionBlock[];
}) {
  return (
    <>
      {blocks.map((block, index) => (
        <div key={index}>{blockMapper(block)}</div>
      ))}
    </>
  );
}
