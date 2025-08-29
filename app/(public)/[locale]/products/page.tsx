import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/models/Product";

async function getProducts() {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage() {
    const products: IProduct[] = await getProducts();

    return (
        <main className="container py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Нашите Продукти</h1>
            {products.length === 0 ? (
                <p className="text-center text-gray-500">Няма добавени продукти в момента.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
}