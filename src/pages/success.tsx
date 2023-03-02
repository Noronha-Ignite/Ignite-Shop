import { useCart } from '@/contexts/CartContext'
import { stripe } from '@/lib/stripe'
import * as S from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Stripe from 'stripe'

type SuccessProps = {
  customerName: string
  totalQuantity: number
  products: Array<{
    name: string
    imageUrl: string
  }>
}

export default function Success({
  customerName,
  products,
  totalQuantity,
}: SuccessProps) {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <>
      <Head>
        <title>Compra efetuada! | Ignite Shop</title>

        <meta name='robots' content='noindex' />
      </Head>
      <S.Container>
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
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id?.toString()
  const itemsQuantity = query.quantity?.toString()

  if (!sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {},
    }
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const products = session.line_items?.data.map(
    (lineItem) => lineItem.price?.product,
  ) as Stripe.Product[]

  return {
    props: {
      customerName,
      products: products.map((product) => ({
        name: product.name,
        imageUrl: product.images[0],
      })),
      totalQuantity: itemsQuantity ?? 0,
    },
  }
}
