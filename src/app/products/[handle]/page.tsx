
import { getProduct } from '@/lib/shopify';
import { Navbar } from '@/components/layout/Navbar';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: Props) {
    const { handle } = await params;
    const product = await getProduct(handle);

    if (!product) {
        notFound();
    }

    const images = product.images.edges.map(edge => ({
        url: edge.node.url,
        altText: edge.node.altText
    }));

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />

            <div className="pt-32 pb-24 container mx-auto px-6 h-auto lg:h-[calc(100vh-6rem)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 h-full">
                    {/* Left: Gallery */}
                    <div className="w-full h-full min-h-[500px]">
                        <ProductGallery images={images} />
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col justify-center">
                        <ProductInfo product={product} />
                    </div>
                </div>
            </div>
        </main>
    );
}
