
import { getProducts } from '@/lib/shopify';
import { ProductCard } from '@/components/shop/ProductCard';
import { Navbar } from '@/components/layout/Navbar';
import { ShopToolbar } from '@/components/shop/ShopToolbar';
import { ShopSidebar } from '@/components/shop/ShopSidebar';
import { Search } from 'lucide-react';
import { ShopInterface } from '@/components/shop/ShopInterface';

export const metadata = {
    title: 'Shop | Shadowline Performance',
    description: 'Precision engineered components.',
};

export default async function ShopPage({
    searchParams
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // Await searchParams
    const resolvedSearchParams = await searchParams;
    const sortParam = resolvedSearchParams?.sort as string | undefined;
    const queryParam = resolvedSearchParams?.q as string | undefined;
    const brandParam = resolvedSearchParams?.brand as string | undefined;
    const typeParam = resolvedSearchParams?.type as string | undefined;
    const minPrice = resolvedSearchParams?.minPrice as string | undefined;
    const maxPrice = resolvedSearchParams?.maxPrice as string | undefined;

    // Sorting Logic
    let sortKey: 'TITLE' | 'PRICE' | 'CREATED_AT' | 'RELEVANCE' = 'RELEVANCE';
    let reverse = false;

    if (sortParam === 'price-asc') {
        sortKey = 'PRICE';
        reverse = false;
    } else if (sortParam === 'price-desc') {
        sortKey = 'PRICE';
        reverse = true;
    } else if (sortParam === 'newest') {
        sortKey = 'CREATED_AT';
        reverse = true;
    }

    // Construct Search Query
    // Construct Search Query (Server Side - Optional, but for small catalog "real time" typically means fetch all)
    // For this specific request ("Real Time"), we want all products on client to filter instantly.
    // So we will IGNORE the query param for fetching (except maybe for deep linking later).

    // Fetch ALL products for client-side filtering
    let products: any[] = [];
    try {
        products = await getProducts({
            sortKey: sortKey,
            reverse: reverse,
            // query: finalQuery // Disable server filtering to allow client full access
        });
    } catch (e) {
        console.error("ShopPage Fetch Error:", e);
    }

    // Extract Facets for Sidebar
    let baseProducts: any[] = [];
    try {
        baseProducts = await getProducts({ sortKey: 'CREATED_AT' });
    } catch (e) {
        console.error("ShopPage Facet Fetch Error:", e);
    }

    const validBrands = Array.from(new Set(baseProducts.map(p => p.vendor).filter(Boolean)));
    const validCategories = Array.from(new Set(baseProducts.map(p => p.productType).filter(Boolean)));

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />

            <div className="pt-32 pb-24 container mx-auto px-6">
                {/* Header */}

                <ShopInterface
                    brands={validBrands}
                    categories={validCategories}
                    products={products}
                />
            </div>
        </main>
    );
}
