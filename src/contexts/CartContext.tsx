'use client'

import { useLocalStorageState } from '@/hooks/useLocalStorage'
import { Cart, CartProduct } from '@/models/Cart'
import { LocalStorageKey } from '@/models/LocalStorage'
import { Product } from '@/models/Product'
import { createContext, useContext } from 'react'

type CartContextProps = {
  items: Cart

  addToCart(item: Product): void
  removeFromCart(itemId: string): void
  clearCart(): void
}

export const CartContext = createContext({} as CartContextProps)

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [items, setItems, clearItems] = useLocalStorageState(
    LocalStorageKey.Cart,
  )

  const findProductInCart = (product: Product) => {
    return items?.find((cartItem) => cartItem.product.id === product.id)
  }

  const updateItemInCart = (newItem: CartProduct) => {
    if (!items?.some((item) => item.product.id === newItem.product.id)) {
      throw new Error('Trying to update unexistent item in cart')
    }

    setItems((previousItems) => {
      if (!previousItems) return []

      return previousItems.map((item) => {
        if (item.product.id === newItem.product.id) return newItem
        return item
      })
    })
  }

  const addToCart = (item: Product) => {
    const itemInCart = findProductInCart(item)

    if (!!itemInCart) {
      updateItemInCart({
        product: itemInCart.product,
        quantity: itemInCart.quantity + 1,
      })

      return
    }

    setItems((previous) => [
      ...(previous ?? []),
      {
        product: item,
        quantity: 1,
      },
    ])
  }

  const removeFromCart = (itemId: string) => {
    setItems((previous) =>
      (previous ?? []).filter((cartItem) => cartItem.product.id !== itemId),
    )
  }

  return (
    <CartContext.Provider
      value={{
        items: items ?? [],
        removeFromCart,
        addToCart,
        clearCart: clearItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
