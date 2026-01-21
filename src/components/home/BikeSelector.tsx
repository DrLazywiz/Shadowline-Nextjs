'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const bikes = [
    {
        id: 'ktm',
        name: 'KTM SX 85',
        brand: 'KTM',
        image: '/images/bike/ktm.png',
        link: '/shop?q=KTM',
        color: 'from-orange-500/20 to-orange-900/5',
        accent: 'group-hover:text-orange-500'
    },
    {
        id: 'gasgas',
        name: 'GASGAS 85',
        brand: 'GASGAS',
        image: '/images/bike/gasgas.png',
        link: '/shop?q=GASGAS',
        color: 'from-red-500/20 to-red-900/5',
        accent: 'group-hover:text-red-500'
    },
    {
        id: 'xpulse',
        name: 'XPULSE 200 4V',
        brand: 'HERO',
        image: '/images/bike/xpluse.png',
        link: '/shop?q=XPULSE',
        color: 'from-teal-500/20 to-teal-900/5',
        accent: 'group-hover:text-teal-500'
    },
];

export function BikeSelector() {
    return (
        <section className="py-24 bg-neutral-950 border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
                            Choose Your Weapon
                        </h2>
                        <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
                            Select Platform to Initialize Configuration
                        </p>
                    </div>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:grid md:grid-cols-3 md:gap-8 md:pb-0 md:mx-0 md:px-0 no-scrollbar">
                    {bikes.map((bike) => (
                        <Link
                            key={bike.id}
                            href={bike.link}
                            className="group relative h-[500px] w-[85vw] md:w-full flex-shrink-0 snap-center overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 transition-all duration-500 hover:border-white/30"
                        >
                            {/* Dynamic Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${bike.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            {/* Technical Grid Pattern */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

                            {/* Large Watermark Text (Behind Bike) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0">
                                <span className="text-[120px] md:text-[180px] font-black italic uppercase text-white/5 tracking-tighter leading-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:text-white/10">
                                    {bike.brand}
                                </span>
                            </div>

                            {/* Floating Bike Image */}
                            <div className="absolute inset-0 z-10 flex items-center justify-center p-8 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-4">
                                <div className="relative w-full h-full max-h-[300px] md:max-h-[350px]">
                                    <Image
                                        src={bike.image}
                                        alt={bike.name}
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>

                            {/* Foreground Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 z-20 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-between">
                                <div>
                                    <h3 className={`text-3xl font-black uppercase italic tracking-tighter text-white transition-colors duration-300 ${bike.accent}`}>
                                        {bike.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="h-1 w-12 bg-white/20 rounded-full overflow-hidden">
                                            <div className="h-full w-0 bg-white group-hover:w-full transition-all duration-500 ease-out" />
                                        </div>
                                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors">
                                            Initializing...
                                        </span>
                                    </div>
                                </div>

                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
