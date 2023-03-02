import type { AppProps } from 'next/app'

import logoImg from '@/assets/logo.svg'
import { Sidebar } from '@/components/layout/Sidebar'
import { CartContextProvider } from '@/contexts/CartContext'
import { globalStyles } from '@/styles/global'
import * as S from '@/styles/pages/app'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <S.Container>
        <S.Header>
          <Link href='/'>
            <Image src={logoImg} alt='Logo Image' />
          </Link>

          <Sidebar>
            <S.SidebarTrigger>
              <Handbag size={24} />
            </S.SidebarTrigger>
          </Sidebar>
        </S.Header>

        <Component {...pageProps} />
      </S.Container>
    </CartContextProvider>
  )
}
