// app/page.tsx
import Script from 'next/script';
import SmoothScrollSection from '@/components/features/ClientOnly/SmoothScrollSection';

export default async function Home() {
  return (
    <div className="bg-slate-950 w-full">
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></Script>
      <SmoothScrollSection />
    </div>
  );
}
