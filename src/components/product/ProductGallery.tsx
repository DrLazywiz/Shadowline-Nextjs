
'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ProductGallery({ images }: { images: { url: string; altText: string }[] }) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    if (!images.length) return null;

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-6 h-full">
            {/* Thumbnails (Left on desktop, Bottom on mobile) */}
            <div className="flex lg:flex-col gap-4 overflow-auto lg:overflow-visible">
                {images.map((image, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(image)}
                        className={`relative w-20 h-20 flex-shrink-0 border transition-all ${selectedImage.url === image.url
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

            {/* Main Image */}
            <div className="relative flex-1 aspect-square lg:aspect-auto bg-neutral-900/20 border border-white/5 rounded-lg overflow-hidden group">
                <Image
                    src={selectedImage?.url}
                    alt={selectedImage?.altText || 'Product Image'}
                    fill
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                {/* Decoration */}
                <div className="absolute top-4 left-4 text-xs font-mono text-white/30 tracking-widest">
                    CAM-01 [LIVE]
                </div>
            </div>
        </div>
    );
}
