'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-neutral-950 pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-neutral-400 mb-12">
                        Effective Date: 09.11.2025
                    </p>

                    <div className="space-y-12 text-neutral-300">
                        {/* Header Info */}
                        <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h2 className="text-xl text-white font-bold mb-4">Merchant Details</h2>
                            <div className="space-y-2 text-sm">
                                <p><span className="text-neutral-400">Website:</span> https://www.shadowlineracetech.com</p>
                                <p><span className="text-neutral-400">Owned and Operated by:</span> Zealics Technologies Private Limited</p>
                                <p><span className="text-neutral-400">Registered Address:</span> 59/1, 6th Cross, 2nd Main, Nanajappa Layout, Vidyaranyapura, Bengaluru – 560097, Karnataka, India</p>
                            </div>
                        </section>

                        {/* 1. Introduction */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">1. Introduction</h2>
                            <p className="leading-relaxed">
                                At ShadowlineRaceTech.com (“we”, “our”, “us”), your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit or make a purchase from our website.
                                By using this site, you agree to the collection and use of information in accordance with this policy.
                            </p>
                        </section>

                        {/* 2. Information We Collect */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">2. Information We Collect</h2>
                            <p className="mb-4">We may collect the following types of information:</p>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li><strong className="text-white">Personal Information:</strong> Name, billing address, shipping address, contact number, email address, and payment details.</li>
                                <li><strong className="text-white">Device Information:</strong> IP address, browser type, operating system, and browsing actions via cookies or analytics tools.</li>
                                <li><strong className="text-white">Transaction Information:</strong> Order history, payment confirmations, and communications related to your purchases.</li>
                            </ul>
                            <p className="mt-4 italic text-neutral-400">
                                We do not store or have access to your complete payment card details, as all payments are processed through secure third-party gateways.
                            </p>
                        </section>

                        {/* 3. How We Use Your Information */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">3. How We Use Your Information</h2>
                            <p className="mb-4">Your data is used for:</p>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>Processing and fulfilling your orders.</li>
                                <li>Communicating order updates, offers, or service information.</li>
                                <li>Improving our products, website experience, and customer service.</li>
                                <li>Preventing fraudulent or unauthorized transactions.</li>
                                <li>Complying with legal or regulatory obligations.</li>
                            </ul>
                        </section>

                        {/* 4. Data Protection and Security */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">4. Data Protection and Security</h2>
                            <p className="leading-relaxed mb-4">
                                We adopt appropriate technical and organizational measures to safeguard your personal data against unauthorized access, alteration, disclosure, or destruction.
                                Our website uses SSL (Secure Socket Layer) encryption to ensure safe data transmission.
                            </p>
                            <p className="leading-relaxed">
                                However, no method of online transmission is 100% secure, and while we strive to protect your data, we cannot guarantee absolute security.
                            </p>
                        </section>

                        {/* 5. Cookies */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">5. Cookies</h2>
                            <p className="mb-4">We use cookies to:</p>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>Improve site functionality and user experience.</li>
                                <li>Analyze traffic and usage trends.</li>
                                <li>Remember your preferences and login details (where applicable).</li>
                            </ul>
                            <p className="mt-4">
                                You can disable cookies through your browser settings, but some site features may not function properly as a result.
                            </p>
                        </section>

                        {/* 6. Data Sharing and Disclosure */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">6. Data Sharing and Disclosure</h2>
                            <p className="mb-4">
                                We do not sell, rent, or trade your personal information to any third party.
                                We may share your data only with:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>Logistics partners for product delivery.</li>
                                <li>Payment gateways for secure transaction processing.</li>
                                <li>Legal authorities when required under applicable law.</li>
                            </ul>
                            <p className="mt-4">
                                All such partners are obligated to maintain confidentiality and use data solely for the intended purpose.
                            </p>
                        </section>

                        {/* 7. Data Retention */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">7. Data Retention</h2>
                            <p className="leading-relaxed">
                                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy — typically until your order is completed and as required by Indian accounting and tax laws.
                            </p>
                        </section>

                        {/* 8. Your Rights */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">8. Your Rights</h2>
                            <p className="mb-4">Under applicable laws, you have the right to:</p>
                            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                                <li>Access, correct, or update your personal information.</li>
                                <li>Request deletion of your personal data (subject to legal retention requirements).</li>
                                <li>Withdraw consent for promotional communications at any time.</li>
                            </ul>
                            <p className="mt-4">
                                For such requests, please contact us at <a href="mailto:support@shadowlineracetech.com" className="text-[var(--color-brand-red)] hover:underline">support@shadowlineracetech.com</a>.
                            </p>
                        </section>

                        {/* 9. Third-Party Links */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">9. Third-Party Links</h2>
                            <p className="leading-relaxed">
                                Our website may contain links to third-party websites (for example, payment gateways or partners). We are not responsible for the privacy practices or content of these external websites.
                            </p>
                        </section>

                        {/* 10. Updates to This Policy */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">10. Updates to This Policy</h2>
                            <p className="leading-relaxed">
                                We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated “Effective Date.” Continued use of our website constitutes your acceptance of such changes.
                            </p>
                        </section>

                        {/* 11. Contact Us */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4">11. Contact Us</h2>
                            <p className="leading-relaxed mb-4">
                                For any questions, concerns, or privacy-related requests, please contact:
                            </p>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                                <p className="font-bold text-white">Zealics Technologies Pvt. Ltd.</p>
                                <p className="flex items-start gap-3 text-neutral-400">
                                    <span className="text-xl">📍</span>
                                    <span>59/1, 6th Cross, 2nd Main, Nanajappa Layout, Vidyaranyapura, Bengaluru – 560097, Karnataka, India</span>
                                </p>
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
