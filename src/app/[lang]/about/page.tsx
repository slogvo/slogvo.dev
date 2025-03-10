'use client';

const projects = [
  { id: 1, src: 'https://www.behance.net/embed/project/175542087?ilo0=1' },
  { id: 2, src: 'https://www.behance.net/embed/project/175429175?ilo0=1' },
  { id: 3, src: 'https://www.behance.net/embed/project/175427553?ilo0=1' },
  { id: 4, src: 'https://www.behance.net/embed/project/175422819?ilo0=1' },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto rounded-lg bg-white dark:bg-gray-900/60 p-6 my-28">
      {/* Header */}
      <div className="flex items-center border-b pb-4 dark:border-gray-300/40">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary rounded-sm"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-zinc-100">
            Behance Projects
          </span>
        </div>
        <a
          href="https://www.behance.net/volong5"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-sm text-gray-500 hover:text-gray-700 dark:text-zinc-100"
        >
          Open original ↗
        </a>
      </div>

      {/* Grid hiển thị dự án */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg overflow-hidden shadow-md"
          >
            <iframe
              src={project.src}
              width="100%"
              height="280"
              allowFullScreen
              allow="clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 p-3 bg-zinc-100 border-t border-zin-200 dark:bg-gray-900 dark:border-gray-500/50  text-center">
        <a
          href="https://www.behance.net/volong5"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:text-gray-700"
        >
          https://www.behance.net/volong5
        </a>
      </div>
    </div>
  );
}
