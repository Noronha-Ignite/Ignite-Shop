import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import { formatCurrency } from '@/utils/format'

import * as S from '@/styles/pages/product'
import { ProductSkeleton } from './_skeleton'

type ProductProps = {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string | null
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <ProductSkeleton />
  }

  return (
    <S.Container>
      <S.ImageContainer>
        <Image src={product.imageUrl} alt='Produto' width={520} height={480} />
      </S.ImageContainer>

      <S.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>Comprar agora</button>
      </S.ProductDetails>
    </S.Container>
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
    description: response.description,
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
