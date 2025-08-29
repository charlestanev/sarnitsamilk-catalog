'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { updateProduct } from '../../actions'
import { IProduct } from '@/models/Product'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

interface Variant {
    weight: string;
    price_bgn: number;
    price_eur: number;
}

export default function EditForm({ product }: { product: IProduct }) {
    const [variants, setVariants] = useState<Variant[]>(product.variants);

    const handleAddVariant = () => setVariants([...variants, { weight: '', price_bgn: 0, price_eur: 0 }]);
    const handleRemoveVariant = (index: number) => setVariants(variants.filter((_, i) => i !== index));
    const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
        const newVariants = [...variants];
        (newVariants[index] as any)[field] = value;
        setVariants(newVariants);
    };

    const updateProductWithId = updateProduct.bind(null, product._id);

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Edit Product</h1>
            <form action={updateProductWithId}>
                <input type="hidden" name="variants" value={JSON.stringify(variants)} />
                <input type="hidden" name="currentImageUrl" value={product.imageUrl} />

                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Product Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2"><Label htmlFor="name_bg">Name (BG)</Label><Input id="name_bg" name="name_bg" defaultValue={product.name_bg} required /></div>
                                <div className="space-y-2"><Label htmlFor="name_en">Name (EN)</Label><Input id="name_en" name="name_en" defaultValue={product.name_en} required /></div>
                            </div>
                            <div className="space-y-2"><Label htmlFor="description_bg">Description (BG)</Label><Textarea id="description_bg" name="description_bg" defaultValue={product.description_bg} required /></div>
                            <div className="space-y-2"><Label htmlFor="description_en">Description (EN)</Label><Textarea id="description_en" name="description_en" defaultValue={product.description_en} required /></div>
                            <div className="space-y-2"><Label htmlFor="additional_info_bg">Additional Info (BG)</Label><Textarea id="additional_info_bg" name="additional_info_bg" defaultValue={product.additional_info_bg} /></div>
                            <div className="space-y-2"><Label htmlFor="additional_info_en">Additional Info (EN)</Label><Textarea id="additional_info_en" name="additional_info_en" defaultValue={product.additional_info_en} /></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2"><Label htmlFor="category_bg">Category (BG)</Label><Input id="category_bg" name="category_bg" defaultValue={product.category_bg} required /></div>
                                <div className="space-y-2"><Label htmlFor="category_en">Category (EN)</Label><Input id="category_en" name="category_en" defaultValue={product.category_en} required /></div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">New Product Image (optional)</Label>
                                <Input id="image" name="image" type="file" />
                                {product.imageUrl && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                                        <Image
                                            src={product.imageUrl.trim()}
                                            alt={product.name_en}
                                            width={100}
                                            height={100}
                                            className="rounded-md object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Variants</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {variants.map((variant, index) => (
                                <div key={index} className="flex items-end gap-2 border p-4 rounded-md">
                                    <div className="grid grid-cols-3 gap-2 flex-grow"><div className="space-y-1.5"><Label>Weight</Label><Input value={variant.weight} onChange={(e) => handleVariantChange(index, 'weight', e.target.value)} required /></div><div className="space-y-1.5"><Label>Price (BGN)</Label><Input type="number" step="0.01" value={variant.price_bgn} onChange={(e) => handleVariantChange(index, 'price_bgn', Number(e.target.value))} required /></div><div className="space-y-1.5"><Label>Price (EUR)</Label><Input type="number" step="0.01" value={variant.price_eur} onChange={(e) => handleVariantChange(index, 'price_eur', Number(e.target.value))} required /></div></div>
                                    <Button type="button" variant="destructive" size="sm" onClick={() => handleRemoveVariant(index)} disabled={variants.length <= 1}>Remove</Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={handleAddVariant}>Add Variant</Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline" asChild><Link href="/admin/dashboard">Cancel</Link></Button>
                    <Button type="submit">Update Product</Button>
                </div>
            </form>
        </div>
    )
}