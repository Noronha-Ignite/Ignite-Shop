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

  const success_url = `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancel_url = `${process.env.APP_URL}`

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items,
    success_url,
    cancel_url,
  })

  return res.status(200).json({ checkoutUrl: checkoutSession.url })
}
