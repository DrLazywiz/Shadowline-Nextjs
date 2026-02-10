'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TermsAndConditionsPage() {
    return (
        <main className="min-h-screen bg-neutral-950 pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                        Terms and Conditions
                    </h1>
                    <div className="space-y-4 mb-12 text-sm text-neutral-400">
                        <p>Effective Date: 09.11.2025</p>
                        <p>Website: https://www.shadowlineracetech.com</p>
                        <p>Owned and Operated by: Zealics Technologies Private Limited</p>
                        <p>Registered Address: 59/1, 6th Cross, 2nd Main, Nanajappa Layout, Vidyaranyapura, Bengaluru – 560097, Karnataka, India</p>
                    </div>

                    <div className="space-y-12 text-neutral-300">
                        {/* 1. Introduction */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">1. Introduction</h2>
                            <p className="leading-relaxed">
                                Welcome to ShadowlineRaceTech.com, an online store owned and operated by Zealics Technologies Pvt. Ltd. (“we”, “our”, “us”). By accessing or purchasing from our website, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before making any purchase.
                            </p>
                        </section>

                        {/* 2. Products */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">2. Products</h2>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>We specialize in racing and performance parts intended primarily for motorsport and off-road applications.</li>
                                <li>All products are designed for performance enhancement and may not comply with public road regulations. The buyer is responsible for ensuring compliance with local laws before installation or use.</li>
                            </ul>
                        </section>

                        {/* 3. Orders and Payments */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">3. Orders and Payments</h2>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>All prices displayed on the website are in Indian Rupees (INR).</li>
                                <li>Prices are subject to change without prior notice.</li>
                                <li>Orders are confirmed only upon successful payment.</li>
                                <li>We reserve the right to cancel any order due to pricing errors, stock issues, or other unforeseen reasons.</li>
                            </ul>
                        </section>

                        {/* 4. Shipping and Delivery */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">4. Shipping and Delivery</h2>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>Orders will be dispatched within 10 working days of successful payment, subject to product availability.</li>
                                <li>Delivery timelines depend on the courier or shipping partner.</li>
                                <li>Any delay caused by courier companies or unforeseen circumstances is beyond our control.</li>
                            </ul>
                        </section>

                        {/* 5. Returns and Refunds */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">5. Returns and Refunds</h2>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>Returns are accepted only for manufacturing defects.</li>
                                <li>The product must be returned in its original packaging with proof of purchase.</li>
                                <li>Once we receive and inspect the returned product, refunds will be processed within 3 working days.</li>
                                <li>Shipping charges are non-refundable.</li>
                                <li>Products damaged due to misuse, improper installation, or wear and tear are not eligible for return or refund.</li>
                            </ul>
                        </section>

                        {/* 6. Warranty Policy */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">6. Warranty Policy</h2>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>All products carry a 7-day warranty from the date of delivery, covering manufacturing defects only.</li>
                                <li>Parts subject to wear and tear (e.g., brake pads, chains, sprockets, seals, bearings, etc.) are not covered under warranty.</li>
                                <li>Any modification, tampering, or improper installation will void the warranty.</li>
                            </ul>
                        </section>

                        {/* 7. Limitation of Liability */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">7. Limitation of Liability</h2>
                            <div className="space-y-2 leading-relaxed">
                                <p>
                                    Zealics Technologies Pvt. Ltd. shall not be liable for any indirect, incidental, or consequential damages, including but not limited to loss of performance, damage to vehicle components, or personal injury resulting from use or misuse of products.
                                </p>
                                <p>
                                    Installation and usage are at the buyer’s discretion and risk.
                                </p>
                            </div>
                        </section>

                        {/* 8. Intellectual Property */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">8. Intellectual Property</h2>
                            <p className="leading-relaxed">
                                All content, designs, logos, images, and materials on ShadowlineRaceTech.com are the intellectual property of Zealics Technologies Pvt. Ltd. and are protected by copyright and trademark laws. Unauthorized use or reproduction is strictly prohibited.
                            </p>
                        </section>

                        {/* 9. Governing Law and Jurisdiction */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">9. Governing Law and Jurisdiction</h2>
                            <p className="leading-relaxed">
                                All disputes arising from or relating to transactions made through ShadowlineRaceTech.com shall be governed by the laws of India and subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.
                            </p>
                        </section>

                        {/* 10. Contact Information */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">10. Contact Information</h2>
                            <p className="leading-relaxed mb-4">
                                For support, warranty claims, or product inquiries, contact us at:
                            </p>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                                <p className="flex items-center gap-3 text-neutral-400">
                                    <span className="text-xl">📧</span>
                                    <a href="mailto:sales@shadowlineracetech.com" className="hover:text-white transition-colors">sales@shadowlineracetech.com</a>
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
