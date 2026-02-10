
'use client';

import { Product } from '@/lib/shopify';
import { ShoppingBag, Star, ShieldCheck, Zap, Wind, Dumbbell, Layers, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/components/cart/CartContext';
import { useRouter } from 'next/navigation';

export function ProductInfo({ product }: { product: Product }) {
    const [loading, setLoading] = useState(false);
    const { addItem } = useCart();
    const router = useRouter();

    // Pricing Logic
    const variant = product.variants.edges[0]?.node;
    const price = variant?.price.amount || '0';
    const currency = variant?.price.currencyCode || 'USD';
    const compareAtPrice = variant?.compareAtPrice?.amount;

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(parseFloat(price));

    const formattedCompareAtPrice = compareAtPrice ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(parseFloat(compareAtPrice)) : null;

    const discountPercentage = compareAtPrice
        ? Math.round(((parseFloat(compareAtPrice) - parseFloat(price)) / parseFloat(compareAtPrice)) * 100)
        : 0;

    const handleAddToCart = async () => {
        setLoading(true);
        const variantId = product.variants.edges[0]?.node.id;
        if (variantId) {
            await addItem(variantId);
        }
        setLoading(false);
    };

    const handleBuyNow = async () => {
        setLoading(true);
        const variantId = product.variants.edges[0]?.node.id;
        if (variantId) {
            const updatedCart = await addItem(variantId);
            if (updatedCart?.checkoutUrl) {
                const returnUrl = encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/cart`);
                router.push(`${updatedCart.checkoutUrl}?return_url=${returnUrl}`);
                return;
            }
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-6 h-full justify-center pb-24 lg:pb-0">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
                    {product.title}
                </h1>

                {/* Reviews */}
                <div className="flex items-center gap-2">
                    <div className="flex text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                    </div>
                    <span className="text-sm font-bold text-neutral-300">4.9</span>
                    <span className="text-sm text-neutral-500 border-l border-white/20 pl-2 ml-2">392 reviews</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 pt-2">
                    <span className="text-2xl font-bold text-white">
                        {formattedPrice}
                    </span>
                    {formattedCompareAtPrice && (
                        <span className="text-lg text-neutral-500 line-through font-mono">
                            {formattedCompareAtPrice}
                        </span>
                    )}
                    {discountPercentage > 0 && (
                        <span className="bg-[#EFFF00] text-black text-xs font-bold px-2 py-1 uppercase rounded-sm">
                            {discountPercentage}% OFF
                        </span>
                    )}
                </div>
                <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
                    Taxes Included.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-md">
                        <Dumbbell size={20} className="text-neutral-300" />
                    </div>
                    <span className="text-xs font-bold uppercase text-neutral-300">Built to Endure</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-md">
                        <Zap size={20} className="text-neutral-300" />
                    </div>
                    <span className="text-xs font-bold uppercase text-neutral-300">Brace for Power</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-md">
                        <Layers size={20} className="text-neutral-300" />
                    </div>
                    <span className="text-xs font-bold uppercase text-neutral-300">Lift Without Limits</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-md">
                        <Wind size={20} className="text-neutral-300" />
                    </div>
                    <span className="text-xs font-bold uppercase text-neutral-300">Strength Meets Airflow</span>
                </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex flex-col gap-3 pt-4">
                <div className="flex gap-4">
                    <button
                        onClick={handleAddToCart}
                        disabled={loading || !product.variants.edges[0]?.node.availableForSale}
                        className="flex-1 bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Add to Cart'}
                    </button>
                    <button
                        onClick={handleBuyNow}
                        disabled={loading || !product.variants.edges[0]?.node.availableForSale}
                        className="flex-1 border border-white text-white font-bold uppercase tracking-widest py-4 hover:bg-white hover:text-black transition-colors disabled:opacity-50"
                    >
                        Buy It Now
                    </button>
                </div>
                <p className="text-center text-[10px] text-neutral-600 uppercase tracking-widest flex items-center justify-center gap-2">
                    <ShieldCheck size={12} /> Secure Transaction Encrypted
                </p>
            </div>

            {/* Description Removed from here, moved to main page layout */}

            {/* Mobile Sticky Footer */}
            <div className="fixed bottom-0 left-0 w-full z-50 bg-black border-t border-white/10 p-4 lg:hidden">
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleAddToCart}
                        disabled={loading || !product.variants.edges[0]?.node.availableForSale}
                        className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] transition-transform"
                    >
                        {loading ? 'Processing...' : 'Add to Cart'}
                    </button>
                    <button
                        onClick={handleBuyNow}
                        disabled={loading || !product.variants.edges[0]?.node.availableForSale}
                        className="w-full border border-white text-white font-bold uppercase tracking-widest py-3 text-xs disabled:opacity-50 active:scale-[0.98] transition-transform"
                    >
                        Buy It Now
                    </button>
                </div>
            </div>
        </div>
    );
}
