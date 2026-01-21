
'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ProductGallery({ images }: { images: { url: string; altText: string }[] }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedImage = images[selectedIndex];

    if (!images.length) return null;

    const handleNextImage = () => {
        setSelectedIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-6 h-full">
            {/* Thumbnails (Desktop Only) */}
            <div className="hidden lg:flex flex-col gap-4 overflow-y-auto">
                {images.map((image, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedIndex(idx)}
                        className={`relative w-20 h-20 flex-shrink-0 border transition-all ${selectedIndex === idx
                            ? 'border-white opacity-100'
                            : 'border-white/10 opacity-50 hover:opacity-100'
                            }`}
                    >
                        <Image
                            src={image.url}
                            alt={image.altText || 'Product Thumbnail'}
                            fill
                            className="object-cover p-1"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image (Tap to Slide on Mobile) */}
            <div
                className="relative flex-1 aspect-square lg:aspect-auto bg-neutral-900/20 border border-white/5 rounded-lg overflow-hidden group cursor-pointer lg:cursor-default"
                onClick={handleNextImage}
            >
                <Image
                    src={selectedImage?.url}
                    alt={selectedImage?.altText || 'Product Image'}
                    fill
                    className="object-contain transition-transform duration-700 lg:group-hover:scale-105"
                    priority
                />

                {/* Mobile Slide Indicator */}
                <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 lg:hidden pointer-events-none">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === selectedIndex ? 'bg-white' : 'bg-white/20'}`}
                        />
                    ))}
                </div>


            </div>
        </div>
    );
}
