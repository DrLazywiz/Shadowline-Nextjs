'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

export function Footer() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Update mouse coordinates for the spotlight effect
    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <footer
            className="group relative w-full bg-neutral-950 pt-20 pb-12 overflow-hidden border-t border-white/10"
            onMouseMove={handleMouseMove}
        >
            <div className="container mx-auto px-6 relative z-20">
                {/* Top Bar: Links & Socials */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24 text-[10px] font-mono uppercase tracking-widest text-neutral-500">

                    {/* Copyright & Legal */}
                    <div className="flex flex-col gap-4">
                        <p className="text-white font-bold">&copy; 2026 Shadowline Industries.</p>
                        <div className="flex flex-wrap gap-6">
                            <Link href="#" className="hover:text-white transition-colors">Legal Notice</Link>
                            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                            <Link href="#" className="hover:text-white transition-colors">Compliance</Link>
                        </div>
                    </div>

                    {/* Socials & Settings */}
                    <div className="flex flex-col gap-4 md:items-end">
                        <p className="text-white font-bold">Connect</p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-[var(--color-brand-red)] transition-colors"><Linkedin size={16} /></Link>
                            <Link href="#" className="hover:text-[var(--color-brand-red)] transition-colors"><Instagram size={16} /></Link>
                            <Link href="#" className="hover:text-[var(--color-brand-red)] transition-colors"><Twitter size={16} /></Link>
                            <Link href="#" className="hover:text-[var(--color-brand-red)] transition-colors"><Youtube size={16} /></Link>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <span className="text-white cursor-pointer hover:underline">English</span>
                            <span className="cursor-pointer hover:text-white transition-colors">Français</span>
                        </div>
                    </div>
                </div>

                {/* Massive Animated Logo */}
                <div className="relative w-full h-[20vw] flex items-center justify-center select-none pointer-events-none">
                    {/* Background Layer (Dim) */}
                    <h1 className="absolute inset-0 flex items-center justify-center text-[18vw] leading-none font-black tracking-tighter text-neutral-900 z-0">
                        SHADOWLINE
                    </h1>

                    {/* Spotlight Layer (Revealed by Mask) */}
                    <motion.h1
                        className="absolute inset-0 flex items-center justify-center text-[18vw] leading-none font-black tracking-tighter text-neutral-800 z-10 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500"
                        style={{
                            maskImage: useMotionTemplate`radial-gradient(
                                300px circle at ${mouseX}px ${mouseY}px,
                                black 0%,
                                transparent 100%
                            )`,
                            WebkitMaskImage: useMotionTemplate`radial-gradient(
                                300px circle at ${mouseX}px ${mouseY}px,
                                black 0%,
                                transparent 100%
                            )`,
                        }}
                    >
                        SHADOWLINE
                    </motion.h1>

                    {/* Static Red Accent Layer (Optional, subtle glow) */}
                    <h1 className="absolute inset-0 flex items-center justify-center text-[18vw] leading-none font-black tracking-tighter text-[var(--color-brand-red)] opacity-5 blur-3xl z-[-1]">
                        SHADOWLINE
                    </h1>
                </div>
            </div>
        </footer>
    );
}
