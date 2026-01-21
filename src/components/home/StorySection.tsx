
'use client';

import { motion } from 'framer-motion';
import { Settings, Wind, Layers } from 'lucide-react';

export function StorySection() {
    return (
        <div className="relative bg-black text-white">
            {/* Scene 1: Macro Detail */}
            <Section
                title="Macro Precision"
                subtitle="Every Micron Counted"
                icon={Settings}
                align="right"
            >
                <div className="relative w-full h-96 bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 group">
                    {/* Placeholder for macro shot - using a gradient/abstract for now */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-800 to-black opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-zinc-700 font-mono text-xs tracking-[0.3em]">IMAGE: MACRO DETAIL</span>
                    </div>
                </div>
            </Section>

            {/* Scene 2: Motion */}
            <Section
                title="Fluid Dynamics"
                subtitle="Engineered for Air"
                icon={Wind}
                align="left"
            >
                <div className="relative w-full h-96 bg-neutral-900 rounded-3xl overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,_var(--tw-gradient-stops))] from-black to-zinc-900" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-zinc-700 font-mono text-xs tracking-[0.3em]">IMAGE: WIND TUNNEL / MOTION</span>
                    </div>
                </div>
            </Section>

            {/* Scene 3: Ecosystem */}
            <Section
                title="The Ecosystem"
                subtitle="Complete System Integration"
                icon={Layers}
                align="center"
            >
                <div className="grid grid-cols-3 gap-4 w-full h-80">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-neutral-900/50 rounded-xl border border-white/5 flex items-center justify-center hover:bg-neutral-800 transition-colors">
                            <span className="text-zinc-700 font-mono text-xs">PART 0{i}</span>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}

function Section({ children, title, subtitle, icon: Icon, align = 'left' }: any) {
    const isRight = align === 'right';
    const isCenter = align === 'center';

    return (
        <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1 }}
            className="min-h-screen container mx-auto px-6 py-24 flex flex-col justify-center"
        >
            <div className={`flex flex-col gap-12 ${isRight ? 'lg:flex-row-reverse' : isCenter ? 'lg:flex-col items-center text-center' : 'lg:flex-row'} items-center`}>
                {/* Text Content */}
                <div className={`flex-1 space-y-6 ${isCenter ? 'max-w-2xl' : ''}`}>
                    <div className="flex items-center gap-4 text-brand-charcoal">
                        {Icon && <Icon className="text-white/50" size={32} />}
                        <span className="h-[1px] w-12 bg-white/20"></span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white">
                        {title}
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
                        {subtitle}
                    </p>
                </div>

                {/* Visual Content */}
                <div className="flex-1 w-full">
                    {children}
                </div>
            </div>
        </motion.section>
    );
}
