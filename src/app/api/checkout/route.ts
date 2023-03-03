import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

type CheckoutItem = {
  price: string
  quantity: number
}

export async function POST(request: Request) {
  const { items } = (await request.json()) as { items: CheckoutItem[] }

  if (!items || !items.length) {
    return NextResponse.json(
      { error: 'Missing `priceId` information' },
      { status: 400 },
    )
  }

  const totalItemsQuantity = items.reduce((acc, item) => acc + item.quantity, 0)

  const appUrl =
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.APP_URL

  const success_url = `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&quantity=${totalItemsQuantity}`
  const cancel_url = `${appUrl}`

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items,
    success_url,
    cancel_url,
  })

  return NextResponse.json(
    { checkoutUrl: checkoutSession.url },
    { status: 200 },
  )
}
