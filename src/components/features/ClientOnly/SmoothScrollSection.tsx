'use client';
import { JSX } from 'react';
// import ReactLenis from 'lenis/react';
import ReactLenis from 'lenis/dist/lenis-react';
import ClientScene from '@/components/features/ClientOnly/Scene';
import { BlockAnimatedCard } from './BlockAnimatedCard';

export default function SmoothScrollSection(): JSX.Element {
  return (
    <ReactLenis root>
      <main>
        <div className="relative">
          <ClientScene />
          <div className="absolute top-1/2 w-full max-w-md left-1/2 -translate-x-1/2 sm:-translate-x-0 sm:left-[10vw] transform -translate-y-1/2 text-white  z-10">
            <span className="px-8 text-5xl font-bold">Hi, I am Long</span>
            <div className="mt-3 px-8 font-medium">
              A Web Developer & UI/UX Designer passionate about seamless user
              experiences.
            </div>
            <BlockAnimatedCard />
          </div>
        </div>
        <article>
          <section className="text-white  h-screen  w-full bg-slate-950  grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <h1 className="2xl:text-7xl text-6xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              I Know What Exactly you are <br /> Looking For! Scroll Please 👇
            </h1>
          </section>

          <section className="bg-gray-300 text-black grid place-content-center h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="2xl:text-7xl text-4xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              If you do not like this then I am sorry, <br /> create your own
              and make it open source 💼
            </h1>
          </section>
          <section className="text-white h-[70vh] w-full bg-slate-950  grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              Thanks To Scroll.
              <br /> Now Scroll Up Again☝️🏿
            </h1>
          </section>
        </article>
      </main>
    </ReactLenis>
  );
}
