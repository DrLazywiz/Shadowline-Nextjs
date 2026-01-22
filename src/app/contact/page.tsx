'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-center md:text-left">
                        Get In Touch
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Contact Info */}
                        <div className="space-y-12">
                            <div className="space-y-8">
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-neutral-900 rounded-lg group-hover:bg-[var(--color-brand-red)] transition-colors">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold uppercase tracking-wide text-neutral-400 text-sm">Visit Us</h3>
                                        <p className="text-lg leading-relaxed text-neutral-200">
                                            59/1, 6th Cross, 2nd Main,<br />
                                            Nanajappa Layout, Vidyaranyapura,<br />
                                            Bengaluru – 560097,<br />
                                            Karnataka, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-neutral-900 rounded-lg group-hover:bg-[var(--color-brand-red)] transition-colors">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold uppercase tracking-wide text-neutral-400 text-sm">Email Us</h3>
                                        <a href="mailto:sales@shadowlineracetech.com" className="text-lg text-neutral-200 hover:text-white transition-colors">
                                            sales@shadowlineracetech.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-neutral-900 rounded-lg group-hover:bg-[var(--color-brand-red)] transition-colors">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold uppercase tracking-wide text-neutral-400 text-sm">Call Us</h3>
                                        <a href="tel:+916362512608" className="text-lg text-neutral-200 hover:text-white transition-colors font-mono">
                                            +91 6362 512 608
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--color-brand-red)] transition-colors"
                                        placeholder="JOHN DOE"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--color-brand-red)] transition-colors"
                                        placeholder="JOHN@EXAMPLE.COM"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--color-brand-red)] transition-colors resize-none"
                                        placeholder="HOW CAN WE HELP?"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-lg hover:bg-[var(--color-brand-red)] hover:text-white transition-all flex items-center justify-center gap-2 group"
                                >
                                    Send Message
                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
