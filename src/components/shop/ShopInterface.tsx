'use client';

import { useState } from 'react';
import { ShopSidebar } from './ShopSidebar';
import { ShopToolbar } from './ShopToolbar';
import { StickyCartBar } from '@/components/cart/StickyCartBar';

export function ShopInterface({
    brands,
    categories,
    totalItems,
    children
}: {
    brands: string[];
    categories: string[];
    totalItems: number;
    children: React.ReactNode;
}) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
                {/* Toolbar (Filter Trigger + Sort) */}
                <ShopToolbar
                    totalItems={totalItems}
                    onOpenFilters={() => setMobileFiltersOpen(true)}
                />

                {/* Product Grid (Children) */}
                {children}
            </div>

            {/* Sticky Mobile Cart Bar */}
            <StickyCartBar />
        </div>
    );
}
