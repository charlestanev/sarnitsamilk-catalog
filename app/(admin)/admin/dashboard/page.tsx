import Link from 'next/link';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import ProductActions from './ProductActions'; // Import the new component

async function getProducts() {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
}

export default async function DashboardPage() {
    const products = await getProducts();

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2-xl md:text-3xl font-bold">Products</h1>
                <Button asChild>
                    <Link href="/admin/products/new">Add New Product</Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Existing Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name (BG)</TableHead>
                                <TableHead>Category (BG)</TableHead>
                                <TableHead>Variants</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24">
                                        No products found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((product: any) => (
                                    <TableRow key={product._id}>
                                        <TableCell className="font-medium">{product.name_bg}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{product.category_bg || 'N/A'}</Badge>
                                        </TableCell>
                                        <TableCell>{product.variants?.length || 0}</TableCell>
                                        <TableCell className="text-right">
                                            {/* Use the new Client Component for actions */}
                                            <ProductActions productId={product._id} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}