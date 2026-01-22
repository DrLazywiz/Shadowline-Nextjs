
import { getProducts, Product } from '@/lib/shopify';
import { ProductCarousel } from '@/components/home/ProductCarousel';

export async function BestSellers() {
    let products: Product[] = [];
    try {
        products = await getProducts({ sortKey: 'BEST_SELLING', reverse: false });
    } catch (e) {
        console.error("BestSellers Error:", e);
    }
    const topProducts = products.slice(0, 8);

    if (topProducts.length === 0) return null;

    return (
        <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
            {/* Background Details */}
            <div className="absolute inset-0 bg-[grid-white/5] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-[1]">
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">
                            Top Rated Systems
                        </h2>
                        <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
                            Field Proven Architecture
                        </p>
                    </div>
                    <a href="/shop?sort=best-selling" className="hidden md:block text-xs font-bold uppercase tracking-widest text-white hover:text-neutral-400 transition-colors">
                        View All Systems &rarr;
                    </a>
                </div>

                <div className="md:px-12">
                    <ProductCarousel products={topProducts} />
                </div>

                <div className="mt-12 text-center md:hidden">
                    <a href="/shop?sort=best-selling" className="text-xs font-bold uppercase tracking-widest text-white border-b border-white hover:border-transparent transition-colors">
                        View All Systems
                    </a>
                </div>
            </div>
        </section>
    );
}
