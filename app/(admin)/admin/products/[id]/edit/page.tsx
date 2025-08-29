'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '../../actions';
import { IProduct } from '@/models/Product';
import EditForm from './EditForm';

export default function EditProductPage() {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const params = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const id = params.id as string;
            if (!id) {
                setLoading(false);
                return;
            };

            try {
                const fetchedProduct = await getProductById(id);
                if (!fetchedProduct) {
                    setError('Product not found.');
                } else {
                    setProduct(fetchedProduct);
                }
            } catch (err) {
                setError('Failed to fetch product data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    if (!product) {
        return <div className="p-8 text-center">Product could not be loaded.</div>;
    }

    // Once data is loaded, we render the same EditForm component
    return <EditForm product={product} />;
}