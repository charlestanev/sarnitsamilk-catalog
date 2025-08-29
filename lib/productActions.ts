'use server'

import dbConnect from "@/lib/dbConnect";
import Product, { IProduct } from "@/models/Product";
import { isValidObjectId } from "mongoose";

export async function getProductById(id: string): Promise<IProduct | null> {
    if (!isValidObjectId(id)) {
        return null;
    }
    await dbConnect();
    const product = await Product.findById(id);
    if (!product) {
        return null;
    }
    return JSON.parse(JSON.stringify(product));
}