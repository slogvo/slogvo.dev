import React from 'react';
function ThankToScroll() {
  return (
    <section className="mx-auto relative h-full w-full mt-4 border-none overflow-hidden rounded-2xl">
      <article className="grid gap-4 text-center relative z-10 pt-10">
        <span className="inline-block xl:text-base text-sm border p-1 px-3 w-fit mx-auto rounded-full border-[#3298ff] bg-[#0f1c35]">
          Early Access
        </span>
        <h1 className="2xl:text-6xl  xl:text-5xl text-5xl font-semibold bg-gradient-to-b from-[#edeffd] to-[#7b9cda] bg-clip-text text-transparent leading-[100%] tracking-tighter">
          Become an Animation Expert <br /> Easily at Our Academy
        </h1>
      </article>

      <div className="absolute bottom-0 z-[2] h-[400px] w-screen overflow-hidden [mask-image:radial-gradient(100%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute"></div>
    </section>
  );
}

export default ThankToScroll;
