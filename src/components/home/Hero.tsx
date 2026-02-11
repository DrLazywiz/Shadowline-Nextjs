'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export function Hero() {
    const [[page, direction], setPage] = useState([0, 0]);

    // We only have 3 slides, so we wrap the index
    const slides = [
        {
            id: 1,
            image: '/images/Hero/slide4.png',
            mobileImage: '/images/mobile%20hero/Artboard%201.jpg',
            title: 'Precision Redefined.',
            subtitle: 'Beyond Components. The Architecture of Speed.',
            link: '/shop'
        },
        {
            id: 2,
            image: '/images/bike/herobike2.png',
            mobileImage: '/images/mobile%20hero/Artboard%202.jpg',
            title: 'Total Control.',
            subtitle: 'Engineered for the Edge of Physics.',
            link: '/shop'
        },
        {
            id: 3,
            image: '/images/bike/herobike.png',
            mobileImage: '/images/mobile%20hero/Artboard%203.jpg',
            title: 'Unleash Speed.',
            subtitle: 'Dominate the Track. own the Podium.',
            link: '/shop'
        }
    ];

    const imageIndex = Math.abs(page % slides.length);

    const paginate = useCallback((newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    }, [page]);

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(timer);
    }, [paginate]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black flex items-end justify-center pb-24">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                    className="absolute inset-0 z-0"
                >
                    {/* Desktop Image */}
                    <div className="hidden md:block w-full h-full relative">
                        <Image
                            src={slides[imageIndex].image}
                            alt={slides[imageIndex].title}
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                    </div>
                    {/* Mobile Image */}
                    <div className="block md:hidden w-full h-full relative">
                        <Image
                            src={slides[imageIndex].mobileImage}
                            alt={slides[imageIndex].title}
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
                        key={imageIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4">
                            {slides[imageIndex].title}
                        </h1>
                        <p className="text-xs md:text-base text-neutral-300 font-mono uppercase tracking-[0.2em] mb-8">
                            {slides[imageIndex].subtitle}
                        </p>
                        <a
                            href={slides[imageIndex].link}
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
                        onClick={() => {
                            const direction = index > imageIndex ? 1 : -1;
                            setPage([page + (index - imageIndex), direction]);
                        }}
                        className={`w-12 h-1 rounded-full transition-all duration-300 ${index === imageIndex ? 'bg-[var(--color-brand-red)] shadow-[0_0_10px_var(--color-brand-red)]' : 'bg-white/20'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
