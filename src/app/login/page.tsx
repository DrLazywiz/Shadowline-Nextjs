
'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions';
import { Navbar } from '@/components/layout/Navbar';
import { Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const initialState = {
    message: '',
};

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, initialState);

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-6 bg-[grid-white/20] bg-[size:40px_40px]">
                <div className="w-full max-w-md">
                    {/* Terminal Header */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8 text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
                            <Lock className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold uppercase tracking-[0.2em]">Restricted Access</h1>
                        <p className="mt-2 text-xs font-mono text-neutral-500 uppercase">Identify yourself to proceed</p>
                    </motion.div>

                    {/* Login Form */}
                    <motion.form
                        action={formAction}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-neutral-900/50 backdrop-blur border border-white/10 p-8 rounded-lg relative overflow-hidden"
                    >
                        {/* Decoration Lines */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50" />

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                                    Secure Identifier (Email)
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-black border border-white/10 rounded-none px-4 py-3 text-sm focus:border-white outline-none transition-colors"
                                    placeholder="OPERATOR@SHADOWLINE.COM"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                                    Passcode
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full bg-black border border-white/10 rounded-none px-4 py-3 text-sm focus:border-white outline-none transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            {state?.message && (
                                <div className="flex items-center gap-2 text-red-500 text-xs font-mono bg-red-500/10 p-3 border border-red-500/20">
                                    <AlertTriangle size={14} />
                                    {state.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isPending ? 'Authenticating...' : 'Establish Connection'} <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 text-center text-[10px] text-neutral-600 font-mono space-y-2"
                    >
                        <p>SECURE CHANNEL ESTABLISHED v2.0.4</p>
                        <p className="border-t border-white/5 pt-4 mt-4">
                            NEW OPERATOR? <a href="/register" className="text-white hover:underline transition-all">REQUEST ACCESS PROTOCOL</a>
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
