
'use client';

import { useCart } from './CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CartDrawer() {
    const { isOpen, closeCart, cart, removeItem, updateItem } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-[90] w-full max-w-md bg-neutral-900 border-l border-white/10 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h2 className="text-xl font-bold uppercase tracking-widest text-white flex items-center gap-2">
                                System Diagnostic
                                <span className="text-xs font-mono text-[var(--color-brand-red)] border border-[var(--color-brand-red)]/50 bg-black px-2 py-1 rounded shadow-[0_0_5px_rgba(234,0,0,0.3)]">
                                    {cart?.totalQuantity || 0} UNITS
                                </span>
                            </h2>
                            <button
                                onClick={closeCart}
                                className="p-2 text-neutral-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {!cart?.lines.edges.length ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                    <div className="w-16 h-16 border border-dashed border-white/20 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">0</span>
                                    </div>
                                    <p className="text-sm font-mono text-neutral-400 uppercase">
                                        System Empty. <br /> Initialize Components.
                                    </p>
                                </div>
                            ) : (
                                cart.lines.edges.map(({ node: line }) => (
                                    <div key={line.id} className="flex gap-4 group">
                                        <div className="relative w-24 h-24 bg-black/50 border border-white/5 rounded-md overflow-hidden flex-shrink-0">
                                            {(line.merchandise.image || line.merchandise.product.featuredImage) && (
                                                <Image
                                                    src={line.merchandise.image?.url || line.merchandise.product.featuredImage.url}
                                                    alt={line.merchandise.image?.altText || line.merchandise.product.featuredImage.altText || line.merchandise.product.title}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-sm font-bold text-white uppercase tracking-tight">
                                                    {line.merchandise.product.title}
                                                </h3>
                                                <p className="text-xs text-neutral-500 font-mono mt-1">
                                                    {line.merchandise.title !== 'Default Title' ? line.merchandise.title : 'Standard Spec'}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-1 border border-white/10 rounded-sm bg-neutral-900">
                                                    <button
                                                        onClick={() => {
                                                            if (line.quantity > 1) {
                                                                updateItem(line.id, line.merchandise.id, line.quantity - 1);
                                                            } else {
                                                                removeItem(line.id);
                                                            }
                                                        }}
                                                        className="p-1.5 text-neutral-500 hover:text-white hover:bg-white/10 transition-colors"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="font-mono text-xs font-bold text-white min-w-[20px] text-center">
                                                        {line.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateItem(line.id, line.merchandise.id, line.quantity + 1)}
                                                        className="p-1.5 text-neutral-500 hover:text-white hover:bg-white/10 transition-colors"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>

                                                {/* Price & Remove */}
                                                <div className="flex items-center gap-4">
                                                    {line.merchandise.price && (
                                                        <span className="font-mono text-xs text-white">
                                                            {new Intl.NumberFormat('en-US', {
                                                                style: 'currency',
                                                                currency: line.merchandise.price.currencyCode
                                                            }).format(parseFloat(line.merchandise.price.amount))}
                                                        </span>
                                                    )}
                                                    <button
                                                        onClick={() => removeItem(line.id)}
                                                        className="text-neutral-600 hover:text-[var(--color-brand-red)] transition-colors"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart?.lines.edges.length ? (
                            <div className="p-6 border-t border-white/10 bg-black/20 space-y-4">
                                <div className="flex items-center justify-between text-sm font-mono text-neutral-400">
                                    <span>SUBTOTAL</span>
                                    <span className="text-white">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: cart.cost.subtotalAmount.currencyCode
                                        }).format(parseFloat(cart.cost.subtotalAmount.amount))}
                                    </span>
                                </div>
                                <a
                                    href={cart.checkoutUrl}
                                    className="block w-full bg-[var(--color-brand-red)] text-white text-center font-bold uppercase tracking-widest py-4 hover:shadow-[0_0_20px_var(--color-brand-red)] hover:brightness-110 transition-all"
                                >
                                    Proceed to Checkout
                                </a>
                            </div>
                        ) : null}

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
