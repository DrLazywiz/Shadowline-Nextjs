'use client';

import { useCart } from '@/components/cart/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export function StickyCartBar() {
    const { cart, openCart } = useCart();
    const quantity = cart?.totalQuantity || 0;
    const subtotal = cart?.cost?.subtotalAmount;

    return (
        <AnimatePresence>
            {quantity > 0 && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-40 bg-black border-t border-white/10 p-4 md:hidden"
                >
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <ShoppingBag size={20} className="text-white" />
                                <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-white text-[8px] font-bold text-black">
                                    {quantity}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Total</span>
                                <span className="text-sm font-mono font-bold text-white">
                                    {subtotal ? new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: subtotal.currencyCode
                                    }).format(parseFloat(subtotal.amount)) : '—'}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={openCart}
                            className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-sm"
                        >
                            View Cart
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
