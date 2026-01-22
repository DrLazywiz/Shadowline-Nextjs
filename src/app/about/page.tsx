'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowDown, Zap, Shield, Trophy, Target } from 'lucide-react';

function FadeInWhenVisible({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div ref={containerRef} className="bg-black text-white selection:bg-[var(--color-brand-red)] selection:text-white overflow-hidden">

            {/* HERO SECTION */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand-red)_0%,_transparent_70%)] opacity-10 animate-pulse" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-800/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-brand-red)]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                </div>

                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="relative z-10 text-center px-6"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-64 md:w-80 h-32 mx-auto mb-12"
                    >
                        <Image
                            src="/images/logo.png"
                            alt="Shadowline Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-4 mix-blend-overlay">
                            We Build <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">Legacies</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-lg md:text-xl font-mono text-neutral-400 max-w-2xl mx-auto uppercase tracking-widest"
                    >
                        Engineered for Speed. Built for Eternity.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce text-neutral-500"
                >
                    <ArrowDown size={24} />
                </motion.div>
            </section>

            {/* MISSION SECTION */}
            <section className="relative py-32 md:py-48 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <FadeInWhenVisible>
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                                    Titanium & <br />
                                    <span className="text-[var(--color-brand-red)]">Carbon Fiber</span>
                                </h2>
                            </FadeInWhenVisible>
                            <FadeInWhenVisible delay={0.2}>
                                <div className="space-y-6 text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
                                    <p>
                                        We build legacies. With a focus on <strong className="text-white font-bold">titanium</strong> and <strong className="text-white font-bold">carbon fiber</strong>, we craft high-performance components for the automotive, motorcycle, and aviation industries.
                                    </p>
                                    <p>
                                        Designed in Europe and built to last a lifetime, every product reflects uncompromising standards of speed, strength, and innovation.
                                    </p>
                                    <p className="text-white font-medium pl-6 border-l-2 border-[var(--color-brand-red)]">
                                        Whether on the track or in the skies, Shadowline delivers extreme durability and trusted performance.
                                    </p>
                                </div>
                            </FadeInWhenVisible>
                        </div>
                        <div className="relative">
                            <motion.div
                                style={{ rotate: 12 }}
                                className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand-red)]/20 to-transparent blur-3xl"
                            />
                            <div className="relative z-10 grid grid-cols-2 gap-4">
                                <FadeInWhenVisible delay={0.3}>
                                    <div className="aspect-[4/5] bg-neutral-900 border border-white/5 rounded-lg overflow-hidden relative group">
                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
                                        <div className="absolute bottom-4 left-4">
                                            <p className="font-mono text-xs font-bold text-white uppercase tracking-widest">Aviation Grade</p>
                                        </div>
                                    </div>
                                </FadeInWhenVisible>
                                <FadeInWhenVisible delay={0.5}>
                                    <div className="aspect-[4/5] bg-neutral-900 border border-white/5 rounded-lg overflow-hidden relative group mt-12">
                                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
                                        <div className="absolute bottom-4 left-4">
                                            <p className="font-mono text-xs font-bold text-white uppercase tracking-widest">Precision Milled</p>
                                        </div>
                                    </div>
                                </FadeInWhenVisible>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOUNDER SECTION */}
            <section className="relative py-32 bg-neutral-900 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <FadeInWhenVisible>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">The Architect of Speed</h2>
                            <div className="h-1 w-20 bg-[var(--color-brand-red)] mx-auto" />
                        </FadeInWhenVisible>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-5 relative">
                            <FadeInWhenVisible>
                                <div className="aspect-[3/4] relative rounded-lg overflow-hidden border-2 border-white/5 shadow-2xl">
                                    <div className="absolute inset-0 bg-neutral-800">
                                        <Image
                                            src="/images/riders/nandan.png"
                                            alt="Nandas Das - Founder & Rider"
                                            fill
                                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    {/* Overlay contents */}
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-8">
                                        <h3 className="text-3xl font-black uppercase italic text-white leading-none">Nandas Das</h3>
                                        <p className="text-[var(--color-brand-red)] font-bold uppercase tracking-widest text-sm mt-2">Founder & Rider</p>
                                    </div>
                                </div>
                            </FadeInWhenVisible>
                        </div>
                        <div className="md:col-span-7 space-y-8">
                            <FadeInWhenVisible delay={0.2}>
                                <h3 className="text-2xl md:text-3xl font-bold uppercase leading-tight">
                                    "I didn't just want to build parts. <br />
                                    I wanted to build <span className="text-neutral-400">trust at 200mph.</span>"
                                </h3>
                            </FadeInWhenVisible>
                            <FadeInWhenVisible delay={0.3}>
                                <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
                                    <p>
                                        Shadowline wasn't born in a boardroom. It was born on the tarmac, forged in the heat of competition, and refined by the relentless pursuit of perfection.
                                    </p>
                                    <p>
                                        As a rider myself, I understand that at the limit, your equipment is your lifeline. That's why we don't cut corners. We use aerospace-grade titanium and the finest carbon fiber weaves, engineered not just to look good, but to outperform everything else on the grid.
                                    </p>
                                    <p>
                                        This is more than a brand. It's my promise to every rider, driver, and pilot who demands the best.
                                    </p>
                                </div>
                            </FadeInWhenVisible>

                            <FadeInWhenVisible delay={0.4}>
                                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                                    <div>
                                        <div className="text-3xl font-black text-white mb-1">15+</div>
                                        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Years Riding</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-white mb-1">Eur</div>
                                        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Design Roots</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-white mb-1">∞</div>
                                        <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Passion</div>
                                    </div>
                                </div>
                            </FadeInWhenVisible>
                        </div>
                    </div>
                </div>
            </section>

            {/* ENGINEERING / PHILOSOPHY */}
            <section className="py-32 container mx-auto px-6">
                <FadeInWhenVisible>
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter max-w-2xl">
                            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600">The Future</span>
                        </h2>
                        <p className="text-right font-mono text-neutral-500 max-w-sm ml-auto">
                            SYSTEM_STATUS: OPTIMIZED<br />
                            MATERIAL_GRADE: AEROSPACE_V1
                        </p>
                    </div>
                </FadeInWhenVisible>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Shield size={32} />}
                        title="Uncompromising Safety"
                        desc="Every component undergoes rigorous stress testing to ensure it survives the most extreme conditions known to man and machine."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={<Zap size={32} />}
                        title="Extreme Performance"
                        desc="Lightweight titanium and carbon fiber reduce mass where it counts, unlocking acceleration and agility you can feel."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={<Target size={32} />}
                        title="Precision Engineering"
                        desc="CNC machined to micrometer tolerances. We believe that perfection is not a goal, but a baseline requirement."
                        delay={0.3}
                    />
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="py-20 border-t border-white/10">
                <div className="container mx-auto px-6 text-center">
                    <FadeInWhenVisible>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 max-w-3xl mx-auto">
                            Ready to Upgrade Your Machine?
                        </h2>
                        <a
                            href="/shop"
                            className="inline-flex items-center gap-3 bg-white text-black font-black uppercase tracking-widest py-4 px-10 rounded-full hover:bg-[var(--color-brand-red)] hover:text-white transition-all transform hover:scale-105"
                        >
                            Explore Components <ArrowDown className="-rotate-90" size={20} />
                        </a>
                    </FadeInWhenVisible>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
    return (
        <FadeInWhenVisible delay={delay}>
            <div className="p-8 border border-white/10 rounded-2xl bg-neutral-900/30 hover:bg-neutral-900/60 hover:border-[var(--color-brand-red)]/50 transition-all group h-full">
                <div className="mb-6 p-4 bg-black rounded-xl w-fit text-[var(--color-brand-red)] group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-white group-hover:text-[var(--color-brand-red)] transition-colors">{title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                    {desc}
                </p>
            </div>
        </FadeInWhenVisible>
    );
}

function UserIconPlaceholder() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-white/50">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
