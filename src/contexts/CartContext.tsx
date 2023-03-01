import { Product } from '@/models/Product'
import { createContext, useContext, useState } from 'react'

type CartProduct = {
  product: Product
  quantity: number
}

type CartContextProps = {
  items: CartProduct[]

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
  const [items, setItems] = useState<CartProduct[]>([])

  const findProductInCart = (product: Product) => {
    return items.find((cartItem) => cartItem.product.id === product.id)
  }

  const updateItemInCart = (newItem: CartProduct) => {
    if (!items.includes(newItem)) {
      throw new Error('Trying to update unexistent item in cart')
    }

    setItems((previousItems) =>
      previousItems.map((item) => {
        if (item.product.id === newItem.product.id) return newItem
        return item
      }),
    )
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
      ...previous,
      {
        product: item,
        quantity: 1,
      },
    ])
  }

  const removeFromCart = (itemId: string) => {
    setItems((previous) =>
      previous.filter((cartItem) => cartItem.product.id !== itemId),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{ items, removeFromCart, addToCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
