
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
            {/* Background Gradients using CSS via style prop for dynamic glow if needed, or pure Tailwind */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 z-0" />

            {/* Floating Hero Object */}
            <motion.div
                style={{ y, opacity }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px]"
            >
                <Image
                    src="/images/hero-sprocket.png"
                    alt="Precision Engineered Component"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                />
                {/* Breathing Animation Wrapper */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 2, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 6,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0"
                />
            </motion.div>

            {/* Foreground Copy - "One Powerful Line" */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-24 left-6 z-20 md:left-24"
            >
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight">
                    Precision <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
                        Redefined.
                    </span>
                </h1>
                <p className="mt-6 text-sm md:text-base text-neutral-400 max-w-sm tracking-widest uppercase border-l-2 border-white/20 pl-4">
                    Beyond Components. <br /> The Architecture of Speed.
                </p>
            </motion.div>
        </section>
    );
}
