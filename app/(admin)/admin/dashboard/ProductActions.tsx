'use client'

import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { deleteProduct } from '../products/actions'

export default function ProductActions({ productId }: { productId: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/admin/products/${productId}/edit`}>Edit</Link>
                </DropdownMenuItem>

                {/* The onSelect handler is now valid here because this is a Client Component */}
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <form
                        action={() => {
                            if (window.confirm('Are you sure you want to delete this product?')) {
                                deleteProduct(productId);
                            }
                        }}
                        className="w-full"
                    >
                        <button type="submit" className="w-full text-left text-destructive">
                            Delete
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}