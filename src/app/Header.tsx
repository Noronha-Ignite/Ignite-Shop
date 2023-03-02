'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'

import logoImg from '@/assets/logo.svg'
import { Sidebar } from '@/components/layout/Sidebar'
import { useCart } from '@/contexts/CartContext'
import * as S from '@/styles/pages/header'

export const Header = () => {
  const { items } = useCart()

  const itemsQuantity = items.length

  return (
    <S.Header>
      <Link href='/'>
        <Image src={logoImg} alt='Logo Image' />
      </Link>

      <Sidebar>
        <S.SidebarTrigger css={{ $tagValue: itemsQuantity }}>
          <Handbag size={24} />
          {!!itemsQuantity && (
            <S.SidebarTriggerTag>{itemsQuantity}</S.SidebarTriggerTag>
          )}
        </S.SidebarTrigger>
      </Sidebar>
    </S.Header>
  )
}
