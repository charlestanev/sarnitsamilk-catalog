import Link from 'next/link'
import { addProduct } from '../actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import NewProductForm from './NewProductForm'

export default function NewProductPage() {
    // The form logic is moved to a client component for better state management
    return <NewProductForm action={addProduct} />
}