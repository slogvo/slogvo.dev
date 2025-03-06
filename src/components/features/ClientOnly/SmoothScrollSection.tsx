'use client';
import { JSX } from 'react';
// import ReactLenis from 'lenis/react';
import ReactLenis from 'lenis/dist/lenis-react';
import ClientScene from '@/components/features/ClientOnly/Scene';
import { BlockAnimatedCard } from './BlockAnimatedCard';
import SkillsSection from '../SkillsSection';
import { RandomizedTextEffect } from './TextRandomized';
import CardsHoverEffect from '../CardsHoverEffect';
import ThankToScroll from '../ThankToScroll';
import { Sparkles } from './Sparkles';
import ContactCard from '../ContactInfo';

export default function SmoothScrollSection(): JSX.Element {
  return (
    <ReactLenis root>
      <main>
        <div className="relative">
          <ClientScene />
          <div className="absolute top-1/2 w-full max-w-md left-1/2 -translate-x-1/2 sm:-translate-x-0 sm:left-[10vw] transform -translate-y-1/2 text-white  z-10">
            {/* <span className="px-8 text-5xl font-bold">Hi, I am Long</span> */}
            <RandomizedTextEffect
              text="Hi, Tôi là Long"
              className="px-8 text-5xl font-bold"
            />
            <div className="mt-3 px-8 font-regular">
              Một Web Developer & UI/UX Designer - đam mê tạo ra những trải
              nghiệm người dùng thật mượt mà.
            </div>
            <BlockAnimatedCard />
          </div>
        </div>
        <article>
          <section className="text-white  h-screen  w-full bg-slate-950  grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            {/* <h1 className="2xl:text-7xl text-6xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              I Know What Exactly you are <br /> Looking For! Scroll Please 👇
            </h1> */}
            <SkillsSection />
          </section>

          <section className="bg-zinc-300 text-black grid place-content-center h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <h1 className="2xl:text-6xl text-3xl sm:text-5xl px-8 font-semibold text-center">
              Trải nghiệm và đánh giá!
              <br />
            </h1>
            <div className="mt-10 w-full max-w-6xl mx-auto">
              <CardsHoverEffect />
            </div>
          </section>
          <section className="text-white h-[40vh] w-full bg-zinc-950 rounded-tr-2xl rounded-tl-2xl grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <article className="grid gap-4 text-center relative z-10 p6-10">
              <span className="inline-block xl:text-base text-sm border p-1 px-3 w-fit mx-auto rounded-full border-[#3298ff] bg-[#0f1c35]">
                Liên hệ
              </span>
              <ContactCard />
            </article>
            <div className="absolute bottom-0 z-[2] h-[400px] w-full overflow-hidden [mask-image:radial-gradient(100%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute">
              <Sparkles
                density={1800}
                speed={1.2}
                color="#48b6ff"
                direction="top"
                className="absolute inset-x-0 bottom-0 h-full w-full "
              />
            </div>
          </section>
        </article>
      </main>
    </ReactLenis>
  );
}
