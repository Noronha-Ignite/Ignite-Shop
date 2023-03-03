import { stripe } from '@/lib/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

type CheckoutItem = {
  price: string
  quantity: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { items } = req.body as { items: CheckoutItem[] }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Route only support post method' })
  }

  if (!items.length) {
    return res.status(400).json({ error: 'Missing `priceId` information' })
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

  return res.status(200).json({ checkoutUrl: checkoutSession.url })
}
