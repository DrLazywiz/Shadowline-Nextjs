
import { getProduct } from '@/lib/shopify';
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


            <div className="pt-24 lg:pt-32 pb-4 lg:pb-24 container mx-auto px-6 h-auto lg:h-[calc(100vh-6rem)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 h-full">
                    {/* Left: Gallery */}
                    <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
                        <ProductGallery images={images} />
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col justify-center">
                        <ProductInfo product={product} />
                    </div>
                </div>
                <div className="mt-16 lg:mt-24 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-widest border-l-4 border-[var(--color-brand-red)] pl-4">Product Description</h2>
                    <div
                        className="prose prose-invert prose-lg text-neutral-300 font-light leading-relaxed max-w-none"
                        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                    />
                </div>
            </div>
        </main>
    );
}
