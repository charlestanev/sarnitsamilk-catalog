import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/productActions';
import { IProduct } from '@/models/Product';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VariantSelector from './[id]/VariantSelector';


// This interface now expects a Promise for params
interface ProductDetailsPageProps {
    params: Promise<{ id: string; locale: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
    // We 'await' the params to get the values
    const { id, locale } = await params;
    const product: IProduct | null = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="container py-8 md:py-12">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="relative aspect-square">
                    <Image
                        src={product.imageUrl?.trim() || '/placeholder.png'}
                        alt={product.name_en}
                        fill
                        className="object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="flex flex-col">
                    <Badge variant="secondary" className="w-fit">{product.category_bg}</Badge>
                    <h1 className="text-3xl md:text-4xl font-bold mt-2">{product.name_bg}</h1>

                    {product.variants && product.variants.length > 0 ? (
                        <VariantSelector variants={product.variants} />
                    ) : (
                        <p className="mt-6 text-lg font-semibold">Цена по запитване</p>
                    )}

                    <div className="mt-6">
                        <Tabs defaultValue="description" className="w-full">
                            <TabsList>
                                <TabsTrigger value="description">Описание</TabsTrigger>
                                <TabsTrigger value="info">Допълнителна информация</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description" className="mt-4 text-gray-600 prose">
                                <p>{product.description_bg}</p>
                            </TabsContent>
                            <TabsContent value="info" className="mt-4 text-gray-600 prose">
                                <p>{product.additional_info_bg || 'Няма допълнителна информация.'}</p>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </main>
    );
}