import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import { formatCurrency } from '@/utils/format'

import * as S from '@/styles/pages/product'
import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'
import { ProductSkeleton } from './_skeleton'

type ProductProps = {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    priceId: string
    description: string | null
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.priceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  if (isFallback) {
    return <ProductSkeleton />
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
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Comprar agora
          </button>
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
    price: formatCurrency((price.unit_amount ?? 0) / 100),
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
