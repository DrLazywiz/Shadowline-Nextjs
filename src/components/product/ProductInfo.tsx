
'use client';

import { Product } from '@/lib/shopify';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/components/cart/CartContext';

export function ProductInfo({ product }: { product: Product }) {
    const [loading, setLoading] = useState(false);
    const { addItem } = useCart();

    const price = product.priceRange.minVariantPrice.amount;
    const currency = product.priceRange.minVariantPrice.currencyCode;
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(parseFloat(price));

    const handleAddToCart = async () => {
        setLoading(true);
        const variantId = product.variants.edges[0]?.node.id;
        if (variantId) {
            await addItem(variantId);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-8 h-full justify-center">
            <div>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
                    {product.title}
                </h1>
                <div className="flex items-center gap-4">
                    <span className="text-xl font-mono text-brand-charcoal bg-white px-2 py-0.5 rounded-sm">
                        {formattedPrice}
                    </span>
                    {product.variants.edges[0]?.node.availableForSale ? (
                        <span className="text-xs font-mono text-green-500 tracking-widest uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            In Stock
                        </span>
                    ) : (
                        <span className="text-xs font-mono text-red-500 tracking-widest uppercase">
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>

            <div
                className="prose prose-invert prose-sm text-neutral-400 font-light leading-relaxed max-w-none border-t border-white/10 pt-6"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            <div className="pt-8 border-t border-white/10">
                <button
                    onClick={handleAddToCart}
                    disabled={loading || !product.variants.edges[0]?.node.availableForSale}
                    className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 px-8 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        'Processing...'
                    ) : (
                        <>
                            Add to System <ShoppingBag size={18} />
                        </>
                    )}
                </button>
                <p className="mt-4 text-center text-[10px] text-neutral-600 uppercase tracking-widest">
                    Secure Transaction Encrypted
                </p>
            </div>
        </div>
    );
}
