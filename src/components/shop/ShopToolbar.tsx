
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown, Filter } from 'lucide-react';

export function ShopToolbar({
    totalItems,
    onOpenFilters
}: {
    totalItems: number;
    onOpenFilters?: () => void;
}) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set('sort', value);
        } else {
            params.delete('sort');
        }
        replace(`/shop?${params.toString()}`);
    };

    return (
        <div className="mb-6 md:mb-8 flex flex-row items-center gap-4">

            {/* Mobile Filter Trigger */}
            <button
                onClick={onOpenFilters}
                className="lg:hidden flex-1 h-11 flex items-center justify-center gap-2 bg-black border border-white/20 rounded-md text-xs font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-colors"
            >
                <Filter size={14} /> System Filters
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 md:flex-none md:w-auto min-w-[160px]">
                <select
                    onChange={(e) => handleSort(e.target.value)}
                    defaultValue={searchParams.get('sort')?.toString()}
                    className="w-full h-11 appearance-none bg-black border border-white/10 rounded-md py-2.5 pl-10 pr-8 text-xs font-mono font-bold text-white focus:border-white/30 focus:outline-none cursor-pointer transition-colors uppercase"
                >
                    <option value="">Sort: Relevance</option>
                    <option value="price-asc">Price: Low - High</option>
                    <option value="price-desc">Price: High - Low</option>
                    <option value="newest">Newest Arrivals</option>
                </select>
                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 w-4 h-4" />
                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 w-3 h-3 pointer-events-none" />
            </div>

            {/* Results Counter (Desktop) */}
            <div className="hidden md:block ml-auto border-l border-white/5 pl-4 whitespace-nowrap">
                <span className="text-xs font-mono text-neutral-500">
                    {totalItems} UNIT{totalItems !== 1 ? 'S' : ''} FOUND
                </span>
            </div>
        </div>
    );
}
