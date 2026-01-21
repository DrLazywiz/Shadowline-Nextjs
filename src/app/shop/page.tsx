
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
    const searchParts = [];
    if (queryParam) searchParts.push(queryParam);
    if (brandParam) searchParts.push(`vendor:${brandParam}`);
    if (typeParam) searchParts.push(`product_type:${typeParam}`);
    if (minPrice) searchParts.push(`variants.price:>=${minPrice}`);
    if (maxPrice) searchParts.push(`variants.price:<=${maxPrice}`);

    const finalQuery = searchParts.join(' ');

    // Fetch filtered products
    let products: any[] = [];
    try {
        products = await getProducts({
            sortKey,
            reverse,
            query: finalQuery
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
                    totalItems={products.length}
                >
                    {/* Product Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-12">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-lg">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                    <Search className="text-neutral-600" size={24} />
                                </div>
                                <h3 className="text-lg font-bold uppercase text-white mb-2">System Empty</h3>
                                <p className="text-neutral-500 font-mono text-xs max-w-xs mx-auto">
                                    No matching units found in the database.
                                    Adjust filters or initialize new search protocol.
                                </p>
                            </div>
                        )}
                    </div>
                </ShopInterface>
            </div>
        </main>
    );
}
