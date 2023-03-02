import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import { formatCurrency } from '@/utils/format'
import { ProductSlider } from './ProductSlider'

export const revalidate = 60 * 60 * 2 // 2 hours

const getProducts = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formatCurrency((price.unit_amount ?? 0) / 100),
    }
  })

  return products
}

export default async function Home() {
  const products = await getProducts()

  return <ProductSlider products={products} />
}
