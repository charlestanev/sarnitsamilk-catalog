import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
    name_bg: { type: String, required: true },
    name_en: { type: String, required: true },
    description_bg: { type: String, required: true },
    description_en: { type: String, required: true },
    price_bgn: { type: Number, required: true },
    price_eur: { type: Number, required: true },
}, {
    timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);