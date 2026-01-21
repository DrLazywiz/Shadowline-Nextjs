'use client';

import { useFormState } from 'react-dom';
import { updateCustomerAction } from '@/app/actions';
import { Customer } from '@/lib/shopify';

const initialState = {
    message: '',
    success: false,
};

function SubmitButton() {
    // using simplified button for now as useFormStatus requires React canary in some versions or specific setup
    return (
        <button type="submit" className="w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-3 hover:bg-neutral-200 transition-colors">
            Save Changes
        </button>
    );
}

export function ProfileForm({ customer }: { customer: Customer }) {
    const [state, formAction] = useFormState(updateCustomerAction, initialState);

    return (
        <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="firstName" className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        defaultValue={customer.firstName}
                        className="w-full bg-black border border-white/10 p-2 text-sm text-white font-mono focus:border-white/50 outline-none"
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="lastName" className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        defaultValue={customer.lastName}
                        className="w-full bg-black border border-white/10 p-2 text-sm text-white font-mono focus:border-white/50 outline-none"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="email" className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Email Address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={customer.email}
                    className="w-full bg-black border border-white/10 p-2 text-sm text-white font-mono focus:border-white/50 outline-none"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="password" className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">New Password (Optional)</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full bg-black border border-white/10 p-2 text-sm text-white font-mono focus:border-white/50 outline-none"
                />
            </div>

            {state?.message && (
                <p className={`text-xs font-mono ${state.success ? 'text-green-500' : 'text-red-500'}`}>
                    {state.message}
                </p>
            )}

            <SubmitButton />
        </form>
    );
}
