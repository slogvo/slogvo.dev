import Link from 'next/link';
import { Post } from '@/types';
import Image from 'next/image';

export const CardPost = ({ cover, slug, title, excerpt }: Post) => {
  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">
        <Link
          className="relative block aspect-video"
          href="/post/architectural-engineering-wonders-of-the-modern-era-for-your-inspiration"
        >
          <Image
            alt="Thumbnail"
            priority
            className="object-cover transition-all"
            sizes="(max-width: 768px) 30vw, 33vw"
            src={
              cover ||
              'https://plus.unsplash.com/premium_photo-1723200799223-0095f042decb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            fill
          />
        </Link>
      </div>
      <div className="">
        <div>
          <div className="flex gap-3">
            <Link href={`/posts/${slug}`}>
              <span className="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-blue-600">
                {title}
              </span>
            </Link>
          </div>
          <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2 dark:text-white">
            <Link href="/post/architectural-engineering-wonders-of-the-modern-era-for-your-inspiration">
              <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
                {excerpt}
              </span>
            </Link>
          </h2>
          <div className="hidden">
            <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/post/architectural-engineering-wonders-of-the-modern-era-for-your-inspiration">
                Reinvention often comes in spurts, after a long period of
                silence. Just as modern architecture recently enjoyed a
                comeback, brand architecture, a field with well-established
                principles for decades
              </Link>
            </p>
          </div>
          <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
            <Link href="/author/mario-sanchez">
              <div className="flex items-center gap-3">
                <div className="relative h-5 w-5 flex-shrink-0">
                  <Image
                    alt="Mario Sanchez"
                    loading="lazy"
                    decoding="async"
                    className="rounded-full object-cover"
                    sizes="20px"
                    src="https://bobo.muzli.cloud/1722778983526-sticky-site-hero.png?format=600:450"
                    fill
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      inset: '0px',
                      color: 'transparent',
                    }}
                  />
                </div>
                <span className="truncate text-sm">Mario Sanchez</span>
              </div>
            </Link>
            <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
            <time
              className="truncate text-sm"
              dateTime="2022-10-21T15:48:00.000Z"
            >
              October 21, 2022
            </time>
          </div>
        </div>
      </div>
    </div>
  );
};
