import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
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
    <S.HomeContainer ref={sliderRef} className='keen-slider'>
      {products.map((product) => (
        <S.Product
          href={`/product/${product.id}`}
          key={product.id}
          className='keen-slider__slide'
        >
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt='Camisa 1'
          />

          <footer>
            <strong>{product.name}</strong>

            <span>{product.price}</span>
          </footer>
        </S.Product>
      ))}
    </S.HomeContainer>
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
