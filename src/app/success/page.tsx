import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import { ClearCartMiddleware } from '@/middlewares/ClearCartMiddleware'
import * as S from '@/styles/pages/success'
import { redirect } from 'next/navigation'

type RouteProps = {
  searchParams: Partial<{
    session_id: string
    quantity: string
  }>
}

const getSessionData = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const products = session.line_items?.data.map(
    (lineItem) => lineItem.price?.product,
  ) as Stripe.Product[]

  return {
    customerName,
    products: products.map((product) => ({
      name: product.name,
      imageUrl: product.images[0],
    })),
  }
}

export const dynamic = 'auto'
export const metadata: Metadata = {
  title: 'Compra efetuada!',
  robots: {
    index: false,
  },
}

export default async function Success({ searchParams }: RouteProps) {
  if (!searchParams.session_id) {
    return redirect('/')
  }

  const totalQuantity = Number(searchParams.quantity) ?? 0

  const { customerName, products } = await getSessionData(
    searchParams.session_id,
  )

  return (
    <S.Container>
      <ClearCartMiddleware />
      <h1>Compra efetuada!</h1>

      <S.ImagesWrapper>
        {products.map((product) => (
          <S.ImageContainer key={product.name}>
            <Image
              src={product.imageUrl}
              alt='Produto comprado'
              width={120}
              height={110}
            />
          </S.ImageContainer>
        ))}
      </S.ImagesWrapper>

      <p>
        Uhuul <strong>{customerName}</strong>, sua compra de{' '}
        <strong>{totalQuantity}</strong>{' '}
        {totalQuantity === 1 ? 'camiseta' : 'camisetas'} já está a caminho da
        sua casa.
      </p>

      <Link href='/'>Voltar ao catalogo</Link>
    </S.Container>
  )
}
