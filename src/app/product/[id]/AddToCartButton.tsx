'use client'

import { useCart } from '@/contexts/CartContext'
import { Product } from '@/models/Product'

type ButtonProps = {
  product: Product
}

export const AddToCartButton = ({ product }: ButtonProps) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      description: product.description,
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
      priceId: product.priceId,
    })
  }

  return <button onClick={handleAddToCart}>Colocar na sacola</button>
}
