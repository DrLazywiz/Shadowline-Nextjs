
import { ArrowUpRight, Box, Cpu, Settings } from 'lucide-react';
import Link from 'next/link';

const categories = [
    { name: 'Chassis', href: '/shop?type=Chassis', icon: Box, description: 'Frames & Structural' },
    { name: 'Engine', href: '/shop?type=Engine', icon: Settings, description: 'Powerplant Components' },
    { name: 'Electronics', href: '/shop?type=Electronics', icon: Cpu, description: 'Control Systems' },
];

export function CategoryGrid() {
    return (
        <section className="py-24 bg-neutral-950 border-t border-white/5 mx-auto">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
                        System Architecture
                    </h2>
                    <div className="w-24 h-1 bg-white mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat, idx) => (
                        <Link
                            key={cat.name}
                            href={cat.href}
                            className="group relative h-64 bg-black border border-white/10 p-8 flex flex-col justify-between overflow-hidden hover:border-white/40 transition-colors"
                        >
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex justify-between items-start">
                                <cat.icon className="text-white w-8 h-8 md:w-10 md:h-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" strokeWidth={1} />
                                <ArrowUpRight className="text-neutral-500 group-hover:text-white transition-colors" />
                            </div>

                            <div className="relative z-10">
                                <span className="text-[10px] font-mono text-neutral-500 uppercase">Module 0{idx + 1}</span>
                                <h3 className="text-2xl font-bold uppercase tracking-widest text-white mt-1 group-hover:translate-x-2 transition-transform duration-300">
                                    {cat.name}
                                </h3>
                                <p className="text-xs text-neutral-400 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                    {cat.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
