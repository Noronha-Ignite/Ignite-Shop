'use client'

import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'

import * as S from '@/styles/pages/productSlider'

import 'keen-slider/keen-slider.min.css'

type SliderProps = {
  products: Array<{
    id: string
    name: string
    imageUrl: string
    price: string
  }>
}

export const ProductSlider = ({ products }: SliderProps) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })
  return (
    <S.SliderContainer ref={sliderRef} className='keen-slider'>
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
    </S.SliderContainer>
  )
}
