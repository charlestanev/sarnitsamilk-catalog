'use client'

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';

interface Variant {
    _id?: string;
    weight: string;
    price_bgn: number;
    price_eur: number;
}

export default function VariantSelector({ variants }: { variants: Variant[] }) {
    // Set the first variant as the default selected one
    const [selectedVariant, setSelectedVariant] = useState(variants[0]);

    const handleValueChange = (variantId: string) => {
        const newSelectedVariant = variants.find(v => v._id === variantId);
        if (newSelectedVariant) {
            setSelectedVariant(newSelectedVariant);
        }
    };

    return (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Варианти</label>
                    <Select onValueChange={handleValueChange} defaultValue={selectedVariant?._id}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Избери разфасовка" />
                        </SelectTrigger>
                        <SelectContent>
                            {variants.map((variant) => (
                                <SelectItem key={variant._id} value={variant._id!}>
                                    {variant.weight}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="text-left sm:text-right">
                    <p className="text-3xl font-bold">{selectedVariant?.price_bgn.toFixed(2)} лв.</p>
                    <p className="text-sm text-gray-500">{selectedVariant?.price_eur.toFixed(2)} EUR</p>
                </div>
            </div>
            <Button size="lg" className="w-full mt-6">ОБАДИ СЕ</Button>
        </div>
    );
}