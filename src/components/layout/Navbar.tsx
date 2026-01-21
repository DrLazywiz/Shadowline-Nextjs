
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X, Zap, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { useCart } from '@/components/cart/CartContext';

const navLinks = [
    {
        name: 'Shop by Bike',
        href: '/shop',
        dropdown: [
            {
                category: 'KTM',
                items: [
                    { name: 'KTM SX 85 Parts', href: '/shop?q=KTM SX 85' },
                    { name: 'KTM SX 250 Parts', href: '/shop?q=KTM SX 250' },
                ]
            },
            {
                category: 'GASGAS',
                items: [
                    { name: 'GasGas 85 Parts', href: '/shop?q=GASGAS 85' },
                    { name: 'GasGas 250 Parts', href: '/shop?q=GASGAS 250' },
                ]
            },
            {
                category: 'HERO',
                items: [
                    { name: 'Hero XPulse 200 4V Parts', href: '/shop?q=XPULSE' },
                ]
            }
        ]
    },
    {
        name: 'Shop by Parts',
        href: '/parts',
        dropdown: [
            {
                category: 'DRIVETRAIN',
                items: [
                    { name: 'Sprockets', href: '/shop?q=sprocket' },
                    { name: 'Chains', href: '/shop?q=chain' },
                ]
            },
            {
                category: 'SUSPENSION',
                items: [
                    { name: 'Forks', href: '/shop?q=fork' },
                    { name: 'Shocks', href: '/shop?q=shock' },
                ]
            }
        ]
    },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { openCart, cart } = useCart();
    const router = useRouter();

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
                className={clsx(
                    'fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between px-6 transition-all duration-500 lg:px-12',
                    isScrolled
                        ? 'bg-black/90 backdrop-blur-md border-b border-white/10'
                        : 'bg-transparent'
                )}
            >
                {/* LEFT SECTION */}
                <div className="flex items-center gap-8">
                    {/* Mobile: Hamburger */}
                    <button
                        className="text-white hover:text-neutral-400 transition-colors md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop: Logo */}
                    <Link href="/" className="hidden md:block group">
                        <div className="relative w-40 h-10">
                            <Image
                                src="/images/logo.png"
                                alt="Shadowline"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* MIDDLE SECTION */}
                {/* Mobile: Emblem Logo (Centered) */}
                <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden group">
                    <div className="relative w-10 h-10">
                        <Image
                            src="/images/SL-Emblem.png"
                            alt="Shadowline"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop: Menu Links (Centered) */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative group py-2" // Reduced vertical padding to bridge the gap
                            onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={link.href}
                                className="flex items-center gap-1 text-sm font-mono font-medium tracking-widest text-white hover:text-[var(--color-brand-red)] transition-colors"
                            >
                                {link.name}
                                {link.dropdown && <ChevronDown size={14} />}
                            </Link>

                            {/* Dropdown Menu */}
                            {link.dropdown && activeDropdown === link.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 mt-0 w-[600px] bg-neutral-900/95 backdrop-blur-xl border border-white/10 p-8 rounded-lg shadow-2xl z-50 transform -translate-x-1/4" // Adjusted positioning
                                >
                                    <div className="grid grid-cols-3 gap-8">
                                        {link.dropdown.map((section) => (
                                            <div key={section.category}>
                                                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-red)] mb-4">
                                                    {section.category}
                                                </h3>
                                                <ul className="space-y-3">
                                                    {section.items.map((item) => (
                                                        <li key={item.name}>
                                                            <Link
                                                                href={item.href}
                                                                className="text-sm text-neutral-300 hover:text-white transition-colors block font-normal"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {/* RIGHT SECTION: Icons */}
                <div className="flex items-center gap-4 md:gap-6">
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="text-white hover:text-neutral-400 transition-colors"
                    >
                        <Search size={20} strokeWidth={1.5} />
                    </button>

                    <Link href="/login" className="relative text-white hover:text-neutral-400 transition-colors">
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

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
                        />

                        {/* Side Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-[70] w-[85vw] max-w-sm bg-neutral-950 border-r border-white/10 shadow-2xl flex flex-col md:hidden overflow-y-auto"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <span className="text-xl font-black italic tracking-tighter text-white">MENU</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-neutral-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Drawer Content */}
                            <div className="flex-1 py-4">
                                {/* HOME Link */}
                                <Link
                                    href="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-6 py-4 text-sm font-mono font-medium tracking-widest text-[var(--color-brand-red)] uppercase hover:bg-white/5 transition-colors"
                                >
                                    Home
                                </Link>

                                {/* Dynamic Nav Links */}
                                {navLinks.map((link) => (
                                    <div key={link.name} className="border-b border-white/5 last:border-0">
                                        {link.dropdown ? (
                                            <div>
                                                <button
                                                    onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                                                    className={clsx(
                                                        "w-full flex items-center justify-between px-6 py-4 text-sm font-mono font-medium tracking-widest uppercase transition-colors",
                                                        activeDropdown === link.name ? "text-[var(--color-brand-red)] bg-white/5" : "text-white hover:bg-white/5"
                                                    )}
                                                >
                                                    {link.name}
                                                    <ChevronDown
                                                        size={16}
                                                        className={clsx(
                                                            "transition-transform duration-200",
                                                            activeDropdown === link.name ? "rotate-180" : ""
                                                        )}
                                                    />
                                                </button>

                                                <AnimatePresence>
                                                    {activeDropdown === link.name && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="overflow-hidden bg-neutral-900/50"
                                                        >
                                                            <div className="px-6 py-2 space-y-4 pb-6">
                                                                {link.dropdown.map((section) => (
                                                                    <div key={section.category} className="pl-4 border-l border-white/10">
                                                                        <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">
                                                                            {section.category}
                                                                        </h4>
                                                                        <div className="flex flex-col gap-3">
                                                                            {section.items.map((item) => (
                                                                                <Link
                                                                                    key={item.name}
                                                                                    href={item.href}
                                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                                    className="text-sm font-mono text-neutral-300 hover:text-white transition-colors"
                                                                                >
                                                                                    {item.name}
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-6 py-4 text-sm font-mono font-medium tracking-widest text-white uppercase hover:bg-white/5 transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Drawer Footer */}
                            <div className="p-6 border-t border-white/10 bg-neutral-900/50">
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 text-sm font-mono font-medium tracking-widest text-[var(--color-brand-red)] uppercase hover:text-red-400 transition-colors"
                                >
                                    <User size={18} />
                                    Account
                                </Link>
                            </div>
                        </motion.div>
                    </>
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
