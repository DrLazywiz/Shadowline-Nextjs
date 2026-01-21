
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X, Zap } from 'lucide-react';
import clsx from 'clsx';
import { useCart } from '@/components/cart/CartContext';

const navLinks = [
    { name: 'Shop by Bike', href: '/shop' },
    { name: 'Shop by Parts', href: '/parts' },
    { name: 'Performance Series', href: '/series' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false); // Added searchOpen state
    const { openCart, cart } = useCart();
    const router = useRouter(); // Added router instance

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const term = formData.get('q') as string;
        if (term) {
            router.push(`/shop?q=${encodeURIComponent(term)}`);
            setSearchOpen(false);
        }
    };

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={clsx(
                    'fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between px-6 transition-all duration-500 lg:px-12',
                    isScrolled
                        ? 'bg-black/90 backdrop-blur-md border-b border-white/10'
                        : 'bg-transparent'
                )}
            >
                {/* Left: Hamburger Menu */}
                <button
                    className="text-white hover:text-neutral-400 transition-colors z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Center: Logo */}
                <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 group">
                    {/* Mobile: Emblem Only */}
                    <div className="relative w-10 h-10 md:hidden">
                        <Image
                            src="/images/SL-Emblem.png"
                            alt="Shadowline"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Desktop: Text Logo */}
                    <div className="relative hidden md:block w-40 h-10">
                        <Image
                            src="/images/logo.png"
                            alt="Shadowline"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Right: Icons (Search, Account, Cart) */}
                <div className="flex items-center gap-4 md:gap-6 z-50">
                    <button
                        onClick={() => setSearchOpen(true)} // Modified search button to open overlay
                        className="text-white hover:text-neutral-400 transition-colors"
                    >
                        <Search size={20} strokeWidth={1.5} />
                    </button>

                    <Link href="/login" className="relative text-white hover:text-neutral-400 transition-colors">
                        {/* Custom "User with Bolt" aesthetic from reference */}
                        <div className="relative">
                            <User size={20} strokeWidth={1.5} />
                            <div className="absolute -bottom-1 -right-1 text-[var(--color-brand-red)] drop-shadow-[0_0_5px_rgba(234,0,0,0.8)]">
                                <Zap size={10} fill="currentColor" />
                            </div>
                        </div>
                    </Link>

                    <button onClick={openCart} className="text-white hover:text-neutral-400 transition-colors relative">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        {cart?.totalQuantity ? (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-[var(--color-brand-red)] text-white text-[8px] font-bold border border-black shadow-[0_0_5px_var(--color-brand-red)]">
                                {cart.totalQuantity}
                            </span>
                        ) : null}
                    </button>
                </div>
            </motion.nav>

            {/* Fullscreen Menu Overlay (Now used for Desktop too since hamburger is main nav) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
                    >
                        <div className="flex flex-col items-center gap-8 text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-3xl md:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500 hover:to-white uppercase transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />

                            <Link
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-xl font-mono tracking-widest text-neutral-400 uppercase hover:text-white"
                            >
                                Identify / Login
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-start justify-center pt-32 px-6"
                    >
                        <button
                            onClick={() => setSearchOpen(false)}
                            className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <div className="w-full max-w-2xl">
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-500 w-8 h-8" />
                                <input
                                    type="text"
                                    name="q"
                                    placeholder="SEARCH PROTOCOL..."
                                    autoFocus
                                    className="w-full bg-transparent border-b-2 border-white/20 py-4 pl-12 pr-4 text-3xl font-black uppercase text-white placeholder:text-neutral-700 outline-none focus:border-[var(--color-brand-red)] transition-colors"
                                />
                            </form>
                            <p className="mt-4 text-neutral-600 font-mono text-xs uppercase tracking-widest">
                                Press Enter to execute search
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// Helper removed as we inlined icons for specific customization
