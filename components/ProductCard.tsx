import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '@/models/Product';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product }: { product: IProduct }) {
    // We take the first variant to display a starting price
    const firstVariant = product.variants[0];

    return (
        <Link href={`/products/${product._id}`} className="group">
            <Card className="overflow-hidden h-full transition-shadow duration-300 group-hover:shadow-xl">
                <div className="relative aspect-square w-full">
                    <Image
                        // If there's no imageUrl, we can use a placeholder
                        src={product.imageUrl?.trim() || '/placeholder.png'}
                        alt={product.name_en}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">{product.category_bg}</Badge>
                    <h3 className="font-semibold text-lg leading-tight">{product.name_bg}</h3>
                    {firstVariant && (
                        <p className="text-md text-gray-700 mt-1">
                            {`От ${firstVariant.price_bgn.toFixed(2)} лв.`}
                        </p>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}