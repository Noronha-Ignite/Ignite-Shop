import * as Dialog from '@radix-ui/react-dialog'

import { useCart } from '@/contexts/CartContext'
import * as S from '@/styles/components/layout/sidebar'
import { formatCurrency } from '@/utils/format'
import axios from 'axios'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'

type SidebarProps = {
  children: React.ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
  const { items, removeFromCart } = useCart()

  const [isOpen, setIsOpen] = useState(false)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const itemsQuantity = items.reduce((acc, item) => acc + item.quantity, 0)
  const totalValue = items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  )

  const handleCheckoutCart = async () => {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        items: items.map((item) => ({
          price: item.product.priceId,
          quantity: item.quantity,
        })),
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId)
  }

  useEffect(() => {
    if (!itemsQuantity) {
      setIsOpen(false)
    }
  }, [itemsQuantity])

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger disabled={!itemsQuantity} asChild>
        {children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <S.Overlay />

        <Dialog.Content>
          <S.Container>
            <S.Closer>
              <X size={24} />
            </S.Closer>

            <S.Content>
              <h1>Sacola de compras</h1>

              <S.ItemsWrapper>
                {items.map((item) => (
                  <S.CartItem key={item.product.id}>
                    <S.CartImageContainer>
                      <Image
                        src={item.product.imageUrl}
                        alt='Camiseta'
                        width={90}
                        height={80}
                      />
                    </S.CartImageContainer>

                    <div>
                      <h4>
                        {item.product.name}{' '}
                        {item.quantity > 1 && ` | x${item.quantity}`}
                      </h4>

                      <span>{formatCurrency(item.product.price)}</span>

                      <button onClick={() => handleRemoveItem(item.product.id)}>
                        Remover
                      </button>
                    </div>
                  </S.CartItem>
                ))}
              </S.ItemsWrapper>

              <footer>
                <div>
                  <span>Quantidade</span>
                  <span>
                    {itemsQuantity} {itemsQuantity !== 1 ? 'itens' : 'item'}
                  </span>
                </div>

                <div>
                  <strong>Valor total</strong>
                  <strong>{formatCurrency(totalValue)}</strong>
                </div>

                <button
                  disabled={isCreatingCheckoutSession}
                  onClick={handleCheckoutCart}
                >
                  Finalizar compra
                </button>
              </footer>
            </S.Content>
          </S.Container>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
