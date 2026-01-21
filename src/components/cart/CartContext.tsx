
'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Cart } from '@/lib/shopify';
import { createCartAction, addToCartAction, getCartAction, removeFromCartAction } from '@/app/actions';

type CartContextType = {
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    cart: Cart | undefined;
    addItem: (variantId: string) => Promise<void>;
    removeItem: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<Cart | undefined>(undefined);

    // Load cart from local storage on mount
    useEffect(() => {
        const initializeCart = async () => {
            const existingCartId = localStorage.getItem('shadowline_cart_id');
            if (existingCartId) {
                const fetchedCart = await getCartAction(existingCartId);
                if (fetchedCart) {
                    setCart(fetchedCart);
                    return;
                }
            }
        };
        initializeCart();
    }, []);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const addItem = async (variantId: string) => {
        let currentCartId = cart?.id;
        if (!currentCartId) {
            // Check if there is a local storage ID we missed or created
            const existingCartId = localStorage.getItem('shadowline_cart_id');
            if (existingCartId) {
                currentCartId = existingCartId;
            } else {
                const newCart = await createCartAction();
                currentCartId = newCart.id;
                localStorage.setItem('shadowline_cart_id', currentCartId);
            }
        }

        try {
            const updatedCart = await addToCartAction(currentCartId, [{ merchandiseId: variantId, quantity: 1 }]);
            setCart(updatedCart);
            openCart();
        } catch (e) {
            console.error("Failed to add to cart", e);
        }
    };

    const removeItem = async (lineId: string) => {
        if (!cart?.id) return;
        const updatedCart = await removeFromCartAction(cart.id, [lineId]);
        setCart(updatedCart);
    };

    const value = useMemo(() => ({
        isOpen,
        openCart,
        closeCart,
        cart,
        addItem,
        removeItem
    }), [isOpen, cart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
