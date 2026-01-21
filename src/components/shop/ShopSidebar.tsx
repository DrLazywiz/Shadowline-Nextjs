
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Tag, Factory, DollarSign, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function ShopSidebar({
    brands,
    categories,
    mobileFiltersOpen,
    setMobileFiltersOpen
}: {
    brands: string[];
    categories: string[];
    mobileFiltersOpen: boolean;
    setMobileFiltersOpen: (open: boolean) => void;
}) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`/shop?${params.toString()}`);
    };

    const currentBrand = searchParams.get('brand') || '';
    const currentCategory = searchParams.get('type') || '';
    const currentMinPrice = searchParams.get('minPrice') || '';
    const currentMaxPrice = searchParams.get('maxPrice') || '';

    const handlePriceChange = useDebouncedCallback((min: string, max: string) => {
        const params = new URLSearchParams(searchParams);
        if (min) params.set('minPrice', min); else params.delete('minPrice');
        if (max) params.set('maxPrice', max); else params.delete('maxPrice');
        replace(`/shop?${params.toString()}`);
    }, 500);

    const FilterContent = () => (
        <div className="space-y-8">
            {/* Brands Filter */}
            <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                    <Factory size={12} /> Manufacturer
                </h3>
                <div className="space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="radio"
                            name="brand"
                            value=""
                            checked={currentBrand === ''}
                            onChange={() => handleFilter('brand', '')}
                            className="hidden"
                        />
                        <span className={`w-3 h-3 border ${currentBrand === '' ? 'bg-white border-white' : 'border-white/30 group-hover:border-white'} transition-colors`}></span>
                        <span className={`text-sm font-mono ${currentBrand === '' ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>All Systems</span>
                    </label>
                    {brands.map(brand => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="radio"
                                name="brand"
                                value={brand}
                                checked={currentBrand === brand}
                                onChange={() => handleFilter('brand', brand)}
                                className="hidden"
                            />
                            <span className={`w-3 h-3 border ${currentBrand === brand ? 'bg-white border-white' : 'border-white/30 group-hover:border-white'} transition-colors`}></span>
                            <span className={`text-sm font-mono ${currentBrand === brand ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                                {brand}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Categories Filter */}
            <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                    <Tag size={12} /> Class
                </h3>
                <div className="space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="radio"
                            name="category"
                            value=""
                            checked={currentCategory === ''}
                            onChange={() => handleFilter('type', '')}
                            className="hidden"
                        />
                        <span className={`w-3 h-3 border ${currentCategory === '' ? 'bg-white border-white' : 'border-white/30 group-hover:border-white'} transition-colors`}></span>
                        <span className={`text-sm font-mono ${currentCategory === '' ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>All Classes</span>
                    </label>
                    {categories.map(cat => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="radio"
                                name="category"
                                value={cat}
                                checked={currentCategory === cat}
                                onChange={() => handleFilter('type', cat)}
                                className="hidden"
                            />
                            <span className={`w-3 h-3 border ${currentCategory === cat ? 'bg-white border-white' : 'border-white/30 group-hover:border-white'} transition-colors`}></span>
                            <span className={`text-sm font-mono ${currentCategory === cat ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                                {cat}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                    <DollarSign size={12} /> Budget Range
                </h3>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="MIN"
                        defaultValue={currentMinPrice}
                        onChange={(e) => handlePriceChange(e.target.value, currentMaxPrice)}
                        className="w-full bg-black border border-white/10 rounded-none px-2 py-2 text-xs font-mono text-white focus:border-white/50 outline-none"
                    />
                    <span className="text-neutral-600">-</span>
                    <input
                        type="number"
                        placeholder="MAX"
                        defaultValue={currentMaxPrice}
                        onChange={(e) => handlePriceChange(currentMinPrice, e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-none px-2 py-2 text-xs font-mono text-white focus:border-white/50 outline-none"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop: Always Visible Filter Column */}
            <div className="hidden lg:block w-64">
                <FilterContent />
            </div>

            {/* Mobile: Drawer Overlay */}
            <AnimatePresence>
                {mobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileFiltersOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-black border-r border-white/10 z-[70] p-6 lg:hidden overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                                <span className="text-sm font-bold uppercase tracking-widest text-white">System Filters</span>
                                <button onClick={() => setMobileFiltersOpen(false)} className="text-neutral-500 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>
                            <FilterContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
