
import { getCustomerAction, logoutAction } from '@/app/actions';
import { ProfileForm } from '@/components/account/ProfileForm';
import { redirect } from 'next/navigation';
import { LogOut, Package, User } from 'lucide-react';

export default async function AccountPage() {
    const customer = await getCustomerAction();

    if (!customer) {
        redirect('/login');
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">

            <div className="pt-32 pb-24 container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Sidebar / Profile Card */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-neutral-900/50 border border-white/10 p-6 rounded-lg sticky top-32">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                    <User className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold uppercase tracking-widest">{customer.firstName} {customer.lastName}</h2>
                                    <p className="text-xs font-mono text-neutral-500">{customer.email}</p>
                                </div>
                            </div>

                            <div className="border-t border-white/5 pt-6 space-y-4">
                                <div className="flex justify-between text-sm font-mono">
                                    <span className="text-neutral-500">STATUS</span>
                                    <span className="text-green-500 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        ACTIVE
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm font-mono">
                                    <span className="text-neutral-500">ID</span>
                                    <span className="text-neutral-300">OP-{customer.id.substring(customer.id.length - 4)}</span>
                                </div>
                            </div>

                            {/* Profile Update Section */}
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Update Profile</h3>
                                <ProfileForm customer={customer} />
                            </div>


                            <form action={logoutAction} className="mt-8 pt-6 border-t border-white/5">
                                <button className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors">
                                    <LogOut size={14} /> Terminate Session
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Main Content / Orders */}
                    <div className="flex-1">
                        <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
                            <h1 className="text-3xl font-black uppercase tracking-tighter">Mission History</h1>
                            <span className="font-mono text-xs text-neutral-500">
                                Total Records: {customer.orders.edges.length}
                            </span>
                        </div>

                        {customer.orders.edges.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-lg">
                                <Package className="w-12 h-12 text-neutral-600 mb-4" />
                                <p className="text-sm font-mono text-neutral-500 uppercase">No missions on record.</p>
                                <a href="/shop" className="mt-4 text-xs font-bold uppercase tracking-widest text-white border-b border-white hover:border-transparent transition-colors">
                                    Initiate Requisition
                                </a>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {customer.orders.edges.map(({ node: order }) => (
                                    <div key={order.id} className="bg-neutral-900/30 border border-white/5 p-6 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/20 transition-colors group">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-bold uppercase tracking-widest">
                                                    #{order.orderNumber}
                                                </h3>
                                                <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-white/10 text-neutral-300 rounded">
                                                    {order.financialStatus}
                                                </span>
                                            </div>
                                            <p className="text-xs font-mono text-neutral-500">
                                                {new Date(order.processedAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xl font-mono text-white">
                                                {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: order.totalPrice.currencyCode,
                                                }).format(parseFloat(order.totalPrice.amount))}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
