import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import { formatCurrency } from '@/utils/format'

import { useCart } from '@/contexts/CartContext'
import * as S from '@/styles/pages/product'
import Head from 'next/head'
import ProductSkeleton from './_skeleton'

type ProductProps = {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    priceFormatted: string
    priceId: string
    description: string | null
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const { addToCart } = useCart()

  if (isFallback) {
    return <ProductSkeleton />
  }

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

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <S.Container>
        <S.ImageContainer>
          <Image
            src={product.imageUrl}
            alt='Produto'
            width={520}
            height={480}
          />
        </S.ImageContainer>

        <S.ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.priceFormatted}</span>

          <p>{product.description}</p>

          <button onClick={handleAddToCart}>Colocar na sacola</button>
        </S.ProductDetails>
      </S.Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
  preview,
}) => {
  const productId = params!.id

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

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
