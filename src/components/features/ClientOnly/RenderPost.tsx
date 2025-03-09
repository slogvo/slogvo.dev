'use client';

import { blockMapper, type NotionBlock } from 'react-notion-blocks';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
export default function ClientBlockRenderPost({
  blocks,
}: {
  blocks: NotionBlock[];
}) {
  return (
    <>
      {blocks.map((block, index) => (
        <div key={index} className="text-black dark:text-white">
          {blockMapper(block)}
        </div>
      ))}
    </>
  );
}
