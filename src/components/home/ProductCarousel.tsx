'use client';

import { Product } from '@/lib/shopify';
import { ProductCard } from '@/components/shop/ProductCard';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function ProductCarousel({ products }: { products: Product[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            // Scroll by one card width (estimate) or container width
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group">
            {/* Desktop Navigation Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-12 z-20 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => scroll('left')}
                    className="p-3 bg-black/80 border border-white/10 text-white hover:border-[var(--color-brand-red)] hover:text-[var(--color-brand-red)] transition-all rounded-full"
                >
                    <ArrowLeft size={20} />
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-12 z-20 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => scroll('right')}
                    className="p-3 bg-black/80 border border-white/10 text-white hover:border-[var(--color-brand-red)] hover:text-[var(--color-brand-red)] transition-all rounded-full"
                >
                    <ArrowRight size={20} />
                </button>
            </div>

            {/* Carousel Track */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 md:gap-6 pb-4 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory no-scrollbar"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="w-[70vw] sm:w-[45vw] md:w-[300px] snap-center flex-shrink-0"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
