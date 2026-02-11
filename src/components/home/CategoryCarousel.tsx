'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        id: 1,
        title: 'Sprockets',
        image: '/images/categories/sprocket.png',
        href: '/shop?q=sprocket'
    },
    {
        id: 2,
        title: 'Triple Clamps',
        image: '/images/categories/triple_clamps.png',
        href: '/shop?q=triple clamps'
    },
    {
        id: 3,
        title: 'Graphics Kit',
        image: '/images/categories/graphics_kit.png',
        href: '/shop?q=graphics kit'
    }
];

export function CategoryCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4"
                    >
                        Shop by Category
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: 100 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="h-1 bg-[var(--color-brand-red)]"
                    />
                </div>
            </div>

            <div className="relative group">
                {/* Carousel Track */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 px-6 md:px-0 container mx-auto snap-x snap-mandatory no-scrollbar pb-8"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="w-[85vw] sm:w-[45vw] md:w-[400px] snap-center flex-shrink-0 group/card relative"
                        >
                            <Link href={category.href} className="block aspect-[4/5] relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover/card:opacity-90" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <h3 className="text-2xl font-black uppercase italic tracking-wider text-white mb-2 transform transition-transform duration-300 group-hover/card:translate-x-2">
                                        {category.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[var(--color-brand-red)] text-sm font-bold uppercase tracking-widest opacity-0 transform translate-y-4 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-y-0">
                                        Shop Now <ArrowRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
