
'use client';

import { useActionState } from 'react';
import { registerAction } from '@/app/actions';
import { Navbar } from '@/components/layout/Navbar';
import { UserPlus, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const initialState = {
    message: '',
    success: false
};

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(registerAction, initialState);

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-6 bg-[grid-white/20] bg-[size:40px_40px]">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8 text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
                            <UserPlus className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold uppercase tracking-[0.2em]">Request Access</h1>
                        <p className="mt-2 text-xs font-mono text-neutral-500 uppercase">Initialize New Operator Protocol</p>
                    </motion.div>

                    {/* Form */}
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

                        {state?.success ? (
                            <div className="text-center py-8">
                                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                <h3 className="text-lg font-bold uppercase text-white mb-2">Access Granted</h3>
                                <p className="text-xs font-mono text-neutral-400 mb-6">
                                    Credentials established. Proceed to identification.
                                </p>
                                <Link
                                    href="/login"
                                    className="bg-white text-black font-bold uppercase tracking-widest py-3 px-6 hover:bg-neutral-200 transition-colors inline-block"
                                >
                                    Identify
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            className="w-full bg-black border border-white/10 rounded-none px-4 py-3 text-sm focus:border-white outline-none transition-colors"
                                            placeholder="JOHN"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            className="w-full bg-black border border-white/10 rounded-none px-4 py-3 text-sm focus:border-white outline-none transition-colors"
                                            placeholder="DOE"
                                        />
                                    </div>
                                </div>

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
                                        Set Passcode
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        className="w-full bg-black border border-white/10 rounded-none px-4 py-3 text-sm focus:border-white outline-none transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>

                                {state?.message && !state.success && (
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
                                    {isPending ? 'Processing...' : 'Submit Request'} <ArrowRight size={16} />
                                </button>
                            </div>
                        )}
                    </motion.form>

                    {!state?.success && (
                        <p className="mt-8 text-center text-[10px] text-neutral-600 font-mono">
                            ALREADY ACCREDITED? <Link href="/login" className="text-white hover:underline">IDENTIFY</Link>
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}
