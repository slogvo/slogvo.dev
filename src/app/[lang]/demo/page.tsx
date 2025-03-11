'use client';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import React from 'react';
import { andromeda } from '@uiw/codemirror-theme-andromeda';

const initialData = {
  id: '1a49c9aa-3561-802f-ac39-f45d375b0bcb',
  icon: {
    type: 'emoji',
    emoji: '📷',
  },
  title: 'App Router and Pages Router ',
  cover:
    'https://res.cloudinary.com/dgbocu1qv/image/upload/v1741250567/app-router-with-pages-router.jpg',
  slug: 'app-router-vs-pages-router',
  status: 'Published',
  publishDate: '2025-03-02',
  excerpt:
    'App router và Page Router là hai cách tiếp cận định tuyến khác nhau trong Next.js, mỗi cái có mục đích và ưu điểm riêng, tùy thuộc vào yêu cầu dự án.',
  author: 'Phi Long',
  tags: [],
  categoryIds: [],
  authorId: null,
  content: [
    {
      id: '1a49c9aa-3561-80aa-bbb1-e0dc2e11cc90',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            text: { content: 'App Router and Pages Router' },
            annotations: { bold: true },
          },
          {
            text: { content: ' are different approaches in Next.js.' },
            annotations: {},
          },
        ],
      },
    },
  ],
};

export default function DemoPage() {
  const [jsonValue, setJsonValue] = React.useState(() =>
    JSON.stringify(initialData, null, 2),
  );
  const [jsxCode, setJsxCode] = React.useState(() =>
    `
<div className="w-full mt-16">
      <div className="mt-10 space-y-4">
        <div className="relative w-full">
          <Image
            alt={initialData.title}
            src={initialData.cover as string}
            height={400}
            width={400}
            className="object-cover w-full h-40 sm:h-60"
          />
        </div>
        <div className="w-full max-w-4xl relative z-20 mt-10 mx-auto p-4">
          <div className="text-8xl absolute z-20 -top-28 left-0">
            {initialData?.icon?.emoji}
          </div>
          <h1 className="mt-4 text-primary dark:text-primary-400">
            {initialData.title}
          </h1>
          <div className="flex items-center justify-between text-sm">
            <div className="left flex gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  alt="Mario Sanchez"
                  loading="lazy"
                  decoding="async"
                  className="rounded-full object-cover absolute w-full h-full inset-0 bg-transparent border-primary dark:border-primary-400 p-1 border-[3px]"
                  sizes="60px"
                  src="https://bobo.muzli.cloud/1722778983526-sticky-site-hero.png?format=600:450"
                  fill
                />
              </div>
              <div>
                <p className="text-zinc-600 dark:text-zinc-300">
                  <strong>Author:</strong> {initialData?.author}
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 mt-2">
                  <strong>Publish Date:</strong>{' '}
                  {initialData?.publishDate
                    ? dayjs(initialData.publishDate).format('DD/MM/YYYY')
                    : 'No data available'}
                </p>
              </div>
            </div>
           
          </div>
          <p className="h-[1px] my-6 w-full bg-zinc-200 dark:bg-zinc-400/50"></p>
          <div className="mt-8 sm:mt-10">
            <ClientBlockRenderPost blocks={initialData.content ?? []} />
            <CommentSection />
          </div>
        </div>
        
        // Using react-notion-blocks
        {initialData.content.map((block) => (
          <div key={block.id} className="text-black dark:text-white">
            {blockMapper(block)}
          </div>
        ))}
      </div>
    </div>
  `.trim(),
  );

  return (
    <div className="mt-20 container p-10 max-w-8xl w-full mx-auto ">
      {/* CodeMirror 1 - JSON Editor */}
      <h2>React Notion Blocks</h2>
      <div className="space-x-4 grid grid-cols-2">
        <div>
          <h3>InitialData</h3>
          <CodeMirror
            value={jsonValue}
            height="600px"
            theme={andromeda}
            extensions={[json()]}
            onChange={(val) => setJsonValue(val)}
          />
        </div>
        <div>
          <h3>Mapping</h3>
          <CodeMirror
            value={jsxCode}
            height="600px"
            theme={andromeda}
            extensions={[javascript()]}
            onChange={(val) => setJsxCode(val)}
          />
        </div>
      </div>
    </div>
  );
}
