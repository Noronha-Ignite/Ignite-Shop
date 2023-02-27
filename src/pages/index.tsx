import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'

import * as S from '@/styles/pages/home'

import Camiseta1 from '@/assets/camisas/1.png'
import Camiseta2 from '@/assets/camisas/2.png'
import Camiseta3 from '@/assets/camisas/3.png'
import Camiseta4 from '@/assets/camisas/4.png'
import Camiseta5 from '@/assets/camisas/5.png'

import 'keen-slider/keen-slider.min.css'

const shirts = [
  { img: Camiseta1, name: 'Camisa 1' },
  { img: Camiseta2, name: 'Camisa 2' },
  { img: Camiseta3, name: 'Camisa 3' },
  { img: Camiseta4, name: 'Camisa 4' },
  { img: Camiseta5, name: 'Camisa 5' },
]

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
    },
  })

  return (
    <S.HomeContainer ref={sliderRef} className='keen-slider'>
      {shirts.map((shirt) => (
        <S.Product key={shirt.name} className='keen-slider__slide'>
          <Image src={shirt.img} width={520} height={480} alt='Camisa 1' />

          <footer>
            <strong>{shirt.name}</strong>

            <span>R$ 79,90</span>
          </footer>
        </S.Product>
      ))}
    </S.HomeContainer>
  )
}
