'use client';

import { useEffect, useRef } from 'react';

export default function GitWrappedProfile() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      const style = document.createElement('style');
      style.textContent = `
        body {
          background-color: #1a1a1a !important; /* Màu nền tùy chỉnh */
          margin: 0;
          padding: 0;
        }
      `;
      iframe.contentDocument.head.appendChild(style);
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <iframe
        ref={iframeRef}
        src="https://git-wrapped.com/profiles/slogvo"
        title="Git Wrapped Profile"
        className="w-full h-[300px] rounded-lg border-none shadow-lg overflow-hidden"
      />
    </div>
  );
}
