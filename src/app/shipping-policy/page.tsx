'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ShippingPolicyPage() {
    return (
        <main className="min-h-screen bg-neutral-950 pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                        Shipping Policy
                    </h1>
                    <div className="space-y-4 mb-12 text-sm text-neutral-400">
                        <p>Website: https://www.shadowlineracetech.com</p>
                        <p>Operated by: Zealics Technologies Private Limited</p>
                    </div>

                    <div className="space-y-12 text-neutral-300">
                        {/* 1. Order Processing */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">1. Order Processing</h2>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>All orders are processed within 10 working days after payment confirmation.</li>
                                <li>Processing time excludes weekends and public holidays.</li>
                                <li>You will receive a confirmation email once your order has been shipped, along with tracking details.</li>
                            </ul>
                        </section>

                        {/* 2. Shipping Methods */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">2. Shipping Methods</h2>
                            <p className="mb-4">We use trusted courier partners across India for safe and timely deliveries.</p>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>Standard delivery times are typically 3–7 working days after dispatch.</li>
                                <li>Shipping charges (if applicable) will be displayed at checkout.</li>
                                <li>Delays due to courier issues, weather, or unforeseen circumstances are beyond our control.</li>
                            </ul>
                        </section>

                        {/* 3. Address Accuracy */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">3. Address Accuracy</h2>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>Please ensure your shipping address and contact details are accurate.</li>
                                <li>We are not responsible for delays or non-delivery caused by incorrect or incomplete address details.</li>
                            </ul>
                        </section>

                        {/* 4. Damage During Transit */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">4. Damage During Transit</h2>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>If you receive a damaged product, contact us within 24 hours of delivery with clear photos of the damaged item and packaging.</li>
                                <li>We will review and resolve the issue promptly.</li>
                            </ul>
                        </section>

                        {/* 5. International Shipping */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">5. International Shipping</h2>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>Currently, we ship only within India.</li>
                                <li>For international orders or special requests, please contact us at <a href="mailto:sales@shadowlineracetech.com" className="text-[var(--color-brand-red)] hover:underline">sales@shadowlineracetech.com</a>.</li>
                            </ul>
                        </section>

                        {/* Contact for Shipping Inquiries */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">Contact for Shipping Inquiries</h2>

                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">

                                <p className="flex items-center gap-3 text-neutral-400">
                                    <span className="text-xl">📧</span>
                                    <a href="mailto:sales@shadowlineracetech.com" className="hover:text-white transition-colors">sales@shadowlineracetech.com</a>
                                </p>
                                <p className="font-bold text-white mt-4">Zealics Technologies Pvt. Ltd.</p>
                                <p className="flex items-start gap-3 text-neutral-400">
                                    <span className="text-xl">📍</span>
                                    <span>59/1, 6th Cross, 2nd Main, Nanajappa Layout, Vidyaranyapura, Bengaluru – 560097, Karnataka, India</span>
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
