// "I referred to this project to resolve the issue of the Next.js app not finding the `not-found.tsx` file: https://github.com/Jon1VK/NextGlobeGen/blob/main/examples/playground/src/_app/not-found.tsx"

import { notFound } from 'next/navigation';

export default function CatchAllPage() {
  notFound();
}
