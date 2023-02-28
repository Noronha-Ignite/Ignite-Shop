import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import Stripe from 'stripe'

import * as S from '@/styles/pages/home'

import { stripe } from '@/lib/stripe'
import { formatCurrency } from '@/utils/format'

import 'keen-slider/keen-slider.min.css'

type HomeProps = {
  products: Array<{
    id: string
    name: string
    imageUrl: string
    price: string
  }>
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <S.HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map((product) => (
          <S.Product key={product.id} className='keen-slider__slide'>
            <Image
              src={product.imageUrl}
              width={520}
              height={480}
              alt='Camisa 1'
            />

            <S.ProductFooter>
              <div>
                <strong>{product.name}</strong>

                <span>{product.price}</span>
              </div>

              <Link href={`/product/${product.id}`} prefetch={false}>
                <Handbag size={32} />
              </Link>
            </S.ProductFooter>
          </S.Product>
        ))}
      </S.HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
