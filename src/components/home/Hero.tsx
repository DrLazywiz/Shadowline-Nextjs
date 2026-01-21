
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            image: '/images/Hero/slide2.png',
            mobileImage: '/images/mobile%20hero/Artboard%201.jpg',
            title: 'Precision Redefined.',
            subtitle: 'Beyond Components. The Architecture of Speed.',
            link: '/shop?sort=best-selling'
        },
        {
            id: 2,
            image: '/images/Hero/slide1.png',
            mobileImage: '/images/mobile%20hero/Artboard%202.jpg',
            title: 'Total Control.',
            subtitle: 'Engineered for the Edge of Physics.',
            link: '/shop?type=Components'
        },
        {
            id: 3,
            image: '/images/Landing/1.jpg',
            mobileImage: '/images/mobile%20hero/Artboard%203.jpg',
            title: 'Unleash Speed.',
            subtitle: 'Dominate the Track. own the Podium.',
            link: '/shop'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black flex items-end justify-center pb-24">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    {/* Desktop Image */}
                    <div className="hidden md:block w-full h-full relative">
                        <Image
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                    </div>
                    {/* Mobile Image */}
                    <div className="block md:hidden w-full h-full relative">
                        <Image
                            src={slides[currentSlide].mobileImage}
                            alt={slides[currentSlide].title}
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 text-center max-w-4xl px-6 mb-12">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentSlide}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4">
                            {slides[currentSlide].title}
                        </h1>
                        <p className="text-xs md:text-base text-neutral-300 font-mono uppercase tracking-[0.2em] mb-8">
                            {slides[currentSlide].subtitle}
                        </p>
                        <a
                            href={slides[currentSlide].link}
                            className="inline-block bg-[var(--color-brand-red)] text-white font-bold font-mono uppercase tracking-widest py-3 px-8 text-xs md:text-sm transition-all hover:shadow-[0_0_20px_var(--color-brand-red)] hover:brightness-110 clip-path-slant"
                        >
                            Buy Now
                        </a>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-12 h-1 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[var(--color-brand-red)] shadow-[0_0_10px_var(--color-brand-red)]' : 'bg-white/20'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
