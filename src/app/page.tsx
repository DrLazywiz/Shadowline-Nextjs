
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { StorySection } from '@/components/home/StorySection';
import { BestSellers } from '@/components/home/BestSellers';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <BestSellers />
      <CategoryGrid />
      <StorySection />

      {/* Footer Placeholder */}
      <footer className="py-12 border-t border-white/10 bg-neutral-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="font-sans text-lg font-bold tracking-[0.2em] text-white uppercase">
              Shadowline
            </Link>
            <p className="text-[10px] text-neutral-600 mt-2 font-mono uppercase">
              Precision Engineered for Performance.
            </p>
          </div>

          <div className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
            &copy; 2024 Shadowline Industries. All Rights Reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
