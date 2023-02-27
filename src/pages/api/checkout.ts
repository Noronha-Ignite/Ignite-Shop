import { stripe } from '@/lib/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { priceId } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Route only support post method' })
  }

  if (!priceId) {
    return res.status(400).json({ error: 'Missing `priceId` information' })
  }

  const success_url = `${process.env.APP_URL}/success`
  const cancel_url = `${process.env.APP_URL}`

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url,
    cancel_url,
  })

  return res.status(200).json({ checkoutUrl: checkoutSession.url })
}
