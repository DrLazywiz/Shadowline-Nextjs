'use client';

import Image from 'next/image';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        id: 'nandan',
        name: 'Nandan Das',
        role: 'Racer',
        image: '/images/riders/nandan.png',
        quote: "After using this sprocket, I achieved second place for the very first time! The performance and consistency it delivered gave me the edge I needed to reach this milestone. It's a product that truly makes a difference on the track."
    },
    {
        id: 'jinan',
        name: 'Jinan C.D.',
        role: 'Pro Rider',
        image: '/images/riders/jinan.jpg',
        quote: "I am very happy to have an international-quality product now available in India. I have used the Sprocket on my bike, and it has performed really well. It's reassuring to see such high standards being delivered locally."
    },
    {
        id: 'jinendra',
        name: 'Jinendra Sangave',
        role: 'Championship Winner',
        image: '/images/riders/jinendra.png',
        quote: "In 2025, upgrading to the Shadowline Sprocket was a game-changer for my bike. It played a vital role in helping me secure the championship title. The precision and performance it delivered gave me the confidence to push harder and achieve my goal."
    }
];

export function Testimonials() {
    return (
        <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
                        What Riders Say
                    </h2>
                    <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
                        Track Proven Results
                    </p>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:grid md:grid-cols-3 md:gap-6 md:pb-0 md:mx-0 md:px-0 no-scrollbar">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="w-[85vw] md:w-full flex-shrink-0 snap-center relative group h-[400px] overflow-hidden"
                        >
                            {/* Background Image */}
                            <Image
                                src={t.image}
                                alt={t.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />

                            {/* Red Corner Accent */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-brand-red)] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-3xl" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end relative z-10">
                                <Quote className="text-[var(--color-brand-red)]/30 mb-4 w-10 h-10" />

                                <blockquote className="text-sm md:text-base text-white font-medium leading-relaxed mb-6 italic line-clamp-4 group-hover:line-clamp-none transition-all">
                                    "{t.quote}"
                                </blockquote>

                                <div className="border-t border-white/10 pt-4">
                                    <cite className="text-white text-lg font-black uppercase tracking-tight not-italic block">
                                        {t.name}
                                    </cite>
                                    <span className="text-xs text-[var(--color-brand-red)] font-mono uppercase tracking-widest">
                                        {t.role}
                                    </span>
                                </div>
                            </div>

                            {/* Hover Border */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-[var(--color-brand-red)]/50 transition-colors duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
