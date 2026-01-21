'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock success
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
    };

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Left Column: Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-12">
                        <div className="relative w-64 h-16 mb-8">
                            <Image
                                src="/images/logo.png"
                                alt="Shadowline"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                            Get In Touch
                        </h1>
                        <div className="w-24 h-1 bg-[var(--color-brand-red)] mb-8" />
                    </div>

                    <div className="space-y-8 font-mono">
                        {/* Address */}
                        <div className="flex items-start gap-4 group">
                            <div className="p-3 bg-white/5 rounded-lg text-[var(--color-brand-red)] group-hover:bg-[var(--color-brand-red)] group-hover:text-white transition-colors">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Location</h3>
                                <p className="text-neutral-300 leading-relaxed max-w-sm">
                                    59/1, 6th Cross, 2nd Main,<br />
                                    Nanajappa Layout, Vidyaranyapura,<br />
                                    Bengaluru – 560097, Karnataka, India
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-4 group">
                            <div className="p-3 bg-white/5 rounded-lg text-[var(--color-brand-red)] group-hover:bg-[var(--color-brand-red)] group-hover:text-white transition-colors">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Email</h3>
                                <a href="mailto:sales@shadowlineracetech.com" className="text-white hover:text-[var(--color-brand-red)] transition-colors text-lg">
                                    sales@shadowlineracetech.com
                                </a>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-4 group">
                            <div className="p-3 bg-white/5 rounded-lg text-[var(--color-brand-red)] group-hover:bg-[var(--color-brand-red)] group-hover:text-white transition-colors">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Phone</h3>
                                <a href="tel:+916362512608" className="text-white hover:text-[var(--color-brand-red)] transition-colors text-lg">
                                    +91 6362 512 608
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-neutral-900/30 border border-white/10 p-8 md:p-12 rounded-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-red)]/5 blur-3xl rounded-full pointer-events-none" />

                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
                        Send Transmission <Send size={20} className="text-[var(--color-brand-red)]" />
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                                Codename / Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-[var(--color-brand-red)] outline-none transition-colors placeholder:text-neutral-700 font-mono"
                                placeholder="ENTER NAME"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                                Communication Channel (Email)
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-[var(--color-brand-red)] outline-none transition-colors placeholder:text-neutral-700 font-mono"
                                placeholder="ENTER EMAIL"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                                Mission Details (Message)
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-[var(--color-brand-red)] outline-none transition-colors placeholder:text-neutral-700 font-mono resize-none"
                                placeholder="ENTER MESSAGE TRANSMISSION..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full bg-[var(--color-brand-red)] text-white font-bold font-mono uppercase tracking-widest py-4 rounded-lg hover:shadow-[0_0_20px_var(--color-brand-red)] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === 'submitting' ? (
                                'Transmitting...'
                            ) : (
                                <>Initiate Contact <Send size={16} /></>
                            )}
                        </button>

                        {/* Status Messages */}
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-500"
                            >
                                <CheckCircle size={20} />
                                <span className="text-sm font-mono font-bold uppercase">Transmission Received Successfully.</span>
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
