'use client';

import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-center">
                        Get In Touch
                    </h1>

                    {/* Contact Form */}
                    <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm mb-12">
                        <form className="space-y-8">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-5 text-lg text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--color-brand-red)] transition-colors"
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
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-5 text-lg text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--color-brand-red)] transition-colors"
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
                                    rows={6}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-5 text-lg text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--color-brand-red)] transition-colors resize-none"
                                    placeholder="HOW CAN WE HELP?"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-black font-black uppercase tracking-widest py-5 text-lg rounded-lg hover:bg-[var(--color-brand-red)] hover:text-white transition-all flex items-center justify-center gap-3 group"
                            >
                                Send Message
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                    {/* Direct Contact Links */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                        <a
                            href="mailto:sales@shadowlineracetech.com"
                            className="flex items-center gap-4 text-neutral-400 hover:text-white transition-colors group"
                        >
                            <div className="p-4 bg-neutral-900 rounded-full group-hover:bg-[var(--color-brand-red)] transition-colors">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-lg font-mono">sales@shadowlineracetech.com</span>
                        </a>

                        <a
                            href="https://wa.me/916362512608"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 text-neutral-400 hover:text-white transition-colors group"
                        >
                            <div className="p-4 bg-neutral-900 rounded-full group-hover:bg-[#25D366] transition-colors">
                                <FaWhatsapp className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-lg font-mono">Chat on WhatsApp</span>
                        </a>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
