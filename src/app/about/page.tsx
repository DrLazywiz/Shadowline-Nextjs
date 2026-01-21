'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Parallax & Reveal Effects
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white selection:bg-[var(--color-brand-red)] selection:text-white">

            {/* HERO: Cinematic Logo Reveal */}
            <section className="h-screen relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
                    {/* Background Texture/Video could go here */}
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-20 w-full max-w-4xl px-6"
                >
                    <div className="relative w-full aspect-[4/1]">
                        <Image
                            src="/images/logo.png"
                            alt="Shadowline"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono">Mission Status</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-brand-red)] to-transparent" />
                </motion.div>
            </section>

            {/* MISSION: Text Reveal */}
            <section className="py-32 px-6 lg:px-24 max-w-7xl mx-auto relative z-10">
                <div className="space-y-16">
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: 100 }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]"
                        >
                            We <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600">Build Legacies.</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                        <div className="space-y-8">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-xl md:text-2xl font-light text-neutral-300 leading-relaxed"
                            >
                                With a focus on <strong className="text-white font-bold">titanium</strong> and <strong className="text-white font-bold">carbon fiber</strong>, we craft high-performance components for the automotive, motorcycle, and aviation industries.
                            </motion.p>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ delay: 0.4, duration: 0.8, ease: "circOut" }}
                                viewport={{ once: true }}
                                className="h-1 w-24 bg-[var(--color-brand-red)] origin-left"
                            />
                        </div>

                        <div className="space-y-8 text-neutral-400 font-mono text-sm md:text-base leading-relaxed">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                Designed in Europe and built to last a lifetime, every product reflects uncompromising standards of speed, strength, and innovation.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                Whether on the track or in the skies, Shadowline delivers extreme durability and trusted performance.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOUNDER: Nandan Das */}
            <section className="py-32 bg-neutral-900/20 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-red)]/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-white/10">
                                <Image
                                    src="/images/riders/nandan.png"
                                    alt="Nandan Das - Founder"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                <div className="absolute bottom-8 left-8">
                                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Nandan Das</h3>
                                    <p className="text-[var(--color-brand-red)] font-mono text-sm uppercase tracking-widest mt-2">Founder & Lead Engineer</p>
                                </div>
                            </div>

                            {/* Angle Decoration */}
                            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[var(--color-brand-red)]" />
                            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[var(--color-brand-red)]" />
                        </motion.div>

                        {/* Content */}
                        <div className="space-y-8">
                            <motion.h2
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-black uppercase tracking-tighter"
                            >
                                The Architect of <br />
                                <span className="text-neutral-500">Adrenaline.</span>
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="prose prose-invert prose-lg text-neutral-400 font-light"
                            >
                                <p>
                                    Driven by an obsession with mechanical perfection, Nandan Das founded Shadowline to bridge the gap between aerospace engineering and high-performance motorsport.
                                </p>
                                <p>
                                    His vision was simple: to create components that don't just withstand extreme forces, but harness them. Today, Shadowline represents the pinnacle of material science and functional design.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="pt-8"
                            >
                                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                    <div>
                                        <div className="text-3xl font-black text-white">12+</div>
                                        <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mt-1">Years R&D</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-white">Global</div>
                                        <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mt-1">Operations</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
