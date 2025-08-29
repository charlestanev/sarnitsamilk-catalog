import mongoose, { Schema } from 'mongoose';

export interface IProduct extends Document {
    _id: string;
    name_bg: string;
    name_en: string;
    description_bg: string;
    description_en: string;
    additional_info_bg?: string;
    additional_info_en?: string;
    imageUrl?: string;
    category_bg: string;
    category_en: string;
    variants: {
        _id?: string;
        weight: string;
        price_bgn: number;
        price_eur: number;
    }[];
    relatedProducts: mongoose.Types.ObjectId[];
}

// Defines the structure for a single product variant (e.g., 0.250 kg - 23.00 BGN)
const VariantSchema = new Schema({
    weight: { type: String, required: true }, // e.g., "0.250 кг" or "1 кг"
    price_bgn: { type: Number, required: true },
    price_eur: { type: Number, required: true },
});

const ProductSchema = new Schema({
    name_bg: { type: String, required: true },
    name_en: { type: String, required: true },

    description_bg: { type: String, required: true },
    description_en: { type: String, required: true },

    // Additional information section
    additional_info_bg: { type: String },
    additional_info_en: { type: String },

    // A single URL for the main product image
    imageUrl: { type: String },

    // Category of the product
    category_bg: { type: String, required: true },
    category_en: { type: String, required: true },

    // An array of variants based on the VariantSchema
    variants: [VariantSchema],

    // An array to store IDs of related products
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],

}, {
    // Automatically add 'createdAt' and 'updatedAt' timestamps
    timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);