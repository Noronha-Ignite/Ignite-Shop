import Image from 'next/image'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import { formatCurrency } from '@/utils/format'

import * as S from '@/styles/pages/product'
import { AddToCartButton } from './AddToCartButton'

type RouteProps = {
  params: {
    id: string
  }
}

const getProduct = async (productId: string) => {
  const response = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = response.default_price as Stripe.Price

  const product = {
    id: response.id,
    name: response.name,
    imageUrl: response.images[0],
    price: (price.unit_amount ?? 0) / 100,
    priceFormatted: formatCurrency((price.unit_amount ?? 0) / 100),
    priceId: price.id,
    description: response.description,
  }

  return product
}

export const revalidate = 60 * 60 * 30 // 30 min
export const generateMetadata = async ({ params }: RouteProps) => {
  const product = await getProduct(params.id)
  return {
    title: product.name,
  }
}

export default async function Product(params: RouteProps) {
  const product = await getProduct(params.params.id)

  return (
    <S.Container>
      <S.ImageContainer>
        <Image src={product.imageUrl} alt='Produto' width={520} height={480} />
      </S.ImageContainer>

      <S.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.priceFormatted}</span>

        <p>{product.description}</p>

        <AddToCartButton product={product} />
      </S.ProductDetails>
    </S.Container>
  )
}
