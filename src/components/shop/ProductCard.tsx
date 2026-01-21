'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/shopify';
import { useState } from 'react';
import { QuickAddDrawer } from './QuickAddDrawer';
import { ShoppingBag } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
    const { title, handle, featuredImage, priceRange } = product;
    const firstVariant = product.variants.edges[0]?.node;
    const price = firstVariant?.price || priceRange.minVariantPrice;
    const compareAtPrice = firstVariant?.compareAtPrice;
    const currency = price.currencyCode;
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <div className="group relative block h-full flex flex-col">
                <Link href={`/products/${handle}`} className="relative aspect-square w-full overflow-hidden rounded-none border border-white/10 bg-neutral-900/50 transition-colors group-hover:bg-neutral-800/50 block">
                    {/* Sale Badge */}
                    {compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount) && (
                        <div className="absolute top-4 right-4 z-10 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                            Sale
                        </div>
                    )}

                    {/* Technical Corner Markers */}
                    <div className="absolute top-0 right-0 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="h-2 w-2 border-t border-r border-[var(--color-brand-red)] shadow-[0_0_5px_var(--color-brand-red)]"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="h-2 w-2 border-b border-l border-[var(--color-brand-red)] shadow-[0_0_5px_var(--color-brand-red)]"></div>
                    </div>

                    {featuredImage && (
                        <Image
                            src={featuredImage.url}
                            alt={featuredImage.altText || title}
                            fill
                            className="object-cover p-0 transition-transform duration-500 group-hover:scale-105"
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        />
                    )}
                </Link>

                <div className="mt-2 flex flex-col gap-1 flex-1">
                    <div>
                        <Link href={`/products/${handle}`}>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-white hover:text-neutral-200 transition-colors line-clamp-2 min-h-[0]">
                                {title}
                            </h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm font-bold font-mono text-white">
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: currency,
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                }).format(parseFloat(price.amount))}
                            </p>
                            {compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount) && (
                                <p className="text-[10px] font-mono text-neutral-500 line-through">
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: compareAtPrice.currencyCode,
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }).format(parseFloat(compareAtPrice.amount))}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="mt-auto w-full bg-[var(--color-brand-red)] text-white hover:bg-[var(--color-brand-red)] hover:shadow-[0_0_20px_var(--color-brand-red)] hover:brightness-110 text-[10px] font-bold font-mono uppercase tracking-widest py-2 px-4 rounded-sm transition-all flex items-center justify-center gap-2"
                    >
                        <ShoppingBag size={10} /> Add to Cart
                    </button>
                </div>
            </div>

            <QuickAddDrawer
                product={product}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
        </>
    );
}
