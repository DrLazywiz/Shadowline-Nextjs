'use client';

import { useState, useMemo } from 'react';
import { ShopSidebar } from './ShopSidebar';
import { ShopToolbar } from './ShopToolbar';
import { StickyCartBar } from '@/components/cart/StickyCartBar';
import { ProductCard } from './ProductCard';
import { Search } from 'lucide-react';

export function ShopInterface({
    brands,
    categories,
    products
}: {
    brands: string[];
    categories: string[];
    products: any[];
}) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Client-side filtering for Real-Time Search
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        const lowerTerm = searchTerm.toLowerCase();

        return products.filter(product => {
            const title = product?.title?.toLowerCase() || '';
            const type = product?.productType?.toLowerCase() || '';
            const vendor = product?.vendor?.toLowerCase() || '';

            return title.includes(lowerTerm) || type.includes(lowerTerm) || vendor.includes(lowerTerm);
        });
    }, [products, searchTerm]);

    return (
        <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar (Drawer + Desktop) */}
            <ShopSidebar
                brands={brands}
                categories={categories}
                mobileFiltersOpen={mobileFiltersOpen}
                setMobileFiltersOpen={setMobileFiltersOpen}
            />

            {/* Main Content */}
            <div className="flex-1">
                {/* Toolbar (Filter Trigger + Sort + Real Time Search) */}
                <ShopToolbar
                    totalItems={filteredProducts.length}
                    onOpenFilters={() => setMobileFiltersOpen(true)}
                    onSearch={(term) => setSearchTerm(term)}
                    searchTerm={searchTerm}
                />

                {/* Product Grid (Client Side Rendered) */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-12">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-32 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-lg">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                <Search className="text-neutral-600" size={24} />
                            </div>
                            <h3 className="text-lg font-bold uppercase text-white mb-2">System Empty</h3>
                            <p className="text-neutral-500 font-mono text-xs max-w-xs mx-auto">
                                No matching units found.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Mobile Cart Bar */}
            <StickyCartBar />
        </div>
    );
}
