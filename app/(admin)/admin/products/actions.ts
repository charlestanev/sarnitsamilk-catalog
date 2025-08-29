'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import dbConnect from '@/lib/dbConnect'
import Product, { IProduct } from '@/models/Product'
import { isValidObjectId } from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with your credentials from .env.local
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface Variant {
    _id?: string;
    weight: string;
    price_bgn: number;
    price_eur: number;
}

// CREATE
export async function addProduct(formData: FormData) {
    await dbConnect()

    const imageFile = formData.get('image') as File | null;
    let imageUrl: string | undefined;

    // Upload image to Cloudinary if a file is provided
    if (imageFile && imageFile.size > 0) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (error, result) => {
                if (error) reject(error);
                resolve(result);
            }).end(buffer);
        });
        imageUrl = (result as any).secure_url;
    }

    const variantsString = formData.get('variants') as string;
    const variants: Variant[] = JSON.parse(variantsString);
    const newProduct = {
        name_bg: formData.get('name_bg') as string,
        name_en: formData.get('name_en') as string,
        description_bg: formData.get('description_bg') as string,
        description_en: formData.get('description_en') as string,
        additional_info_bg: formData.get('additional_info_bg') as string,
        additional_info_en: formData.get('additional_info_en') as string,
        category_bg: formData.get('category_bg') as string,
        category_en: formData.get('category_en') as string,
        imageUrl: imageUrl, // Use the new URL from Cloudinary
        variants: variants,
    }
    await Product.create(newProduct)
    revalidatePath('/admin/dashboard')
    redirect('/admin/dashboard')
}

// UPDATE
export async function updateProduct(id: string, formData: FormData) {
    if (!isValidObjectId(id)) throw new Error('Invalid product ID');

    await dbConnect();

    const imageFile = formData.get('image') as File | null;
    const currentImageUrl = formData.get('currentImageUrl') as string;
    let imageUrl: string | undefined = currentImageUrl;

    // Upload new image to Cloudinary if a new file is provided
    if (imageFile && imageFile.size > 0) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (error, result) => {
                if (error) reject(error);
                resolve(result);
            }).end(buffer);
        });
        imageUrl = (result as any).secure_url;
    }

    const variantsString = formData.get('variants') as string;
    const variants: Variant[] = JSON.parse(variantsString);
    const updatedProduct = {
        name_bg: formData.get('name_bg') as string,
        name_en: formData.get('name_en') as string,
        description_bg: formData.get('description_bg') as string,
        description_en: formData.get('description_en') as string,
        additional_info_bg: formData.get('additional_info_bg') as string,
        additional_info_en: formData.get('additional_info_en') as string,
        category_bg: formData.get('category_bg') as string,
        category_en: formData.get('category_en') as string,
        imageUrl: imageUrl, // Use the new or existing URL
        variants: variants.map(({ _id, ...rest }) => rest),
    };
    await Product.findByIdAndUpdate(id, updatedProduct);

    revalidatePath('/admin/dashboard');
    revalidatePath(`/admin/products/${id}/edit`);
    redirect('/admin/dashboard');
}

// DELETE
export async function deleteProduct(id: string) {
    if (!isValidObjectId(id)) {
        throw new Error('Invalid product ID');
    }
    await dbConnect();
    await Product.findByIdAndDelete(id);
    revalidatePath('/admin/dashboard');
}