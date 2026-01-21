'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/shopify';
import { useCart } from '@/components/cart/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

export function QuickAddDrawer({
    product,
    isOpen,
    onClose
}: {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}) {
    const { addItem } = useCart();
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [isAdding, setIsAdding] = useState(false);

    // Initialize default options
    useEffect(() => {
        if (product && product.options) {
            const defaults: Record<string, string> = {};
            product.options.forEach(opt => {
                defaults[opt.name] = opt.values[0];
            });
            setSelectedOptions(defaults);
        }
    }, [product]);

    if (!product) return null;

    // Find selected variant
    const selectedVariant = product.variants.edges.find(({ node }) => {
        return node.selectedOptions.every(opt => selectedOptions[opt.name] === opt.value);
    })?.node;

    const handleAddToCart = async () => {
        if (!selectedVariant) return;
        setIsAdding(true);
        await addItem(selectedVariant.id);
        setIsAdding(false);
        onClose();
    };

    const price = selectedVariant
        ? selectedVariant.price
        : product.priceRange.minVariantPrice;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 md:top-1/2 md:left-1/2 md:right-auto md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md z-[1000] bg-neutral-900 border-t md:border border-white/10 rounded-t-xl md:rounded-xl p-6 flex flex-col max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex gap-4">
                                <div className="relative w-20 h-20 bg-black border border-white/10 rounded-md overflow-hidden">
                                    {product.featuredImage && (
                                        <Image
                                            src={product.featuredImage.url}
                                            alt={product.featuredImage.altText || product.title}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white uppercase text-sm">{product.title}</h3>
                                    <p className="text-neutral-400 font-mono text-xs mt-1">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: price.currencyCode
                                        }).format(parseFloat(price.amount))}
                                    </p>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-neutral-500 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Options */}
                        <div className="space-y-6 overflow-y-auto mb-6">
                            {product.options?.map((option) => (
                                <div key={option.id} className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider">
                                        {option.name}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {option.values.map((value) => {
                                            const isSelected = selectedOptions[option.name] === value;
                                            return (
                                                <button
                                                    key={value}
                                                    onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                                                    className={`px-4 py-2 text-xs font-mono border rounded-md transition-all ${isSelected
                                                        ? 'bg-white text-black border-white'
                                                        : 'bg-transparent text-neutral-400 border-white/20 hover:border-white/50'
                                                        }`}
                                                >
                                                    {value}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!selectedVariant?.availableForSale || isAdding}
                            className="w-full bg-[var(--color-brand-red)] text-white font-bold uppercase tracking-widest py-4 rounded-sm hover:shadow-[0_0_20px_var(--color-brand-red)] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isAdding ? 'Adding...' : !selectedVariant?.availableForSale ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
