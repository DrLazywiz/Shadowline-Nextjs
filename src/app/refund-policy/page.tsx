'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen bg-neutral-950 pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                        Refund and Return Policy
                    </h1>
                    <div className="space-y-4 mb-12 text-sm text-neutral-400">
                        <p>Website: https://www.shadowlineracetech.com</p>
                        <p>Operated by: Zealics Technologies Private Limited</p>
                    </div>

                    <div className="space-y-12 text-neutral-300">
                        {/* Return Policy Section */}
                        <section>
                            <h2 className="text-3xl text-white font-bold mb-6 border-b border-white/10 pb-4">Return Policy</h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl text-white font-semibold mb-3">1. Eligibility for Returns</h3>
                                    <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                        <li>Returns are accepted only for manufacturing defects.</li>
                                        <li>Products must be unused, in original packaging, and accompanied by proof of purchase.</li>
                                        <li>Return requests must be made within 7 days of receiving the order.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl text-white font-semibold mb-3">2. Non-Returnable Items</h3>
                                    <p className="mb-2">The following products cannot be returned:</p>
                                    <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                        <li>Items damaged due to improper installation, misuse, or modification.</li>
                                        <li>Normal wear-and-tear components such as sprockets, brake pads, bearings, seals, etc.</li>
                                        <li>Electrical or electronic parts once installed.</li>
                                        <li>Clearance or promotional items.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl text-white font-semibold mb-3">3. Return Process</h3>
                                    <p className="mb-2">To initiate a return:</p>
                                    <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                        <li>Email <a href="mailto:sales@shadowlineracetech.com" className="text-[var(--color-brand-red)]">sales@shadowlineracetech.com</a> with your order number, issue details, and photos/videos of the defect.</li>
                                        <li>Our team will verify the issue and share the return instructions.</li>
                                        <li>Ship the product securely to the address provided.</li>
                                        <li>Return shipping costs are borne by the customer unless the return is due to an error on our part.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl text-white font-semibold mb-3">4. Inspection and Approval</h3>
                                    <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                        <li>All returned products are inspected upon receipt.</li>
                                        <li>If the defect is confirmed as a manufacturing issue, you will be eligible for a replacement or refund under our Refund Policy.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Refund Policy Section */}
                        <section>
                            <h2 className="text-3xl text-white font-bold mb-6 border-b border-white/10 pb-4">Refund Policy</h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl text-white font-semibold mb-3">1. Refund Eligibility</h3>
                                    <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                        <li>Refunds are approved only for confirmed manufacturing defects.</li>
                                        <li>Refunds are not applicable in cases of:</li>
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li>Improper installation or handling.</li>
                                            <li>Wear and tear, accidental damage, or misuse.</li>
                                            <li>Custom-built or special-order items.</li>
                                        </ul>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl text-white font-semibold mb-3">2. Refund Process</h3>
                                    <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                        <li>Once your return is received and inspected, we’ll notify you regarding approval or rejection.</li>
                                        <li>If approved, refunds are processed within 3 working days to your original payment method.</li>
                                        <li>Shipping and handling charges are non-refundable.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl text-white font-semibold mb-3">3. Late or Missing Refunds</h3>
                                    <p className="mb-2">If you haven’t received your refund within the specified time:</p>
                                    <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                        <li>Check your bank or card account for pending transactions.</li>
                                        <li>Contact your bank, as processing delays may occur.</li>
                                        <li>If the issue persists, email <a href="mailto:sales@shadowlineracetech.com" className="text-[var(--color-brand-red)]">sales@shadowlineracetech.com</a> for assistance.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="pt-8 border-t border-white/10">
                            <h2 className="text-2xl text-white font-bold mb-4">Warranty Policy</h2>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>All products carry a 7-day warranty from the date of delivery, covering manufacturing defects only.</li>
                                <li>Parts subject to wear and tear (e.g., brake pads, chains, sprockets, seals, bearings, etc.) are not covered under warranty.</li>
                                <li>Any modification, tampering, or improper installation will void the warranty.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">Limitation of Liability</h2>
                            <div className="space-y-2 leading-relaxed">
                                <p>
                                    Zealics Technologies Pvt. Ltd. shall not be liable for any indirect, incidental, or consequential damages, including but not limited to loss of performance, damage to vehicle components, or personal injury resulting from use or misuse of products.
                                </p>
                                <p>
                                    Installation and usage are at the buyer’s discretion and risk.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">Intellectual Property</h2>
                            <p className="leading-relaxed">
                                All content, designs, logos, images, and materials on ShadowlineRaceTech.com are the intellectual property of Zealics Technologies Pvt. Ltd. and are protected by copyright and trademark laws. Unauthorized use or reproduction is strictly prohibited.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">Governing Law and Jurisdiction</h2>
                            <p className="leading-relaxed">
                                All disputes arising from or relating to transactions made through ShadowlineRaceTech.com shall be governed by the laws of India and subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.
                            </p>
                        </section>

                        {/* Contact Information from User Input */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">Contact for Return/Refund Queries</h2>
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
