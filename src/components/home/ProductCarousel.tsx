'use client';

import { Product } from '@/lib/shopify';
import { ProductCard } from '@/components/shop/ProductCard';
import { useRef } from 'react';

export function ProductCarousel({ products }: { products: Product[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative group">
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
