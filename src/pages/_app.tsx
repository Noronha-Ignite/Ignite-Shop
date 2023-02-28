import type { AppProps } from 'next/app'

import logoImg from '@/assets/logo.svg'
import { Sidebar } from '@/components/layout/Sidebar'
import { globalStyles } from '@/styles/global'
import * as S from '@/styles/pages/app'
import Image from 'next/image'
import { Handbag } from 'phosphor-react'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <S.Container>
      <S.Header>
        <Image src={logoImg} alt='Logo Image' />

        <Sidebar>
          <S.SidebarTrigger>
            <Handbag size={24} />
          </S.SidebarTrigger>
        </Sidebar>
      </S.Header>

      <Component {...pageProps} />
    </S.Container>
  )
}
