'use client'

import { useEffect } from 'react'

import { useCart } from '@/contexts/CartContext'

export const ClearCartMiddleware = () => {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return null
}
