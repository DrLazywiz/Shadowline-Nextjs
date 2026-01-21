
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { BestSellers } from '@/components/home/BestSellers';
import { BikeSelector } from '@/components/home/BikeSelector';
import { Testimonials } from '@/components/home/Testimonials';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <BestSellers />
      <BikeSelector />
      <Testimonials />

      {/* Footer Placeholder */}
      <Footer />
    </main>
  );
}
