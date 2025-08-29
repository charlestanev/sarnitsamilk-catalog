import mongoose, { Schema } from 'mongoose';

const VariantSchema = new Schema({
    weight: { type: String, required: true },
    price_bgn: { type: Number, required: true },
    price_eur: { type: Number, required: true },
});

const ProductSchema = new Schema({
    name_bg: { type: String, required: true },
    name_en: { type: String, required: true },
    description_bg: { type: String, required: true },
    description_en: { type: String, required: true },
    additional_info_bg: { type: String },
    additional_info_en: { type: String },
    imageUrl: { type: String },
    category_bg: { type: String, required: true },
    category_en: { type: String, required: true },
    variants: [VariantSchema],
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, {
    timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);